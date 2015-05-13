(function() {

	angular.module('company').factory('ShareCompanyDocumentService', ['$resource', 
		function($resource) {
			return $resource('/api/v1.0/community/company_document/:id.json',
				{}, {
					'shareDocument': { method: 'POST', url: '/api/v1.0/community/company_document/share_document.json' }
				}
			)
		}
	])

})();