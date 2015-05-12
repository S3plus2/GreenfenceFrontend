(function() {
	angular.module('users').factory('CustomRoleService', ['$resource',
		function($resource) {
			return $resource('/api/v1.0/community/custom_roles/:id.json',
				{}, {
				  'update': { method: 'PUT' },
				  "permissionList":{ method: 'GET', url:'/api/v1.0/community/company/company_permission.json'},
				  "usersWithGroup":{method: 'GET' ,url: '/api/v1.0/community/company/roles_with_users.json'},
				  "addRole":{method: 'POST' ,params: {id:  '@id'}, url: '/api/v1.0/community/custom_roles/:id/add_role.json'},
				  "deleteRole":{method: 'POST' ,params: {id:  '@id'}, url: '/api/v1.0/community/custom_roles/:id/delete_role.json'}
				}
			);
		}
	])
}());