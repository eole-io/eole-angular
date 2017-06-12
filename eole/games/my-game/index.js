var path = require('path');

module.exports = {
    assets: {
        templates: [
            'views/*.html'
        ],
        css: [
            path.resolve(__dirname, 'css/*.css')
        ],
        files: [
        ],
        js: [
            path.resolve(__dirname, 'module.js'),
            path.resolve(__dirname, 'routes.js'),
            path.resolve(__dirname, 'controllers/*.js'),
            path.resolve(__dirname, 'translations/*.js')
        ]
    }
};
