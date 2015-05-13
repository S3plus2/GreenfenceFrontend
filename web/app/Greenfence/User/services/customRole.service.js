define(['app'], function (app) {

    app.factory('CustomRoleService', ['$resource', 'Environment',
        function ($resource, Environment) {
            var api = Environment.settings.api;

            return $resource(api + '/api/v1.0/community/custom_roles/:id.json',
                {}, {
                    'update': {method: 'PUT'},
                    "permissionList": {method: 'GET', url: api + '/api/v1.0/community/company/company_permission.json'},
                    "usersWithGroup": {method: 'GET', url: api + '/api/v1.0/community/company/roles_with_users.json'},
                    "addRole": {
                        method: 'POST',
                        params: {id: '@id'},
                        url: api + '/api/v1.0/community/custom_roles/:id/add_role.json'
                    },
                    "deleteRole": {
                        method: 'POST',
                        params: {id: '@id'},
                        url: api + '/api/v1.0/community/custom_roles/:id/delete_role.json'
                    }
                }
            );
        }
    ])
});