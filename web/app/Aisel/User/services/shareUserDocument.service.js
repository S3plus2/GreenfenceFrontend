define(['app'], function (app) {

	app.factory('ShareUserDocumentService', ['$resource',
		function($resource) {
			return $resource('/api/v1.0/community/user_document/:id.json',
				{}, {
					'shareDocument': { method: 'POST', url: '/api/v1.0/community/user_document/share_document.json' }
				}
			)
		}
	])

});