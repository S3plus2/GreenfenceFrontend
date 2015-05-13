define(['app'], function (app) {

    app.factory('InvitationService', ['$resource', 'Environment',
        function ($resource, Environment) {
            var api = Environment.settings.api;

            return $resource(api + '/api/v1.0/community/user.json',
                {}, {
                    'invite': {
                        method: 'POST',
                        params: {name: '@name', email: '@email', invitation_type: '@type'},
                        url: api + '/api/v1.0/community/user/invite_users.json'
                    }
                })
        }
    ])

});