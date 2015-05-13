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
    app.directive('gfFilterTemplate', ['$compile',
        function ($compile) {
            var template = '',

                operationTemplate = '<article class="post_block"><div class="post_b_w"><header class="post_header"><div class="user_block profile_small_mod "><div class="user_avatar_w profile_small_mod no_img_mod"><a href="#operation/{{data.id}}"> <img ng-src="{{data.image.image.thumb.url}}" alt="{{data.name}}" class="user_avatar_img contact_mod"></a></div><div class="user_name profile_small_mod">{{data.name}}</div></div><div ng-controller="CompanyPublicProfileFollowCtrl"><div ng-if="data.followed_by_current_user == false"><div class="post_follow_butt" ng-click="follow_me(data)">Follow</div></div><div ng-if="data.followed_by_current_user == true"><div class="post_follow_butt" ng-click="unfollow_me(data)">Unfollow</div></div></div></header><div class="post_content"><p>{{data.description}}</p></div><footer class="post_footer"><ul class="post_f_list"><li class="post_f_list_item"><dl class="tag_block"><dt class="tag_b_text">Products</dt><dd class="tag_b_value">{{data.products_count}}</dd></dl></li><li class="post_f_list_item"><dl class="tag_block"><dt class="tag_b_text">Service</dt><dd class="tag_b_value">{{data.services_count}}</dd></dl></li></ul></footer></div></article>',

                productTemplate = '<article class="msg_block"><header class="msg_header"><div class="user_block profile_small_mod "><div class="user_avatar_w profile_small_mod "><img style="width: 4.4rem;" ng-src="{{"/assets/avatar.png" }}" alt="{{data.name}}"></div><div class="user_name profile_small_mod">{{data.name}}</div></div></header><div class="msg_content"><p>{{data.description}}</p></div></article>',

                documentTemplate = '<article class="post_block"><div class="post_b_w"><header class="post_header"><div class="user_block profile_small_mod "><div class="user_avatar_w profile_small_mod no_img_mod"</div><div class="user_name profile_small_mod">{{data.document_name}}</div></div><div class="post_follow_butt">Follow</div></header><div class="post_content"><p>{{data.description || "No description Available"}}</p></div><footer class="post_footer"><ul class="post_f_list"><li class="post_f_list_item"><dl class="tag_block"><dt class="tag_b_text">Products</dt><dd class="tag_b_value">5</dd></dl></li></ul></footer></div><figure class="post_img_b"><div class="post_img_w"><img ng-src="/assets/avatar.png"  alt=""></div><figcaption class="post_img_caption"><p>{{data.description}}</p></figcaption></figure></article>',

                serviceTemplate = '<article class="msg_block"><header class="msg_header"><div class="user_block profile_small_mod "><div class="user_avatar_w profile_small_mod "><img style="width: 4.4rem;" ng-src="{{data.profile_picture.profile_picture.thumb.url}}" alt="{{data.name}}"></div><div class="user_name profile_small_mod">{{data.name}}</div></div></header><div class="msg_content"><p>{{data.description}}</p></div></article>',

                employeeTemplate = '<div class="user_block contact_mod "><div class="user_avatar_w contact_mod "><img ng-src="{{data.image.image.thumb.url}}" alt="{{data.name}}" class="user_avatar_img contact_mod"></div><div class="user_name contact_mod">{{data.name}}</div><div class="user_info contact_mod">{{data.title}}</div><div class="user_text contact_mod">{{data.summary}}</div><div class="user_msg_butt contact_mod">Message</div><div class="user_location contact_mod">{{data.city}}</div></div>';

            var getTemplate = function (filter_type) {
                    switch (filter_type) {
                        case 'operations':
                            template = operationTemplate
                            break
                        case 'products':
                            template = productTemplate
                            break
                        case 'documents':
                            template = documentTemplate
                            break
                        case 'services':
                            template = serviceTemplate
                            break
                        case 'users':
                            template = employeeTemplate
                            break
                        default:
                            template = ''
                    }
                    return template
                },

                linker = function (scope, element, attrs) {
                    $(element).html(getTemplate(scope.data.filter_type)).show()
                    $compile(element.contents())(scope)
                },

                filter_ctrl = function () {
                    //console.log('Directive Controller')
                }

            return {
                restrict: 'E',
                replace: true,
                scope: {
                    data: '=data'
                },
                link: linker,
                controller: filter_ctrl
            }
        }

    ]).directive('contentItem', ['$compile', 'ui',
        function ($compile, ui) {

            var textTemplate = '<div class="add_info_block"><div class="add_info_header"><div class="add_info_title" ng-if="data.required"><font color="RED"> *</font>{{data.name}}</div><div class="add_info_title" ng-if="!data.required">{{data.name}}</div><div class="add_info_colapse_butt"></div></div><div class="add_info_content_block"><div class="add_info_content"><p ng-if="definitionValueExist()">{{store.definition_value[data.id]}}</p></div><div class="add_info_form_block"><div class="add_info_form_w"><dl class="form_cell form_cell_v1_mod"><dt class="form_c_hline form_v1_mod hline_hide_mod"><label for="{{data.name}}">{{data.name}}</label></dt><dd class="form_c_f_w form_v1_mod hline_hide_mod"><input type="{{data.input_type}}" placeholder="{{data.name}}"  ng-required="{{data.required}}"  class="f_c_field default_mod" ng-model="operation.definition_value[data.id]"></dd></dl></div></div></div>',
                numberTemplate = '<div class="add_info_block"><div class="add_info_header"><div class="add_info_title" ng-if="data.required"><font color="RED"> *</font>{{data.name}}</div><div class="add_info_colapse_butt"></div></div><div class="add_info_content_block"><div class="add_info_content"><p ng-if="definitionValueExist()">{{store.definition_value[data.id]}}</p></div><div class="add_info_form_block"><div class="add_info_form_w"><dl class="form_cell form_cell_v1_mod"><dt class="form_c_hline form_v1_mod hline_hide_mod"><label for="{{data.name}}">{{data.name}}</label></dt><dd class="form_c_f_w form_v1_mod hline_hide_mod"><input type="{{data.input_type}}" name="{{data.name}}" placeholder="{{data.name}}" min="0"  ng-required="{{data.required}}" class="f_c_field default_mod" ng-model="operation.definition_value[data.id]"></dd></dl></div></div></div>',
                selectTemplate = '<div class="add_info_block"><div class="add_info_header"><div class="add_info_title" ng-if="data.required"><font color="RED"> *</font>{{data.name}}</div><div class="add_info_colapse_butt"></div></div><div class="add_info_content_block"><div class="add_info_content"><p ng-if="definitionValueExist()">{{store.definition_value[data.id]}}</p></div><div class="add_info_form_block"><div class="add_info_contentd_info_form_w"><dl class="form_cell form_cell_v1_mod"><dt class="form_c_hline form_v1_mod hline_hide_mod"><label for="{{data.name}}">{{data.name}}</label></dt><dd class="form_c_f_w form_v1_mod hline_hide_mod autocomplete_el_v1_mod"><ui-select  ng-required="{{data.required}}" ng-model="operation.definition_value[data.id]" theme="selectize"><ui-select-match placeholder="Select or search by name...">{{$select.selected.name}}</ui-select-match><ui-select-choices repeat="op.name as op in getOptions() |  filter: $select.search"><div ng-bind-html="op.name | highlight: $select.search"></div></ui-select-choices></ui-select></dd></dl></div></div></div>',
                radioTemplate = '<div class="add_info_block"><div class="add_info_header"><div class="add_info_title" ng-if="data.required"><font color="RED"> *</font>{{data.name}}</div><div class="add_info_colapse_butt"></div></div><div class="add_info_content_block"><div class="add_info_content"><p ng-if="definitionValueExist()">{{store.definition_value[data.id]}}</p></div><div class="add_info_form_block"><div class="add_info_form_w"><ul class="options_b_value_list"><li class="options_b_value_l_item" ng-repeat="op in getOptions()"><label class="lbl_rb_ch_block lbl_rb_ch_default_mod"><input name="{{data.name}}" type="{{data.input_type}}"  ng-required="{{data.required}}" ng-model="operation.definition_value[data.id]" ng-value="op.name" class="lbl_inp_rb_ch"/><span class="lbl_rb_ch_text lbl_rb_ch_t_default_mod lbl_rb_ch_t_default_green_white_mod">{{op.name}}</span></label></li></ul></div></div></div>',
                checkboxTemplate = '<div class="add_info_block"><div class="add_info_header"><div class="add_info_title" ng-if="data.required"><font color="RED"> *</font>{{data.name}}</div><div class="add_info_colapse_butt"></div></div><div class="add_info_content_block"><div class="add_info_content"><p ng-if="definitionValueExist()">{{checkedValues()}}</p></div><div class="add_info_form_block"><div class="add_info_form_w"><ul class="options_b_value_list"><li class="options_b_value_l_item" ng-repeat="op in getOptions()"><label class="lbl_rb_ch_block lbl_rb_ch_default_mod"><input type="{{data.input_type}}"  ng-required="{{data.required}}" ng-model="operation.definition_value[data.id][op.name]" ng-value="op.name" class="lbl_inp_rb_ch"/> <span class="lbl_rb_ch_text lbl_rb_ch_t_default_mod lbl_rb_ch_t_default_green_white_mod">{{op.name}}</span></label></li></ul></div></div></div>',
                imageTemplate = '<div class="add_info_block"><div class="add_info_header"><div class="add_info_title" ng-if="data.required"><font color="RED"> *</font>{{data.name}}</div><div class="add_info_colapse_butt"></div></div><div class="add_info_content_block"><div class="add_info_content"><a ng-if="definitionValueExist()" href="{{store.definition_value[data.id]}}" title="Click here to see file" class="file_link" download>Uploaded File</a></div><div class="add_info_form_block"><div class="add_info_form_w"><div class="add_info_form_w"><dl class="form_cell form_cell_v1_mod"><dt class="form_c_hline form_v1_mod hline_hide_mod"><label for="{{data.name}}">{{data.name}}</label></dt><dd class="form_c_f_w form_v1_mod hline_hide_mod"><input type="{{data.input_type}}"  placeholder="{{data.name}}" class="f_c_field default_mod file_mod" ng-model="operation.definition_value[data.id]"  ng-required="{{data.required}}" base-sixty-four-input ><span class="f_c_field_file_field"><span class="f_c_field_file_text">Upload image</span><span class="f_c_field_file_butt">Choose File</span></span></dd></dl></div></div></div></div>';

            var getTemplate = function (inputType) {
                var template = '';
                switch (inputType) {
                    case 'text':
                        template = textTemplate;
                        break;
                    case 'number':
                        template = numberTemplate;
                        break;
                    case 'select':
                        template = selectTemplate;
                        break;
                    case 'radio':
                        template = radioTemplate;
                        break;
                    case 'checkbox':
                        template = checkboxTemplate;
                        break;
                    case 'file':
                        template = imageTemplate;
                        break;
                }
                return template;
            }

            var DynamicContentCtrl = function ($scope) {
                var optionsList = []
                $scope.getOptions = function () {
                    if (optionsList.length == 0) {
                        angular.forEach(this.data.options.split("\n"), function (option) {
                            optionsList.push({"name": option});
                        });
                    }
                    return optionsList;
                }
                $scope.definitionValueExist = function () {
                    if ($scope.store != undefined && $scope.store.definition_value != undefined && $scope.store.definition_value[this.data.id])
                        return true;
                    else
                        return false;
                }
                $scope.checkedValues = function () {
                    var checked = ""
                    angular.forEach(this.store.definition_value[this.data.id], function (key, value) {
                        if (checked == "")
                            checked += value
                        else
                            checked = checked + "," + value
                    });
                    return checked;
                }
            }

            var linker = function (scope, element, attrs) {
                scope.store = scope.$parent.store
                $(element).html(getTemplate(scope.data.input_type)).show();
                ui.collapse_butt_with_dom($(element))
                scope.operation = scope.$parent.operation
                $compile(element.contents())(scope);
            }

            return {
                restrict: 'E',
                replace: true,
                scope: {
                    data: '=data'
                },
                link: linker,
                controller: DynamicContentCtrl,
            }
        }

    ]).directive('gfMultipleFileUpload', ['$compile',
        function ($compile) {
            var template = '<div class="add_info_content_block"><div class="add_info_form_block" style="display: block;"><div class="add_info_form_w"><dl class="form_cell form_cell_v1_mod"><dt class="form_c_hline form_v1_mod hline_hide_mod"><label for="Upload_image">Upload image</label></dt><dd class="form_c_f_w form_v1_mod hline_hide_mod"><input type="file" id="Upload_image" placeholder="Upload image" class="f_c_field default_mod file_mod "><span class="f_c_field_file_field"><span class="f_c_field_file_text">Upload image</span><span class="f_c_field_file_butt">Choose File</span></span></dd></dl></div><div class="butt_wrap add_info_form_mod"><div class="attach_butt image_mod">Attach another image</div><div class="butt_cancel">Cancel</div><div class="butt_save">Save</div></div></div></div>',
                subTemplte = '<div class="add_info_form_w"><dl class="form_cell form_cell_v1_mod"><dt class="form_c_hline form_v1_mod hline_hide_mod"><label for="Upload_image">Upload image</label></dt><dd class="form_c_f_w form_v1_mod hline_hide_mod"><input type="file" id="Upload_image" placeholder="Upload image" class="f_c_field default_mod file_mod "><span class="f_c_field_file_field"><span class="f_c_field_file_text">Upload image</span><span class="f_c_field_file_butt">Choose File</span></span></dd></dl></div>';

            var file_uploader_ctrl = function () {

                },

                linker = function (scope, element, attrs) {

                }

            return {
                restrict: 'E',
                replace: true,
                scope: {
                    data: '=data'
                },
                link: linker,
                controller: file_uploader_ctrl
            }

        }
    ])

});