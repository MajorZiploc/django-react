export JUST_SERVER_ROOT="$1";

function just_venv_create_server {
  mkdir -p ~/.venv;
  python3 -m venv "$HOME/.venv/django-react";
}

function just_venv_install_pip_deps_server {
  pip3 install wheel; pip3 install -r "$JUST_SERVER_ROOT/requirements.txt";
}

function just_venv_connect_server {
  . "$HOME/.venv/django-react/bin/activate";
}

function just_venv_disconnect_server {
  deactivate;
}

function just_initialize_server {
  just_venv_create_server;
  just_venv_connect_server;
  just_venv_install_pip_deps_server;
}

function just_format_server {
  just_venv_connect_server;
  autopep8 "$JUST_SERVER_ROOT" && echo "Server Formatted!" || { echo "Failed to format server!"; return 1; }
}

function just_build_server {
  just_venv_connect_server;
  just_venv_install_pip_deps_server;
}

function just_run_server {
  just_venv_connect_server;
  python3 "$JUST_SERVER_ROOT/manage.py" runserver;
}

function just_test_server {
  just_venv_connect_server;
  python3 "$JUST_SERVER_ROOT/manage.py" test "$JUST_SERVER_ROOT";
}

function just_migrate_db_server {
  python3 "$JUST_SERVER_ROOT/manage.py" migrate;
}

