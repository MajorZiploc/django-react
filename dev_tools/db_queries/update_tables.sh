#!/usr/bin/env bash

function main {

  # from my dotfiles: https://github.com/MajorZiploc/dotfiles/blob/master/shared/required/home/.bashrc.d/portable/snippets.bash
  . ~/.bashrc.d/portable/snippets.bash;
  local _command; _command="$(snip_sql_column_view_fn_info "pgsql" "low" "low" "none")";

  local container_name="django-react-db";
  local padding="---------";
  local begin="BEGIN";
  local end="END";
  export PGHOST="127.0.0.1";
  export PGPORT="5432";
  export PGDATABASE="postgres";
  export PGUSER="postgres";
  export PGPASSWORD="password";
  echo "$padding $begin updating localhost $padding";
  local table_dir="./src/tables";
  mkdir -p "${table_dir}";
  docker exec "$container_name" psql -c "$_command" --csv > "${table_dir}/localhost.csv";
  # psql -c "$_command" --csv --output ./src/tables/localhost.csv;
  echo "$padding $end updating localhost $padding";
}

main
