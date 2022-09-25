#!/usr/bin/env sh

message=""

if ["$1"=""]
then message="New Deployment"
else message=$*
fi

git add .
git commit -m "${message}"
git push origin main

npm run deploy

echo "커밋 메시지 [ ${message} ]"
