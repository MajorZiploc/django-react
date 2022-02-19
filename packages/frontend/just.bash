export JUST_FRONTEND_ROOT="$1";

export JUST_UI_TESTS_USERNAME="testuserz";
export JUST_UI_TESTS_PASSWORD="@PassTemp10";
export JUST_UI_TESTS_ENV="local";

function just_format_frontend {
  prettier --write .;
}

function just_build_frontend_ui_tests {
  yarn --cwd "$JUST_FRONTEND_ROOT/ui_tests" install;
}

function just_test_frontend_start_ui_test_runner {
  "$JUST_FRONTEND_ROOT/ui_tests/cypress_starter.sh" "$JUST_UI_TESTS_USERNAME" "$JUST_UI_TESTS_PASSWORD" "$JUST_UI_TESTS_ENV" "gui" ;
}

function just_test_frontend_headless {
  "$JUST_FRONTEND_ROOT/ui_tests/cypress_starter.sh" "$JUST_UI_TESTS_USERNAME" "$JUST_UI_TESTS_PASSWORD" "$JUST_UI_TESTS_ENV" "headless" ;
}

function just_test_frontend_headed {
  "$JUST_FRONTEND_ROOT/ui_tests/cypress_starter.sh" "$JUST_UI_TESTS_USERNAME" "$JUST_UI_TESTS_PASSWORD" "$JUST_UI_TESTS_ENV" "headed" ;
}

