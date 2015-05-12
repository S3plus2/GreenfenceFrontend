define(['app'], function (app) {

	app.factory('UserFolderService', ['$resource',
		function($resource) {
			return $resource('/api/v1.0/community/user_folder/:id.json',
				{}, {
					
				}
			)
		}
	])

});