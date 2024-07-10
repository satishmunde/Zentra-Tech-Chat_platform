# Zentra-Tech-Chat_platform


there are two folder this this project 

1) chat_platform => this folder will contain all the backend logic 
2) chat_platform_frontend => this folder will contain all the frontend login 

to setup this project clone this project 

install redis_channel 
            Steps : 
                    sudo apt install redis-server  --this command will redis server on machine
                    sudo systemctl start redis -- this commad will start the redis server on machine 
                    sudo systemctl enable redis -- this command will enable the redis server on machine

                    


then first start the backend 

            Steps :
                    navigate in chat_platform Directory

                    - run command in both terminals"pipenv shell"  this command will activate the virtual enviornment
                    - in first terminal run command "python manage.py makemigrations" or "python3 manage.py makemigrations"
                    - in first terminal run command "python manage.py migrate" or "python3 manage.py migrate"
                    - in first terminal run command "python manage.py runserver" or "python3 manage.py makemigrations runserver"
                      
                      now your python django server will get started 
                      
                      next step is  now open second terminal run command in both terminals"pipenv shell"  this command will activate the virtual enviornment
                      
                      now in this terminal run command "daphne -p 8001 chat_platform.asgi:application" this command will start your daphane server 
                      that will help us to commucate will channel or websocket for realtime messagging
                      
                      your backend server started on :  'http://127.0.0.1:8000/' when you hit this url you will get api documentation
                  
          
          
now start the frontend 
    
        Steps:
                navigate into chat_platform_frontend 
                open terminal  and run command "npm install"
                then run command "npm run dev"
                
                
                your frontend server started on : "http://localhost:5173/"
                
                
Now You are ready to Test The Project
This project not required requirement.txt Because this project include virtual enviornment that already include every essentail dependency
                
