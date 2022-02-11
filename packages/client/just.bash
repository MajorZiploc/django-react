export JUST_CLIENT_ROOT="$1";

function just_format_client {
  changed_files=(`{ git --no-pager status | egrep "[[:blank:]]+(modified|new file):[[:blank:]]+[^[:blank:]]+" | gsed -E "s/.*?(modified|new file):[[:blank:]]+([^[:blank:]]+)/\2/g"; git --no-pager status | egrep "[[:blank:]]+(renamed):[[:blank:]]+[^[:blank:]]+" | gsed -E "s/.*?(renamed):[[:blank:]]+[^[:blank:]]+ -> ([^[:blank:]])/\2/g"; } | egrep "\.(jsx?|tsx?|json|html)$"`);
  prettier --write "${changed_files[@]}";
}

function just_format_all_client {
  all_files=(`find -E "$JUST_CLIENT_ROOT" -type f -iregex ".*\.(jsx?|json|tsx?|html)$" -not -path "*/node_modules/*"`);
  prettier --write "${all_files[@]}";
}

function just_install_client {
  npm install -g prettier
}

function just_build_client {
  yarn --cwd "$JUST_CLIENT_ROOT" install;
}

function just_run_client {
  yarn --cwd "$JUST_CLIENT_ROOT" start;
}


