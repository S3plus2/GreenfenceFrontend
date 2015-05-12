(function() {	

	angular.module('users').controller('UserInvitationCtrl', ['$rootScope', '$scope', '$filter', 'UserService', 'InvitationService', 'ss_alert', '$translate', 'ui', '$http', '$timeout',
		function($rootScope, $scope, $filter, UserService, InvitationService,  ss_alert, $translate, ui, $http, $timeout) {
	    	
	    	$scope.invite_Another_User = function() {
	    		$scope.invitation.name = "";
	    		$scope.invitation.email = "";   
	    	}
	   
			$scope.inviteUsers = function(invitation) {
				if ($scope.invitation.name && $scope.invitation.email) { 
					InvitationService.invite({name: $scope.invitation.name, email: $scope.invitation.email,type: $scope.invitation.type}).$promise.then(success, error)
				} else {
					$('#msg_box').text($translate.instant('PLEASE_ENTER_THE_INVITER_NAME_EMAIL')).css({"font-size":"3","color":'Red',"padding": "0 125px"})		
					$timeout(function() {
						$('#msg_box').empty()
					}, 4000)
	
				}
			}

			var success = function(data) {
				$('#msg_box').text($translate.instant('INVITATION_SEND_SUCCESSFULLY')).css({"font-size":"3","color":'Green',"padding": "0 125px"})
				$timeout(function() {
					$('#msg_box').empty()
				}, 4000)
			}

			var error = function(reason) {
				$('#msg_box').text(reason.data.errors).css({"font-size":"3","color":'Red',"padding" : "0 125px"})  
				$timeout(function() {
					$('#msg_box').empty()
				}, 4500)
			}
		}
	])

})();