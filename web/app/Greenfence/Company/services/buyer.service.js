(function() {

	angular.module('company').factory('BuyerService', ['$resource', function($resource) {
		return $resource('/api/v1.0/community/supply_chains/:id.json',
				{}, {
					'update': { method: 'PUT' },
					'getAssignedRequirements': { method: 'GET', url :'/api/v1.0/community/requirement_assignments/assigned_requirements.json' }
			});
	}])

})();