# parse tables/*.csv files for unique table names
rbql --with-header --query "Select distinct a.table_name" --delim ',' --policy quoted_rfc

# parse tables/*.csv files for a table column_info
rbql --with-header --query "Select a.* where a.table_name == 'table_name'" --delim ',' --policy quoted_rfc

# parse tables/*.csv files for a table entry_name
rbql --with-header --query "Select a.entry_name where a.table_name == 'table_name'" --delim ',' --policy quoted_rfc

# remove constraint info
rbql --with-header --query "Select a.* where not a.entry_type != 'constraint'" --delim ',' --policy quoted_rfc

# only constraint info
rbql --with-header --query "Select a.* where a.entry_type == 'constraint'" --delim ',' --policy quoted_rfc
