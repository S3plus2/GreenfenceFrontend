(function() {

	angular.module('company').factory('RequirementAssignmentService', ['$resource', function($resource) {
		return $resource('/api/v1.0/community/requirement_assignments.json',
				{}, {
					'getSuppliers': {method: 'GET', url:'/api/v1.0/community/supply_chains/get_suppliers.json'},
					'getBuyers': {method: 'GET', url:'/api/v1.0/community/supply_chains/get_buyers.json'}
			});
	}])

})();