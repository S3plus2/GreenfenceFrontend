'use strict';

/**
 * This file is part of the Greenfence package.
 *
 * (c) Ivan Proskuryakov
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @name            GreenfenceAuth
 * @description     ...
 */

define(['app'], function (app) {
    app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state("welcome_page", {
                url: "/welcome_page",
                controller: 'AuthCtrl',
                templateUrl: '/app/Greenfence/Auth/views/welcome_page.html',
            });
    }]);
});