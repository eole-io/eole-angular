#!/bin/bash
# This deploy script gives a deploy process example.
# It should not be taken as a general script which work everywhere.

branch=dev

if [ -n "$1" ]; then
    branch=$1;
fi

echo "Deploying branch $branch"

echo "Delete current installation"

rm -fr eole-{api,angular}

echo "Cloning branch $branch"

git clone git@github.com:alcalyn/eole-api.git --branch=$branch
git clone git@github.com:alcalyn/eole-angular.git --branch=$branch

echo "Install api dependencies"

cd eole-api
composer update
cd ..

echo "Copy api configuration files"

cp eole-api/config/environment.yml.dist eole-api/config/environment.yml
cp eole-api/config/environment_test.yml.dist eole-api/config/environment_test.yml

echo "Update database schema"

cd eole-api
php bin/console-test orm:schema-tool:update --force
php bin/console orm:schema-tool:update --force
cd ..

echo "Check psr2 and unit tests"

cd eole-api
vendor/bin/phpcs --standard=./phpcs.xml src/
vendor/bin/phpunit -c .
cd ..

echo "Install bower dependencies"

cd eole-angular
bower install
cd ..

echo "Copy front configuration files"

cp eole-angular/ng-eole/config.js.dist eole-angular/ng-eole/config.js

echo "Minify and combine assets"

cd eole-angular
mkdir -p assets
# JS
minify $(cat index.html | sed -ne 's/^ \+<script type=".\+" src="\(.*\)"><\/script> *$/\1/p' | tr '\n' ' ') > assets/all.min.js
cat index.html | grep -v 'type="text/javascript"' > index.html.tmp
rm index.html
mv index.html.tmp index.html
sed 's/.*<\/body>.*/        <script type="text\/javascript" src="assets\/all.min.js"><\/script>\n&/' index.html > index.html.tmp
rm index.html
mv index.html.tmp index.html
# CSS
minify $(cat index.html | sed -ne 's/^ \+<link rel=".\+" href="\(.*\)"> *$/\1/p' | tr '\n' ' ') > assets/all.min.css
cat index.html | grep -v 'rel="stylesheet"' > index.html.tmp
rm index.html
mv index.html.tmp index.html
sed 's/.*<title>.*/&\n        <link rel="stylesheet" href="assets\/all.min.css">/' index.html > index.html.tmp
rm index.html
mv index.html.tmp index.html
cd ..

echo "Launch react server"

cd eole-api
php bin/react-server
# Last command is blocking
