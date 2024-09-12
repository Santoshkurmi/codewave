import re
from gensim.models import Word2Vec
from numpy import dot
from numpy.linalg import norm
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


def search_similar_posts(query, posts, model):
    query_vector = vectorize_query(query, model)
    if query_vector is None:
        return []

    similarities = []
    for post_id, post in enumerate(posts):
        post_vector = vectorize_post(post, model)
        if post_vector is None:
            continue
        similarity = cosine_similarity(query_vector, post_vector)
        similarities.append((post_id, similarity))

    # Sort posts by similarity in descending order
    similarities.sort(key=lambda x: x[1], reverse=True)
    
    return similarities  # Returns a list of (post_id, similarity) tuples



@app.route('/api/search', methods=['GET'])
def search():
    query = request.args.get('query')

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
    top30 = results[:30];
    ids = []
    for item in top30:
        ids.append(item['id']);
        # if 'similarity' in item:
        #     del item['similarity']

    # print(results);
    # return {'data':ids};
    return ids;
    # return jsonify(ids)



if __name__ == '__main__':
    app.run(port=5000)


