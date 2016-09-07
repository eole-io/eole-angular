var path = require('path');

module.exports = {
    assets: {
        css: [
            path.resolve(__dirname, 'css/tictactoe.css'),
            path.resolve(__dirname, 'css/layout.css')
        ],
        js: [
            path.resolve(__dirname, 'module.js'),
            path.resolve(__dirname, 'routes.js'),
            path.resolve(__dirname, 'controllers/tictactoe.js'),
            path.resolve(__dirname, 'translations/en.js'),
            path.resolve(__dirname, 'translations/fr.js')
        ]
    }
};
