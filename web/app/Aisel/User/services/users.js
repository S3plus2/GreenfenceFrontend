define(['app'], function (app) {

	app.factory('UserService', ['$resource',
		function($resource) {
			return $resource('/api/v1.0/community/user.json',
				{}, {
				'update': { method: 'PUT' },
				'img_upload': {method: 'PUT', url: '/api/v1.0/community/user/img_upload.json' },
				'userCompanyInfo': { method: 'GET', url: '/api/v1.0/community/user/user_company_info.json' },
				'get_permissions': { method: 'GET', isArray: false, url: '/api/v1.0/community/user/get_user_permission.json' },
				'get_company_users': { method: 'GET', isArray: true, url : '/api/v1.0/community/user/get_company_users' },
				'update_permissions': { method: 'POST', url: '/api/v1.0/community/user/update_permissions' },
				'getAllTags': { method: 'GET', isArray: true, url: '/api/v1.0/community/user/get_all_tags' },
				'gatAllUsers': { method: 'GET', isArray: true, url: '/api/v1.0/community/user/get_all_users' },
				'get_accreditations' : {method: 'GET', isArray: true, url: '/api/v1.0/community/user/get_accreditations'},
				'get_schemes' : {method: 'GET', isArray: true, url: '/api/v1.0/community/user/get_schemes'}
			})
		}
	])

});