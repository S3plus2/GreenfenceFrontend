'use strict';

/**
 * This file is part of the Greenfence package.
 *
 * (c) Ivan Proskuryakov
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @name            GreenfenceMessage
 * @description     ...
 */

define(['app'], function (app) {
    app.controller('MessageCenterCtrl', ['$scope', '$location', '$translate', '$timeout', '$firebaseObject', 'MessageService', 'GroupService',
        function ($scope, $location, $translate, $timeout, $firebaseObject, MessageService, GroupService) {

            $scope.$parent.template = {
                header: '/community/common/header',
                slider: '',
                rightmenu: '/app/Greenfence/Message/views/rightmenu.html',
                footer: ''
            };

            //$scope.userId = $('#user_id').val()
            //$scope.inMessages = {}
            //$scope.communication = {} // {to_type: "User", to_id: 3, message: "my message"}
            //$scope.contactsAndGroups = []
            //$scope.allUsers = []
            //$scope.addedUsersToGroup = []
            //$scope.group = {name: null, privacy_type: 'private', member_ids: []} // {name: "name", privacy_type: "public or private", member_ids: [1,2,3]}
            //
            //var ref = new Firebase('https://rf2karry2bc.firebaseio-demo.com/messages');
            //
            //MessageService.inMessages().$promise.then(function (data) {
            //    $scope.inMessages = data
            //})
            //
            //
            //// retrieve the last record from `ref`
            //ref.limitToLast(1).on('child_added', function (snapshot) {
            //    console.log("handling event 1");
            //    var added_msg = snapshot.val();
            //
            //    if ($.inArray(parseInt($scope.userId), added_msg.receiver_ids) > -1) {
            //        console.log("child added");
            //        MessageService.inMessages().$promise.then(function (data) {
            //            $scope.inMessages = data
            //        })
            //    }
            //});
            //
            //// get the contacts and groups for autocomplete of the new message
            //MessageService.contactsAndGroups().$promise.then(function (data) {
            //    $scope.contactsAndGroups = data
            //})
            //
            //// get all users for autocomplete of the new group
            //MessageService.allUsers().$promise.then(function (data) {
            //    $scope.allUsers = data
            //})
            //
            //// sending message in the message center page
            //$scope.send_message = function () {
            //    MessageService.save($scope.communication).$promise.then(function (data) {
            //        console.log(data)
            //        console.log("Success")
            //    }, function (reason) {
            //        console.log("Error")
            //    })
            //
            //    $scope.communication = {}
            //}
            //
            //// reply message in the message center page
            //$scope.reply_message = function (to_user) {
            //    $scope.communication.to_type = "User"
            //    $scope.communication.to_id = to_user
            //    MessageService.save($scope.communication).$promise.then(function (data) {
            //        console.log(data)
            //        console.log("Success")
            //    }, function (reason) {
            //        console.log("Error")
            //    })
            //
            //    $scope.communication = {}
            //}
            //
            //// create new group
            //$scope.create_new_group = function () {
            //    GroupService.save($scope.group).$promise.then(function (data) {
            //        console.log("Success")
            //    }, function (reason) {
            //        console.log("Error")
            //    })
            //
            //    $scope.group = {name: null, privacy_type: 'private', member_ids: []}
            //}
            //
            //// remove selected user with index
            //$scope.remove_selected_user = function (index) {
            //    $scope.addedUsersToGroup.splice(index, 1)
            //    $scope.group.member_ids.splice(index, 1)
            //}
            //
            //$timeout(function () {
            //    console.log('message time 1');
            //    $('body').removeClass('profile_page');
            //    $('body').addClass('messages_center_page');
            //    $(document).trigger('ready_view');
            //    console.log('message time 2');
            //}, 2000);
            $timeout(function () {
                global_f();
                about_page_f();
            });
        }
    ]);

    app.directive('remove', function () {
        return function (scope, element, attrs) {
            element.bind("mousedown", function () {
                scope.remove(element);
                scope.$apply();
            })
        };
    });

});