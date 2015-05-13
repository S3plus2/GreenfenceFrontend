(function() {

	angular.module('company').factory('ProductService', ['$resource',
		function($resource) {
			return $resource('/api/v1.0/community/product_categories.json',
				{}, {
				'products': { method: 'GET', isArray: true, params: { ids: '@ids' }, url :'/api/v1.0/community/product_categories/products.json' },
				'companyProducts': { method: 'GET', isArray: true, url :'/api/v1.0/community/product_categories/company_products.json' },
				'getSupplyChainProducts': { method: 'GET', isArray: true, params: {ids: '@ids'}, url :'/api/v1.0/community/product_categories/get_supply_chain_products.json' }
			});
		}
	])

}());