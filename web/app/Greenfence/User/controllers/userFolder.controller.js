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

    app.controller('UserFolderCtrl', ['$rootScope', '$scope', '$filter', 'UserService', 'UserFolderService', 'ss_alert', '$translate', 'ui', '$http', '$timeout',
        function ($rootScope, $scope, $filter, UserService, UserFolderService, ss_alert, $translate, ui, $http, $timeout) {

            var authorId = $('#user_id').val()
            $scope.folder = {
                author_id: authorId
            }

            $scope.createFolder = function (folder) {
                UserFolderService.save(folder).$promise.then(success, error)
            }

            var success = function (data) {
                $('#user_folder_msg_box').text($translate.instant('FOLDER_CREATED_SUCCESSFULLY')).css({
                    "font-size": "3",
                    "color": 'Green'
                })
                $rootScope.$emit('USER_FOLDER_ADDED');
                $timeout(function () {
                    $('#user_folder_msg_box').empty()
                    $('.dialog_cancel_butt').trigger('click')
                }, 2000)
            }

            var error = function (reason) {
                $('#user_folder_msg_box').text(reason.data.errors).css({"font-size": "3", "color": "Red"})
                $timeout(function () {
                    $('#user_folder_msg_box').empty()
                }, 4500)
            }
        }
    ])

});