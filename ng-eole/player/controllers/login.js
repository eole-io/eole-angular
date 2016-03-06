(function (angular) {
    'use strict';

    angular.module('eole.core.player').controller('LoginController', ['$scope', '$location', 'eoleSession', '$timeout', function ($scope, $location, eoleSession, $timeout) {
        $scope.eoleSession = eoleSession;

        $scope.schema = {
            type: 'object',
            properties: {
                pseudo: {
                    type: 'string',
                    title: 'pseudo',
                    description: 'your.pseudo'
                },
                password: {
                    type: 'string',
                    title: 'password',
                    description: 'your.password',
                    'x-schema-form': {
                        type: 'password'
                    }
                }
            }
        };

        var isNotEmpty = function (value) {
            if (!angular.isString(value)) {
                return false;
            }

            return value.length > 0;
        };

        $scope.form = [
            {
                key: 'pseudo',
                validationMessage: {
                    notEmpty: 'please.enter.pseudo'
                },
                $validators: {
                    notEmpty: isNotEmpty
                }
            },
            {
                key: 'password',
                validationMessage: {
                    notEmpty: 'please.enter.password'
                },
                $validators: {
                    notEmpty: isNotEmpty
                }
            },
            {
                type: 'submit',
                title: 'login'
            }
        ];

        var login = $scope.login = {
            pseudo: null,
            password: null
        };

        $scope.onSubmit = function (loginForm)
        {
            $scope.$broadcast('schemaFormValidate');

            if (loginForm.$valid) {
                eoleSession.login(login.pseudo, login.password).then(function (player) {
                    $location.path('/player/profile');
                });
            }
        };
    }]);


})(angular);
