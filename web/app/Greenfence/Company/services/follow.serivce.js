(function() {

	angular.module('company').factory('FollowService', ['$resource', function($resource) {
		return $resource('/api/v1.0/community/follows.json',
				{}, {
				'getCompanyFollowCount': { method: 'GET', url :'/api/v1.0/community/follows/company_follows_count.json' },
				'followAll': { method: 'POST', url :'/api/v1.0/community/follows/follow_all.json' }
			});
	}])

})();