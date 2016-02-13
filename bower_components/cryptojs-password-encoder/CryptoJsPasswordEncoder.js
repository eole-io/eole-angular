
(function ( root, factory ) {
    if ( typeof exports === 'object' ) {
        // CommonJS
        factory( exports );
    } else if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define( ['exports'], factory);
    } else {
        // Browser globals
        factory(root);
    }
}(this, function ( exports, b ) {

    function CryptoJsPasswordEncoder(algorithm, encodeHashAsBase64, iterations){
        if (!algorithm) {
            algorithm = 'sha512';
        }
        if (!encodeHashAsBase64) {
            encodeHashAsBase64 = true;
        }
        if (!iterations) {
            iterations = 5000;
        }
        this.algorithm = algorithm;
        this.encodeHashAsBase64 = encodeHashAsBase64;
        this.iterations = iterations;
    }
    CryptoJsPasswordEncoder.VERSION = '0.1.1';
    CryptoJsPasswordEncoder.prototype.isPasswordTooLong = function(raw) {
        return raw.length > 4096;
    };
    CryptoJsPasswordEncoder.prototype.mergePasswordAndSalt = function(password, salt) {
        if (!salt) {
          return password;
        }
        if (salt.indexOf('{') > -1 || salt.indexOf('}') > -1) {
          throw 'Cannot use { or } in salt.';
        }
        return password + '{' + salt + '}';
    };
    CryptoJsPasswordEncoder.prototype.encodePassword = function(raw, salt) {
        if (this.isPasswordTooLong(raw)) {
            throw new Error("Invalid password");
        }

        var algorithm = this.algorithm.toUpperCase();
        if (!CryptoJS[algorithm]) {
            throw new Error("'The algorithm "+this.algorithm+" is not supported.'");
        }

        var salted = this.mergePasswordAndSalt(raw, salt);
        var digest = CryptoJS[algorithm](salted);
        for ( var i = 0; i < this.iterations - 1; i++) {
            digest = CryptoJS[algorithm](digest.concat(CryptoJS.enc.Utf8.parse(salted)));
        }

        if (this.encodeHashAsBase64) {
            return digest.toString(CryptoJS.enc.Base64);
        } else {
            return digest;
        }
    };

    exports.CryptoJsPasswordEncoder = CryptoJsPasswordEncoder;
}));