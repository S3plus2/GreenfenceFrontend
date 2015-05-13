define(['app'], function (app) {

    app.factory('SharedRecordService', ['$resource', 'Environment',
        function ($resource, Environment) {
            var api = Environment.settings.api;

            return $resource(api + '/api/v1.0/community/shared_record/:id.json',
                {}, {
                    'sharingRecords': {
                        method: 'GET',
                        isArray: true,
                        url: api + '/api/v1.0/community/shared_record/sharing_records.json'
                    },
                    'sharedWithUsers': {
                        method: 'GET',
                        isArray: true,
                        url: api + '/api/v1.0/community/shared_record/shared_with_users.json'
                    },
                    'unshareWithAll': {
                        method: 'GET',
                        isArray: true,
                        url: api + '/api/v1.0/community/shared_record/unshare_with_all.json'
                    }
                }
            )
        }
    ])

});