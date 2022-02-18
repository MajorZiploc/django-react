export JUST_BACKEND_ROOT="$1";

function just_format_backend {
  just_venv_connect_backend;
  autopep8 "$JUST_BACKEND_ROOT" && echo "Backend Formatted!" || { echo "Failed to format backend!"; return 1; }
}

function just_test_backend {
  just_venv_connect_backend;
  python3 "$JUST_BACKEND_ROOT/manage.py" test "$JUST_BACKEND_ROOT";
}

