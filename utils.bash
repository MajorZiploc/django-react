# Used to fix just rest calls if on nonmac
function _just_to_nonmac {
  local just_project_root="$1";
  [[ -z "$just_project_root" ]] && { echo "Must specify just_project_root!" >&2; return 1; }
  local files=("${just_project_root}/just.bash" "${just_project_root}/packages/server/just.bash" "${just_project_root}/packages/frontend/just.bash");
  for file in ${files[@]}; do
    sed -E -i'' 's/\bgsed\b/sed/g;s/(find )-E (\S+ )(-mindepth \S+ )?(-maxdepth \S+ )?(-type \S+ )?/\1\2\3\4\5-regextype egrep /g;' "$file";
  done;
}

# Used to fix just rest calls if on mac
function _just_to_mac {
  local just_project_root="$1";
  [[ -z "$just_project_root" ]] && { echo "Must specify just_project_root!" >&2; return 1; }
  local files=("${just_project_root}/just.bash" "${just_project_root}/packages/server/just.bash" "${just_project_root}/packages/frontend/just.bash");
  for file in ${files[@]}; do
    gsed -E -i'' 's/\bsed\b/gsed/g;s/find(.*?) -regextype egrep/find -E\1/g;' "$file";
  done;
}

