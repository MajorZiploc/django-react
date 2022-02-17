export JUST_FRONTEND_ROOT="$1";

export JUST_UI_TESTS_USERNAME="testuserz";
export JUST_UI_TESTS_PASSWORD="@PassTemp10";
export JUST_UI_TESTS_ENV="local";

function just_format_frontend {
  changed_files=(`{ git --no-pager status | egrep "[[:blank:]]+(modified|new file):[[:blank:]]+[^[:blank:]]+" | gsed -E "s/.*?(modified|new file):[[:blank:]]+([^[:blank:]]+)/\2/g"; git --no-pager status | egrep "[[:blank:]]+(renamed):[[:blank:]]+[^[:blank:]]+" | gsed -E "s/.*?(renamed):[[:blank:]]+[^[:blank:]]+ -> ([^[:blank:]])/\2/g"; } | egrep "\.(jsx?|tsx?|json|html)$"`);
  prettier --write "${changed_files[@]}";
}

function just_format_all_frontend {
  all_files=(`find -E "$JUST_FRONTEND_ROOT" -type f -iregex ".*\.(jsx?|json|tsx?|html)$" -not -path "*/node_modules/*"`);
  prettier --write "${all_files[@]}";
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
  "$JUST_FRONTEND_ROOT/ui_tests/cypress_starter.sh" "$JUST_UI_TESTS_USERNAME" "$JUST_UI_TESTS_PASSWORD" "$JUST_UI_TESTS_ENV" "gui" ;
}

function just_test_frontend_headless {
  "$JUST_FRONTEND_ROOT/ui_tests/cypress_starter.sh" "$JUST_UI_TESTS_USERNAME" "$JUST_UI_TESTS_PASSWORD" "$JUST_UI_TESTS_ENV" "headless" ;
}

function just_test_frontend_headed {
  "$JUST_FRONTEND_ROOT/ui_tests/cypress_starter.sh" "$JUST_UI_TESTS_USERNAME" "$JUST_UI_TESTS_PASSWORD" "$JUST_UI_TESTS_ENV" "headed" ;
}

