#!/bin/bash

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
