#!/usr/bin/env bash

function main {

  local _command="
SELECT
c.TABLE_NAME
, c.COLUMN_NAME as ENTRY_NAME
, c.DATA_TYPE
, 'column' as ENTRY_TYPE
, c.IS_NULLABLE
, c.CHARACTER_MAXIMUM_LENGTH
, c.NUMERIC_PRECISION
, c.DATETIME_PRECISION
, c.COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS AS c -- WITH(NOLOCK)
WHERE
  c.TABLE_NAME NOT ILIKE '_pg_%'
  AND c.TABLE_NAME NOT ILIKE 'pg_%'
  -- AND c.TABLE_NAME NOT ILIKE 'sql_%'
  -- AND c.TABLE_NAME NOT ILIKE 'routine_%'
UNION
SELECT tc.TABLE_NAME
, tc.CONSTRAINT_NAME as ENTRY_NAME
, tc.CONSTRAINT_TYPE as DATA_TYPE
, 'constraint' as ENTRY_TYPE
, '' as IS_NULLABLE
, 0 as CHARACTER_MAXIMUM_LENGTH
, 0 as NUMERIC_PRECISION
, 0 as DATETIME_PRECISION
, '' as COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS AS tc -- WITH(NOLOCK)
WHERE tc.CONSTRAINT_TYPE ILIKE '%KEY%'
  AND tc.TABLE_NAME NOT ILIKE '_pg_%'
  AND tc.TABLE_NAME NOT ILIKE 'pg_%'
  -- AND tc.TABLE_NAME NOT ILIKE 'sql_%'
  -- AND tc.TABLE_NAME NOT ILIKE 'routine_%'
ORDER BY TABLE_NAME, ENTRY_TYPE, ENTRY_NAME
;
";

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
  docker exec "$container_name" psql -c "$_command" --csv > "${table_dir}/localhost.csv";
  # psql -c "$_command" --csv --output ./src/tables/localhost.csv;
  echo "$padding $end updating localhost $padding";
}

main
