(function() {

	angular.module('company').factory('SupplierService', ['$resource', function($resource) {
		return $resource('/api/v1.0/community/requirement_assignments.json',
				{}, {
					'getAssignedRequirements': { method: 'GET', url :'/api/v1.0/community/requirement_assignments/assigned_requirements.json' }
			});
	}])

})();