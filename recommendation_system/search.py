from gensim.models import KeyedVectors

# Path to the pre-trained Word2Vec model (Google News)
model_path = 'google_w2v.bin'

# Load the pre-trained Word2Vec model (in binary format)
model = KeyedVectors.load_word2vec_format(model_path, binary=True)

while True:
    text = input("Enter the text to searc:")
    similar_words = model.most_similar(text, topn=10)
    print(similar_words)
