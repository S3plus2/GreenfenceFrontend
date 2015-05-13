(function() {

	angular.module('company', [])
		.config(['$routeProvider',
			function($routeProvider) {

				$routeProvider.
					when('/operation/:operationId', {
					controller: 'OperationDetailCtrl',
					templateUrl: '/community/company/operation_detail'
					}).
					when('/add_company', {
						controller: 'CompanyProfileCtrl',
						templateUrl: '/community/company/add_company'

					}).
					when('/operations', {
						controller: 'OperationCtrl',
						templateUrl: '/community/company/add_operation'
					}).
					when('/operation/edit/:operationId', {
						controller: 'OperationCtrl',
						templateUrl: '/community/company/add_operation'
					}).
					when('/add_product', {
						templateUrl: '/community/company/add_product',
						controllerAs: 'vm',
						controller: 'ProductCtrl'
					}).
					when('/company_public_profile/', {
						controller: 'CompanyPublicProfileCtrl',
						templateUrl: '/community/company/company_public_profile'
					}).
					when('/company_public_profile/:id', {
						controller: 'CompanyPublicProfileCtrl',
						templateUrl: '/community/company/company_public_profile'
					}).
					when('/company_public_profile/filter/:type', {
						controller: 'CompanyPublicProfileCtrl',
						templateUrl: '/community/company/company_public_profile'
					}).
					when('/company_public_profile/:id/filter/:type', {
						controller: 'CompanyPublicProfileCtrl',
						templateUrl: '/community/company/company_public_profile'
					}).
					when('/services', {
						controller: 'ServiceCtrl',
						templateUrl: '/community/company/add_service'
					}).
					when('/service/edit/:serviceId', {
						controller: 'ServiceCtrl',
						templateUrl: '/community/company/add_service'
					}).
					when('/add_supply_chain', {
						controller: 'SupplyChainCtrl',
						templateUrl: '/community/company/add_supply_chain'
					}).
					when('/add_document_definitions', {
						controller: 'DocumentDefinitionsCtrl',
						templateUrl: '/community/company/add_document_definition'
					}).
					when('/company_documents', {
						controller: 'CompanyDocumentCtrl',
						templateUrl: '/community/company/add_company_document'
					}).
					when('/company_document/edit/:documentId', {
						controller: 'CompanyDocumentCtrl',
						templateUrl: '/community/company/add_company_document'
					}).
					when('/assign_requirements', {
						controller: 'RequirementAssignmentCtrl',
						templateUrl: '/community/company/assign_requirements'
					}).
					when('/supplier/:supplierId', {
						controller: 'SupplierCtrl',
						templateUrl: '/community/company/supplier'
					}).
					when('/buyer/:buyerId', {
						controller: 'BuyerCtrl',
						templateUrl: '/community/company/buyer'
					})/*.
					otherwise({redirectTo: '/'})*/
			}
	])

})();
