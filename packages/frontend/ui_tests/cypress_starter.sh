#!/bin/bash

username="$1";
password="$2";
choice_env="$3";
style="$4";

scriptpath="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )";

[[ -z "$username" ]] && {
  echo "Enter Username";
  read username;
}

[[ -z "$password" ]] && {
  echo "Enter Password";
  stty -echo;
  read password;
  stty echo;
}

[[ -z "$choice_env" ]] && {
  isValidEnv=0;
  while [ $isValidEnv -eq 0 ]; do
    echo "Enter environment ($env) - Choices [dev, local]"
    read choice_env
    if test -z "$choice_env"; then
      choice_env=$env;
    fi
    isValidEnv=$(echo $choice_env | perl -0777 -e 'if(<> =~ m/^(dev|local)$/){print 1}else{print 0}');
  done
}

if [ "$style" = "gui" ]; then
  CYPRESS_username=$username CYPRESS_password=$password yarn --cwd "$scriptpath" run cy:open --env configFile=$choice_env;
fi

if [ "$style" = "headed" ]; then
  CYPRESS_username=$username CYPRESS_password=$password yarn --cwd "$scriptpath" run cy:headed --env configFile=$choice_env;
fi

if [ "$style" = "headless" ]; then
  CYPRESS_username=$username CYPRESS_password=$password yarn --cwd "$scriptpath" run cy:headless --env configFile=$choice_env;
fi

