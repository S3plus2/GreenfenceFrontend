define(['app'], function (app) {

    app.factory('UserFolderService', ['$resource', 'Environment',
        function ($resource, Environment) {
            var api = Environment.settings.api;

            return $resource(api + '/api/v1.0/community/user_folder/:id.json',
                {}, {}
            )
        }
    ])

});