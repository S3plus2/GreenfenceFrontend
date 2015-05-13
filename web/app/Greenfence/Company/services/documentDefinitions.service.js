(function() {
	angular.module('company').factory('DocumentDefinitionsService', ['$resource', function($resource) {
		return $resource('/api/v1.0/community/document_definitions.json',
				{}, {
					'getDocumentDefinitionByCompany': { method: 'GET', url :'/api/v1.0/community/document_definitions/document_definition_by_company.json' }
			});
	}])
})();