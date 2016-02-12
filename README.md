# Eole AngularJS

Web application where we can play online to board games !

It uses [Eole API](https://github.com/alcalyn/eole-api) as RestAPI.

What Eole aims to be:


## An an user

This application will stay as simple as possible.

You can play online as guest, register with only strictly minimal informations.


## As a developper

Eole architecture allows to be extended so we can plug new games easily.


## Installation

### Steps

 - Clone project

``` bash
git clone git@github.com:alcalyn/eole-angular.git --branch=dev
cd eole-angular
```

 - Install Bower dependencies

``` bash
bower install
```

 - Configuration file

``` bash
cp ng-eole/config.js.dist ng-eole/config.js
```

 - Set your API base url and websocket server, or set `mock` as url to use a mocked api.

``` js
angular.module('eole.config', [])
    .constant('eoleApiUrl', 'http://127.0.0.1/eole-api/www/api.php/')   // API base url
    .constant('webSocketUri', 'ws://127.0.0.1:8080')                    // Websocket server
;
```


## License

This project is under [GPL-v3 License](LICENSE).
