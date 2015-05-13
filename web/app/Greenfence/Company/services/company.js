(function() {

	angular.module('company').factory('CompanyService', ['$resource', function($resource) {
		return $resource('/api/v1.0/community/company.json',
				{}, {
				'update': { method: 'PUT' },
				'getFeaturedList': { method: 'GET', isArray: true, url: '/api/v1.0/community/company/get_featured_list.json' },
				'getOperationsList': { method: 'GET', isArray: true, url: '/api/v1.0/community/company/get_operations.json' },
				'getProductsList': { method: 'GET', isArray: true, url: '/api/v1.0/community/company/get_products.json' },
				'getEmployeesList': { method: 'GET', isArray: true, url: '/api/v1.0/community/company/get_employees.json' },
				'getServicesList': { method: 'GET', isArray: true, url: '/api/v1.0/community/company/get_services.json' },
				'getDocumentsList': { method: 'GET', isArray: true, url: '/api/v1.0/community/company/get_documents.json' }
			});
	}])

})();