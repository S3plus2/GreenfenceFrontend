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
    app.controller('OperationCtrl', ['$rootScope', '$scope', '$routeParams', '$compile', '$location', '$translate', 'OperationService', 'ss_alert', 'ui', 'list', '$upload',
        function ($rootScope, $scope, $routeParams, $compile, $location, $translate, OperationService, ss_alert, ui, list, $upload) {
            ui.collapse_butt_with_dom($(document))

            $scope.countries = list.countries
            $scope.states = list.states

            $scope.$parent.template = {
                header: '/community/common/header',
                slider: '',
                rightmenu: '/community/company/rightmenu',
                footer: ''
            }
            if ($scope.operation == undefined) {
                $scope.operation = {}
                $scope.store = {}
            }
            $scope.definitions = []
            // handle show operation
            if ($routeParams.operationId) {
                OperationService.get({id: $routeParams.operationId}).$promise.then(function (data) {
                    $scope.store = data
                    $scope.operation = angular.copy($scope.store)
                    delete $scope.operation.operation_definition
                    $scope.definitions = $scope.store.operation_definition.definition
                })
            }
            // end

            OperationService.getOprationTypes().$promise.then(function (data) {
                $scope.operationTypes = data
            })

            OperationService.getBusinessTypes().$promise.then(function (data) {
                $scope.business_types = data
                ui.multi_select_with_dom($('#business_types')).on('multiselectclick', function (event, ui) {
                    $('#business_types').multiselect("close")
                    $timeout(function () {
                        var selected_business = ""
                        $.each(getSelectedBusinessTypes(), function (index, value) {
                            if (index == 0)
                                selected_business = value
                            else
                                selected_business = selected_business + "," + value
                        })
                        if (selected_business == "") {
                            $('.form_cell_v1_mod.select_add_product').slideUp(300).removeClass('active_mod')
                        } else {
                            OperationService.getBusinessSubTypes({ids: selected_business}).$promise.then(function (data) {
                                $scope.business_sub_types = data
                                $timeout(function () {
                                    $('#business_sub_types').unbind()
                                    $scope.selected_list = []
                                    ui.multi_select_with_dom($('#business_sub_types')).multiselect("refresh").on('multiselectclick', function (event, ui) {
                                        showSelectedBusinesses()
                                    })
                                    $('.form_cell_v1_mod.select_add_product').slideDown(300).addClass('active_mod')
                                }, 500)
                            })
                        }
                    }, 500)
                })
            })

            var getSelectedBusinessTypes = function () {
                return $("#business_types").multiselect("getChecked").map(function () {
                    return this.value
                }).get()
            }

            var getSelectedBusinessSubTypes = function () {
                return $("#business_sub_types").multiselect("getChecked").map(function () {
                    return this.value
                }).get()
            }

            var getSelectedBusinessTypeElement = function () {
                return $("#business_types").multiselect("getChecked").map(function () {
                    var obj = {}
                    obj.id = this.value
                    obj.name = this.title
                    return obj
                }).get()
            }

            var getSelectedBusinessSubTypeElement = function () {
                return $("#business_sub_types").multiselect("getChecked").map(function () {
                    var obj = {}
                    obj.id = this.value
                    obj.name = this.title
                    obj.category = $(".ui-multiselect-checkboxes").find(this).parent().parent().prevAll(".ui-multiselect-item.ui-multiselect-optgroup-label").first().find('a').text()
                    return obj
                }).get()
            }

            var showSelectedBusinesses = function () {
                var list = [];
                var temp_business_type = getSelectedBusinessTypeElement();
                var selected_business_sub_types = getSelectedBusinessSubTypeElement();
                for (var i = 0; i < temp_business_type.length; i++) {
                    var obj = {
                        name: null,
                        value: []
                    }
                    obj.name = temp_business_type[i].name
                    angular.forEach(selected_business_sub_types, function (value, index) {
                        if (obj.name == selected_business_sub_types[index].category) {
                            obj.value.push(selected_business_sub_types[index])
                        }
                    })
                    list.push(obj)
                }
                $scope.selected_businesses_list = list
                $scope.$apply()
            }

            var file,
                handleFileSelect = function (evt) {
                    var file = evt.currentTarget.files[0],
                        reader = new FileReader();
                    reader.onload = function (evt) {
                        $scope.$apply(function ($scope) {
                            $scope.myImage = evt.target.result
                        })
                    }
                    reader.readAsDataURL(file)
                    $('#operation_img_crop').bPopup()
                }

            $scope.myImage = '';
            $scope.myCroppedImage = '';
            $scope.upload_operation_image = function () {
                if ($scope.operation.image == null) {
                    $scope.operation['image'] = {}
                }
                $scope.operation.image.base64 = $scope.myCroppedImage.substring(21)
                $scope.operation.image.filename = file.name.substring(0, file.name.lastIndexOf('.')) + ".png"
                $scope.operation.image.filetype = "image/png"
                $('#operation_img_crop').bPopup().close()
            }

            $scope.upload = function (files, evt) {
                if (files && files.length) {
                    file = files[0]
                    var reader = new FileReader();
                    reader.onload = function (evt) {
                        $scope.$apply(function ($scope) {
                            $scope.myImage = evt.target.result
                        })
                    }
                    reader.readAsDataURL(file)
                    $('#operation_img_crop').bPopup()
                }
            }

            $scope.upload_image = function (files, evt) {
                if (files && files.length) {
                    file = files[0]
                    var reader = new FileReader();
                    reader.onload = function (evt) {
                        $scope.$apply(function ($scope) {
                            $scope.myImage = evt.target.result
                        })
                    }
                    reader.readAsDataURL(file)
                    $('#operation_img_crop').bPopup()
                }
            }

            // create or update opertaion
            $scope.createOperation = function (operation, form) {
                if (operation.id)
                    OperationService.update({id: operation.id}, operation).$promise.then(success, error)
                else
                    OperationService.save(operation).$promise.then(success, error)
            }

            // return comma seprated address
            $scope.location = function (street1, street2, city, state, country, postalcode) {
                return ui.location(street1, street2, city, state, country, postalcode)
            }

            // success or error handling after create/update
            var success = function (response) {
                if ($scope.operation.id != null) {
                    ss_alert.alert("success", $translate.instant('OPERATION_DETAILS_UPDATED_SUCCESSFULLY'))
                    $location.url('/operation/edit/' + $scope.operation.id)
                }
                else {
                    ss_alert.alert("success", $translate.instant('OPERATION_CREATED_SUCCESSFULLY'))
                    $location.url('/operation/edit/' + response.id)
                }
                $scope.store = response
                $scope.operation = angular.copy($scope.store)
                delete $scope.operation.operation_definition
                // Update rightmenu data for operations
                $rootScope.$emit('OPERATION_ADDED');
                $scope.definitions = []
                $scope.definitions = $scope.store.operation_definition.definition
                $('.butt_cancel').trigger('click')
                ui.opration_box_close();
            }

            var error = function (response) {
                var errormsg = ""
                angular.forEach(response.data.errors, function (key) {
                    errormsg += key + "<br>"
                })
                ss_alert.alert("error", errormsg)
            }

            // method to get different types of operation definition to add dynamic fields
            $scope.getOperationTypeData = function (operation_definition_id) {
                OperationService.operationTypeData({id: operation_definition_id}).$promise.then(function (data) {
                    if ($scope.operation.id != undefined && $scope.operation.id != operation_definition_id) {
                        $scope.operation.definition_value = {}
                    }
                    else if ($scope.operation.id != undefined) {
                        $scope.operation.definition_value = $scope.store.definition_value
                    }
                    $scope.definitions = data.definition
                })
            };
        }
    ])
});