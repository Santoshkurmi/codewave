import numpy as np
from gensim.models import Word2Vec
from gensim.utils import simple_preprocess
from numpy import dot
from numpy.linalg import norm

# Sample posts
posts = [
    "I love coding in Python",
    "JavaScript is great for building web applications",
    "Python and machine learning are a for powerful combination",
    "PHP great is widely used for server-side programming",
    "React is a popular JavaScript library for building user interfaces"
]

# Preprocess text (tokenize and lower case)
def preprocess(text):
    return simple_preprocess(text)

# Train the Word2Vec model
def train_word2vec_model(posts):
    processed_posts = [preprocess(post) for post in posts]
    model = Word2Vec(sentences=processed_posts, vector_size=100, window=5, min_count=1, workers=4,sg=0)
    return model

# Get vector representation for a post
def get_post_vector(post, model):
    words = [word for word in preprocess(post) if word in model.wv]
    if not words:
        return None
    return np.mean(model.wv[words], axis=0)

# Get vector representation for a query
def get_query_vector(query, model):
    words = [word for word in preprocess(query) if word in model.wv]
    if not words:
        return None
    return np.mean(model.wv[words], axis=0)

# Calculate cosine similarity
def cosine_similarity(v1, v2):
    return dot(v1, v2) / (norm(v1) * norm(v2))

# Search similar posts based on query
def search_similar_posts(query, post_vectors, model):
    query_vector = get_query_vector(query, model)
    if query_vector is None:
        return []

    similarities = []
    for i, post_vector in enumerate(post_vectors):
        if post_vector is not None:
            similarity = cosine_similarity(query_vector, post_vector)
            similarities.append((i, similarity))

    # Sort posts by similarity in descending order
    similarities.sort(key=lambda x: x[1], reverse=True)

    return similarities

# Main execution
if __name__ == "__main__":
    # Train the model
    model = train_word2vec_model(posts)
    post_vectors = [get_post_vector(post, model) for post in posts]
    print(post_vectors)

    # Search query
    while True:
        query = input("Enter your query: ");
        similar_posts = search_similar_posts(query, post_vectors, model)
        
        # Display results
        for post_id, similarity in similar_posts:
            print(f"Post ID: {post_id}, Similarity: {similarity:.4f}, Post: {posts[post_id]}")
