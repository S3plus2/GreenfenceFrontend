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
    app.controller('ServiceCtrl', ['$rootScope', '$scope', '$routeParams', '$compile', '$location', '$translate', '$timeout', 'OperationService', 'ServiceService', 'ss_alert', 'ui',
        function ($rootScope, $scope, $routeParams, $compile, $location, $translate, $timeout, OperationService, ServiceService, ss_alert, ui) {

            ui.collapse_butt_with_dom($(document))
            ui.multi_select_with_dom($('.select_add_category'))

            $scope.$parent.template = {
                header: '/community/common/header',
                slider: '',
                rightmenu: '/app/Greenfence/Company/views/rightmenu.html',
                footer: ''
            }

            if ($scope.service == undefined) {
                $scope.service = {}
                $scope.store = {}
            }
            $scope.definitions = []
            // handle show service
            if ($routeParams.serviceId) {
                ServiceService.get({id: $routeParams.serviceId}).$promise.then(function (data) {
                    $scope.store = data
                    $scope.service = angular.copy($scope.store)
                })
            }

            $scope.operations = []
            $scope.operation = {}

            OperationService.query().$promise.then(function (data) {
                $scope.operations = data
            })

            // create or update service
            $scope.createService = function (service) {
                if (service.id) {
                    ServiceService.update({id: service.id}, service).$promise.then(success, error)
                }
                else {
                    ServiceService.save(service).$promise.then(success, error)
                }
            };
            // success or error handling after create/update
            var success = function (response) {
                $scope.store = response
                if ($scope.service.id != null) {
                    ss_alert.alert("success", $translate.instant('SERVICE_DETAILS_UPDATED_SUCCESSFULLY'))
                }
                else {
                    ss_alert.alert("success", $translate.instant('SERVICE_CREATED_SUCCESSFULLY'))
                }
                $scope.service = angular.copy($scope.store)
                ui.collapse_all()

                // Update rightmenu data for operations
                $rootScope.$emit('SERVICE_ADDED')
                $('.butt_cancel').trigger('click')
                ui.opration_box_close();
            }

            var error = function (response) {
                ss_alert.alert("error", response.data.errors || response.data.error)
            }

            $scope.files_counter = 1;

            $scope.attach_multiple_images = function (event) {
                var fileTemplate = '<dl class="form_cell form_cell_v1_mod"><dt class="form_c_hline form_v1_mod hline_hide_mod"><label for="Upload_image">Upload Image</label></dt><dd class="form_c_f_w form_v1_mod hline_hide_mod"><input type="file" id="Upload_image" ng-model="service.uploaded_files_attributes[' + $scope.files_counter + '].image" base-sixty-four-input placeholder="Upload Image" class="f_c_field default_mod file_mod"><span class="f_c_field_file_field"><span class="f_c_field_file_text">{{service.uploaded_files_attributes[' + $scope.files_counter + '].image.filename || "Upload image"}}</span><span class="f_c_field_file_butt">Choose File</span></span></dd></dl>';
                $scope.files_counter++
                var parent = $(event.srcElement).closest('.add_info_form_block').find('.add_info_form_w')
                parent.append(fileTemplate)
                $compile(parent)($scope);
            }

            var file;
            $scope.myImage = '';
            $scope.myCroppedImage = '';

            $scope.upload_service_image = function () {
                if ($scope.service.profile_picture == null) {
                    $scope.service['profile_picture'] = {}
                }
                $scope.service.profile_picture.base64 = $scope.myCroppedImage.substring(21)
                $scope.service.profile_picture.filename = file.name.substring(0, file.name.lastIndexOf('.')) + ".png"
                $scope.service.profile_picture.filetype = "image/png"
                $('#service_img_crop').bPopup().close()
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
                    $('#service_img_crop').bPopup()
                }
            }
        }
    ])
});
