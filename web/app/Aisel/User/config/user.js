'use strict';

/**
 * This file is part of the Aisel package.
 *
 * (c) Ivan Proskuryakov
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @name            AiselUser
 * @description     Module config
 */

define(['app'], function (app) {
    app.config(['$routeProvider','$stateProvider', function ($routeProvider, $stateProvider) {

        $stateProvider
        .state("user_edit_profile", {
            url: "/:locale/user_edit_profile",
            controller: 'UserProfileCtrl',
            templateUrl: '/community/user/profile'
            //templateUrl: '/app/Aisel/Homepage/views/homepage.html',
            //controller: 'HomepageCtrl'
        });


        //$routeProvider.
        //    when('/user_edit_profile', {
        //        controller: 'UserProfileCtrl',
        //        templateUrl: '/community/user/profile'
        //    }).
        //    when('/user_public_profile', {
        //        controller: 'UserPublicProfileCtrl',
        //        templateUrl: '/community/user/user_public_profile'
        //    }).
        //    when('/user_public_profile/:id', {
        //        controller: 'UserPublicProfileCtrl',
        //        templateUrl: '/community/user/user_public_profile'
        //    }).
        //    when('/user_settings', {
        //        controller: 'UserSettingsCtrl',
        //        templateUrl: '/community/user/user_settings'
        //    }).
        //    when('/user_documents', {
        //        controller: 'UserDocumentCtrl',
        //        templateUrl: '/community/user/add_user_document'
        //    }).
        //    when('/user_document/edit/:documentId', {
        //        controller: 'UserDocumentCtrl',
        //        templateUrl: '/community/user/add_user_document'
        //    }).
        //    when('/shared_records', {
        //        controller: 'SharedRecordCtrl',
        //        templateUrl: '/community/user/shared_records'
        //    }).
        //    when('/custom_roles', {
        //        controller: 'CustomRoleCtrl',
        //        templateUrl: '/community/user/custom_role'
        //    }).
        //    when('/custom_role/show/:customRoleId', {
        //        controller: 'CustomRoleCtrl',
        //        templateUrl: '/community/user/custom_role'
        //    }).
        //    when('/assign_role', {
        //        controller: 'AssignRoleCtrl',
        //        templateUrl: '/community/user/assign_role'
        //    })
        //    .when('/roles', {
        //        controller: 'RolesCtrl',
        //        templateUrl: '/community/user/roles'
        //    })
        //    .when('/user_document/:documentId/sharing_record_detail', {
        //        controller: 'PublicUserDocumentCtrl',
        //        templateUrl: '/community/user/document_detail'
        //    }).
        //    otherwise({redirectTo: '/user_edit_profile'})

    }]);
});