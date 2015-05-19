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
 * @description     GreenfenceMessage
 */

define(['app'], function (app) {
    app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state("messageCenter", {
                url: "/messages_center",
                templateUrl: '/app/Greenfence/Message/views/messages_center.html',
                controller: 'MessageCenterCtrl'
            });
    }]);
});
