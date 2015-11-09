'use strict';

function WsseTokenGenerator() {
    var that = this;

    /**
     * Generate Wsse token values from user credentials.
     *
     * @param {String} username
     * @param {String} password
     * @param {String} salt
     *
     * @returns {Object}
     */
    this.createWsseTokenValues = function (username, password, salt)
    {
        var nonce = Math.random().toString(36).substr(2);
        var created = new Date().toISOString();
        var secret = that.encodePassword(password, salt);
        var digest = CryptoJS.SHA1(nonce+created+secret).toString(CryptoJS.enc.Base64);

        return {
            username: username,
            nonce: btoa(nonce),
            created: created,
            digest: digest
        };
    };

    /**
     * Generate a Wsse token to add to HTTP request headers.
     *
     * @param {String} username
     * @param {String} password
     * @param {String} salt
     *
     * @returns {String}
     */
    this.createWsseToken = function (username, password, salt)
    {
        var tokenPattern = 'UsernameToken Username="_username_", PasswordDigest="_digest_", Nonce="_nonce_", Created="_created_"';
        var tokenValues = that.createWsseTokenValues(username, password, salt);

        return tokenPattern
            .replace('_username_', tokenValues.username)
            .replace('_digest_', tokenValues.digest)
            .replace('_nonce_', tokenValues.nonce)
            .replace('_created_', tokenValues.created)
        ;
    };

    /**
     * Encode a password as default Symfony algorithm does.
     *
     * @param {String} password
     * @param {String} salt
     *
     * @returns {String}
     */
    this.encodePassword = function (password, salt)
    {
        if (!password) {
            throw new Error('Password must be defined.');
        }

        if (!salt) {
            throw new Error('Salt must be defined.');
        }

        var encoder = new CryptoJsPasswordEncoder('sha512', true, 42);
        return encoder.encodePassword(password, salt);
    };
}
