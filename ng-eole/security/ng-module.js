angular.module('eoleSecurity', [])
    .factory('passwordEncoder', [function () {
        return new PasswordEncoder();
    }])
    .factory('wsseTokenGenerator', [function () {
        return new WsseTokenGenerator();
    }])
;
