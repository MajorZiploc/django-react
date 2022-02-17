export JUST_BACKEND_ROOT="$1";

function just_venv_create_backend {
  mkdir -p ~/.venv;
  python3 -m venv "$HOME/.venv/django-react";
}

function just_venv_install_pip_deps_backend {
  pip3 install wheel; pip3 install -r "$JUST_BACKEND_ROOT/requirements.txt";
}

function just_venv_connect_backend {
  . "$HOME/.venv/django-react/bin/activate";
}

function just_venv_disconnect_backend {
  deactivate;
}

function just_initialize_backend {
  just_venv_create_backend;
  just_venv_connect_backend;
  just_venv_install_pip_deps_backend;
}

function just_format_backend {
  just_venv_connect_backend;
  autopep8 "$JUST_BACKEND_ROOT" && echo "Backend Formatted!" || { echo "Failed to format backend!"; return 1; }
}

function just_build_backend {
  just_venv_connect_backend;
  just_venv_install_pip_deps_backend;
}

function just_run_backend {
  just_venv_connect_backend;
  python3 "$JUST_BACKEND_ROOT/manage.py" runserver;
}

function just_test_backend {
  just_venv_connect_backend;
  python3 "$JUST_BACKEND_ROOT/manage.py" test "$JUST_BACKEND_ROOT";
}

function just_migrate_db_backend {
  python3 "$JUST_BACKEND_ROOT/manage.py" migrate;
}

