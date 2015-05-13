define(['app'], function (app) {

    app.factory('UserDocumentService', ['$resource', 'Environment',
        function ($resource, Environment) {
            var api = Environment.settings.api;

            return $resource(api + '/api/v1.0/community/user_document/:id.json',
                {}, {
                    'update': {method: 'PUT'},
                    'getDocumentTypes': {
                        method: 'GET',
                        isArray: true,
                        url: api + '/api/v1.0/community/document_definitions/definition_types.json'
                    },
                    'documentTypeData': {method: 'GET', url: api + '/api/v1.0/community/document_definitions/:id.json'},
                    'getDocumentFile': {method: 'GET', url: api + '/api/v1.0/community/user_document/get_document_file.json'},
                    'sharingRecordDetail': {
                        method: 'GET',
                        url: api + '/api/v1.0/community/user_document/:id/sharing_record_detail.json'
                    }
                }
            );
        }
    ])
});