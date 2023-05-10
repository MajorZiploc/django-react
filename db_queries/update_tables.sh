#!/usr/bin/env bash

function main {
  local _command="
SELECT
c.TABLE_NAME
, c.COLUMN_NAME
, c.IS_NULLABLE
, c.DATA_TYPE
, c.CHARACTER_MAXIMUM_LENGTH
, c.NUMERIC_PRECISION
, c.DATETIME_PRECISION
, c.COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS AS c -- WITH(NOLOCK)
-- WHERE
  -- c.TABLE_NAME NOT LIKE '_pg_%'
  -- AND c.TABLE_NAME NOT LIKE 'pg_%'
  -- AND c.TABLE_NAME NOT LIKE 'sql_%'
  -- AND c.TABLE_NAME NOT LIKE 'routine_%'
ORDER BY c.TABLE_NAME, c.COLUMN_NAME
;
  ";
  local padding="---------";
  local begin="BEGIN";
  local end="END";
  export PGHOST="127.0.0.1";
  export PGPORT="5432";
  export PGDATABASE="postgres";
  export PGUSER="postgres";
  export PGPASSWORD="password";
  echo "$padding $begin updating localhost $padding";
  psql -c "$_command" ./src/tables/localhost.csv;
  echo "$padding $end updating localhost $padding";
}

main
