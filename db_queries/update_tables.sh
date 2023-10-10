#!/usr/bin/env bash

function main {
  local _command="
SELECT
c.TABLE_NAME
, c.COLUMN_NAME
, c.DATA_TYPE
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
, concat('zzz CONSTRAINT: ', tc.CONSTRAINT_NAME) as COLUMN_NAME
, tc.CONSTRAINT_TYPE as DATA_TYPE
, '' as IS_NULLABLE
, 0 as CHARACTER_MAXIMUM_LENGTH
, 0 as NUMERIC_PRECISION
, 0 as DATETIME_PRECISION
, '' as COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS AS tc -- WITH(NOLOCK)
WHERE tc.CONSTRAINT_TYPE ILIKE '%KEY%'
ORDER BY TABLE_NAME, COLUMN_NAME
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
