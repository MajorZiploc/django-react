export JUST_PROJECT_ROOT="`pwd`";
export JUST_PROJECT_PACKAGES="${JUST_PROJECT_ROOT}/packages";
. "$JUST_PROJECT_ROOT/.env.bash";
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
  just_venv_connect_backend;
  pip3 install -r "$JUST_PROJECT_ROOT/requirements.txt";
}

function just_format {
  just_format_frontend;
  just_format_backend;
}

function just_build {
  just_build_backend;
  just_build_frontend;
  just_build_frontend_ui_tests;
}

function just_run {
  yarn --cwd "$JUST_PROJECT_ROOT" run start;
}

function just_test {
  just_run;
  just_ensure_test_user;
  just_test_backend;
  just_test_frontend_headless;
}

function just_demo {
  just_install_dev;
  just_initialize_backend;
  just_migrate_db_backend;
  just_build;
  just_run;
}

