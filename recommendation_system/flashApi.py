# app.py
from flask import Flask, request, jsonify
from gensim.models import Word2Vec
import numpy as np
from flask_mysqldb import MySQL
from numpy import dot
from numpy.linalg import norm

app = Flask(__name__)



# Configure MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'codewave'
mysql = MySQL(app)

# Load or train your Word2Vec model

last_training_date = None;

def loadModel():
    model = Word2Vec.load('my_training.model')




def cosine_similarity(v1, v2):
    return dot(v1, v2) / (norm(v1) * norm(v2))

@app.route('/search', methods=['POST'])
def search():
    query = request.json.get('query')
    query_vector = get_vector(query)
    if query_vector is None:
        return jsonify({'error': 'Query vector could not be computed'}), 400

    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT id, text FROM posts")
    posts = cursor.fetchall()
    cursor.close()
    conn.close()

    results = []
    for post_id, post_text in posts:
        post_vector = get_vector(post_text)
        if post_vector is not None:
            similarity = cosine_similarity(query_vector, post_vector)
            results.append({'id': post_id, 'text': post_text, 'similarity': similarity})

    results.sort(key=lambda x: x['similarity'], reverse=True)
    return jsonify(results)

if __name__ == '__main__':
    app.run(port=5000)
