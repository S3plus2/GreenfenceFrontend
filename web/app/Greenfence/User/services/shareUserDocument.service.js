define(['app'], function (app) {

    app.factory('ShareUserDocumentService', ['$resource', 'Environment',
        function ($resource, Environment) {
            var api = Environment.settings.api;

            return $resource(api + '/api/v1.0/community/user_document/:id.json',
                {}, {
                    'shareDocument': {method: 'POST', url: api + '/api/v1.0/community/user_document/share_document.json'}
                }
            )
        }
    ])

});