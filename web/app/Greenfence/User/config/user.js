'use strict';

/**
 * This file is part of the Greenfence package.
 *
 * (c) Ivan Proskuryakov
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @name            GreenfenceUser
 * @description     ...
 */

define(['app'], function (app) {
    app.config(['$routeProvider', '$stateProvider', function ($routeProvider, $stateProvider) {

        $stateProvider
            .state("userEditProfile", {
                url: "/:locale/user_edit_profile",
                controller: 'UserProfileCtrl',
                templateUrl: '/app/Greenfence/User/views/profile.html'
            })
            .state('userPublicProfile', {
                url: "/:locale/user_public_profile",
                controller: 'UserPublicProfileCtrl',
                templateUrl: '/app/Greenfence/User/views/user_public_profile.html'
            })
            .state('userPublicProfileById', {
                url: "/:locale/user_public_profile/:id",
                controller: 'UserPublicProfileCtrl',
                templateUrl: '/app/Greenfence/User/views/user_public_profile.html'
            })
            .state('userSettings', {
                url: "/:locale/user_settings",
                controller: 'UserSettingsCtrl',
                templateUrl: '/app/Greenfence/User/views/user_settings.html'
            })
            .state('userDocuments', {
                url: "/:locale/user_documents",
                controller: 'UserDocumentCtrl',
                templateUrl: '/app/Greenfence/User/views/add_user_document.html'
            })
            .state('userDocumentEditByDocumentId', {
                url: "/:locale/user_document/edit/:documentId",
                controller: 'UserDocumentCtrl',
                templateUrl: '/app/Greenfence/User/views/add_user_document.html'
            })
            .state('sharedRecords', {
                url: "/:locale/shared_records",
                controller: 'SharedRecordCtrl',
                templateUrl: '/app/Greenfence/User/views/shared_records.html'
            })
            .state('customRoles', {
                url: "/:locale/custom_roles",
                controller: 'CustomRoleCtrl',
                templateUrl: '/app/Greenfence/User/views/custom_role.html'
            })
            .state('customRole', {
                url: "/:locale/custom_role/show/:customRoleId",
                controller: 'CustomRoleCtrl',
                templateUrl: '/app/Greenfence/User/views/custom_role.html'
            })
            .state('assignRole', {
                url: "/:locale/assign_role",
                controller: 'AssignRoleCtrl',
                templateUrl: '/app/Greenfence/User/views/assign_role.html'
            })
            .state('roles', {
                url: "/:locale/roles",
                controller: 'RolesCtrl',
                templateUrl: '/app/Greenfence/User/views/roles.html'
            })
            .state('publicUserDocumentCtrl', {
                url: "/:locale/user_document/:documentId/sharing_record_detail",
                controller: 'PublicUserDocumentCtrl',
                templateUrl: '/app/Greenfence/User/views/document_detail.html'
            });
        //otherwise({redirectTo: '/user_edit_profile'})

    }]);
});