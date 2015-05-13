'use strict';

/**
 * This file is part of the Greenfence package.
 *
 * (c) Ivan Proskuryakov
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @name            GreenfenceSearch
 * @description     ...
 */

define(['app'], function (app) {
    app.directive('gfSearchTemplate', ['$compile',
        function ($compile) {
            var template = '',

                operationTemplate = '<div ng-class="{primary_mod: data.featured}" class="user_block search_mod"><div class="user_avatar_w search_mod"><img ng-src="{{data.profile.thumb_url}}" alt="{{data.name}}" class="user_avatar_img search_mod"></div><a href="" class="user_name search_mod">{{data.name}}</a><div class="user_info search_mod">By: {{data.company.name}}</div><div class="user_text search_mod">{{data.profile.summary}}</div><div class="search_action_butt search_mod">More</div><div><ul class="dynamic_fields" ><li ng-repeat="(k,v) in data.searchable_fields"><span class="left"> {{k}}</span> <span class="right"> {{v}}</span> </li> </ul> </div>',

                companyTemplate = '<div class="user_block search_mod search_company_mod"><div class="user_avatar_w search_mod search_company_mod"><img ng-src="{{data.profile.thumb_url}}" alt="{{data.name}}" class="user_avatar_img search_mod search_company_mod"></div><a href="#/company_public_profile/{{data.id}}" class="user_name search_mod search_company_mod">{{data.name}}</a><div class="user_text search_mod search_company_mod">{{data.profile.summary}}</div><div class="search_action_butt search_mod search_company_mod">More</div><div class="user_b_footer search_mod search_company_mod"><ul class="post_f_list"><li class="post_f_list_item"><dl class="tag_block"><dt class="tag_b_text">Operations</dt><dd class="tag_b_value">{{data.profile.operations_count}}</dd></dl></li><li class="post_f_list_item"><dl class="tag_block"><dt class="tag_b_text">Services</dt><dd class="tag_b_value">{{data.profile.services_count}}</dd></dl></li><li class="post_f_list_item"><dl class="tag_block"><dt class="tag_b_text">Products</dt><dd class="tag_b_value">{{data.profile.products_count}}</dd></dl></li><li class="post_f_list_item"><dl class="tag_block"><dt class="tag_b_text">Certificates</dt><dd class="tag_b_value">0</dd></dl></li></ul></div></div>',

                productTemplate = '',

                documentTemplate = '',

                serviceTemplate = '<div ng-class="{ primary_mod: data.featured }" class="user_block search_mod"><div class="user_avatar_w search_mod primary_mod"><img ng-src="{{data.profile.thumb_url}}" alt="{{data.name}}" class="user_avatar_img search_mod primary_mod"></div><a href="" class="user_name search_mod primary_mod">{{data.name}}</a><div class="user_info search_mod primary_mod">By: {{data.company.name}}</div><div class="user_text search_mod primary_mod">{{data.profile.summary}}</div><div class="search_action_butt search_mod primary_mod">More</div></div>',

                employeeTemplate = '<div ng-class="{ primary_mod: data.featured }" class="user_block search_mod"><div class="user_avatar_w search_mod"><img ng-src="{{data.profile.thumb_url}}" alt="{{data.name}}" class="user_avatar_img search_mod"></div><a href="#/user_public_profile/{{data.id}}" class="user_name search_mod">{{data.name}}</a><div class="user_info search_mod">{{data.profile.title}}</div><div class="user_text search_mod">{{data.profile.summary}}</div><div class="search_action_butt search_mod">More</div><div class="user_b_footer search_mod"><div class="user_location search_mod">{{data.profile.location}}</div><div class="user_charge search_mod">Person in charge</div></div></div>';

            var getTemplate = function (filter_type) {
                    switch (filter_type) {
                        case 'Operation':
                            template = operationTemplate
                            break
                        case 'Company':
                            template = companyTemplate
                            break
                        case 'Product':
                            template = productTemplate
                            break
                        case 'Document':
                            template = documentTemplate
                            break
                        case 'Service':
                            template = serviceTemplate
                            break
                        case 'User':
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
    ])

});