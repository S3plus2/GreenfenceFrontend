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
    app.factory('CompanyDocumentService', ['$resource', 'Environment',
        function ($resource, Environment) {
            var api = Environment.settings.api;

            return $resource(api + '/api/v1.0/community/company_document/:id.json',
                {}, {
                    'update': {method: 'PUT'},
                    'getDocumentTypes': {
                        method: 'GET',
                        isArray: true,
                        url: api + '/api/v1.0/community/document_definitions/definition_types.json'
                    },
                    'documentTypeData': {method: 'GET', url: '/api/v1.0/community/document_definitions/:id.json'},
                    'getDocumentFile': {
                        method: 'GET',
                        url: api + '/api/v1.0/community/company_document/get_document_file.json'
                    },
                    'getCompanyDocuments': {
                        method: 'GET',
                        url: api + '/api/v1.0/community/company_document/get_company_documents.json'
                    },
                    'getAuditors': {
                        method: 'GET',
                        isArray: true,
                        url: api + '/api/v1.0/community/company_document/get_auditors.json'
                    }
                }
            );
        }
    ])
});