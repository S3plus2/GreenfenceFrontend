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
    app.factory('CompanyFolderService', ['$resource',
        function ($resource) {
            return $resource('/api/v1.0/community/company_folder/:id.json',
                {}, {}
            )
        }
    ])

});