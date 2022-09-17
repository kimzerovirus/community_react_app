#!/usr/bin/env sh

message=""

if ["$1"=""]
then message="New Deployment"
else message=$*
fi

git add -A
git commit -m message
git push origin main

npm run deploy
