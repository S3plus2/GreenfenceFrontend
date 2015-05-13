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
    app.factory('SupplyChainService', ['$resource',
        function ($resource) {
            return $resource('/api/v1.0/community/supply_chain_invitations/:id.json',
                {}, {
                    'suppliableBuyable': {
                        method: 'GET',
                        isArray: true,
                        url: '/api/v1.0/community/company/suppliable_buyable.json'
                    },
                    'invitedEntities': {
                        method: 'GET',
                        url: '/api/v1.0/community/supply_chain_invitations/invited_entities.json'
                    },
                    'getProducts': {
                        method: 'GET',
                        isArray: true,
                        url: '/api/v1.0/community/product_categories/entity_products.json'
                    }
                }
            );
        }
    ])
}());