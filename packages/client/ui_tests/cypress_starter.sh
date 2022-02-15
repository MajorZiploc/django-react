#!/bin/bash

echo "Enter Username"
read username

echo "Enter Password"
stty -echo
read password
stty echo

choiceEnv=""
isValidEnv=0
while [ $isValidEnv -eq 0 ]; do
  echo "Enter environment ($env) - Choices [dev, local]"
  read choiceEnv
  if test -z "$choiceEnv"; then
    choiceEnv=$env
  fi
  isValidEnv=$(echo $choiceEnv | perl -0777 -e 'if(<> =~ m/^(dev|local)$/){print 1}else{print 0}')
done

if [ "$1" = "gui" ]; then
  CYPRESS_username=$username CYPRESS_password=$password yarn run cy:open --env configFile=$choiceEnv
fi

if [ "$1" = "headed" ]; then
  CYPRESS_username=$username CYPRESS_password=$password yarn run cy:headed --env configFile=$choiceEnv
fi

if [ "$1" = "headless" ]; then
  CYPRESS_username=$username CYPRESS_password=$password yarn run cy:headless --env configFile=$choiceEnv
fi
