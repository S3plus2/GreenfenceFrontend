define(['app'], function (app) {

	app.controller('UserDocumentCtrl', ['$rootScope', '$scope', '$compile', '$routeParams', '$location', '$translate', '$timeout', 'ss_alert', 'ui', 'UserDocumentService', 'UserFolderService',
		function($rootScope, $scope, $compile, $routeParams, $location, $translate, $timeout, ss_alert, ui, UserDocumentService, UserFolderService) {
			
			ui.collapse_butt_with_dom($(document))
			ui.viewing_trigger_butt()
			ui.create_user_folder_dialog_box()

			$scope.$parent.template = {
				header : '/community/common/header',
				slider: '',
				rightmenu: '/app/Greenfence/User/views/parts/right_column.html',
				footer: ''
			}

			if($scope.document == undefined) {
				$scope.document = {
					folder_name: null,
					folder_id: null
				}
				$scope.store = {}
			}
			$scope.definitions = []

			UserDocumentService.getDocumentTypes({document_type_for: 'User'}).$promise.then(function(data) {
				$scope.documentTypes = data;				
			})

			if($routeParams.documentId){
				UserDocumentService.get({id: $routeParams.documentId}).$promise.then(function(data) {
					$scope.store = data
					$scope.document = angular.copy($scope.store)
					delete $scope.document.document_definition
					$scope.definitions = $scope.store.document_definition.definition
				})
			}

			$scope.getUserFolder = function() {
				UserFolderService.query().$promise.then(function(data) {
					$scope.folders = data
				})
			}
			$scope.getUserFolder()

			var unbind = $rootScope.$on('USER_FOLDER_ADDED', function(event){
				$scope.getUserFolder()				
			});
			$scope.$on('$destroy', unbind);

			// method to get different types of document definition to add dynamic fields
			$scope.getDocumentTypeData = function(document_definition_id){
				UserDocumentService.documentTypeData({id: document_definition_id}).$promise.then(function(data) {
					if($scope.document.id != undefined && $scope.document.id != document_definition_id) {
						$scope.document.definition_value = {}
					}
					else if($scope.document.id != undefined){
					  $scope.document.definition_value = $scope.store.definition_value	
					}
					$scope.definitions = data.definition					
				})
			};
			
			// create or update document
			$scope.createDocument = function(document) {
				document.folder_name = $scope.document.folder_name
				document.folder_id = $scope.document.folder_id
				if(document.id)
				  UserDocumentService.update({id: document.id}, document).$promise.then(success, error)
				else
				  UserDocumentService.save(document).$promise.then(success, error)
	        };

	        $scope.files_counter = 1;

			$scope.attach_multiple_files = function(event) {
				fileTemplate = '<dl class="form_cell form_cell_v1_mod"><dt class="form_c_hline form_v1_mod hline_hide_mod"><label for="Browse_files">Browse files</label></dt><dd class="form_c_f_w form_v1_mod hline_hide_mod"><input type="file" id="Browse_files" ng-model="document.document_files_attributes[' + $scope.files_counter + '].file" base-sixty-four-input placeholder="Browse files" class="f_c_field default_mod file_mod"><span class="f_c_field_file_field"><span class="f_c_field_file_text">{{document.document_files_attributes[' + $scope.files_counter + '].file.filename || "Browse files"}}</span><span class="f_c_field_file_butt">Choose File</span></span></dd></dl>';
				$scope.files_counter++
				var	parent = $(event.srcElement).closest('.add_info_form_block').find('.add_info_form_w')
				parent.append(fileTemplate)
				$compile(parent)($scope);
			}

			$scope.addFilesToFolder = function(folder_name, folder_id) {
				$scope.document.folder_name = folder_name
				$scope.document.folder_id = folder_id
				ss_alert.alert("success", "Document(s) will be saved in " + folder_name)				
			}

			$scope.showFile = function(file) {
				UserDocumentService.getDocumentFile({id: $scope.store.id, file_Id: file.id}).$promise.then(function(data) {
					window.open(data.url,'_blank')
				}, function(reason) {

				})
			}

	        var success = function(data) {	     
	           	if($scope.document.id != null) {
					ss_alert.alert("success", $translate.instant('DOCUMENT_DETAILS_UPDATED_SUCCESSFULLY'))
					$location.url('/user_document/edit/' + $scope.document.id)
					$scope.store = data
					$scope.document = angular.copy($scope.store)
					delete $scope.document.document_definition
					$scope.definitions = $scope.store.document_definition.definition
				}
				else {
					ss_alert.alert("success", $translate.instant('DOCUMENT_CREATED_SUCCESSFULLY'))
					$rootScope.$emit('USER_DOCUMENT_ADDED')
					$location.url('/user_document/edit/' + data.id)
				}					
				ui.collapse_all()
				ui.opration_box_close()
	        }

	        var error = function(reason){
	           ss_alert.alert("error", reason.data.errors)
	        }

		}
	])	
	.controller('PublicUserDocumentCtrl', ['$rootScope', '$scope', '$compile', '$routeParams', '$location', '$translate', '$timeout', 'ss_alert', 'ui', 'UserDocumentService',
		function($rootScope, $scope, $compile, $routeParams, $location, $translate, $timeout, ss_alert, ui, UserDocumentService) {
			$scope.$parent.template = {
				header : '/community/common/header',
				slider: '',
				rightmenu: '',
				footer: ''
			}

			if ($routeParams.documentId) {
				UserDocumentService.sharingRecordDetail({id: $routeParams.documentId}).$promise.then(function(data) {
					console.log(data)
				})
			}			
		}
	])

});