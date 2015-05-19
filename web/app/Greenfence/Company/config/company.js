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
                url: "/operation/:operationId",
                controller: 'OperationDetailCtrl',
                templateUrl: '/app/Greenfence/Company/views/operation_detail.html',
            })
            .state('addCompany', {
                url: "/add_company",
                controller: 'CompanyProfileCtrl',
                templateUrl: '/app/Greenfence/Company/views/add_company.html',
            })
            .state('operations', {
                url: "/operations",
                controller: 'OperationCtrl',
                templateUrl: '/app/Greenfence/Company/views/add_operation.html',
            })
            .state('operationEditById', {
                url: "/operation/edit/:operationId",
                controller: 'OperationCtrl',
                templateUrl: '/app/Greenfence/Company/views/add_operation.html',
            })
            .state('addProduct', {
                url: "/add_product",
                templateUrl: '/app/Greenfence/Company/views/add_product.html',
                controllerAs: 'vm',
                controller: 'ProductCtrl'
            })
            .state('companyPublicProfile', {
                url: "/company_public_profile",
                controller: 'CompanyPublicProfileCtrl',
                templateUrl: '/app/Greenfence/Company/views/company_public_profile.html',
            })
            .state('companyPublicProfileById', {
                url: "/company_public_profile/:id",
                controller: 'CompanyPublicProfileCtrl',
                templateUrl: '/app/Greenfence/Company/views/company_public_profile.html',
            })
            .state('companyPublicProfilesFilterByType', {
                url: "/company_public_profile/filter/:type",
                controller: 'CompanyPublicProfileCtrl',
                templateUrl: '/app/Greenfence/Company/views/company_public_profile.html',
            })
            .state('companyPublicProfileByIdFilteredByType', {
                url: "/company_public_profile/:id/filter/:type",
                controller: 'CompanyPublicProfileCtrl',
                templateUrl: '/app/Greenfence/Company/views/company_public_profile.html',
            })
            .state('services', {
                url: "/services",
                controller: 'ServiceCtrl',
                templateUrl: '/app/Greenfence/Company/views/add_service.html',
            })
            .state('serviceEditByServiceId', {
                url: "/service/edit/:serviceId",
                controller: 'ServiceCtrl',
                templateUrl: '/app/Greenfence/Company/views/add_service.html',
            })
            .state('addSupplyChain', {
                url: "/add_supply_chain",
                controller: 'SupplyChainCtrl',
                templateUrl: '/app/Greenfence/Company/views/add_supply_chain.html',
            })
            .state('addDocumentDefinitions', {
                url: "/add_document_definitions",
                controller: 'DocumentDefinitionsCtrl',
                templateUrl: '/app/Greenfence/Company/views/add_document_definition.html',
            })
            .state('companyDocuments', {
                url: "/company_documents",
                controller: 'CompanyDocumentCtrl',
                templateUrl: '/app/Greenfence/Company/views/add_company_document.html',
            })
            .state('companyDocumentEditByDocumentId', {
                url: "/company_document/edit/:documentId",
                controller: 'CompanyDocumentCtrl',
                templateUrl: '/app/Greenfence/Company/views/add_company_document.html',
            })
            .state('assignRequirements', {
                url: "/assign_requirements",
                controller: 'RequirementAssignmentCtrl',
                templateUrl: '/app/Greenfence/Company/views/assign_requirements.html',
            })
            .state('supplierById', {
                url: "/supplier/:supplierId",
                controller: 'SupplierCtrl',
                templateUrl: '/app/Greenfence/Company/views/supplier.html',
            })
            .state('buyerById', {
                url: "/buyer/:buyerId",
                controller: 'BuyerCtrl',
                templateUrl: '/app/Greenfence/Company/views/buyer.html',
            });
    }
    ])

});
