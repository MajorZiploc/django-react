" localhost 5432 localhost_databases

let $PGHOST="127.0.0.1" |
let $PGPORT="5432" |
let $PGDATABASE="postgres" |
let $PGUSER="postgres" |
let $PGPASSWORD="password" |

let container_name="django-react-db" |
let use_env_vars_in_container="true"
" ^^^ OR run locally in the container


" DEV dev_databases TODO

let $PGHOST="host" |
let $PGPORT="5432" |
let $PGDATABASE="postgres" |
let $PGUSER="postgres" |
let $PGPASSWORD="password"

" table dump
PGPASSWORD="password" pg_dump -U "username" -d "database" -h "host" -p "port" --schema-only > create_the_tables_db_name.sql

"find db that you want to replace the above PGDATABASE values with

psql -c "\l"
" or copy this and pipe to psql

\l

" to get table/column info of a database use:

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
WHERE
  c.TABLE_NAME NOT LIKE '_pg_%'
  AND c.TABLE_NAME NOT LIKE 'pg_%'
  AND c.TABLE_NAME NOT LIKE 'sql_%'
  AND c.TABLE_NAME NOT LIKE 'routine_%'
ORDER BY c.TABLE_NAME, c.COLUMN_NAME
;

" localhost localhost_databases
postgres

" DEV dev_databases TODO
