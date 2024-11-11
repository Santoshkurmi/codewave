# CodeWave: A platform for coding and sharing.

This project is created using react, laravel and python.



![helo](/assets/2.png)



#### This is a project I have done for my college course in Bsc. CSIT

The goal of the project is to create a platform to help coders share their ideas and problems in a modern way. It may looks like facebook somewhat but its main purpose is like stackoverflow and other coding platform. 

# Screenshots and video

![helo](/assets/0.png)
![helo](/assets/1.png)
![helo](/assets/3.png)
![helo](/assets/4.png)
![helo](/assets/5.png)
![helo](/assets/6.png)
![helo](/assets/7.png)
![helo](/assets/8.png)
![helo](/assets/9.png)


Video link
https://youtu.be/icG9_qXU0_w


<iframe width="560" height="315" src="https://youtu.be/icG9_qXU0_w
" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


# Things that are working

- User registration and login
- Post creation
- Realtime messaging capablity
- Code, syntax highlighting, image support in post and chats
- Running simple code directly (js,python )
- Reply with answers and comments
- Vote (up,down) of posts
- Views counter of posts
- User profile to change profile and bio
- Post recommendation system using word2vec
- Many more demonstrated in the video

There are lot of things that are implemented. It tooks me about 1 month to complete this project having above functionality.

# Recommendation System
- Post feed posts are recommended by the algorithm using word2vec and similar algorithm
- Also searching, and similar post recommendation are also governed by the recommendation system.

The script for recommendation system is found in the recommendation_system folder


# Technology Used:
- React for frontend
- Code highlighting, writing, markdown support using monaco code editor, react markdown
- Backend using laravel
- Recommendation using flask, and machine learning library of python



# Installation 

1. Clone the repository of the latest

2. There is backend and fronted.

3. Open vscode in root directory of the cloned one.

4. Open terminal

5. type this command in root directory

```bash
npm install

```

6. Go to frontend folder in terminal using
```bash
cd frontend
```

7. Run following command
```bash
npm install
```

8. Go back from frontend to backend using 
```bash
cd ..
```

9. Go to backend
```bash
cd backend
```

10. Run command
```bash
composer install
```


11. Run this command to update database, make sure mysql xampp is started
```bash
php artisan migrate
```

12. Run this for stroage for accessing imags

```bash
php artisan storage:link
```

13. Go back to root directory
```bash
cd ..
```

14. Run this command
```bash
npm run dev
```

15. If everything is correct, it will start frontend,backend and socket for messagin. Check for errors in the terminal running above command.
