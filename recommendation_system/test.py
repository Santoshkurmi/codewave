import re

text = "console.log('Hello world')```js ";
text = re.sub(r'[^\w\s\n]', ' ', text.lower()).split()

print(text)