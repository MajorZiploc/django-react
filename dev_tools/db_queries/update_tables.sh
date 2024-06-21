#!/usr/bin/env bash

function main {

  # from my dotfiles: https://github.com/MajorZiploc/dotfiles/blob/master/shared/required/home/.bashrc.d/portable/snippets.bash
  . ~/.bashrc.d/portable/snippets.bash;
  . ../../.env.bash;
  local _command; _command="$(snip_sql_column_view_fn_info "pgsql" "low" "low" "none")";

  local container_name="django-react-db";
  local padding="---------";
  local begin="BEGIN";
  local end="END";
  export PGHOST="127.0.0.1";
  local _env_ext="localhost";
  echo "$padding $begin updating $_env_ext $padding";
  local table_dir="./src/tables";
  mkdir -p "${table_dir}";
  table_cache_output="$(docker exec "$container_name" sh -c "export PGHOST=${PGHOST}; export PGPORT=${PGPORT}; export PGDATABASE=${PGDATABASE}; export PGUSER=${PGUSER}; export PGPASSWORD=${PGPASSWORD}; psql -c \"$_command\" --csv")"
  [ $? -eq 0 ] && { echo "$table_cache_output" > "${table_dir}/$_env_ext.csv"; }
  # psql -c "$_command" --csv --output ./src/tables/$_env_ext.csv;
  echo "$padding $end updating $_env_ext $padding";
}

main
