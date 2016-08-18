/* global angular */

(function (angular) {
    'use strict';

    angular.module('eole.core.player').controller('RegisterController', ['$scope', '$location', 'eoleSession', function ($scope, $location, eoleSession) {
        $scope.schema = {
            type: 'object',
            properties: {
                pseudo: {
                    type: 'string',
                    title: 'pseudo',
                    description: 'your.pseudo'
                },
                password: {
                    'type': 'string',
                    'title': 'password',
                    'description': 'your.password',
                    'x-schema-form': {
                        type: 'password'
                    }
                },
                passwordRepeat: {
                    'type': 'string',
                    'title': 'password.repeat',
                    'description': 'your.password.repeat',
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
                key: 'passwordRepeat',
                validationMessage: {
                    notEmpty: 'please.enter.password.repeat',
                    passwordsAreEquals: 'passwords.not.equals'
                },
                $validators: {
                    notEmpty: isNotEmpty,
                    passwordsAreEquals: function () {
                        return true;
                    }
                }
            },
            {
                type: 'submit',
                title: 'register'
            }
        ];

        var register = $scope.register = {
            pseudo: null,
            password: null,
            passwordRepeat: null
        };

        $scope.onSubmit = function (registerForm) {
            $scope.$broadcast('schemaFormValidate');

            if (registerForm.$valid) {
                eoleSession.register(register.pseudo, register.password).then(function () {
                    $location.path('/player/profile');
                });
            }
        };
    }]);
})(angular);
