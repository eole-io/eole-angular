angular.module('eoleSecurity', [])
    .factory('wsseTokenGenerator', [function () {
        return new WsseTokenGenerator();
    }])
;
