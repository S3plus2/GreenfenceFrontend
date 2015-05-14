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
    app.controller('DocumentDefinitionsCtrl', ['$rootScope', '$scope', '$routeParams', '$compile', '$location', '$translate', '$timeout', 'DocumentDefinitionsService', 'OperationService', 'ss_alert', 'ui', function ($rootScope, $scope, $routeParams, $compile, $location, $translate, $timeout, DocumentDefinitionsService, OperationService, ss_alert, ui) {

        ui.collapse_butt_with_dom($(document))
        ui.multi_select_with_dom($('.select_add_category'))

        $scope.$parent.template = {
            header: '/community/common/header',
            slider: '',
            rightmenu: '/app/Greenfence/Company/views/rightmenu.html',
            footer: ''
        }

        $scope.document_definition = {
            document_type_for: null
        }

        $scope.document_type_for_list = [
            {value: 'User', type: 'Personal'},
            {value: 'Company', type: 'Company'}
        ];

        $scope.counter = 1;
        $scope.attach_multiple_images = function () {
            var fileTemplate = '<div id="d_structure" style="margin-top: 10px"><div class="mb_inp boxshadow_border" style="background: transparent; width: 85%; height: 100px; float: left;"><input type="hidden" required  ng-model="document_definition.definition[' + $scope.counter + '].id" ng-init="document_definition.definition[' + $scope.counter + '].id=' + $scope.counter + '"/><input type="hidden" required ng-model="document_definition.definition[' + $scope.counter + '].sort_order" ng-init="document_definition.definition[' + $scope.counter + '].sort_order=' + $scope.counter + '"/><input type="text" ng-model="document_definition.definition[' + $scope.counter + '].name" id="name" class="d_padding" style="width: 120px; vertical-align: top;" placeholder="Enter name"><select ng-model="document_definition.definition[' + $scope.counter + '].input_type" id="input_type" class="d_padding" ng-change="showHideOption($event);" style="margin-left: 3.5px;"><option value="">Field type...</option><option value="text">Text Box</option><option value="checkbox">Check Box</option><option value="radio">Radio Button</option><option value="number">Number</option><option value="select">Select List</option><option value="standard">Standard List</option><option value="file">File</option></select><select class="d_padding" ng-model="document_definition.definition[' + $scope.counter + '].required" style="margin-left: 3.5px;"><option value="">Required...</option><option value="true">Yes</option><option value="false">No</option></select><select class="d_padding" ng-model="document_definition.definition[' + $scope.counter + '].searchable" id="searchable" style="margin-left: 3.5px;"><option value="">Searchable...</option><option value="true">Yes</option><option value="false">No</option></select><textarea rows="4" class="d_padding" ng-model="document_definition.definition[' + $scope.counter + '].options" id="options" style="display:none; float:right; width: 120px; margin-left: 3.5px;"></textarea><select class="d_padding" ng-model="document_definition.definition[' + $scope.counter + '].standard" id="standard" style="display:none; margin-left: 3.5px;"><option value="">Standards...</option><option selected="true" value="business">Business Type</option><option value="scheme">Scheme Type</option></select></div><img title="Remove" src="" ng-click="removeStructure($event);" style="margin: 10px; height:80px;"></div>';
            $scope.counter++
            var parent = $(event.srcElement).closest('.add_info_form_block').find('.add_info_form_w')
            parent.append(fileTemplate)
            $compile(parent)($scope);
        }

        $scope.removeStructure = function () {
            $(event.srcElement).parent().remove();
        }

        $scope.showHideOption = function () {
            var field_type_value = $(event.srcElement).val()
            var optionShow = ['radio', 'list', 'checkbox', 'select']
            if (optionShow.indexOf(field_type_value) != -1) {
                $(event.srcElement).siblings("[id=options]").show()
            } else {
                $(event.srcElement).siblings("[id=options]").hide()
            }
            if (field_type_value == 'standard') {
                $(event.srcElement).siblings("[id=standard]").show()
            } else {
                $(event.srcElement).siblings("[id=standard]").hide()
            }
        }

        $scope.createDocumentDefinition = function (document_definition) {
            if (document_definition.document_type_for == 'Company')
                document_definition.document_type_for_id = $('#current_company_id').val()
            else if (document_definition.document_type_for == 'Personal')
                document_definition.document_type_for_id = $('#current_user_id').val()
            DocumentDefinitionsService.save(document_definition).$promise.then(success, error)
        };
        // success or error handling after create/update
        var success = function (response) {
            $scope.store = response
            if ($scope.document_definition.id != null) {
                ss_alert.alert("success", $translate.instant('DOCUMENT_DEFINITION_DETAILS_UPDATED_SUCCESSFULLY'))
            }
            else {
                ss_alert.alert("success", $translate.instant('DOCUMENT_DEFINITION_CREATED_SUCCESSFULLY'))
            }
            $scope.document_definition = angular.copy($scope.store)

            // Update rightmenu data for operations
            $rootScope.$emit('DOCUMENT_DEFINITION_ADDED')
            $('.butt_cancel').trigger('click')
        }

        var error = function (response) {
            ss_alert.alert("error", response.data.errors || response.data.error)
        }
    }
    ])
});