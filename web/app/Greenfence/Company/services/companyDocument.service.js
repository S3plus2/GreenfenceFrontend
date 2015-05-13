(function() {
	angular.module('company').factory('CompanyDocumentService', ['$resource',
		function($resource) {
			return $resource('/api/v1.0/community/company_document/:id.json',
				{}, {
					'update': { method: 'PUT' },
					'getDocumentTypes': { method: 'GET', isArray: true, url: '/api/v1.0/community/document_definitions/definition_types.json' },
					'documentTypeData': { method: 'GET', url: '/api/v1.0/community/document_definitions/:id.json' },
					'getDocumentFile': { method: 'GET', url: '/api/v1.0/community/company_document/get_document_file.json' },
					'getCompanyDocuments': { method: 'GET', url: '/api/v1.0/community/company_document/get_company_documents.json' },
					'getAuditors': { method: 'GET', isArray: true, url: '/api/v1.0/community/company_document/get_auditors.json' }
				}
			);
		}
	])
}());