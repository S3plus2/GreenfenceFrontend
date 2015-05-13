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
    app.factory('CompanyService', ['$resource', 'Environment',
        function ($resource, Environment) {
            var api = Environment.settings.api;

            return $resource(api + '/api/v1.0/community/company.json',
                {}, {
                    'update': {method: 'PUT'},
                    'getFeaturedList': {
                        method: 'GET',
                        isArray: true,
                        url: api + '/api/v1.0/community/company/get_featured_list.json'
                    },
                    'getOperationsList': {
                        method: 'GET',
                        isArray: true,
                        url: api + '/api/v1.0/community/company/get_operations.json'
                    },
                    'getProductsList': {
                        method: 'GET',
                        isArray: true,
                        url: '/api/v1.0/community/company/get_products.json'
                    },
                    'getEmployeesList': {
                        method: 'GET',
                        isArray: true,
                        url: api + '/api/v1.0/community/company/get_employees.json'
                    },
                    'getServicesList': {
                        method: 'GET',
                        isArray: true,
                        url: '/api/v1.0/community/company/get_services.json'
                    },
                    'getDocumentsList': {
                        method: 'GET',
                        isArray: true,
                        url: api + '/api/v1.0/community/company/get_documents.json'
                    }
                });
        }])

});