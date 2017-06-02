var path = require('path');

module.exports = {
    assets: {
        css: [
        ],
        templates: [
            'views/*.html'
        ],
        js: [
            path.resolve(__dirname, 'module.js'),
            path.resolve(__dirname, 'routes.js'),
            path.resolve(__dirname, 'controllers/party.js'),
            path.resolve(__dirname, 'translations/en.js'),
            path.resolve(__dirname, 'translations/fr.js')
        ],
        files: [
        ]
    }
};
