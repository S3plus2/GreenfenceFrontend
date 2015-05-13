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
    app.controller('BuyerCtrl', ['$rootScope', '$scope', '$routeParams', '$compile', '$location', '$translate', '$timeout', 'DocumentDefinitionsService', 'BuyerService', 'CompanyDocumentService', 'ss_alert', 'ui',
        function ($rootScope, $scope, $routeParams, $compile, $location, $translate, $timeout, DocumentDefinitionsService, BuyerService, CompanyDocumentService, ss_alert, ui) {

            ui.collapse_butt_with_dom($(document))
            ui.multi_select_with_dom($('.select_add_category'))

            $scope.$parent.template = {
                header: '/community/common/header',
                slider: '',
                rightmenu: '/community/company/rightmenu',
                footer: ''
            }

            $scope.assigned_requirements = []
            $scope.company_documents = []
            $scope.document_definitions_list = [];

            if ($routeParams.buyerId) {
                CompanyDocumentService.getCompanyDocuments({
                    id: $routeParams.buyerId,
                    type: "Buyer"
                }).$promise.then(function (data) {
                        $scope.company_documents = data.company_document
                    });

                DocumentDefinitionsService.getDocumentDefinitionByCompany().$promise.then(function (data) {
                    $scope.document_definitions_list = data.document_definitions_by_company;
                    console.log($scope.document_definitions_list)
                })

                BuyerService.getAssignedRequirements({
                    id: $routeParams.buyerId,
                    type: "Buyer"
                }).$promise.then(function (data) {
                        $scope.assigned_requirements = data.supply_chain_requirement
                        for (var i = 0; i < $scope.assigned_requirements.length; i++) {
                            attach_multiple_rows($scope.assigned_requirements[i])
                        }
                        $compile($('.add_info_form_block').find('.add_info_form_w'))($scope);
                    })
            }

            counter = 0;

            attach_multiple_rows = function (requirement) {
                var fileTemplate = '<div id="d_structure"><div class="form_block hor_mod third_mod"><input type="hidden" required  ng-model="filled_requirements.supply_chain_requirements_attributes[' + counter + '].id" ng-init="filled_requirements.supply_chain_requirements_attributes[' + counter + '].id=' + requirement.id + '"/><input type="hidden" required  ng-model="filled_requirements.supply_chain_requirements_attributes[' + counter + '].buyer_demanding_document_definition_id" ng-init="filled_requirements.supply_chain_requirements_attributes[' + counter + '].buyer_demanding_document_definition_id=' + requirement.id + '"/><dl class="form_cell form_cell_v1_mod third_mod"><dt class="form_c_hline form_v1_mod hline_hide_mod"><label for="BuyerDemandingDocument">Buyer Demanding Document</label></dt><dd class="form_c_f_w form_v1_mod hline_hide_mod"><input type="text" disabled id="document_name" placeholder="Document Name" class="f_c_field default_mod " value="' + requirement.document_type + '"/></dd></dl><dl class="form_cell form_cell_v1_mod third_mod"><dt class="form_c_hline form_v1_mod hline_hide_mod"><label for="Requirement">Requirement</label></dt><dd class="form_c_f_w form_v1_mod hline_hide_mod"><ui-select ng-model="filled_requirements.supply_chain_requirements_attributes[' + counter + '].supplier_providing_document_definition_id" name="supplier_providing_document_definition_id" theme="selectize"><ui-select-match placeholder="Select a requirement">{{$select.selected.document_type}}</ui-select-match><ui-select-choices repeat="doc_def.id as doc_def in document_definitions_list track by doc_def.id |  filter: $select.search"><div ng-bind-html="doc_def.document_type | highlight: $select.search"></div></ui-select-choices></ui-select></dd></dl><dl class="form_cell form_cell_v1_mod third_mod"><dt class="form_c_hline form_v1_mod hline_hide_mod"><label for="SupplierDocument">SupplierDocument</label></dt><dd class="form_c_f_w form_v1_mod hline_hide_mod"><ui-select ng-model="filled_requirements.supply_chain_requirements_attributes[' + counter + '].supplier_document_id" name="supplier_document_id" theme="selectize"><ui-select-match placeholder="Select a document">{{$select.selected.document_name}}</ui-select-match><ui-select-choices repeat="com_doc.id as com_doc in company_documents track by com_doc.id |  filter: $select.search"><div ng-bind-html="com_doc.document_name | highlight: $select.search"></div></ui-select-choices></ui-select></dd></dl></div></div>';
                counter++
                var parent = $('.add_info_form_block').find('.add_info_form_w')
                parent.append(fileTemplate)

            }

            $scope.submit_filled_requirements = function (filled_requirements) {
                BuyerService.update({id: $routeParams.buyerId}, filled_requirements).$promise.then(success, error)
            }

            var success = function (data) {
                ss_alert.alert("success", $translate.instant('Requirement filled successfully.'))
            }

            var error = function (reason) {
                ss_alert.alert("error", reason.data.errors)
            }


            // $scope.createDocumentDefinition = function(document_definition) {
            //         if(document_definition.document_type_for == 'Company')
            //     document_definition.document_type_for_id = $('#current_company_id').val()
            //   else if(document_definition.document_type_for == 'Personal')
            //     document_definition.document_type_for_id = $('#current_user_id').val()
            //   DocumentDefinitionsService.save(document_definition).$promise.then(success, error)
            //    };
            //    // success or error handling after create/update
            // var success = function(response) {
            // 	$scope.store = response
            // 	if($scope.document_definition.id != null) {
            // 		ss_alert.alert("success", $translate.instant('DOCUMENT_DEFINITION_DETAILS_UPDATED_SUCCESSFULLY'))
            // 	}
            // 	else {
            // 		ss_alert.alert("success", $translate.instant('DOCUMENT_DEFINITION_CREATED_SUCCESSFULLY'))
            // 	}
            // 	$scope.document_definition = angular.copy($scope.store)

            // 	// Update rightmenu data for operations
            // 	$rootScope.$emit('DOCUMENT_DEFINITION_ADDED')
            // 	$('.butt_cancel').trigger('click')
            // }

            // var error = function(response) {
            // 	ss_alert.alert("error", response.data.errors || response.data.error)
            // }
        }
    ])
});