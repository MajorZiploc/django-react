#!/usr/bin/env bash

function main {

  local warn="WARNING: ";

  local fn_def=", r.ROUTINE_DEFINITION AS DATA_TYPE -- use if you want to see the function definitions - can be large"
  fn_def=", '' AS DATA_TYPE -- use if you want to minify this query";
  local function_sub_query="
UNION
SELECT
lower(r.ROUTINE_TYPE) AS ENTRY_TYPE
, 'zzz' AS TABLE_NAME -- zzz to push function to the end of the sort
, r.SPECIFIC_NAME AS ENTRY_NAME
${fn_def}
, '' as IS_NULLABLE
, 0 as CHARACTER_MAXIMUM_LENGTH
, 0 as NUMERIC_PRECISION
, 0 as DATETIME_PRECISION
, '' as COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.ROUTINES AS r -- WITH(NOLOCK)
FULL OUTER JOIN INFORMATION_SCHEMA.PARAMETERS AS p -- WITH(NOLOCK)
  ON p.SPECIFIC_NAME = r.SPECIFIC_NAME
WHERE
  r.ROUTINE_TYPE IS NOT NULL
  ";
  # comment this out to see function part of query
  function_sub_query="";
  [[ -z "$function_sub_query" ]] && { echo "${warn}function_sub_query not included"; }
  [[ -n "$function_sub_query" && "$fn_def" == ", '' AS DATA_TYPE -- use if you want to minify this query" ]] && { echo "${warn}fn_def not included"; }

  local view_def=", v.VIEW_DEFINITION AS DATA_TYPE -- use if you want to see the view definitions - can be large"
  view_def=", '' AS DATA_TYPE -- use if you want to minify this query";
  local view_sub_query="
UNION
SELECT
'view' AS ENTRY_TYPE
, v.TABLE_NAME
, '' AS ENTRY_NAME
${view_def}
, '' as IS_NULLABLE
, 0 as CHARACTER_MAXIMUM_LENGTH
, 0 as NUMERIC_PRECISION
, 0 as DATETIME_PRECISION
, '' as COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.VIEWS AS v -- WITH(NOLOCK)
WHERE
  v.TABLE_NAME NOT ILIKE '_pg_%'
  AND v.TABLE_NAME NOT ILIKE 'pg_%'
  -- AND v.TABLE_NAME NOT ILIKE 'sql_%'
  -- AND v.TABLE_NAME NOT ILIKE 'routine_%'
"
  # comment this out to see view part of query
  # view_sub_query="";
  [[ -z "$view_sub_query" ]] && { echo "${warn}view_sub_query not included"; }
  [[ -n "$view_sub_query" && "$view_def" == ", '' AS DATA_TYPE -- use if you want to minify this query" ]] && { echo "${warn}view_def not included"; }

  local _command="
SELECT
'column' as ENTRY_TYPE
, c.TABLE_NAME
, c.COLUMN_NAME as ENTRY_NAME
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
SELECT
'constraint' as ENTRY_TYPE
, tc.TABLE_NAME
, tc.CONSTRAINT_NAME as ENTRY_NAME
, tc.CONSTRAINT_TYPE as DATA_TYPE
, '' as IS_NULLABLE
, 0 as CHARACTER_MAXIMUM_LENGTH
, 0 as NUMERIC_PRECISION
, 0 as DATETIME_PRECISION
, kcu.COLUMN_NAME as COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS AS tc -- WITH(NOLOCK)
LEFT JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE AS kcu ON tc.constraint_name = kcu.constraint_name
WHERE tc.CONSTRAINT_TYPE ILIKE '%KEY%'
  AND tc.TABLE_NAME NOT ILIKE '_pg_%'
  AND tc.TABLE_NAME NOT ILIKE 'pg_%'
  -- AND tc.TABLE_NAME NOT ILIKE 'sql_%'
  -- AND tc.TABLE_NAME NOT ILIKE 'routine_%'
${function_sub_query}
${view_sub_query}
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
  mkdir -p "${table_dir}";
  docker exec "$container_name" psql -c "$_command" --csv > "${table_dir}/localhost.csv";
  # psql -c "$_command" --csv --output ./src/tables/localhost.csv;
  echo "$padding $end updating localhost $padding";
}

main
