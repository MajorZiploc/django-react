" localhost 5432 localhost_databases

let $PGHOST="127.0.0.1" |
let $PGPORT="5432" |
let $PGDATABASE="postgres" |
let $PGUSER="postgres" |
let $PGPASSWORD="password"

" DEV dev_databases TODO

let $PGHOST="host" |
let $PGPORT="5432" |
let $PGDATABASE="postgres" |
let $PGUSER="postgres" |
let $PGPASSWORD="password"

" table dump
PGPASSWORD="password" pg_dump -U "username" -d "database" -h "host" -p "port" --schema-only > create_the_tables_db_name.sql

" parse tables/*.csv files for unique table names
rbql --with-header --query "Select distinct a.table_name" --delim ',' --policy quoted_rfc

" parse tables/*.csv files for a table columns
rbql --with-header --query "Select a.* where a.table_name == 'table_name'" --delim ',' --policy quoted_rfc

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
