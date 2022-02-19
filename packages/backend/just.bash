export JUST_BACKEND_ROOT="$1";

function just_format_backend {
  just_venv_connect;
  autopep8 "$JUST_BACKEND_ROOT" && echo "Backend Formatted!" || { echo "Failed to format backend!"; return 1; }
}

function just_test_backend {
  docker exec -t django-react-backend-1 python /app/backend/manage.py test
}

