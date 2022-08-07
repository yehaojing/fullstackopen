#!/usr/bin/env bash

# Use this script to copy files to a temporary directory/Git repo for deployment to Heroku.

while getopts "d:" arg; do
  case $arg in
    d) export dir=$OPTARG;;
  esac
done

if [ -z $dir ]; then
    export dir=/tmp/heroku_temp;
fi

echo "Copying to and deploying from $dir"

mkdir $dir
cp index.js $dir/index.js
cp package.json $dir/package.json
cp package-lock.json $dir/package-lock.json
cp Procfile $dir/Procfile

cd $dir
git init
git add .
git commit -m "initial commit"
heroku create
git push heroku master