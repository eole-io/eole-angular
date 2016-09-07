var path = require('path');

module.exports = {
    assets: {
        css: [
            path.resolve(__dirname, 'css/awale.css')
        ],
        js: [
            path.resolve(__dirname, 'module.js'),
            path.resolve(__dirname, 'routes.js'),
            path.resolve(__dirname, 'model/seeds.js'),
            path.resolve(__dirname, 'services/grid-manager.js'),
            path.resolve(__dirname, 'services/anim-highlight.js'),
            path.resolve(__dirname, 'controllers/awale.js'),
            path.resolve(__dirname, 'translations/en.js'),
            path.resolve(__dirname, 'translations/fr.js')
        ]
    }
};
