export JUST_PROJECT_ROOT="`pwd`";
export JUST_PROJECT_PACKAGES="${JUST_PROJECT_ROOT}/services";
export JUST_FRONTEND_ROOT="$JUST_PROJECT_PACKAGES/frontend";
export JUST_UI_TESTS_ROOT="$JUST_FRONTEND_ROOT/ui_tests";
export JUST_BACKEND_ROOT="$JUST_PROJECT_PACKAGES/backend";
. "$JUST_PROJECT_ROOT/.env.bash";

echo "NOTE: SOURCE THIS FILE WHILE INSIDE THE SAME PATH AS THIS FILE. ELSE YOU WILL HAVE INVALID BEHAVIOR";

function just_install {
  cd "$JUST_PROJECT_ROOT";
  npm install;
  just_venv_create;
  just_venv_connect;
  cat "$JUST_PROJECT_ROOT/requirements.txt" | grep -Ev "(^#|^\s*$)" | xargs -n 1 pip3 install;
  just_build_frontend;
  just_build_backend;
  just_build_frontend_ui_tests;
  cd ~-;
}

function just_setup_postgres_volume {
  mkdir -p "$PGDBLOCAL";
  cp -a "$JUST_PROJECT_ROOT/container_configs/pgdb/." "$PGDBLOCAL";
}

function just_format {
  just_format_frontend;
  just_format_backend;
}

function just_run {
  cd "$JUST_PROJECT_ROOT";
  # just_setup_postgres_volume;
  docker-compose -f docker-compose.yml -f docker-compose.local.yml up -d;
  cd ~-;
}

function just_stop {
  cd "$JUST_PROJECT_ROOT";
  docker-compose -f docker-compose.yml -f docker-compose.local.yml down;
  cd ~-;
}

function just_test {
  just_run;
  just_test_backend;
  just_test_frontend_headless;
}

function just_demo {
  just_install;
  just_run;
}

function just_venv_create {
  cd "$JUST_PROJECT_ROOT";
  python3 -m venv "$JUST_PROJECT_ROOT/.venv";
  cd ~-;
}

function just_venv_connect {
  cd "$JUST_PROJECT_ROOT";
  . "$JUST_PROJECT_ROOT/.venv/bin/activate";
  cd ~-;
}

function just_venv_disconnect {
  deactivate;
}

function just_format_backend {
  just_venv_connect;
  cd "$JUST_PROJECT_ROOT";
  autopep8 "$JUST_BACKEND_ROOT" && echo "Backend Formatted!" || { echo "Failed to format backend!"; return 1; }
  cd ~-;
}

function just_test_backend {
  just_run;
  docker exec -t django-react-backend python /workspace/app/manage.py test
}

function just_ensure_test_user {
  just_venv_connect;
  echo "Ensuring test user exists (BAD REQUEST CAN MEAN THAT THE USER EXISTS ALREADY)"
  http POST "$JUST_PUBLIC_URL:$JUST_PUBLIC_BACKEND_PORT/api/v1/auth/register/" email="$JUST_UI_TESTS_EMAIL" username="$JUST_UI_TESTS_USERNAME" password="$JUST_UI_TESTS_PASSWORD" password2="$JUST_UI_TESTS_PASSWORD" first_name="$JUST_UI_TESTS_FIRST_NAME" last_name="$JUST_UI_TESTS_LAST_NAME";
}

function just_migrate {
  docker exec -t django-react-backend python /workspace/app/manage.py makemigrations;
  docker exec -t django-react-backend python /workspace/app/manage.py migrate;
}

function just_format_frontend {
  prettier --write "$JUST_PROJECT_ROOT";
}

function just_build_frontend_ui_tests {
  cd "$JUST_FRONTEND_ROOT/ui_tests";
  npm install;
  cd ~-;
}

function just_build_frontend {
  cd "$JUST_FRONTEND_ROOT";
  npm install;
  cd ~-;
}

function just_build_backend {
  cat "$JUST_BACKEND_ROOT/requirements.txt" | grep -Ev "(^#|^\s*$)" | xargs -n 1 pip3 install;
}

function just_test_frontend_start_ui_test_runner {
  just_run;
  just_ensure_test_user;
  cd "$JUST_UI_TESTS_ROOT";
  npm run cy:open;
  cd ~-;
}

function just_test_frontend_headless {
  just_run;
  just_ensure_test_user;
  cd "$JUST_UI_TESTS_ROOT";
  npm run cy:headless;
  cd ~-;
}

function just_test_frontend_headed {
  just_run;
  just_ensure_test_user;
  cd "$JUST_UI_TESTS_ROOT";
  npm run cy:headed;
  cd ~-;
}

function just_backend_debug_shell {
  local container_name="django-react-backend";
  docker exec -i -t "$container_name" python manage.py debug_shell;
}

function just_clean {
  local target="${1}";
  target="${target:-"$JUST_PROJECT_ROOT"}";
  cd "$target";
  rm -rf "${target}/node_modules" "${target}/.venv" "${target}/services/frontend/node_modules" "${target}/services/frontend/ui_tests/node_modules" "${target}/tags";
  find "${target}/services/backend" -type d -iname "__pycache__" -exec rm -rf "{}" \;
  if [[ -n "$1" ]]; then
    git remote remove origin;
  fi
}

function just_zip {
  if [[ -n "${JUST_PROJECT_ROOT}" ]]; then
    local target="$HOME/Downloads/django-react";
    local target_zip="$target.zip";
    rm -rf "$target";
    rm -rf "$target_zip";
    cp -r "${JUST_PROJECT_ROOT}" "$target";
    cd "$target";
    just_clean "$target";
    cd ~/Downloads;
    zip -r "$target_zip" ./django-react;
    cd "$JUST_PROJECT_ROOT";
  fi
}

