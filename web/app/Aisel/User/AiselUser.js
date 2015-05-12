'use strict';

/**
 * This file is part of the Aisel package.
 *
 * (c) Ivan Proskuryakov
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @name            AiselUser
 * @description     User module
 */

define(['app',
    './config/user',

    './controllers/userProfile.controller',
    './controllers/userInvitation.controller',
    './controllers/userFolder.controller',
    './controllers/userDocument.controller',
    './controllers/shareUserDocument.controller',
    './controllers/sharedRecord.controller',
    './controllers/customRole.controller',

    './services/users',
    './services/userFolder.service',
    './services/userDocument.service',
    './services/shareUserDocument.service',
    './services/sharedRecord.service',
    './services/invitation.service',
    './services/customRole.service'
], function (app) {
    console.log('User module loaded ...');
});