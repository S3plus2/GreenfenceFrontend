(function() {

	angular.module('users').factory('SharedRecordService', ['$resource', 
		function($resource) {
			return $resource('/api/v1.0/community/shared_record/:id.json',
				{}, {
					'sharingRecords': { method: 'GET', isArray: true, url: '/api/v1.0/community/shared_record/sharing_records.json' },
					'sharedWithUsers': { method: 'GET', isArray: true, url: '/api/v1.0/community/shared_record/shared_with_users.json' },
					'unshareWithAll': { method: 'GET', isArray: true, url: '/api/v1.0/community/shared_record/unshare_with_all.json' }
				}
			)
		}
	])

})();