export JUST_THIS_ROOT="`pwd`";
cd ../..;
export JUST_PROJECT_ROOT="`pwd`";
. "$JUST_PROJECT_ROOT/.env.bash";
cd ~-;

echo "NOTE: SOURCE THIS FILE WHILE INSIDE THE SAME PATH AS THIS FILE. ELSE YOU WILL HAVE INVALID BEHAVIOR";

function just_rest_url_encode {
  echo "$1" | sed -E 's/%/%25/g; s/ /%20/g; s/!/%21/g; s/"/%22/g; s/#/%23/g; s/\$/%24/g; s/'"'"'/%27/g; s/\(/%28/g; s/\)/%29/g; s/\*/%2A/g; s/\+/%2B/g; s/,/%2C/g; s/\//%2F/g; s/:/%3A/g; s/;/%3B/g; s/\?/%3F/g; s/@/%40/g; s/\[/%5B/g; s/\\/%5C/g; s/\]/%5D/g; s/\^/%5E/g; s/_/%5F/g; s/`/%60/g; s/\{/%7B/g; s/\|/%7C/g; s/\}/%7D/g; s/~/%7E/g';
  # Removed patterns:
  # s/=/%3D/g; s/\&/%26/g;
}

function just_rest_get_token {
  cd "$JUST_THIS_ROOT";
  local token; token=$(curl 'http://127.0.0.1:8000/api/v1/auth/token' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  --data-raw "{\"username\":\"$JUST_UI_TESTS_USERNAME\",\"password\":\"$JUST_UI_TESTS_PASSWORD\"}" \
  --compressed | jq -r '.access');
  echo "$token";
  cd ~-;
}

function just_rest_movies_all_post {
  cd "$JUST_THIS_ROOT";
  request_body="$(cat ./data/request_bodies/integrations/movies_all/post/1.json)";
  query_params="$(cat ./data/query_params/integrations/movies_all/post/1.txt)";
  query_params="?$(just_rest_url_encode "$query_params")";
  local token; token="$(just_rest_get_token)";
  local response; response="$(curl "http://127.0.0.1:8000/api/v1/integrations/movies/all${query_params}" \
  -X 'POST' \
  -H 'Accept: application/json' \
  --data-raw "$request_body" \
  -H "Authorization: Bearer ${token}" --compressed)";
  echo "$response" | jq > movies_all_post.json;
  echo "$response" | jq;
  cd ~-;
}

