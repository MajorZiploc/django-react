# SIMPLE CRUD WEBSITE WITH DJANGO AND REACT
A template for a basic django and react site

## Requirements
- Python v3.9 (python3 and pip3)
- bash v5 or zsh
- nodejs v16+
- yarn (node package manager)
- mac or linux/wsl (1 extra step for linux/wsl)
- internet connection - even when developing in localhost. A proxy setting in the client requires this.

### Requirements Mac only
- gsed (brew install gnu-sed)
- iterm2 with rosetta enabled (needed to run ui tests)

### Requirements Windows only
- wsl2 ubuntu

### Requirements Windows 10 WSL only
- XServer - for cypress which requires a gui to launch
  - requires DISPLAY environment variable set for running gui linux apps. I recommend putting the following into your bashrc or zshrc and relaunching your shell
    - export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2; exit;}'):0.0
  - requires workaround script to be run
    - sudo ./packages/client/ui_tests/wsl_workaround.sh

## NOTES
- Running on Windows outside of wsl is not supported
- All commands listed here assume you are running them from the root of the project unless otherwise specified
- concurrently can only run simple bash commands on all os's. You can not source a bash file in one of the commands. scripts in ./scripts/ are workarounds  for this
- view the root level just.bash to see all available commands

## Toggle between Mac and Linux (Mac flavor is default in the repo)
- There are some commands are are different between mac and linux
  - To toggle the just commands to linux use:
  > . ./just.bash; just_to_nonmac
  - To toggle the just commands to mac use:
  > . ./just.bash; just_to_mac

## Demo/First Time Setup (takes care of all steps needed to run the app from begin to end assuming you have taken care of the requirements section)
- source the project root just.bash while inside the project root:
> . ./just.bash

- run the demo
> just_demo

## Run the project
- source the project root just.bash while inside the project root:
> . ./just.bash

> just_run

## Run Tests

### CLIENT UI TEST NOTES
- Requires that you have the project running
> just_run
- Requires that you have a test user and password set in the following environment variables (these are the default values)
```
export JUST_UI_TESTS_USERNAME="testuserz";
export JUST_UI_TESTS_PASSWORD="@PassTemp10";
export JUST_UI_TESTS_ENV="local";
```
- To create a the test user, you need to run the website and register the user.
> just_run

### TEST COMMANDS
- source the project root just.bash while inside the project root:
> . ./just.bash

- Runs server tests
> just_test_server

- Runs client tests headless
> just_test_client_headless

- Runs client tests headed
> just_test_client_headed

- Runs all tests headlessly (requires the client ui test setup mentioned above)
> just_test

## Things to improve

### For making a small decent site. Look at django-react-postgres-docker-heroku repo
- switch from sqlite to postgres
- Containerize both client and server, add docker-compose
- Add cicd pipeline
- Add hosting

### Plus Ultra
- Improve login/register/auth flow (Rework auth to not show user/pass in api call)
- Add a third party login/register flow
- Improve CORS policies to be more restrictive
- Add logging
- Migrate javascript to typescript
- Look into a way to dev with no internet: client proxy setting requires an internet connection even if only using localhost.
