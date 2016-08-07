# Gulp commands

 - `gulp assets`

**To be called on new js/css file added.**
Dump dev assets.
Instead of adding your js/css file in index.html,
add it in index.assets.js, then run the command.

 - `gulp deploy`

**To be called when project freshly cloned for dev.**
Create environment file from dist,
create index.html from dist,
dump dev assets.

 - `gulp deploy-prod`

**To be called when project freshly cloned for prod.**
Create environment file from dist,
create index.html from dist,
dump minified/concatened assets.
