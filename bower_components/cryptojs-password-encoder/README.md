# CryptoJsPasswordEncoder
Simple Message Digest Password Encoder with CryptoJS lib

Reproduces [Symfony MessageDigestPasswordEncoder](https://github.com/symfony/security-core/blob/master/Encoder/MessageDigestPasswordEncoder.php)'s
behavior in javscript with [CryptoJs](https://code.google.com/p/crypto-js/) library.


## Installation

Via [Bower](http://bower.io/search/?q=password%20encoder):

```
bower install cryptojs-password-encoder --save
```

And in your html file:

``` html
<script type="text/javascript" src="bower_components/cryptojs-password-encoder/CryptoJsPasswordEncoder.js"></script>
```


## Usage

``` js
var encoder = new CryptoJsPasswordEncoder('sha512', true, 5000);

encoder.encodePassword('pass0', 'salt');
// returns "UcC4fzoeOb94BdO3stpYywrwaTGeZaLhS2ywdso7t2ZHnf3vjmLMyEZ4j7IMpj9ZZdRGjhw9K0Fc1XDhbcL3bQ=="
```
