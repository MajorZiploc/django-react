export JUST_PROJECT_ROOT="`pwd`";
export JUST_PROJECT_PACKAGES="${JUST_PROJECT_ROOT}/packages";
. "$JUST_PROJECT_ROOT/utils.bash";
. "$JUST_PROJECT_PACKAGES/backend/just.bash" "$JUST_PROJECT_PACKAGES/backend";
. "$JUST_PROJECT_PACKAGES/frontend/just.bash" "$JUST_PROJECT_PACKAGES/frontend";

function just_to_nonmac {
  _just_to_nonmac "$JUST_PROJECT_ROOT";
}

function just_to_mac {
  _just_to_mac "$JUST_PROJECT_ROOT";
}

function just_install_dev {
  yarn install;
  just_venv_create;
  just_venv_connect;
  pip3 install -r "$JUST_PROJECT_ROOT/requirements.txt";
  just_build_frontend_ui_tests;
}

function just_format {
  just_format_backend;
  just_format_frontend;
}

function just_format_all {
  just_format_backend;
  just_format_all_frontend;
}

function just_run {
  docker-compose -f compose-dev.yml up --force-recreate -d;
}

function just_test {
  just_test_backend;
  just_test_frontend_headless;
}

function just_demo {
  just_install_dev;
  just_run;
}

function just_venv_create {
  mkdir -p ~/.venv;
  python3 -m venv "$HOME/.venv/django-react";
}

function just_venv_connect {
  . "$HOME/.venv/django-react/bin/activate";
}

function just_venv_disconnect {
  deactivate;
}

