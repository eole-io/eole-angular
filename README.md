# Eole AngularJS

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

Web application where we can play online to board games !

It uses [Eole API](https://github.com/eole-io/eole-api) as RestAPI.

More information about Eole itself: [What is Eole ?](http://eole-io.github.io/eole-project/)


## Requirements

 - [Node.js](https://nodejs.org/en/)
 - gulp-cli (install: `npm install --global gulp-cli`)


## Installation

 - Clone project

``` bash
git clone git@github.com:eole-io/eole-angular.git --branch=dev
cd eole-angular
```

 - Install Nodejs dependencies

``` bash
npm install
```

 - Deploy application for development

``` bash
gulp deploy
```

 - Configure your environment

Go `config/environment.js`, set your API base url and websocket server.
By default, environment values try to be generalist, by you should check
whether path, port, hostname... match with your installed version.

_Assuming you have [installed Eole Api](https://github.com/eole-io/eole-api)_ on localhost:

``` js
    angular.module('eole.config', [])
        .constant('eoleApiUrl', '//' + currentHostname + '/eole-api/www/api.php/')  // API base url
        .constant('webSocketUri', 'ws://' + currentHostname + ':443')               // Websocket server
    ;
```

_or if don't want to install Eole Api
and just want to navigate with a mocked api and websocket,
you can set `mock`:_

``` js
    .constant('eoleApiUrl', 'mock')
    .constant('webSocketUri', 'mock')
```


## Testing

Eole Angular uses XO and jslint code checkers. Run it with:

``` bash
npm test
```


## What next ?

 - See [gulp commands](doc/gulp.md)


## License

This project is under [GPL-v3 License](LICENSE).
