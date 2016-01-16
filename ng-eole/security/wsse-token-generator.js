'use strict';

/**
 * @param {PasswordEncoder} passwordEncoder
 */
function WsseTokenGenerator(passwordEncoder) {
    var that = this;

    /**
     * Generate Wsse token values from user credentials.
     *
     * @param {String} username
     * @param {String} password
     * @param {String} password_salt
     *
     * @returns {Object}
     */
    this.createWsseTokenValues = function (username, password, password_salt)
    {
        var nonce = Math.random().toString(36).substr(2);
        var created = new Date().toISOString();
        var secret = passwordEncoder.encodePassword(password, password_salt);
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
     * @param {String} password_salt
     *
     * @returns {String}
     */
    this.createWsseToken = function (username, password, password_salt)
    {
        var tokenPattern = 'UsernameToken Username="_username_", PasswordDigest="_digest_", Nonce="_nonce_", Created="_created_"';
        var tokenValues = that.createWsseTokenValues(username, password, password_salt);

        return tokenPattern
            .replace('_username_', tokenValues.username)
            .replace('_digest_', tokenValues.digest)
            .replace('_nonce_', tokenValues.nonce)
            .replace('_created_', tokenValues.created)
        ;
    };
}
