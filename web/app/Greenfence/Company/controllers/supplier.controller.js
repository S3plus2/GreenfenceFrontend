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
    app.controller('SupplierCtrl', ['$rootScope', '$scope', '$routeParams', '$compile', '$location', '$translate', '$timeout', 'DocumentDefinitionsService', 'SupplierService', 'CompanyDocumentService', 'ss_alert', 'ui',
        function ($rootScope, $scope, $routeParams, $compile, $location, $translate, $timeout, DocumentDefinitionsService, SupplierService, CompanyDocumentService, ss_alert, ui) {

            ui.collapse_butt_with_dom($(document))
            ui.multi_select_with_dom($('.select_add_category'))

            $scope.$parent.template = {
                header: '/community/common/header',
                slider: '',
                rightmenu: '/app/Greenfence/Company/views/rightmenu.html',
                footer: ''
            };

            $scope.assigned_requirements = [];
            $scope.company_documents = [];

            if ($routeParams.supplierId) {
                SupplierService.getAssignedRequirements({
                    id: $routeParams.supplierId,
                    type: "Supplier"
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
                var fileTemplate = '<div id="d_structure" style="margin-top: 10px"><div class="mb_inp boxshadow_border" style="background: transparent; width: 85%; height: 100px; float: left;"><dl class="form_cell form_cell_v1_mod third_mod"><dt class="form_c_hline form_v1_mod hline_hide_mod"><label for="BuyerDemandingDocument">Buyer Demanding Document</label></dt><dd class="form_c_f_w form_v1_mod hline_hide_mod"><input type="text" disabled id="document_name" title="' + requirement.document_type + '" placeholder="Document Name" class="f_c_field default_mod " value="' + requirement.document_type + '"/></dd></dl><dl class="form_cell form_cell_v1_mod third_mod"><dt class="form_c_hline form_v1_mod hline_hide_mod"><label for="SupplierDocumentDefinition">Supplier Document Definition</label></dt><dd class="form_c_f_w form_v1_mod hline_hide_mod"><input type="text" disabled id="supplier_document_definition" title="' + requirement.supplier_document_definition + '" placeholder="Supplier Document Definition" class="f_c_field default_mod " value="' + requirement.supplier_document_definition + '"/></dd></dl><dl class="form_cell form_cell_v1_mod third_mod"><dt class="form_c_hline form_v1_mod hline_hide_mod"><label for="SupplierDocument">Supplier Document</label></dt><dd class="form_c_f_w form_v1_mod hline_hide_mod"><input type="text" disabled id="supplier_document" title="' + requirement.supplier_document + '" placeholder="Supplier Document" class="f_c_field default_mod " value="' + requirement.supplier_document + '"/></dd></dl></div></div>';
                counter++;
                var parent = $('.add_info_form_block').find('.add_info_form_w');
                parent.append(fileTemplate)

            }
        }
    ])
});