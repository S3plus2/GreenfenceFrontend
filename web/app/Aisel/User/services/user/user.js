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
 * @description     ...
 */

define(['app'], function (app) {
    app.service('userService', ['$http', 'Environment', function ($http, Environment) {
        return {
            register: function (form) {
                var username = form.username.$modelValue;
                var email = form.email.$modelValue;
                var password = form.password.$modelValue;
                var url = Environment.settings.api + '/user/register.json?username=' + username + '&password=' + password + '&email=' + email;
                console.log(url);
                return $http.get(url);
            },
            signout: function () {
                var url = Environment.settings.api + '/user/logout/';
                console.log(url);
                return $http.get(url);
            },
            getUserInformation: function () {
                var url = Environment.settings.api + '/user/';
                console.log(url);
                return $http.get(url);
            }
        };
    }]);
});