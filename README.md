# SIMPLE CRUD WEBSITE WITH DJANGO AND REACT

A template for a basic django and react site

Site available here: https://majorziploc-react.onrender.com/

## Requirements

- docker v20+
- bash v5 or zsh
- mac or linux/wsl
- internet connection
- python v3.11 (python3 and pip3) (OPTIONAL)
- nodejs v18+ (OPTIONAL)
- npm (node package manager) (OPTIONAL)

### Requirements Mac only

- (OPTIONAL) terminal emulator with rosetta enabled (needed to run ui tests else any terminal emulator is fine)

### Requirements Windows only

- wsl2 ubuntu

### Requirements Windows 10 WSL only

- XServer - for cypress ui tests which requires a gui to launch
  - requires DISPLAY environment variable set for running gui linux apps. I recommend putting the following into your bashrc or zshrc and relaunching your shell
    - export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2; exit;}'):0.0
  - requires workaround script to be run
    - sudo ./services/frontend/ui_tests/wsl_workaround.sh

## NOTES

- All commands listed here assume you are running them from the root of the project unless otherwise specified
- Designed to run fully in docker. Some just\_\* scripts attempt to install dependencies locally. This is just dev quality of life for LSP support locally
- view the project root level just.bash to see all available commands
- Running on Windows outside of wsl is not supported

## Ensure .env variables are set

- The environment variables need to be set. Use the default values like so:
  > cp .example.env .env; cp .example.env.bash .env.bash

## Just Commands

- All just\_\* commands expect that you have sourced the project root level just.bash while in the root of the project:
  > . ./just.bash

### Demo/First Time Setup (takes care of most steps needed to run the app from begin to end assuming you have taken care of the requirements section and have setup environment variables)

- run the demo
  > just_demo

### Run the project (start the containers)

> just_run

### Stop the project (stop the containers)

> just_stop

### Make and Apply database migrations

> just_migrate

#### NOTE: if your migration fails, then your server container will silently stop working. Fix this with:

> just_stop; just_run;

## Visit the development site

- Go to http://127.0.0.1:3000/

### Run Tests

### FRONTEND UI TEST SETUP

- View your .env.bash file for the test user information. If you wish to change that information, then you have to re-source your just.bash after changing the information in .env.bash:
  > . ./just.bash

### TEST COMMANDS

- Runs backend tests

  > just_test_backend

- Runs frontend tests headless

  > just_test_frontend_headless

- Runs frontend tests headed

  > just_test_frontend_headed

- Runs all tests headlessly (requires the frontend ui test setup mentioned above)
  > just_test

## Troubleshooting

- psql: FATAL: role "postgres" does not exist

  you need to setup a postgres user

> $(dirname "`which psql`")/createuser -s postgres

- psql: initdb: error: directory "/var/lib/postgresql/data" exists but is not empty

  your local volume of the db is likely on a different version of psql. you need to delete it to prevent this problem in the future.

> rm -rf /tmp/django-react-postgres-data

## VSCODE DEVELOPMENT NOTES

- Install the following extensions:
  - ms-azuretools.vscode-docker
  - ms-vscode-remote.remote-containers
- Relaunch vscode after installing it and vscode will notice you have a .devcontainer and ask you if you want to reopen in a container. Do so.
  - If the prompt doesnt come up. Then use \<ctrl>+\<shift>+p Remote-Containers: Reopen in Container
- Depending on if you are working on the frontend or backend, you will have to make changes to the .devcontainer content
  - .devcontainer/docker-compose.local.yml
    - Under services, specify the container name you want to develop in. For backend, use backend, for frontend, use frontend. This will override that containers creation process to allow you to develop and debug processes related to the frontend or backend depending on your choice.
  - .devcontainer/devcontainer.json
    - A similar change needs to be made here depending on if you want to work on the frontend or backend. the service needs to reflect the container you wish to work on.
      - Ex: you want to work on frontend so: "service": "frontend"

## Things to improve

### Frontend

#### MUI Theme

add styles to createTheme() so that every component doesnt have to fight the default styles of mui. styles will be managed globally if this is done

#### npm run (start|build) warning

- TypeError: Cannot set property mark of #<Object> which has only a getter

  Likely related to sass dependency

#### Use useLocalStorage hook instead of directly using localStorage

Would be good for added expired timestamps on local storage data

#### Use React Intl for locale

would be nice if frontend had a way to store the api call results in redux

#### Multi submit on spam click can happen

This is true even with the disable button logic when submitting

### Production Flow

#### finish onrender deployment setup

### Minor Changes

- Move Expose ports from Dockerfile's to docker-compose for better management and can use .env flow

### Plus Ultra

- Improve login/register/auth flow (Rework auth to not show user/pass in api call)
- Add third party login/register flow (google, apple, microsoft, facebook)
- Add logging
