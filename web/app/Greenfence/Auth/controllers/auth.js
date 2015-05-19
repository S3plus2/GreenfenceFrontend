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
    app.controller('AuthCtrl', ['$location', '$scope', '$routeParams', '$rootScope', '$state', 'Environment',
        function ($location, $scope, $routeParams, $rootScope, $state, Environment) {
            $scope.emptyTemplate = true;
        }]);
});