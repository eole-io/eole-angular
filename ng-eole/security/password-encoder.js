'use strict';

function PasswordEncoder() {
    /**
     * Encode a password as Eole API algorithm does.
     *
     * @param {String} password
     * @param {String} password_salt
     *
     * @returns {String}
     */
    this.encodePassword = function (password, password_salt)
    {
        if (!password) {
            throw new Error('Password must be defined.');
        }

        if (!password_salt) {
            throw new Error('Salt must be defined.');
        }

        var encoder = new CryptoJsPasswordEncoder('sha512', true, 42);

        return encoder.encodePassword(password, password_salt);
    };
}
