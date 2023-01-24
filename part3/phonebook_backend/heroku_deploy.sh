#!/usr/bin/env bash

# Use this script to copy files to a temporary directory/Git repo for deployment to Heroku.

# while getopts "d:" arg; do
#   case $arg in
#     d) export dir=$OPTARG;;
#   esac
# done

# if [ -z $dir ]; then
#     export dir=.../heroku/phonebook;
# fi

echo "Copying to and deploying from .../heroku/phonebook"

cd ../..
mkdir -p heroku/phonebook
cd part3/phonebook_backend
cp index.js ../../heroku/phonebook/index.js
cp package.json ../../heroku/phonebook/package.json
cp package-lock.json ../../heroku/phonebook/package-lock.json
cp -r models ../../heroku/phonebook/models
cp morgan.js ../../heroku/phonebook/morgan.js
cp Procfile ../../heroku/phonebook/Procfile