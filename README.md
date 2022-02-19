# SIMPLE CRUD WEBSITE WITH DJANGO AND REACT

A template for a basic django and react site

## Requirements

- docker v20+
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

- XServer - for cypress which requires a gui to launch
  - requires DISPLAY environment variable set for running gui linux apps. I recommend putting the following into your bashrc or zshrc and relaunching your shell
    - export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2; exit;}'):0.0
  - requires workaround script to be run
    - sudo ./packages/frontend/ui_tests/wsl_workaround.sh

## NOTES

- Running on Windows outside of wsl is not supported
- All commands listed here assume you are running them from the root of the project unless otherwise specified
- view the root level just.bash to see all available commands

## Ensure .env variables are set

- The environment variables need to be set. Use the default values like so:
> cp .env.example .env

## Just Commands

- All just\_\* commands expect that you have sourced the root level just.bash while in the root of the project:
  > . ./just.bash

## Demo/First Time Setup (takes care of all steps needed to run the app from begin to end assuming you have taken care of the requirements section)

- run the demo
  > just_demo

## Run the project (start the containers)

> just_run

## Stop the project (stop the containers)

> just_stop

## Run Tests

### FRONTEND UI TEST NOTES

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

- Runs backend tests

  > just_test_backend

- Runs frontend tests headless

  > just_test_frontend_headless

- Runs frontend tests headed

  > just_test_frontend_headed

- Runs all tests headlessly (requires the frontend ui test setup mentioned above)
  > just_test

## Things to improve

### For making a small decent site

- Learn about presistencing data for postgres in a container
- Use webpack on react site so that env variables can be accessed in react code
- Add cicd pipeline
- Add hosting

### Plus Ultra

- Improve login/register/auth flow (Rework auth to not show user/pass in api call)
- Add a third party login/register flow
- Add logging
- Migrate javascript to typescript
- Look into a way to dev with no internet: frontend proxy setting requires an internet connection even if only using localhost.
