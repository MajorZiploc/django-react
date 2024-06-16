NOTE: would be similar to just use heroku for the server and netlify for the frontend

TODO:
figure out how to serve react and django separately heroku
https://chatgpt.com/share/781002fc-2c1b-4df7-b9ba-9fbce7a357d0
react: https://dev.to/mrcflorian/how-to-deploy-a-react-app-to-heroku-44ig


https://stackoverflow.com/questions/69605603/what-should-go-in-my-procfile-for-a-django-application
  an answer:
  You will need 3 files in order to successfully deploy a django app to Heroku.

Procfile
runtime.txt
requirements.txt
Those 2 modules should be in your requirements.txt

Gunicorn
Psycopg2-binary
In Procfile, type

release: python manage.py migrate
web: gunicorn yourprojectname.wsgi
The first line explains the type of the deploy release which means a production release, followed by migrate which I supposed you know what will do.

The second line explains that Gunicorn is the Python WSGI HTTP Server for UNIX

In runtime.txt type your python version like this

python-3.9.6

You can see which python version you have with this terminal command python --version

And finally you will need requirements.txt, you can generate it with pip freeze > requirements.txt while venv is activated in case you are operating from virtual environment.
Project Launch Steps, the easiest way:

Deactivate your venv in case there is any
Go to heroku dashboard
Create an app and chose a meaningful name and free plan which will allows you to run 1 worker for free
copy its url: herokuappname.herokuapp.com then in settings.py, paste it in ALLOWED_HOSTS = ['herokuappname.herokuapp.com']
Set DEBUG = False, debug shouldn't be allowed in production environment
Then in your terminal navigate to project folder and type the following commands one by one
Heroku login # to login to your Heroku account
heroku git:remote -a yourAppname # to connect to your already created app
git init # Initialize your repo
git add . # add all project's files to the initialized repo
git commit -m "first push" # commit
git push heroku master # push project files to the remote Heroku app repo
After successful deploy, type - enter

heroku logout # to logout
Which storage are you going to use?

Because Heroku does not host static files.

You can use Azure storage for free. Full tutorial here
Here's a project model of mine deployed to Heroku with azure storage, you will find all needed details.
