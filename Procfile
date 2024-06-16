release: cd services/backend/ && python manage.py migrate
web: cd services/backend/ && gunicorn api_crud.wsgi
frontend: cd services/frontend/ && npm run build && npx serve -s build
