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
    app.factory('MessageService', ['$resource', function ($resource) {
        return $resource('/api/v1.0/community/communications.json',
            {}, {
                'inMessages': {
                    method: 'GET',
                    isArray: true,
                    url: '/api/v1.0/community/communications/in_messages.json'
                },
                'contactsAndGroups': {
                    method: 'GET',
                    isArray: true,
                    url: '/api/v1.0/community/communications/contacts_and_groups.json'
                },
                'allUsers': {method: 'GET', isArray: true, url: '/api/v1.0/community/communications/all_users.json'}
            }
        )
    }
    ])

});