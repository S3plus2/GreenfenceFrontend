(function() {

	angular.module('users').factory('InvitationService', ['$resource', 
		function($resource) {
			return $resource('/api/v1.0/community/user.json',
				{}, {
				'invite': { method: 'POST', params: {name: '@name', email: '@email', invitation_type: '@type'}, url: '/api/v1.0/community/user/invite_users.json' }
			})
		}
	])

})();