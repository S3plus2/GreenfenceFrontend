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
    app.factory('ServiceService', ['$resource', 'Environment',
        function ($resource, Environment) {
            var api = Environment.settings.api;

            return $resource(api + '/api/v1.0/community/services/:id.json',
                {}, {
                    'update': {method: 'PUT'},
                    'companyServices': {
                        method: 'GET',
                        isArray: true,
                        url: api + '/api/v1.0/community/services/company_services.json'
                    }
                });
        }
    ])
});