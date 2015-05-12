(function() {

	angular.module('users').factory('UserFolderService', ['$resource', 
		function($resource) {
			return $resource('/api/v1.0/community/user_folder/:id.json',
				{}, {
					
				}
			)
		}
	])

})();