(function() {

	angular.module('company').factory('CompanyFolderService', ['$resource', 
		function($resource) {
			return $resource('/api/v1.0/community/company_folder/:id.json',
				{}, {
					
				}
			)
		}
	])

})();