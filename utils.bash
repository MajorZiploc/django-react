# Used to fix just rest calls if on nonmac
function _just_to_nonmac {
  local just_project_root="$1";
  [[ -z "$just_project_root" ]] && { echo "Must specify just_project_root!" >&2; return 1; }
  local files=("${just_project_root}/just.bash" "${just_project_root}/packages/server/just.bash" "${just_project_root}/packages/client/just.bash");
  for file in ${files[@]}; do
    sed -E -i'' 's/\bgsed\b/sed/g' "$file";
  done;
}

# Used to fix just rest calls if on mac
function _just_to_mac {
  local just_project_root="$1";
  [[ -z "$just_project_root" ]] && { echo "Must specify just_project_root!" >&2; return 1; }
  local files=("${just_project_root}/just.bash" "${just_project_root}/packages/server/just.bash" "${just_project_root}/packages/client/just.bash");
  for file in ${files[@]}; do
    gsed -E -i'' 's/\bsed\b/gsed/g' "$file";
  done;
}

