# SIMPLE CRUD APP WITH DJANGO AND REACT
A template for a basic django and react site

## Requirements
- Python v3.9
- bash v5 or zsh
- yarn (node package manager)
- mac or linux (1 extra step for linux)
- gsed (MAC ONLY) (brew install gnu-sed)
- internet connection - even when developing in localhost. A proxy setting in the client requires this.

## NOTES
- All commands listed here assume you are running them from the root of the project unless otherwise specified
- concurrently can only run simple bash commands on all os's. You can not source a bash file in one of the commands. scripts in ./scripts/ are workarounds  for this

## Toggle between Mac and Linux (Mac flavor is default in the repo)
- There are some commands are are different between mac and linux
  - To toggle the just commands to linux use:
  > . ./just.bash; just_to_nonmac
  - To toggle the just commands to mac use:
  > . ./just.bash; just_to_mac

## Demo (takes care of all steps needed to run the app from begin to end assuming you have taken care of the requirements section)
- source the project root just.bash while inside the project root:
> . ./just.bash

- run the demo
> just_demo

## Things to improve
### In scope for an interview style site
- Wire out cypress ui test scripts to root just.bash
- Add ui tests (cypress)

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
