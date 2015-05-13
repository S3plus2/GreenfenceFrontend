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
    app.factory('OperationService', ['$resource', 'Environment',
        function ($resource, Environment) {
            var api = Environment.settings.api;

            return $resource(api + '/api/v1.0/community/operations/:id.json',
                {}, {
                    'update': {method: 'PUT'},
                    'getOprationTypes': {
                        method: 'GET',
                        isArray: true,
                        url: api + '/api/v1.0/community/operation_definitions/definition_types.json'
                    },
                    'operationTypeData': {
                        method: 'GET',
                        url: api + '/api/v1.0/community/operation_definitions/:id.json'
                    },
                    'associateProducts': {
                        method: 'POST',
                        params: {id: '@id'},
                        url: api + '/api/v1.0/community/operations/:id/associate_products.json'
                    },
                    'getBusinessTypes': {
                        method: 'GET',
                        isArray: true,
                        url: api + '/api/v1.0/community/operations/business_types.json'
                    },
                    'getBusinessSubTypes': {
                        method: 'GET',
                        isArray: true,
                        url: api + '/api/v1.0/community/operations/business_sub_types.json'
                    }
                });
        }
    ])

});