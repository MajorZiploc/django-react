export JUST_PROJECT_ROOT="`pwd`";
export JUST_PROJECT_PACKAGES="${JUST_PROJECT_ROOT}/packages";
export JUST_FRONTEND_ROOT="$JUST_PROJECT_PACKAGES/backend";
export JUST_BACKEND_ROOT="$JUST_PROJECT_PACKAGES/frontend";
. "$JUST_PROJECT_ROOT/.env.bash";

function just_install_dev {
  yarn install;
  just_venv_create;
  just_venv_connect;
  pip3 install -r "$JUST_PROJECT_ROOT/requirements.txt";
  just_build_frontend_ui_tests;
}

function just_format {
  just_format_frontend;
  just_format_backend;
}

function just_run {
  docker-compose -f compose-dev.yml up -d;
}

function just_stop {
  docker-compose -f compose-dev.yml down;
}

function just_test {
  just_run;
  just_ensure_test_user;
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

function just_format_backend {
  just_venv_connect;
  autopep8 "$JUST_BACKEND_ROOT" && echo "Backend Formatted!" || { echo "Failed to format backend!"; return 1; }
}

function just_test_backend {
  just_run;
  docker exec -t django-react-backend-1 python /workspace/app/manage.py test
}

function just_ensure_test_user {
  just_venv_connect;
  echo "Ensuring test user exists (BAD REQUEST CAN MEAN THAT THE USER EXISTS ALREADY)"
  http POST "$JUST_PUBLIC_URL:$JUST_PUBLIC_BACKEND_PORT/api/v1/auth/register/" email="$JUST_UI_TESTS_EMAIL" username="$JUST_UI_TESTS_USERNAME" password="$JUST_UI_TESTS_PASSWORD" password2="$JUST_UI_TESTS_PASSWORD" first_name="$JUST_UI_TESTS_FIRST_NAME" last_name="$JUST_UI_TESTS_LAST_NAME";
}

function just_format_frontend {
  prettier --write "$JUST_PROJECT_ROOT";
}

function just_build_frontend_ui_tests {
  yarn --cwd "$JUST_FRONTEND_ROOT/ui_tests" install;
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

