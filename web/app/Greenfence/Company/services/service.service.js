(function() {
	angular.module('company').factory('ServiceService', ['$resource',
		function($resource) {
			return $resource('/api/v1.0/community/services/:id.json',
				{}, {
				'update': { method: 'PUT' },
				'companyServices': { method: 'GET', isArray: true, url :'/api/v1.0/community/services/company_services.json'}
			});
		}
	])
}());