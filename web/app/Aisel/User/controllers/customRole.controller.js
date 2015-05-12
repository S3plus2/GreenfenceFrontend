define(['app'], function (app) {

	app.controller('CustomRoleCtrl', ['$rootScope', '$routeParams', '$scope', '$compile', '$location', '$translate', '$timeout', 'ss_alert', 'ui','CustomRoleService',
		function($rootScope, $routeParams, $scope, $compile, $location, $translate, $timeout, ss_alert, ui, CustomRoleService) {

			ui.collapse_butt_with_dom($(document))
			$scope.$parent.template = {
				header : '/community/common/header',
				slider: '',
				rightmenu: '/community/user/user_settings_rightmenu',
				footer: ''
			}

			$scope.custom_role = {}
			$scope.store = {}
			$scope.permission_data = {}
			$scope.permission_list = []
			$scope.role_types = [
		      { value:'operation', name:'Operation' },
		      { value:'company', name:'Company' }
		    ];



			$scope.getRole = function(role_id){
				CustomRoleService.get({id:role_id}).$promise.then(function(data) {
					$scope.store = data
					$scope.custom_role = angular.copy($scope.store)
					$scope.permission_set = angular.copy($scope.store.permissions)
					delete $scope.custom_role.permissions
					delete $scope.custom_role.users
				})
			}
			
			if($routeParams.customRoleId){
				$scope.getRole($routeParams.customRoleId)				
			}

			CustomRoleService.permissionList().$promise.then(function(data) {
				$scope.permission_data = data;
				$timeout(function() {
					ui.multi_select_with_dom($('.user_permissions')).multiselect("refresh")
				}, 500);			
				$scope.setPermissions()
			})

			$scope.setPermissions = function(){
				type = $scope.custom_role.role_on
				if(type == "operation"){
					$scope.permission_list = $scope.permission_data.operation_permission
				}else if(type == "company"){
					$scope.permission_list = $scope.permission_data.company_permission
				}
				$timeout(function() {
					ui.multi_select_with_dom($('.user_permissions')).multiselect("refresh")
				}, 500);
			}

			

			$scope.createRole = function(custom_role){
				custom_role["permission_list"] = selectedPermissions()
				if(custom_role.id){
					CustomRoleService.update({id: custom_role.id},custom_role).$promise.then(success, error)
				}else{
					CustomRoleService.save(custom_role).$promise.then(success, error)
				}
			}
			
			var success = function(response){
				ss_alert.alert("success","Role created successfully.")
				$scope.store = response
				$scope.custom_role = angular.copy($scope.store)
				$scope.permission_set = angular.copy($scope.store.permissions)
				delete $scope.custom_role.permissions
				delete $scope.custom_role.users
				ui.collapse_all();
			}

			var error = function(response){
				ss_alert.alert("error",response.data.errors)	
			}

			$scope.deleteUserFromRole = function(custom_role_id,user_id,users_custom_role){
			    CustomRoleService.deleteRole({id: custom_role_id,user_id: user_id,users_custom_role_id:users_custom_role }).$promise.then(function(response){
			   	   ss_alert.alert("success","User deleted from role successfully.")
			       $scope.getRole(custom_role_id)
	
			   });
			}

			var selectedPermissions = function() {
				var selected_permissions;
				var permissions =  $(".user_permissions").multiselect("getChecked").map(function() {
	   				return this.value
				}).get()
				$.each(permissions, function (index, value) {
					if (index == 0)
					   selected_permissions = value
					else
					selected_permissions = selected_permissions + "," + value
				})
				return selected_permissions;
			}
			
		}
	]).controller('AssignRoleCtrl', ['$scope', 'ss_alert', '$translate', 'ui', 'CustomRoleService', 'OperationService',
		function($scope, ss_alert, $translate, ui, CustomRoleService, OperationService) {

			ui.collapse_butt_with_dom($(document))
			$scope.user_role = {}
			$scope.$parent.template = {
				header : '/community/common/header',
				slider: '',
				rightmenu: '/community/user/user_settings_rightmenu',
				footer: ''
			}

			CustomRoleService.usersWithGroup().$promise.then(function(data) {
				$scope.users = data.users
				$scope.roles = data.custom_roles
			})

			OperationService.query().$promise.then(function(data) {
				$scope.operations = data
			})


			$scope.addUser = function(user_role){
			   	if(user_role.customRole == undefined || user_role.customRole.id == undefined){ 
					ss_alert.alert("error", $translate.instant('ROLE_CANT_BE_BALNK'))
					return false
				}
				if(user_role.userId == undefined ){ 
					ss_alert.alert("error", $translate.instant('USER_CANT_BE_BALNK'))
					return false
				}
				if(user_role.customRole != undefined && user_role.customRole.id != undefined && user_role.customRole.role_on == 'operation' && !user_role.operationId){
					ss_alert.alert("error", $translate.instant('OPERATION_CANT_BE_BALNK'))
					return false
				}
				if(user_role.customRole.role_on == 'company'){
					user_role.operationId = null
				}
				CustomRoleService.addRole({id:user_role.customRole.id,user_id: user_role.userId,operation_id:user_role.operationId}).$promise.then(success,error)
			}

			var success = function(response){
				ss_alert.alert("success","Role added successfully.")
				ui.collapse_all();
			}

			var error = function(response){
				ss_alert.alert("error",response.data.errors)	
			}

		}

	]).controller('RolesCtrl', ['$scope', 'ss_alert', '$translate', 'ui', 'CustomRoleService', 
		function($scope, ss_alert, $translate, ui, CustomRoleService) {
			
			$scope.$parent.template = {
				header : '/community/common/header',
				slider: '',
				rightmenu: '/community/user/user_settings_rightmenu',
				footer: ''
			}
			
			$scope.getAllRoles = function(){
				CustomRoleService.query().$promise.then(function(data) {
					$scope.custom_roles =  data
				})
			}
			$scope.getAllRoles()

			$scope.deleteRole = function(custom_role_id){
				CustomRoleService.delete({id:custom_role_id}).$promise.then(success,error)
	
			}

			var success = function(response){
				ss_alert.alert("success","Role deleted successfully.")
				$scope.getAllRoles()
			}

			var error = function(response){
				ss_alert.alert("error","Unable to delete.")
			}
		}
	])

})();