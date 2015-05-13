'use strict';

/**
 * This file is part of the Greenfence package.
 *
 * (c) Ivan Proskuryakov
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @name            GreenfenceCompany
 * @description     ...
 */

define(['app'], function (app) {
	app.controller('CompanyDocumentCtrl', ['$rootScope', '$scope', '$compile', '$routeParams', '$location', '$translate', '$timeout', 'ss_alert', 'ui', 'CompanyDocumentService', 'CompanyFolderService',
		function($rootScope, $scope, $compile, $routeParams, $location, $translate, $timeout, ss_alert, ui, CompanyDocumentService, CompanyFolderService) {
			
			ui.collapse_butt_with_dom($(document))
			ui.viewing_trigger_butt()
			ui.create_company_folder_dialog_box()

			$scope.$parent.template = {
				header : '/community/common/header',
				slider: '',
				rightmenu: '/community/company/rightmenu',
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

			CompanyDocumentService.getDocumentTypes({document_type_for: 'Company'}).$promise.then(function(data) {
				$scope.documentTypes = data;				
			})

			CompanyDocumentService.getAuditors().$promise.then(function(data) {
				$scope.auditors = data
			})

			if($routeParams.documentId){
				CompanyDocumentService.get({id: $routeParams.documentId}).$promise.then(function(data) {
					$scope.store = data
					$scope.document = angular.copy($scope.store)
					delete $scope.document.document_definition
					$scope.definitions = $scope.store.document_definition.definition
				})
			}

			$scope.getCompanyFolder = function() {
				CompanyFolderService.query().$promise.then(function(data) {
					$scope.folders = data
				})
			}
			$scope.getCompanyFolder()

			var unbind = $rootScope.$on('COMPANY_FOLDER_ADDED', function(event){
				$scope.getCompanyFolder()				
			});
			$scope.$on('$destroy', unbind);

			// method to get different types of document definition to add dynamic fields
			$scope.getDocumentTypeData = function(document_definition_id) {
				CompanyDocumentService.documentTypeData({id: document_definition_id}).$promise.then(function(data) {
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
				  CompanyDocumentService.update({id: document.id}, document).$promise.then(success, error)
				else
				  CompanyDocumentService.save(document).$promise.then(success, error)
	        };

	        $scope.files_counter = 1;

			$scope.attach_multiple_files = function(event) {
				var fileTemplate = '<dl class="form_cell form_cell_v1_mod"><dt class="form_c_hline form_v1_mod hline_hide_mod"><label for="Browse_files">Browse files</label></dt><dd class="form_c_f_w form_v1_mod hline_hide_mod"><input type="file" id="Browse_files" ng-model="document.document_files_attributes[' + $scope.files_counter + '].file" base-sixty-four-input placeholder="Browse files" class="f_c_field default_mod file_mod"><span class="f_c_field_file_field"><span class="f_c_field_file_text">{{document.document_files_attributes[' + $scope.files_counter + '].file.filename || "Browse files"}}</span><span class="f_c_field_file_butt">Choose File</span></span></dd></dl>';
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
				CompanyDocumentService.getDocumentFile({id: $scope.store.id, file_Id: file.id}).$promise.then(function(data) {
					window.open(data.url,'_blank')
				}, function(reason) {

				})
			}

	        var success = function(data) {	     
	           	if($scope.document.id != null) {
					ss_alert.alert("success", $translate.instant('DOCUMENT_DETAILS_UPDATED_SUCCESSFULLY'))
					$location.url('/company_document/edit/' + $scope.document.id)
					$scope.store = data
					$scope.document = angular.copy($scope.store)
					delete $scope.document.document_definition
					$scope.definitions = $scope.store.document_definition.definition
				}
				else {
					ss_alert.alert("success", $translate.instant('DOCUMENT_CREATED_SUCCESSFULLY'))
					$rootScope.$emit('COMPANY_DOCUMENT_ADDED')
					$location.url('/company_document/edit/' + data.id)
				}					
				ui.collapse_all()
				ui.opration_box_close()
	        }

	        var error = function(reason){
	           ss_alert.alert("error", reason.data.errors)
	        }

		}
	])

});