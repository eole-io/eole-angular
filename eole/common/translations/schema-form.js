(function (angular) {
    'use strict';

    var schemaFormPostProcess = null;

    angular.module('eole.core.translations').config(['schemaFormProvider', function (schemaFormProvider) {
        schemaFormPostProcess = schemaFormProvider.postProcess;
    }]);

    angular.module('eole.core.translations').run(['$translate', function ($translate) {
        schemaFormPostProcess(function (form) {
            angular.forEach(form, function (field) {
                if (field.description) {
                    field.description = $translate.instant(field.description);
                }

                if (field.title) {
                    field.title = $translate.instant(field.title);
                }

                if (field.validationMessage) {
                    angular.forEach(field.validationMessage, function (message, key) {
                        field.validationMessage[key] = $translate.instant(message);
                    });
                }
            });

            return form;
        });
    }]);

})(angular);
