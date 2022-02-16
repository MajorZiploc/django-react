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

function just_install {
  npm install -g concurrently;
  just_install_client;
  just_install_server;
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
}

function just_run {
  concurrently "$JUST_PROJECT_ROOT/scripts/run_server.sh" "$JUST_PROJECT_ROOT/scripts/run_client.sh";
}

function just_test {
  just_test_server;
  just_test_client_headless;
}

function just_demo {
  just_install;
  just_first_time_initialize_server;
  just_migrate_db_server;
  just_build;
  just_run;
}

