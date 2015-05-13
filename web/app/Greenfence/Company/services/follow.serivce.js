'use strict';

/**
 * This file is part of the Greenfence package.
 *
 * (c) Ivan Proskuryakov
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @name            GreenfenceCompany
 * @description     ...
 */

define(['app'], function (app) {
    app.factory('FollowService', ['$resource', 'Environment',
        function ($resource, Environment) {
            var api = Environment.settings.api;

            return $resource(api + '/api/v1.0/community/follows.json',
                {}, {
                    'getCompanyFollowCount': {
                        method: 'GET',
                        url: api + '/api/v1.0/community/follows/company_follows_count.json'
                    },
                    'followAll': {method: 'POST', url: api + '/api/v1.0/community/follows/follow_all.json'}
                });
        }])

});