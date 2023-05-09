# parse tables/*.csv files for unique table names
rbql --with-header --query "Select distinct a.table_name" --delim ',' --policy quoted_rfc

# parse tables/*.csv files for a table columns
rbql --with-header --query "Select a.* where a.table_name == 'table_name'" --delim ',' --policy quoted_rfc

