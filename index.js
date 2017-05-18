var eole = {
    assets: {
        css: [
            'bower_components/bootswatch-dist/css/bootstrap.css',
            'eole/chat/css/chat.css',
            'eole/common/css/all.css'
        ],
        files: [
            ['bower_components/bootswatch-dist/fonts/*.*', 'fonts/']
        ],
        js: [
            'bower_components/cryptojslib/rollups/sha1.js',
            'bower_components/cryptojslib/rollups/sha512.js',
            'bower_components/cryptojslib/components/enc-base64-min.js',
            'bower_components/cryptojs-password-encoder/CryptoJsPasswordEncoder.js',
            'bower_components/autobahn-old/autobahn.min.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-locker/dist/angular-locker.js',
            'bower_components/angular-translate/angular-translate.js',
            'bower_components/angular-sanitize/angular-sanitize.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-bootstrap/ui-bootstrap.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'bower_components/tv4/tv4.js',
            'bower_components/objectpath/lib/ObjectPath.js',
            'bower_components/angular-schema-form/dist/schema-form.js',
            'bower_components/angular-schema-form/dist/bootstrap-decorator.js',

            'eole_components/relative-path/relative-path.js',
            'eole_components/eole-api-client/eole-api-client.js',
            'eole_components/eole-api-client/eole-api-client-mock.js',
            'eole_components/eole-api-client/ng-module.js',
            'eole_components/eole-websocket-client/eole-websocket-client.js',
            'eole_components/eole-websocket-client/eole-websocket-client-mock.js',
            'eole_components/eole-websocket-client/ng-module.js',

            'config/environment.js',

            'eole/module.js',
            'eole/common/config/html5-mode.js',
            'eole/common/config/locker.js',
            'eole/common/service/party-manager.js',
            'eole/common/service/eole-session.js',
            'eole/common/service/websocket.js',
            'eole/common/translations/module.js',
            'eole/common/translations/config.js',
            'eole/common/translations/schema-form.js',
            'eole/common/translations/en.js',
            'eole/common/translations/fr.js',
            'eole/menu/module.js',
            'eole/menu/controllers/menu.js',
            'eole/home/module.js',
            'eole/home/routes.js',
            'eole/home/controllers/home.js',
            'eole/player/module.js',
            'eole/player/routes.js',
            'eole/player/controllers/login.js',
            'eole/player/controllers/profile.js',
            'eole/player/controllers/register.js',
            'eole/game/module.js',
            'eole/game/routes.js',
            'eole/game/controllers/game.js',
            'eole/game/controllers/games.js',
            'eole/default-game/module.js',
            'eole/default-game/routes.js',
            'eole/default-game/controllers/party.js',
            'eole/chat/module.js',
            'eole/chat/routes.js',
            'eole/chat/controllers/chat.js'
        ]
    }
};

eole.plugins = require('./config/plugins.js');

eole.getAllAssets = function () {
    var assets = eole.assets;

    for (var pluginName in eole.plugins) {
        if (Object.hasOwnProperty.call(eole.plugins, pluginName)) {
            var pluginAssets = eole.plugins[pluginName].assets;

            if (pluginAssets.css) {
                assets.css = assets.css.concat(pluginAssets.css);
            }

            if (pluginAssets.js) {
                assets.js = assets.js.concat(pluginAssets.js);
            }

            if (pluginAssets.files) {
                assets.files = assets.files.concat(pluginAssets.files);
            }
        }
    }

    return assets;
};

module.exports = eole;
