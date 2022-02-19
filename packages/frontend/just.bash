export JUST_FRONTEND_ROOT="$1";

function just_format_frontend {
  prettier --write "$JUST_PROJECT_ROOT";
}

function just_build_frontend {
  yarn --cwd "$JUST_FRONTEND_ROOT" install;
}

function just_build_frontend_ui_tests {
  yarn --cwd "$JUST_FRONTEND_ROOT/ui_tests" install;
}

function just_run_frontend {
  yarn --cwd "$JUST_FRONTEND_ROOT" start;
}

function just_test_frontend_start_ui_test_runner {
  just_run;
  just_ensure_test_user;
  "$JUST_FRONTEND_ROOT/ui_tests/cypress_starter.sh" "$JUST_UI_TESTS_USERNAME" "$JUST_UI_TESTS_PASSWORD" "$JUST_UI_TESTS_ENV" "gui" ;
}

function just_test_frontend_headless {
  just_run;
  just_ensure_test_user;
  "$JUST_FRONTEND_ROOT/ui_tests/cypress_starter.sh" "$JUST_UI_TESTS_USERNAME" "$JUST_UI_TESTS_PASSWORD" "$JUST_UI_TESTS_ENV" "headless" ;
}

function just_test_frontend_headed {
  just_run;
  just_ensure_test_user;
  "$JUST_FRONTEND_ROOT/ui_tests/cypress_starter.sh" "$JUST_UI_TESTS_USERNAME" "$JUST_UI_TESTS_PASSWORD" "$JUST_UI_TESTS_ENV" "headed" ;
}

