export JUST_THIS_ROOT="`pwd`";
cd ../..;
export JUST_PROJECT_ROOT="`pwd`";
. "$JUST_PROJECT_ROOT/.env.bash";
cd ~-;

echo "NOTE: SOURCE THIS FILE WHILE INSIDE THE SAME PATH AS THIS FILE. ELSE YOU WILL HAVE INVALID BEHAVIOR";

function just_rest_get_token {
  local token; token=$(curl 'http://127.0.0.1:8000/api/v1/auth/token' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  --data-raw "{\"username\":\"$JUST_UI_TESTS_USERNAME\",\"password\":\"$JUST_UI_TESTS_PASSWORD\"}" \
  --compressed | jq -r '.access');
  echo "$token";
}

function just_rest_movies_all_post {
  request_body="$(cat ./data/request_bodies/integrations/movies_all/post/1.json)";
  query_params="$(cat ./data/query_params/integrations/movies_all/post/1.txt)";
  local token; token="$(just_rest_get_token)";
  curl "http://127.0.0.1:8000/api/v1/integrations/movies/all${query_params}" \
  -X 'POST' \
  -H 'Accept: application/json' \
  --data-raw "$request_body" \
  -H "Authorization: Bearer ${token}" --compressed | jq | tee movies_all_post.json;
}

