(function() {
	angular.module('users').factory('UserDocumentService', ['$resource',
		function($resource) {
			return $resource('/api/v1.0/community/user_document/:id.json',
				{}, {
					'update': { method: 'PUT' },
					'getDocumentTypes': { method: 'GET', isArray: true, url: '/api/v1.0/community/document_definitions/definition_types.json' },
					'documentTypeData': { method: 'GET', url: '/api/v1.0/community/document_definitions/:id.json' },
					'getDocumentFile': { method: 'GET', url: '/api/v1.0/community/user_document/get_document_file.json' },
					'sharingRecordDetail': { method: 'GET', url: '/api/v1.0/community/user_document/:id/sharing_record_detail.json' }
				}
			);
		}
	])
}());