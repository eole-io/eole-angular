angular.module('eoleSecurity', [])
    .factory('passwordEncoder', [function () {
        return new PasswordEncoder();
    }])
    .factory('wsseTokenGenerator', ['passwordEncoder', function (passwordEncoder) {
        return new WsseTokenGenerator(passwordEncoder);
    }])
;
