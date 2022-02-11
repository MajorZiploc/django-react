export JUST_SERVER_ROOT="$1";

function just_venv_create_server {
  mkdir ~/.venv;
  python3 -m venv "$HOME/.venv/django-react";
}

function just_install_server {
  pip3 install autopep8; pip3 install httpie;
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

function just_first_time_initialize_server {
  just_venv_create_server;
  just_venv_connect_server;
  just_venv_install_pip_deps_server;
  just_install_server;
}

function just_format_server {
  autopep8 "$JUST_SERVER_ROOT" && echo "Projected Formated!" || { echo "Failed to format project!"; return 1; }
}

function just_build_server {
  just_venv_connect_server;
  just_venv_install_pip_deps_server;
}

function just_run_server {
  just_venv_connect_server;
  python3 "$JUST_SERVER_ROOT/manage.py" runserver;
}

function just_migrate_db_server {
  python3 "$JUST_SERVER_ROOT/manage.py" migrate;
}

