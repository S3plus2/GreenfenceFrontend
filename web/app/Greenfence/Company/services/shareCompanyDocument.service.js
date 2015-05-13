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
    app.factory('ShareCompanyDocumentService', ['$resource',
        function ($resource) {
            return $resource('/api/v1.0/community/company_document/:id.json',
                {}, {
                    'shareDocument': {method: 'POST', url: '/api/v1.0/community/company_document/share_document.json'}
                }
            )
        }
    ])

})();