export _JUST_THIS_ROOT="$1";

function just_build {
  npm run --cwd "$_JUST_THIS_ROOT" build;
}
