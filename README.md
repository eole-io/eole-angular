# Eole AngularJS

Web application where we can play online to board games !

It uses [Eole API](https://github.com/eole-io/eole-api) as RestAPI.

More information about Eole itself: [What is Eole ?](http://eole-io.github.io/eole-project/)


## Installation

 - Clone project

``` bash
git clone git@github.com:alcalyn/eole-angular.git --branch=dev
cd eole-angular
```

 - Install Bower dependencies

``` bash
bower install
```

 - Create configuration file from dist

``` bash
cp eole/config.js.dist eole/config.js
```

 - In `eole/config.js`, set your API base url and websocket server:, or set `mock` as url to use a mocked api.

``` js
angular.module('eole.config', [])
    .constant('eoleApiUrl', 'http://127.0.0.1/eole-api/www/api.php/')   // API base url
    .constant('webSocketUri', 'ws://127.0.0.1:8080')                    // Websocket server
;
```

_or you can set `mock` to just navigate with a mocked api and websocket:_

``` js
    .constant('eoleApiUrl', 'mock')
    .constant('webSocketUri', 'mock')
```


## License

This project is under [GPL-v3 License](LICENSE).
