define(['app'], function (app) {

	app.controller('SharedRecordCtrl', ['$rootScope', '$scope', '$filter', 'SharedRecordService', 'ss_alert', '$translate', 'ui', '$http', '$timeout',
		function($rootScope, $scope, $filter, SharedRecordService, ss_alert, $translate, ui, $http, $timeout) {
	    	
	    	$scope.$parent.template = {
				header : '/community/common/header',
				slider: '',
				rightmenu: '/community/company/rightmenu',
				footer: ''
			}

	    	SharedRecordService.query().$promise.then(function(data) {
	    		$scope.shared_records = data
	    		$timeout(function() {
	    			ui.doc_settings_dialog_box()
	    		}, 500)		
	    	})

	    	SharedRecordService.sharingRecords().$promise.then(function(data) {
	    		$scope.sharing_records = data
	    	})

	    	$scope.sharedUsers = function(id, type) {
	    		SharedRecordService.sharedWithUsers({doc_id: id, doc_type: type}).$promise.then(function(data) {
	    			$scope.shared_users = data
	    		})
	    	}

	    	$scope.removeUser = function(shared_record) {
	    		console.log(shared_record)
	    		SharedRecordService.remove({id: shared_record.id}).$promise.then(function(data) {
	    			$('#unshare_msg_box').text($translate.instant('UNSHARED_SUCCESSFULLY')).css({"font-size": "3", "color": 'Green'})
					$timeout(function() {
						$('#unshare_msg_box').empty()
						$('.dialog_cancel_butt').trigger('click')
					}, 2000)
	    		})
	    	}

	    	$scope.unshareAll = function(id, type) {
	    		SharedRecordService.unshareWithAll({doc_id: id, doc_type: type}).$promise.then(function(data) {
	    			
	    		})
	    	}
		}
	])

});