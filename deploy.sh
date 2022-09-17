#!/usr/bin/env sh

message=""

if ["$1"=""]
then message="New Deployment"
else message=$1
fi

git add -A
git commit -m  $1
git push origin main

npm run deploy
