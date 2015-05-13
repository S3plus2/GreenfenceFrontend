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
 * @description     Company module
 */

define([
    'app',
    './config/company',

    './controllers/buyer.controller',
    './controllers/companyFolder.controller',
    './controllers/companyProfile.controller',
    './controllers/documentDefinitions.controller',
    './controllers/operations.controller',
    './controllers/product.controller',
    './controllers/requirementAssignment.controller',
    './controllers/service.controller',
    './controllers/shareCompanyDocument.controller',
    './controllers/supplier.controller',
    './controllers/supplyChain.controller',

    './directives/company.directive',

    './services/buyer.service',
    './services/company',
    './services/companyDocument.service',
    './services/companyFolder.service',
    './services/documentDefinitions.service',
    './services/follow.serivce',
    './services/operation.service',
    './services/product.service',
    './services/requirementAssignment.service',
    './services/service.service',
    './services/shareCompanyDocument.service',
    './services/supplier.service',
    './services/supplyChain.service',
], function (app) {
    console.log('Company module loaded ...');
});