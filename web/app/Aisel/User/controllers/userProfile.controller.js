define(['app'], function (app) {

	app
	.controller('UserProfileCtrl', [
			'$rootScope',
			'$scope',
			'$filter',
			'$timeout',
			'UserService',
			'ss_alert',
			'$translate',
			'ui',
			'list',
		function(
			$rootScope,
			$scope,
			$filter,
			$timeout,
			UserService,
			ss_alert,
			$translate,
			ui,
			list) {


			//$scope.communication = {
			//	to_user_id: "",
			//	message: ""
			//};
            //
			//$scope.countries = list.countries
			//$scope.states = list.states
			//ui.collapse_butt_with_dom($(document))
            //
			//$scope.$parent.template = {
			//	header : '/community/common/header',
			//	slider: '/community/user/slider',
			//	rightmenu: '/community/user/rightmenu',
			//	footer: ''
			//}
            //
			//$scope.job_titles = [
			//	{name: "Auditor"},
			//	{name: "Employee"},
			//	{name: "Manager"}
			//]
            //
			//$scope.accreditations = []
			//UserService.get_accreditations().$promise.then(function(data) {
			//	$scope.accreditations = data
			//	$timeout(function () {
			//		ui.multi_select_with_dom($('.select_add_category'))
			//	}, 500)
			//})
            //
			//$scope.schemes = []
			//UserService.get_schemes().$promise.then(function(data) {
			//	$scope.schemes = data
			//	$timeout(function () {
			//		ui.multi_select_with_dom($('.select_add_category'))
			//	}, 500)
			//})
            //
			//$scope.tags = []
			//UserService.getAllTags().$promise.then(function(data) {
			//	tags = []
			//	angular.forEach(data, function(value, index) {
			//		tags.push(value["name"])
			//	})
			//	$scope.tags = tags
			//})
            //
			//$scope.userId = $('#user_id').val()
			//$scope.accreditations_list = []
			//$scope.schemes_init = []
			//$scope.schemes_map = {}
			//UserService.get({id: $scope.userId}).$promise.then(function(data) {
			//	$scope.user = data
			//	$scope.store = angular.copy($scope.user)
			//	$scope.showAccreditations()
			//	$scope.showSchemes()
			//	$rootScope.user = $scope.store
			//})
            //
			//$scope.showAccreditations = function() {
			//	if($scope.store.job_title != undefined && $scope.store.job_title == "Auditor") {
			//		for(var i = 0; i < $scope.store.auditor_profile_attributes.accreditations.length; i++) {
			//			for(var j = 0; j < $scope.accreditations.length; j++) {
			//				if($scope.store.auditor_profile_attributes.accreditations[i] == $scope.accreditations[j].id) {
			//					$scope.accreditations_list.push($scope.accreditations[j].name)
			//					break
			//				}
			//			}
			//		}
			//	}
			//}
            //
			//$scope.showSchemes = function() {
			//	if($scope.store.job_title && $scope.store.job_title == "Auditor") {
			//		for(var i = 0; i < $scope.store.auditor_profile_attributes.schemes.length; i++) {
			//			for(var j = 0; j < $scope.schemes.length; j++) {
			//				if($scope.store.auditor_profile_attributes.schemes[i] == $scope.schemes[j].id) {
			//					$scope.schemes_init.push($scope.schemes[j])
			//					if(!$scope.schemes_map[$scope.schemes[j].category]) {
			//						$scope.schemes_map[$scope.schemes[j].category] = []
			//					}
			//					$scope.schemes_map[$scope.schemes[j].category].push($scope.schemes[j].name)
			//					break
			//				}
			//			}
			//		}
			//	}
			//}
            //
			//$scope.userSubmit = function(user) {
			//	if(user.job_title == 'Auditor') {
			//	    if(user.auditor_profile_attributes == null) user.auditor_profile_attributes = {}
			//	    user.auditor_profile_attributes.accreditations = getSelectedAccreditations()
			//	    user.auditor_profile_attributes.schemes = getSelectedSchemes()
			//	} else {
			//		delete user.auditor_profile_attributes
			//	}
			//	UserService.update(user).$promise.then(success, error)
			//}
            //
			//var getSelectedAccreditations = function() {
			//	return $("#Enter_accreditation").multiselect("getChecked").map(function(){
	   		//		return this.value
			//	}).get()
			//}
            //
			//var getSelectedSchemes = function() {
			//	return $("#Enter_scheme").multiselect("getChecked").map(function() {
	   		//		return this.value
			//	}).get()
			//}
            //
			//$scope.tagsSubmit = function(tags) {
			//	$scope.user.tags = tags
			//   	UserService.update($scope.user).$promise.then(success, error)
			//}
            //
			//$scope.location = function(street1,street2,city, state, country,postal_code) {
			//	return ui.location(street1,street2,city, state, country,postal_code)
			//}
            //
			//var success = function(data) {
			//	$scope.store = angular.copy($scope.user)
			//	$scope.showAccreditations()
			//	$scope.showSchemes()
			//	$rootScope.user = $scope.store
			//	$('.butt_cancel').trigger('click')
			//	ss_alert.alert("success", $translate.instant('PROFILE_UPDATED'))
			//}
            //
			//var error = function(reason) {
			//	ss_alert.alert("error", reason.data.errors)
			//};
            //
		}
	]);
	//.controller('UserEditProfileRightMenuCtrl', ['$rootScope', '$scope', '$filter', '$upload', 'UserService', 'ss_alert', '$translate', 'ui',
	//	function($rootScope, $scope, $filter, $upload, UserService, ss_alert, $translate, ui) {
	//		ui.menu_cat_option_butt()
    //
	//		$scope.myImage = '';
	//		$scope.myCroppedImage = '';
	//		ui.dialog_box()
    //
	//		var file,
	//		handleFileSelect = function(evt) {
	//            var file = evt.currentTarget.files[0],
	//            	reader = new FileReader();
	//            reader.onload = function (evt) {
	//            	$scope.$apply(function($scope) {
	//              		$scope.myImage = evt.target.result
	//           		})
	//          	}
	//          	reader.readAsDataURL(file)
	//          	$('#crop').bPopup()
	//        }
    //
	//        $scope.uploadUserImage = function() {
	//        	var imgFile = ui.dataURItoBlob($scope.myCroppedImage)
	//        	imgFile["name"] = file.name
	//        	$upload.upload({
	//				url: '/api/v1.0/community/user/img_upload',
	//				method: 'PUT',
	//				fileFormDataName: 'image',
	//				file: imgFile
	//			}).success(function (data, status, headers, config) {
	//				$rootScope.user = data
	//				$('#crop').bPopup().close()
     //           }).error(function (data,status,headers,config){
     //           	ss_alert.alert("error", data.errors)
     //           	$('#crop').bPopup().close()
     //           })
	//        }
    //
	//		//angular.element(document.querySelector('#avatar_file')).on('change', handleFileSelect)
    //
	//		$scope.upload = function(files, evt) {
	//			if (files && files.length) {
	//				file = files[0]
	//				var reader = new FileReader();
	//	            reader.onload = function (evt) {
	//	            	$scope.$apply(function($scope) {
	//	              		$scope.myImage = evt.target.result
	//	           		})
	//	          	}
	//	          	reader.readAsDataURL(file)
	//	          	$('#crop').bPopup()
	//			}
	//		}
    //
	//	}
	//])
	//.controller('UserPublicProfileCtrl', ['$rootScope', '$scope', '$routeParams', '$filter', 'UserService', 'FollowService', 'MessageService', 'ss_alert', '$translate', '$timeout',
	//	function($rootScope, $scope, $routeParams, $filter, UserService, FollowService, MessageService, ss_alert, $translate, $timeout) {
	//		$scope.$parent.template = {
	//			header : '/community/common/header',
	//			slider: '/community/user/user_slider',
	//			rightmenu: '/community/user/user_rightmenu',
	//			footer: ''
	//		}
    //
	//		$scope.user = {}
	//		$rootScope.public_user = {}
	//		$scope.userId = ''
	//		$scope.userCompany = {}
	//		$scope.communication = {}
    //
	//		if ($routeParams.id) {
	//			$scope.userId = $routeParams.id
	//		} else {
	//			$scope.userId = $('#user_id').val()
	//		}
    //
	//		UserService.get({id: $scope.userId}).$promise.then(function(data) {
	//			$scope.user = data
	//			$rootScope.public_user = data
	//		})
	//		UserService.userCompanyInfo({id: $scope.userId}).$promise.then(function(data) {
	//			$scope.user.company = data
	//		})
    //
	//		$scope.follow_me = function(followable) {
	//			FollowService.save(followable).$promise.then(function(data) {
	//				followable.followed_by_current_user = true
	//				console.log("Success")
	//			}, function(reason) {
	//				console.log("Error")
	//			})
	//		}
    //
	//		$scope.unfollow_me = function(followable) {
	//			FollowService.delete(followable).$promise.then(function(data) {
	//				followable.followed_by_current_user = false
	//				console.log("Success")
	//			}, function(reason) {
	//				console.log("Error")
	//			})
	//		}
    //
	//		// sending message in the user profile page
	//		$scope.setToUserId = function(value){
	//			$scope.communication.to_user_id = value;
	//		};
	//		$scope.send_message = function(send_to) {
	//			$scope.communication.to_user_id = send_to.id;
	//			console.log($scope.communication);
    //
	//			MessageService.save($scope.communication).$promise.then(function(data) {
	//				console.log(data);
	//				console.log("Success");
	//			}, function(reason) {
	//				console.log("Error");
	//			});
    //
	//			$scope.communication = {}
	//		};
    //
	//		// sending message in the message center page
	//		$scope.send_message_in_center = function() {
	//			console.log($scope.communication);
    //
	//			MessageService.save($scope.communication).$promise.then(function(data) {
	//				console.log(data)
	//				console.log("Success")
	//			}, function(reason) {
	//				console.log("Error")
	//			})
    //
	//			$scope.communication = {}
	//		}
    //
	//		/*$timeout(function(){
	//			$('body').removeClass('messages_center_page');
	//			$('body').addClass('profile_page');
	//			$(document).trigger('ready_view');
	//			console.log('user profile time 2');
	//		}, 1000);*/
	//		$timeout(function(){
	//			global_f();
	//		});
    //
	//	}
	//])
	//.controller('UserSettingsCtrl', ['$rootScope', '$scope', '$routeParams', '$timeout', '$filter', 'UserService', 'ss_alert', '$translate', 'ui', 'list',
	//	function($rootScope, $scope, $routeParams, $timeout, $filter, UserService, ss_alert, $translate, ui, list) {
    //
	//		$scope.$parent.template = {
	//			header : '/community/common/header',
	//			slider: '',
	//			rightmenu: '/community/user/user_settings_rightmenu',
	//			footer: ''
	//		}
    //
	//		ui.collapse_butt_with_dom($(document))
    //
	//		$scope.countries = list.countries
	//		$scope.states = list.states
	//		$scope.languages = list.languages
    //
	//		$scope.userId = $('#user_id').val()
	//		$scope.selectedUserId = ""
	//		var selectedUserId = ""
    //
	//		UserService.get({id: $scope.userId}).$promise.then(function(data) {
	//			$scope.user = data
	//			$scope.store = angular.copy($scope.user)
	//			//$rootScope.public_user = data
	//		})
    //
	//		$scope.userSubmit = function(user) {
	//			UserService.update(user).$promise.then(success, error)
	//		}
    //
	//		$scope.location = function(street1,street2,city, state, country,postal_code) {
	//			return ui.location(street1,street2,city, state, country, postal_code)
	//		}
    //
	//		var success = function(data) {
	//			$scope.store = angular.copy($scope.user)
	//			//$rootScope.user = $scope.store
	//			$('.butt_cancel').trigger('click')
	//			ss_alert.alert("success", $translate.instant('PROFILE_UPDATED'))
	//		}
    //
	//		var error = function(reason) {
	//			ss_alert.alert("error", reason.data.errors || reason.data.error)
	//		}
    //
	//		UserService.get_company_users().$promise.then(function(data) {
	//				$scope.users = data
	//		})
    //
   	//		$scope.getPermission = function(id) {
   	//			selectedUserId = id
   	//			UserService.get_permissions({id: selectedUserId}).$promise.then(function(data) {
   	//				$scope.permissions = data.permissions
   	//			})
	//		}
    //
	//		$scope.changePermission = function() {
	//  			updatedpermission = selected_permissions();
  	//			UserService.update_permissions({ permissions : updatedpermission, id: selectedUserId}).$promise.then(function(data) {
  	//				ss_alert.alert('success', $translate.instant('PERMISSION_UPDATED'));
  	//				$('.butt_cancel').trigger('click')
  	//			}, function(reason) {
    //
  	//			})
	//		}
    //
	//		var selected_permissions = function() {
	//			var temp = ""
	//			angular.forEach($scope.permissions, function(permission, index) {
	//	 			if(permission.assigned) {
	//		 			temp  =  temp +  permission.id + ","
	//		 		}
	//  			})
	//  			return temp.substring(0, temp.length - 1)
	//		}
    //
	//		$timeout(function() {
	//			ui.multi_select_with_dom($('#Enter_Language'), 1)
	//			$("#Enter_Language").bind("multiselectclick", function(event, ui) {
	//			    var temp = $("#Enter_Language").multiselect("getChecked").map(function(){
	//	   				return this.value
	//				}).get()
	//				$scope.user.language_preference = temp[0]
	//			})
	//		}, 200)
	//	}
	//])
    //
	//.controller('UserDocumentFilterCtrl', ['$rootScope', '$scope', '$timeout', 'ui', 'UserDocumentService', 'UserFolderService',
	//	function($rootScope, $scope, $timeout, ui, UserDocumentService, UserFolderService) {
	//		ui.share_folder_dialog_box()
	//		$scope.setDocuments = function() {
	//			UserDocumentService.query().$promise.then(function(data) {
	//				$scope.documents = data
	//				$rootScope.user_documents = data
	//				$timeout(function() {
	//					ui.share_document_dialog_box()
	//				}, 500)
	//			})
	//		}
	//		$scope.setFolders = function() {
	//			UserFolderService.query().$promise.then(function(data) {
	//				$scope.user_folders = data
	//			})
	//		}
	//		$scope.setDocuments()
	//		$scope.setFolders()
	//		var unbind = $rootScope.$on('USER_DOCUMENT_ADDED', function(event) {
	//			$scope.setDocuments()
	//		});
	//		$scope.$on('$destroy', unbind);
	//		var unbind_2 = $rootScope.$on('USER_FOLDER_ADDED', function(event) {
	//			$scope.setFolders()
	//		});
	//		$scope.$on('$destroy', unbind_2);
	//	}
	//])


});