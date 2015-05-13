(function() {

	angular.module('company').controller('SupplyChainCtrl', ['$rootScope', '$scope', '$compile', '$location', '$translate', '$timeout', 'ss_alert', 'ui','SupplyChainService',
		function($rootScope, $scope, $compile, $location, $translate, $timeout, ss_alert, ui ,SupplyChainService) {
			
			ui.collapse_butt_with_dom($(document))
			ui.supply_chain_search()
			$(".tabs_v1" ).tabs();
			// ui.supply_chain_option_butt()

			$scope.$parent.template = {
				header : '/community/common/header',
				slider: '',
				rightmenu: '/community/company/rightmenu',
				footer: ''
			}

			
			$scope.company = {}
			$scope.supply_chain_invitation = {}
			$scope.pending_suppliers = []
			$scope.pending_buyers = []
			$scope.buyers = []
			$scope.suppliers = []
			

			
			SupplyChainService.suppliableBuyable().$promise.then(function(data) {
				$scope.suppliableBuyable = data;
			})

			SupplyChainService.invitedEntities().$promise.then(function(data) {
				$scope.pending_suppliers = data.pending_suppliers
				$scope.pending_buyers = data.pending_buyers
				$scope.buyers = data.buyers
				$scope.suppliers = data.suppliers
			})

			$scope.supplierProducts = function(entity){
				$scope.company.invite_supplier.products = {}
				SupplyChainService.getProducts({id:entity.id,type:entity.type}).$promise.then(function(data){
					$scope.supplier_products = data
					$timeout(function() {
						ui.multi_select_with_dom($('#supplier_products')).multiselect("refresh")
						$('.form_cell_v1_mod.select_supplier_product').css("display", "block");
					}, 500);
					
				})
			}
			
			$scope.buyerProducts = function(){
				SupplyChainService.getProducts({id:$rootScope.current_company.id,type:"Company"}).$promise.then(function(data){
					$scope.buyer_products = data
					$timeout(function() {
						ui.multi_select_with_dom($('#buyer_products')).multiselect("refresh")
						$('.form_cell_v1_mod.select_buyer_product').css("display", "block");
					}, 500);
				})
			}

			$scope.inviteSupplier = function(company){
				$scope.supply_chain_invitation = {'product_csv': getSelectedProducts("#supplier_products"), 'invited_entity_id': company.invite_supplier.id,'supply_chain_type': "supplier",'invited_entity_type':  company.invite_supplier.type }
				SupplyChainService.save($scope.supply_chain_invitation).$promise.then(success, error)
			}


			$scope.inviteBuyer = function(company){		
				$scope.supply_chain_invitation = {'product_csv': getSelectedProducts("#buyer_products"), 'invited_entity_id': company.invite_buyer.id,'supply_chain_type': "buyer",'invited_entity_type':  company.invite_buyer.type }
				SupplyChainService.save($scope.supply_chain_invitation).$promise.then(success, error)
			}

			var success = function(data){
				ss_alert.alert("success","Successfully invited in supply chain.")
				if($scope.supply_chain_invitation.supply_chain_type == "supplier"){
					var obj = { id: $scope.company.invite_supplier.id, name: $scope.company.invite_supplier.name }
					$scope.pending_suppliers.push(obj)
				}else{
					var obj = { id: $scope.company.invite_buyer.id, name: $scope.company.invite_buyer.name }
					$scope.pending_buyers.push(obj)
				}
				ui.collapse_all();
			}

			var error = function(data){
				ss_alert.alert("error",data.errors)	
			}

			var getSelectedProducts = function(name_id) {
				var selected_products;
				var product_list =  $(name_id).multiselect("getChecked").map(function() {
	   				return this.value
				}).get()
				var selected_products
				$.each(product_list, function (index, value) {
					if (index == 0)
					   selected_products = value
					else
					selected_products = selected_products + "," + value
				})
				return selected_products;
			}



		}
	])

})();