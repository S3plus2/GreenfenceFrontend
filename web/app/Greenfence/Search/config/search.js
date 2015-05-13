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
    app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state("search", {
                url: "/:locale/search",
                controller: 'SearchCtrl',
                templateUrl: '/app/Greenfence/Search/views/search_result.html'
            });
    }]);
});
