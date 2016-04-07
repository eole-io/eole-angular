(function (window, document) {
    'use strict';

    /**
     * Get path relative to current script directory.
     * Won't work if called in callbacks.
     *
     * Exemple:
     *      var path = relativePath('/../file.html');
     *      console.log(path); // Outputs "http://example.org/path/to/script/../file.html"
     *
     * @param {String} path (optional) Must start with a slash.
     *
     * @returns {String}
     *
     * @throws {Error} If cannot retrieve current script path (i.e when called in a callback).
     */
    window.relativePath = function (path) {
        if (!document.currentScript) {
            throw 'RelativePath: Impossible to get current script path. Is it called in a callback ?';
        }

        var scriptPath = document.currentScript.src;
        var scriptDir = scriptPath.substr(0, scriptPath.lastIndexOf('/'));

        if (!path) {
            return scriptDir;
        }

        return scriptDir + path;
    };

})(window, document);
