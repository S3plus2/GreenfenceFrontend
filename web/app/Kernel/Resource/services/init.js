'use strict';

/**
 * This file is part of the Aisel package.
 *
 * (c) Ivan Proskuryakov
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @name            AiselKernel
 * @description     Most important data are loaded here
 */

define(['app'], function (app) {
    console.log('Kernel init service loaded ...');
    angular.module('app')
        .service('initService', [
            '$http',
            '$rootScope',
            'settingsService',
            'Environment',
            '$timeout',
            function ($http,
                      $rootScope,
                      settingsService,
                      Environment,
                      $timeout) {
                return {
                    launch: function () {
                        console.log('----------- App Loaded! -----------');

                        // Init
                        $timeout(function () {
                            global_f();
                        });

                        // Hook for on route change
                        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                            console.log('State Change ...');

                            $timeout(function () {
                                global_f();
                            });

                        });

                        //// Load settings data
                        //settingsService.getApplicationConfig().success(
                        //    function (data, status) {
                        //
                        //    }
                        //);
                    }
                }
            }
        ]);
});