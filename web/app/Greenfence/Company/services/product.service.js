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
    app.factory('ProductService', ['$resource', 'Environment',
        function ($resource, Environment) {
            var api = Environment.settings.api;

            return $resource(api + '/api/v1.0/community/product_categories.json',
                {}, {
                    'products': {
                        method: 'GET',
                        isArray: true,
                        params: {ids: '@ids'},
                        url: api + '/api/v1.0/community/product_categories/products.json'
                    },
                    'companyProducts': {
                        method: 'GET',
                        isArray: true,
                        url: api + '/api/v1.0/community/product_categories/company_products.json'
                    },
                    'getSupplyChainProducts': {
                        method: 'GET',
                        isArray: true,
                        params: {ids: '@ids'},
                        url: api + '/api/v1.0/community/product_categories/get_supply_chain_products.json'
                    }
                });
        }
    ])

});