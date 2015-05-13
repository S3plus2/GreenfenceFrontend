(function() {

	angular.module('company').factory('OperationService', ['$resource',
		function($resource) {
			return $resource('/api/v1.0/community/operations/:id.json',
				{}, {
				'update': { method: 'PUT' },			
				'getOprationTypes': { method: 'GET', isArray:true, url :'/api/v1.0/community/operation_definitions/definition_types.json' },
				'operationTypeData' : {method: 'GET', url:'/api/v1.0/community/operation_definitions/:id.json'},
				'associateProducts': { method: 'POST', params: {id:  '@id'}, url: '/api/v1.0/community/operations/:id/associate_products.json' },
				'getBusinessTypes': { method: 'GET', isArray:true, url: '/api/v1.0/community/operations/business_types.json' },
				'getBusinessSubTypes': { method: 'GET', isArray:true, url: '/api/v1.0/community/operations/business_sub_types.json' }
			});
		}
	])

}());