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
    app.factory('SearchService', ['$resource', 'Environment',
        function ($resource, Environment) {
            var api = Environment.settings.api;

            return $resource(api + '/api/v1.0/community/search.json',
                {}, {}
            )
        }
    ])

});