export JUST_PROJECT_ROOT="`pwd`";
export JUST_PROJECT_PACKAGES="${JUST_PROJECT_ROOT}/packages";
. "$JUST_PROJECT_ROOT/utils.bash";
. "$JUST_PROJECT_PACKAGES/server/just.bash" "$JUST_PROJECT_PACKAGES/server";
. "$JUST_PROJECT_PACKAGES/client/just.bash" "$JUST_PROJECT_PACKAGES/client";

function just_to_nonmac {
  _just_to_nonmac "$JUST_PROJECT_ROOT";
}

function just_to_mac {
  _just_to_mac "$JUST_PROJECT_ROOT";
}

function just_install_dev {
  yarn install;
  just_venv_connect_server;
  pip3 install -r "$JUST_PROJECT_ROOT/requirements.txt";
}

function just_format {
  just_format_server;
  just_format_client;
}

function just_format_all {
  just_format_server;
  just_format_all_client;
}

function just_build {
  just_build_server;
  just_build_client;
  just_build_client_ui_tests;
}

function just_run {
  yarn --cwd "$JUST_PROJECT_ROOT" run start;
}

function just_test {
  just_test_server;
  just_test_client_headless;
}

function just_demo {
  just_install_dev;
  just_initialize_server;
  just_migrate_db_server;
  just_build;
  just_run;
}

