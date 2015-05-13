'use strict';

/**
 * This file is part of the Greenfence package.
 *
 * (c) Ivan Proskuryakov
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @name            GreenfenceMessage
 * @description     ...
 */

define(['app'], function (app) {
    app.factory('GroupService', ['$resource', function ($resource) {
        return $resource('/api/v1.0/community/groups.json',
            {}, {}
        )
    }
    ])

});