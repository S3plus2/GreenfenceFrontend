'use strict';

/**
 * This file is part of the Aisel package.
 *
 * (c) Ivan Proskuryakov
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @name            Aisel
 * @description     Require.js launcher
 */

require.config({
    // Load paths from global variable
    paths: {
        'jQuery': '../bower_components/jquery/jquery.min',
        'jQuery-ui': '../bower_components/jquery-ui/jquery-ui',
        'underscore': '../bower_components/underscore/underscore-min',
        'domReady': '../bower_components/domReady/domReady',
        'angular': '../bower_components/angular/angular',
        'twitter-bootstrap': '../bower_components/sass-bootstrap/dist/js/bootstrap',
        'angular-resource': '../bower_components/angular-resource/angular-resource',
        'textAngular-sanitize': '../bower_components/textAngular/dist/textAngular-sanitize.min',
        'textAngular': '../bower_components/textAngular/dist/textAngular.min',
        'angular-cookies': '../bower_components/angular-cookies/angular-cookies.min',
        'angular-sanitize': '../bower_components/angular-sanitize/angular-sanitize',
        'angular-route': '../bower_components/angular-route/angular-route',
        'angular-animate': '../bower_components/angular-animate/angular-animate',
        'angular-loading-bar': '../bower_components/angular-loading-bar/build/loading-bar.min',
        'ui-bootstrap-tpls': '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
        'ui-utils': '../bower_components/angular-ui-utils/ui-utils',
        'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router',
        'angular-notify': '../bower_components/angular-notify/dist/angular-notify.min',
        'md5': '../bower_components/angular-gravatar/build/md5',
        'angular-gravatar': '../bower_components/angular-gravatar/build/angular-gravatar',
        'angular-disqus': '../bower_components/angular-disqus/src/angular-disqus',
        'jQuery-chosen': '../js/chosen.jquery.min',
        'jQuery-dialog': '../js/dialog',
        'jQuery-snabbt': '../js/snabbt.min',
        'jQuery-endlessScroll': '../js/endlessScroll',
        'jQuery-multiselect': '../js/jquery.multiselect.min',
        'jQuery-multiselect-filter': '../js/jquery.multiselect.filter',
        'jQuery-greenfence-all': '../js/all'
    },
    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angular-route': ['angular'],
        'angular-loading-bar': ['angular'],
        'angular-animate': ['angular'],
        'angular-ui-router': ['angular'],
        'angular': {'exports': 'angular', deps: ['jQuery']},

        'jQuery': {'exports': 'jQuery'},
        "jQuery-ui": {'exports': 'jQuery-ui', deps: ['jQuery']},
        "jQuery-chosen": ["jQuery-ui"],
        "jQuery-dialog": ["jQuery-ui"],
        "jQuery-snabbt": ["jQuery-ui"],
        "jQuery-endlessScroll": ["jQuery-ui"],
        "jQuery-multiselect": ["jQuery-ui"],
        "jQuery-multiselect-filter": ["jQuery-ui"],
        "jQuery-greenfence-all": ["jQuery-ui"],

        "domReady": ["angular"],
        "angular-resource": ["angular"],
        "textAngular": ["angular"],
        "angular-cookies": ["angular"],
        "ui-bootstrap-tpls": ["angular"],
        "angular-disqus": ["angular"],
        "angular-notify": ["angular"],
        "angular-gravatar": ["angular"],
        "angular-sanitize": ["angular"],
        "twitter-bootstrap": ["angular"],
        "ui-utils": ["angular"],
        "md5": ["angular"]
    },
    // Kick start application
    deps: [
        './environment',
        './Kernel/Resource/KernelResource',
        './Aisel/Homepage/AiselHomepage',
        './Aisel/User/AiselUser',
        'bootstrap',
    ],
    priority: [
        "angular"
    ]
});