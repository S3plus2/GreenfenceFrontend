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
    app.controller('RequirementAssignmentCtrl', ['$rootScope', '$scope', '$routeParams', '$compile', '$location', '$translate', '$timeout', 'DocumentDefinitionsService', 'SupplyChainService', 'RequirementAssignmentService', 'ProductService', 'ss_alert', 'ui',
        function ($rootScope, $scope, $routeParams, $compile, $location, $translate, $timeout, DocumentDefinitionsService, SupplyChainService, RequirementAssignmentService, ProductService, ss_alert, ui) {

            ui.collapse_butt_with_dom($(document))
            // ui.multi_select_with_dom($('.select_add_category'))

            $scope.$parent.template = {
                header: '/community/common/header',
                slider: '',
                rightmenu: '/app/Greenfence/Company/views/rightmenu.html',
                footer: ''
            }
            $scope.supply_chain_requirements = {
                document_type_for: null
            }

            $scope.selected_list = []
            // $scope.document_type_for_list = [
            //     { id: 1, name:'Personal' },
            //     { id: 2, name:'Company' }
            //   ];

            $scope.document_type_for_list = []

            RequirementAssignmentService.getSuppliers().$promise.then(function (data) {
                $scope.document_type_for_list = data.suppliers;
            })


            // Only self created, assigned and default to be shown
            DocumentDefinitionsService.getDocumentDefinitionByCompany().$promise.then(function (data) {
                console.log(data)
                $scope.document_definitions_list = data.document_definitions_by_company;
                $timeout(function () {
                    ui.multi_select_with_dom($('#document_definitions')).multiselect("refresh")
                }, 500);

                ui.multi_select_with_dom($('#suppliers')).on('multiselectclick', function (event, ui) {
                    // $('#suppliers').multiselect("close")
                    $timeout(function () {
                        getProducts()
                    }, 500)
                })
            })


            var getProducts = function () {
                var selected_suppliers = "";
                $.each(getSelectedSuppliers(), function (index, value) {
                    if (index == 0)
                        selected_suppliers = value
                    else
                        selected_suppliers = selected_suppliers + "," + value
                })
                if (selected_suppliers == "") {
                    $('.form_cell_v1_mod.select_add_product').slideUp(300).removeClass('active_mod')
                } else {
                    ProductService.getSupplyChainProducts({ids: selected_suppliers}).$promise.then(function (data) {
                        $scope.products = data
                        $timeout(function () {
                            $('#products').unbind()
                            $scope.selected_list = []
                            ui.multi_select_with_dom($('#products')).multiselect("refresh").on('multiselectclick', function (event, ui) {
                                showSelectedProducts()
                            })
                            $('.form_cell_v1_mod.select_add_product').slideDown(300).addClass('active_mod')
                        }, 500)
                    })
                }
            }

            var getSelectedProductsElement = function () {
                return $("#products").multiselect("getChecked").map(function () {
                    var obj = {}
                    obj.id = this.value
                    obj.name = this.title
                    obj.category = $(".ui-multiselect-checkboxes").find(this).parent().parent().prevAll(".ui-multiselect-item.ui-multiselect-optgroup-label").first().find('a').text()
                    return obj
                }).get()
            }

            var showSelectedProducts = function () {
                var list = []
                var obj = {
                    name: null,
                    value: []
                }
                var selected_products = getSelectedProductsElement();
                angular.forEach(selected_products, function (value, index) {
                    if (obj.name == selected_products[index].category) {
                        obj.value.push(selected_products[index])
                        list.push(obj)
                    }
                })
                $scope.selected_list = list
                $scope.$apply()
            }

            $scope.assignRequirement = function () {
                var selected_requirements = "";
                var selected_suppliers = "";
                var selected_products = "";
                $.each(getSelectedRequirements(), function (index, value) {
                    if (index == 0)
                        selected_requirements = value
                    else
                        selected_requirements = selected_requirements + "," + value
                })
                $.each(getSelectedSuppliers(), function (index, value) {
                    if (index == 0)
                        selected_suppliers = value
                    else
                        selected_suppliers = selected_suppliers + "," + value
                })
                $.each(getSelectedProducts(), function (index, value) {
                    if (index == 0)
                        selected_products = value
                    else
                        selected_products = selected_products + "," + value
                })
                RequirementAssignmentService.save({
                    requirements: selected_requirements,
                    suppliers: selected_suppliers,
                    products: selected_products
                }).$promise.then(success, error)
                // OperationService.associateProducts({id: $scope.operation.selected.id, ids: selected_products}).$promise.then(success, error)
            }

            // success or error handling after create/update
            var success = function (response) {
                ss_alert.alert("success", $translate.instant('Requirement assigned successfully.'))
            }

            var error = function (response) {
                //     var errormsg=""
                //     angular.forEach(response.data.errors,function(key){
                //                    errormsg+= key + "<br>"
                //     })

                // ss_alert.alert("error",errormsg)
            }

            var getSelectedRequirements = function () {
                return $("#document_definitions").multiselect("getChecked").map(function () {
                    return this.value
                }).get()
            }

            var getSelectedSuppliers = function () {
                return $("#suppliers").multiselect("getChecked").map(function () {
                    return this.value
                }).get()
            }

            var getSelectedProducts = function () {
                return $("#products").multiselect("getChecked").map(function () {
                    return this.value
                }).get()
            }
        }
    ])
});
