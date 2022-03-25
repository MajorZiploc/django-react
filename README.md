# SIMPLE CRUD WEBSITE WITH DJANGO AND REACT

A template for a basic django and react site

## Requirements

- python v3.9 (python3 and pip3)
- bash v5 or zsh
- nodejs v16+
- yarn (node package manager)
- mac or linux/wsl
- internet connection - even when developing in localhost. A proxy setting in the frontend requires this.

### Requirements Mac only

- iterm2 with rosetta enabled (needed to run ui tests)

### Requirements Windows only

- wsl2 ubuntu

### Requirements Windows 10 WSL only

- XServer - for cypress ui tests which requires a gui to launch
  - requires DISPLAY environment variable set for running gui linux apps. I recommend putting the following into your bashrc or zshrc and relaunching your shell
    - export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2; exit;}'):0.0
  - requires workaround script to be run
    - sudo ./packages/frontend/ui_tests/wsl_workaround.sh

## NOTES

- Running on Windows outside of wsl is not supported
- All commands listed here assume you are running them from the root of the project unless otherwise specified
- concurrently can only run simple bash commands on all os's. You can not source a bash file in one of the commands. scripts in ./scripts/ are workarounds for this
- view the project root level just.bash to see all available commands

## Ensure .env variables are set

- The environment variables need to be set. Use the default values like so:
  > cp .env.example .env; cp .env.bash.example .env.bash

## Just Commands

- All just\_\* commands expect that you have sourced the project root level just.bash while in the root of the project:
  > . ./just.bash

## Demo/First Time Setup (takes care of all steps needed to run the app from begin to end assuming you have taken care of the requirements section)

- run the demo
  > just_demo

## Run the project (start the containers)

> just_run

## Migrate database

> just_migrate_db_backend

## Visit the development site

- Go to http://127.0.0.1:3000/

### Run Tests

### FRONTEND UI TEST SETUP

- View your .env.bash file for the test user information. If you wish to change that information, then you have to re-source your just.bash after changing the information in .env.bash:
  > . ./just.bash

#### FROUNTEND UI TEST CICD SETUP

- cypress ui test environment choices are: [local, dev] and are found in ./packages/frontend/ui_tests/cypress/config
  - When preparing to deploy, you will need to edit the dev.json or even add a prod json and then set the JUST_UI_TESTS_ENV to either dev or prod

### TEST COMMANDS

- Runs backend tests

  > just_test_backend

- Runs frontend tests headless

  > just_test_frontend_headless

- Runs frontend tests headed

  > just_test_frontend_headed

- Runs all tests headlessly (requires the frontend ui test setup mentioned above)
  > just_test

## Things to improve

### For making a small decent site. Look at django-react-postgres-docker-heroku repo

- switch from sqlite to postgres
- Containerize both frontend and backend, add docker-compose
- Add cicd pipeline
- Add hosting

### Plus Ultra

- Improve login/register/auth flow (Rework auth to not show user/pass in api call)
- Add a third party login/register flow
- Improve CORS policies to be more restrictive
- Add logging
- Migrate javascript to typescript
- Look into a way to dev with no internet: frontend proxy setting requires an internet connection even if only using localhost.
