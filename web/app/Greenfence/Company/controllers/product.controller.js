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
    app.controller('ProductCtrl', ['$rootScope', '$scope', '$compile', '$location', '$translate', '$timeout', 'OperationService', 'ProductService', 'ss_alert', 'ui',
        function ($rootScope, $scope, $compile, $location, $translate, $timeout, OperationService, ProductService, ss_alert, ui) {

            ui.collapse_butt_with_dom($(document))


            $scope.$parent.template = {
                header: '/community/common/header',
                slider: '',
                rightmenu: '/community/company/rightmenu',
                footer: ''
            }

            $scope.categories = []
            $scope.operations = []
            $scope.products = []
            $scope.operation = {}
            $scope.products_list = false
            $scope.selected_products = {}
            $scope.operation_id = ""
            $scope.selected_list = []

            var selected_categories = "",
                selected_pruducts = "",
                temp, temp_category, multi_select;

            ProductService.query().$promise.then(function (data) {
                $scope.categories = data
            })

            OperationService.query().$promise.then(function (data) {
                $scope.operations = data
                ui.multi_select_with_dom($('#product_categories')).on('multiselectclick', function (event, ui) {
                    $('#product_categories').multiselect("close")
                    $timeout(function () {
                        getProducts()
                    }, 500)
                })
            })

            var getProducts = function () {
                selected_categories = ""
                $.each(getSelectedProductCategory(), function (index, value) {
                    if (index == 0)
                        selected_categories = value
                    else
                        selected_categories = selected_categories + "," + value
                })
                if (selected_categories == "") {
                    $('.form_cell_v1_mod.select_add_product').slideUp(300).removeClass('active_mod')
                } else {
                    ProductService.products({ids: selected_categories}).$promise.then(function (data) {
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

            var getSelectedProductCategory = function () {
                return $("#product_categories").multiselect("getChecked").map(function () {
                    return this.value
                }).get()
            }

            var getSelectedProducts = function () {
                return $("#products").multiselect("getChecked").map(function () {
                    return this.value
                }).get()
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

            var getSelectedProductCategoryElement = function () {
                return $("#product_categories").multiselect("getChecked").map(function () {
                    var obj = {}
                    obj.id = this.value
                    obj.name = this.title
                    return obj
                }).get()
            }

            var showSelectedProducts = function () {
                var list = [];
                var temp_category = getSelectedProductCategoryElement();
                var selected_products = getSelectedProductsElement();
                for (var i = 0; i < temp_category.length; i++) {
                    var obj = {
                        name: null,
                        value: []
                    }
                    obj.name = temp_category[i].name
                    angular.forEach(selected_products, function (value, index) {
                        if (obj.name == selected_products[index].category) {
                            obj.value.push(selected_products[index])
                        }
                    })
                    list.push(obj)
                }
                $scope.selected_list = list
                $scope.$apply()
            }

            $scope.saveProducts = function () {
                var selected_products = "";
                $.each(getSelectedProducts(), function (index, value) {
                    if (index == 0)
                        selected_products = value;
                    else
                        selected_products = selected_products + "," + value
                })
                OperationService.associateProducts({
                    id: $scope.operation.selected.id,
                    ids: selected_products
                }).$promise.then(success, error)
            }

            var success = function (data) {
                ss_alert.alert("success", "Products associated successfully.")
                $('.butt_cancel').trigger('click')
                ui.opration_box_close();
                // Update rightmenu data for products
                $rootScope.$emit('PRODUCT_ADDED')
                getAssociatedProducts($scope.operation_id)
            }
            var error = function (response) {
                ss_alert.alert("error", response.data.errors)
            }

            var getAssociatedProducts = function (operation_id) {
                OperationService.get({id: operation_id}).$promise.then(function (data) {
                    $scope.selected_products = data.products
                })
            }

            $scope.getAssociatedProducts = function (item, model) {
                $scope.operation_id = item.id
                OperationService.get({id: item.id}).$promise.then(function (data) {
                    $scope.selected_products = data.products
                })
            }

            $scope.deselect = function (event) {
                //To Do
            }

        }
    ])

});