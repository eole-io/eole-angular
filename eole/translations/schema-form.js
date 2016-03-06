var schemaFormPostProcess = null;

ngEole.config(['schemaFormProvider', function (schemaFormProvider) {
    schemaFormPostProcess = schemaFormProvider.postProcess;
}]);

ngEole.run(['$translate', function ($translate) {
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
