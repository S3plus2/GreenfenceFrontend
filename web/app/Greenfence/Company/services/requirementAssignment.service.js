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
    app.factory('RequirementAssignmentService', ['$resource', function ($resource) {
        return $resource('/api/v1.0/community/requirement_assignments.json',
            {}, {
                'getSuppliers': {method: 'GET', url: '/api/v1.0/community/supply_chains/get_suppliers.json'},
                'getBuyers': {method: 'GET', url: '/api/v1.0/community/supply_chains/get_buyers.json'}
            });
    }])

})();