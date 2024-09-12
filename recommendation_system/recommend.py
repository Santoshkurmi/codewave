import re
from gensim.models import Word2Vec
from numpy import dot
from numpy.linalg import norm
import json
# app.py
from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
# import pymysql
# pymysql.install_as_MySQLdb()

app = Flask(__name__)

# Configure MySQL
app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'codewave'
# mysql = MySQL(app)
mysql = MySQL(app)
# mysql.init_app(app)


def get_user_interactions(user_id):
    cursor = mysql.connection.cursor()

    # Fetch posts created by the user
    cursor.execute("SELECT id, content as text FROM posts WHERE user_id = %s", (user_id,))
    created_posts = cursor.fetchall()

    # Fetch posts liked by the user
    cursor.execute("SELECT p.id, p.content as text FROM posts p JOIN votes v ON p.id = v.voteable_id WHERE v.user_id = %s and v.voteable_type= %s ", (user_id,'post'))
    liked_posts = cursor.fetchall()

    # Fetch posts viewed by the user
    cursor.execute("SELECT p.id, p.content as text FROM posts p JOIN post_views v ON p.id = v.post_id WHERE v.user_id = %s", (user_id,))
    viewed_posts = cursor.fetchall()

    

    cursor.close()

    return created_posts, liked_posts, viewed_posts


def preprocess_text(text):
    # Convert to lowercase, remove punctuation, and split into words
    text = re.sub(r'[^\w\s]', ' ', text.lower())  # Remove punctuation and lowercase
    return text.split()  # Split text into list of words


def train_model(posts):


    corpus = [
        preprocess_text(post[1]) for post in posts
    ]


    model = Word2Vec(sentences=corpus, vector_size=100, window=5, min_count=1, workers=4)
    
    return model;
  


def vectorize_post(post, model):
    words = preprocess_text(post)  # Tokenize the post into words
    word_vectors = [model.wv[word] for word in words if word in model.wv]
    if not word_vectors:
        return None  # If no words from the post exist in the model
    return sum(word_vectors) / len(word_vectors)  # Average the word vectors


def vectorize_query(query, model):
    words = preprocess_text(query)
    word_vectors = [model.wv[word] for word in words if word in model.wv]
    if not word_vectors:
        return None
    return sum(word_vectors) / len(word_vectors)




def cosine_similarity(vec1, vec2):
    return dot(vec1, vec2) / (norm(vec1) * norm(vec2))

def getAllPosts():
    cursor = mysql.connection.cursor()

    cursor.execute("""
        SELECT p.id, p.content, COALESCE(l.like_count, 0) AS like_count, p.view_count
        FROM posts p
        LEFT JOIN (SELECT voteable_id as post_id, COUNT(*) as like_count FROM votes WHERE voteable_type = 'post' GROUP BY voteable_id) l ON p.id = l.post_id
    """)


    # cursor.execute("SELECT id, content as text FROM posts")
    posts = cursor.fetchall()

    return posts;


@app.route('/api/similar', methods=['POST'])
def similar():
    query = json.loads(request.get_json() );
    
    id = query['id'];
    query = query["data"];
    # print(query)
    # print(id)
    # limit = request.json.get('limit')
    
    if(not query):
        return jsonify([]);
    
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT id, content as text FROM posts")
    posts = cursor.fetchall()
    model = train_model(posts);
    cursor.close()

    query_vector = vectorize_query(query,model);
    if query_vector is None:
        return [];


  

    results = []
    for post in posts:
        if(post[0] == id):continue;
        post_vector = vectorize_query(post[1],model)
        if post_vector is not None:
            similarity = cosine_similarity(query_vector, post_vector)
            results.append({'id': post[0], 'text': post[1], 'similarity': similarity})

    results.sort(key=lambda x: x['similarity'], reverse=True)
    top = results[:5];
    ids = []
    for item in top:
        ids.append(item['id']);
  
    return ids;




@app.route('/api/search', methods=['GET'])
def search():
    query = request.args.get('query')
    limit = request.args.get('limit')
    if(limit):
        limit = int(limit);
    else:
        limit = 30;

    if(not query):
        return jsonify([]);
    # query = "world";

    # conn = mysql.connect()
    # cursor = mysql.get
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT id, content as text FROM posts")
    posts = cursor.fetchall()
    model = train_model(posts);
    cursor.close()

    query_vector = vectorize_query(query,model);
    if query_vector is None:
        return [];


  

    results = []
    for post in posts:
        post_vector = vectorize_query(post[1],model)
        if post_vector is not None:
            similarity = cosine_similarity(query_vector, post_vector)
            results.append({'id': post[0], 'text': post[1], 'similarity': similarity})

    results.sort(key=lambda x: x['similarity'], reverse=True)
    top = results[:limit];
    ids = []
    for item in top:
        ids.append(item['id']);
  
    return ids;


@app.route('/api/recommend', methods=['GET'])
def recommend_posts():

    query = request.args.get('user_id')

    if(not query):
        return jsonify([]);

    posts = getAllPosts();

    model = train_model(posts);

    # print(posts)

    created_posts, liked_posts, viewed_posts = get_user_interactions(query)
    query_posts = created_posts + liked_posts + viewed_posts  # Combine posts the user has interacted with

    interacted_post_ids = [post[0] for post in query_posts]

    # all_posts = get_all_posts()
    print(interacted_post_ids)

    query_vectors = []
    for post in query_posts:
        post_vector = vectorize_post(post[1], model)
        if post_vector is not None:
            query_vectors.append((post[0], post_vector))

    if not query_vectors:
        return jsonify( [post[0] for post in posts]      )


    max_likes = max(post[2] for post in posts) if posts else 1
    max_views = max(post[3] for post in posts) if posts else 1
    # Find similar posts
    results = []
    for post in posts:
        if post[0] in interacted_post_ids:  # Skip posts the user has already interacted with
            continue
        post_vector = vectorize_post(post[1], model)
        if post_vector is not None:
            max_similarity = max(
                cosine_similarity(query_vec, post_vector) for _, query_vec in query_vectors
            )

            normalized_likes = post[2] / max_likes
            normalized_views = post[3] / max_views

            weight_similarity = max_similarity * 0.7  
            weight_likes = normalized_likes * 0.2      
            weight_views = normalized_views * 0.1      
            final_score = weight_similarity + weight_likes + weight_views
            results.append({'id': post[0], 'text': post[1], 'similarity': max_similarity})

    # Sort results by similarity
    results.sort(key=lambda x: x['similarity'], reverse=True)

    top30 = results[:200];
    ids = []
    for item in top30:
        ids.append(item['id']);

    return jsonify(ids);
    # return jsonify(results[:30])  # Limit to top 30 recommendations

if __name__ == '__main__':
    app.run(port=5000)

