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
    app.config(['$routeProvider', '$stateProvider', function ($routeProvider, $stateProvider) {

        $stateProvider
            .state('operationById', {
                url: "/:locale/operation/:operationId",
                controller: 'OperationDetailCtrl',
                templateUrl: '/community/company/operation_detail'
            })
            .state('addCompany', {
                url: "/:locale/add_company",
                controller: 'CompanyProfileCtrl',
                templateUrl: '/community/company/add_company'
            })
            .state('operations', {
                url: "/:locale/operations",
                controller: 'OperationCtrl',
                templateUrl: '/community/company/add_operation'
            })
            .state('operationEditById', {
                url: "/:locale/operation/edit/:operationId",
                controller: 'OperationCtrl',
                templateUrl: '/community/company/add_operation'
            })
            .state('addProduct', {
                url: "/:locale/add_product",
                templateUrl: '/community/company/add_product',
                controllerAs: 'vm',
                controller: 'ProductCtrl'
            })
            .state('companyPublicProfile', {
                url: "/:locale/company_public_profile",
                controller: 'CompanyPublicProfileCtrl',
                templateUrl: '/community/company/company_public_profile'
            })
            .state('companyPublicProfileById', {
                url: "/:locale/company_public_profile/:id",
                controller: 'CompanyPublicProfileCtrl',
                templateUrl: '/community/company/company_public_profile'
            })
            .state('companyPublicProfilesFilterByType', {
                url: "/:locale/company_public_profile/filter/:type",
                controller: 'CompanyPublicProfileCtrl',
                templateUrl: '/community/company/company_public_profile'
            })
            .state('companyPublicProfileByIdFilteredByType', {
                url: "/:locale/company_public_profile/:id/filter/:type",
                controller: 'CompanyPublicProfileCtrl',
                templateUrl: '/community/company/company_public_profile'
            })
            .state('services', {
                url: "/:locale/services",
                controller: 'ServiceCtrl',
                templateUrl: '/community/company/add_service'
            })
            .state('serviceEditByServiceId', {
                url: "/:locale/service/edit/:serviceId",
                controller: 'ServiceCtrl',
                templateUrl: '/community/company/add_service'
            })
            .state('addSupplyChain', {
                url: "/:locale/add_supply_chain",
                controller: 'SupplyChainCtrl',
                templateUrl: '/community/company/add_supply_chain'
            })
            .state('addDocumentDefinitions', {
                url: "/:locale/add_document_definitions",
                controller: 'DocumentDefinitionsCtrl',
                templateUrl: '/community/company/add_document_definition'
            })
            .state('companyDocuments', {
                url: "/:locale/company_documents",
                controller: 'CompanyDocumentCtrl',
                templateUrl: '/community/company/add_company_document'
            })
            .state('companyDocumentEditByDocumentId', {
                url: "/:locale/company_document/edit/:documentId",
                controller: 'CompanyDocumentCtrl',
                templateUrl: '/community/company/add_company_document'
            })
            .state('assignRequirements', {
                url: "/:locale/assign_requirements",
                controller: 'RequirementAssignmentCtrl',
                templateUrl: '/community/company/assign_requirements'
            })
            .state('supplierById', {
                url: "/:locale/supplier/:supplierId",
                controller: 'SupplierCtrl',
                templateUrl: '/community/company/supplier'
            })
            .state('buyerById', {
                url: "/:locale/buyer/:buyerId",
                controller: 'BuyerCtrl',
                templateUrl: '/community/company/buyer'
            });
        /*.
         otherwise({redirectTo: '/'})*/
    }
    ])

});
