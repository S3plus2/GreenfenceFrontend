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
	app.controller('CompanyProfileCtrl', ['$rootScope', '$scope', '$timeout', '$location', 'ss_alert', '$translate', 'CompanyService', 'ui', 'list',
		function($rootScope, $scope, $timeout, $location, ss_alert, $translate, CompanyService, ui, list) {

			ui.collapse_butt_with_dom($(document))
			$scope.$parent.template = {
				header : '/community/common/header',
				slider: '',
				rightmenu: '/community/company/rightmenu',
				footer: ''
			}

			$scope.company_types = [
		      { value:'Corporation', type:'Corporation' },
		      { value:'CertifyingBody', type:'Certifying body' },
		      { value:'LimitedLiability', type:'Limited Liability' }
		    ];

		    $scope.countries = list.countries
			$scope.states = list.states

			$scope.userId = $('#user_id').val()
			CompanyService.get({id: null}).$promise.then(function(data) {
				$scope.company = data
				$scope.store = angular.copy($scope.company)
				delete $scope.company.id
			})

			$scope.companySubmit = function(company) {
				if(!company.type){
					ss_alert.alert("error", $translate.instant('COMPANY_TYPE_CANT_BE_BLANK'))
					return false
				} else {
					if($scope.store != undefined && $scope.store.id)
					  CompanyService.update(company).$promise.then(success, error)
					else
					  CompanyService.save(company).$promise.then(success, error)
				}
			}

			$scope.location = function(street1,street2,city, state, country,postal_code) {
				return ui.location(street1,street2,city, state, country,postal_code)
			}

			var success = function(data) {
				$scope.company = data
				$scope.store = angular.copy($scope.company)
				delete $scope.company.id
				$rootScope.current_company = $scope.store
				$('.butt_cancel').trigger('click')
				if ($scope.store.name != null && $scope.store.type != null) {
					$scope.$parent.template.rightmenu = '/community/company/rightmenu?t=' + Date()
					$scope.$parent.template.header = '/community/common/header?t=' + Date()
				}
				ss_alert.alert("success", $translate.instant('COMPANY_PROFILE_UPDATED'))
				ui.collapse_all()
			}

			var error = function(reason) {
				ss_alert.alert("error", reason.data.errors)

			}

		}
	])
	.controller('AddCompanyRightMenuCtrl', ['$rootScope', '$scope', '$upload', '$filter', 'UserService', 'ss_alert', '$translate', 'ui', 'CompanyService',
		function($rootScope, $scope, $upload, $filter, UserService, ss_alert, $translate, ui, CompanyService) {
			ui.menu_cat_option_butt()

			$scope.myImage = '';
			$scope.myCroppedImage = '';

			CompanyService.get({id: null}).$promise.then(function(data) {
				$rootScope.current_company = data
			})
						CompanyService.getDocumentsList({id: $scope.companyId}).$promise.then(function(data) {
						 	$scope.documents = data

						 })

			var file,
			handleFileSelect = function(evt) {
	            var file = evt.currentTarget.files[0],
	            	reader = new FileReader();
	            reader.onload = function (evt) {
	            	$scope.$apply(function($scope) {
	              		$scope.myImage = evt.target.result
	           		})
	          	}
	          	reader.readAsDataURL(file)
	          	$('#company_img_crop').bPopup()
	        }

	        $scope.uploadCompanyImage = function() {
	        	var imgFile = ui.dataURItoBlob($scope.myCroppedImage)
	        	imgFile["name"] = file.name
	        	$upload.upload({
					url: '/api/v1.0/community/company/img_upload',
					method: 'PUT',
					fileFormDataName: 'logo',
					file: imgFile
				}).success(function (data, status, headers, config) {
					$rootScope.company = data
                	$('#company_img_crop').bPopup().close()
                })
	        }
			$scope.upload = function(files, evt) {
				if (files && files.length) {
					file = files[0]
					var reader = new FileReader();
		            reader.onload = function (evt) {
		            	$scope.$apply(function($scope) {
		              		$scope.myImage = evt.target.result
		           		})
		          	}
		          	reader.readAsDataURL(file)
		          	$('#company_img_crop').bPopup()
				}
			}
		}
	])
	.controller('OperationFilterCtrl', ['$rootScope', '$scope', 'OperationService', 'ss_alert', '$translate', 'ui',
		function($rootScope, $scope, OperationService, ss_alert, $translate, ui) {
			$scope.setOperations = function(){
				OperationService.query().$promise.then(function(data) {
					$scope.operations = data
					$rootScope.operations = data
				})
			}
			$scope.setOperations()
			var unbind = $rootScope.$on('OPERATION_ADDED', function(event){
				$scope.setOperations()
			});
			$scope.$on('$destroy', unbind);
		}
	]).controller('SupplierFilterCtrl', ['$rootScope', '$scope', 'RequirementAssignmentService', 'ss_alert', '$translate', 'ui',
		function($rootScope, $scope, RequirementAssignmentService, ss_alert, $translate, ui) {
			$scope.setSuppliers = function(){
				RequirementAssignmentService.getSuppliers().$promise.then(function(data) {
					$scope.suppliers = data.suppliers
					$rootScope.suppliers = data.suppliers
				})
			}
			$scope.setSuppliers()
			var unbind = $rootScope.$on('SUPPLIER_ADDED', function(event){
				$scope.setSuppliers()
			});
			$scope.$on('$destroy', unbind);
		}
	]).controller('BuyerFilterCtrl', ['$rootScope', '$scope', 'RequirementAssignmentService', 'ss_alert', '$translate', 'ui',
		function($rootScope, $scope, RequirementAssignmentService, ss_alert, $translate, ui) {
			$scope.setBuyers = function(){
				RequirementAssignmentService.getBuyers().$promise.then(function(data) {
					$scope.buyers = data.buyers
					$rootScope.buyers = data.buyers
				})
			}
			$scope.setBuyers()
			var unbind = $rootScope.$on('BUYER_ADDED', function(event){
				$scope.setBuyers()
			});
			$scope.$on('$destroy', unbind);
		}
	])
	.controller('ProductFilterCtrl', ['$rootScope', '$scope', 'ProductService',
		function($rootScope, $scope, ProductService) {
			$scope.setProducts = function() {
				ProductService.companyProducts().$promise.then(function(data) {
					$scope.company_products = data
					$rootScope.company_products = data
				})
			}
			$scope.setProducts()
			var unbind = $rootScope.$on('PRODUCT_ADDED', function(event){
				$scope.setProducts()
			});
			$scope.$on('$destroy', unbind);
		}
	])
	.controller('ServiceFilterCtrl', ['$rootScope', '$scope', 'ServiceService',
		function($rootScope, $scope, ServiceService) {
			$scope.setServices = function() {
				ServiceService.companyServices().$promise.then(function(data) {
					$scope.company_services = data
					$rootScope.company_services = data
				})
			}
			$scope.setServices()
			var unbind = $rootScope.$on('SERVICE_ADDED', function(event){
				$scope.setServices()
			});
			$scope.$on('$destroy', unbind);
		}
	])
	.controller('CompanyDocumentFilterCtrl', ['$rootScope', '$scope', '$timeout', 'ui', 'CompanyDocumentService', 'CompanyFolderService',
		function($rootScope, $scope, $timeout, ui, CompanyDocumentService, CompanyFolderService) {
			ui.share_folder_dialog_box()
			$scope.setDocuments = function() {
				CompanyDocumentService.query().$promise.then(function(data) {
					$scope.documents = data
					$rootScope.company_documents = data
					$timeout(function() {
						ui.share_document_dialog_box()
					}, 500)
				})
			}
			$scope.setFolders = function() {
				CompanyFolderService.query().$promise.then(function(data) {
					$scope.company_folders = data
				})
			}

			$scope.setDocuments()
			$scope.setFolders()
			var unbind = $rootScope.$on('COMPANY_DOCUMENT_ADDED', function(event) {
			$scope.setDocuments()
			});
			var unbind_2 = $rootScope.$on('COMPANY_FOLDER_ADDED', function(event) {
				$scope.setFolders()
			});
			$scope.$on('$destroy', unbind);
			$scope.$on('$destroy', unbind_2);

			CompanyFolderService.query().$promise.then(function(data) {
				$scope.user_folders = data
			})
		}
	])
	.controller('CompanyPublicProfileCtrl', ['$rootScope', '$scope', '$routeParams', '$filter', 'ss_alert', '$translate', 'CompanyService', 'ServiceService', 'ui',
		function($rootScope, $scope, $routeParams, $filter, ss_alert, $translate, CompanyService, ServiceService, ui) {
			$scope.$parent.template = {
				header : '/community/common/header',
				slider: '/community/company/company_slider?t=' + Date(),
				rightmenu: '/community/company/featured_right_menu',
				footer: ''
			}

			CompanyService.get({id: $routeParams.id}).$promise.then(function(data) {
				$rootScope.public_company = data
			})
			$scope.details = {}
			var filter_type = $routeParams.type
			if (filter_type == null) {
				CompanyService.getFeaturedList({id: $routeParams.id}).$promise.then(function(data) {
							$scope.details = data
						})
			} else {
				switch (filter_type) {
					case 'operations':
						CompanyService.getOperationsList({id: $routeParams.id}).$promise.then(function(data) {
							$scope.details = data
						})
						break
					case 'products':
						CompanyService.getProductsList({id: $routeParams.id}).$promise.then(function(data) {
							$scope.details = data
						})
						break
					case 'documents':
						 CompanyService.getDocumentsList({id: $scope.companyId}).$promise.then(function(data) {
						 	$scope.details = data
						 })
						break
					case 'services':
						CompanyService.getServicesList({id: $scope.companyId}).$promise.then(function(data) {
							$scope.details = data
						})
						break
					case 'employees':
						CompanyService.getEmployeesList({id: $scope.companyId}).$promise.then(function(data) {
							$scope.details = data
						})
						break
					case 'featured':
						CompanyService.getFeaturedList({id: $routeParams.id}).$promise.then(function(data) {
							$scope.details = data
						})
						break
					default:
						CompanyService.getFeaturedList({id: $routeParams.id}).$promise.then(function(data) {
							$scope.details = data
						})
				}
			}
		}
	])
	.controller('CompanyPublicProfileRightMenuCtrl', ['$rootScope', '$scope', '$routeParams', '$location', '$filter', 'ss_alert', '$translate', 'CompanyService',
		function($rootScope, $scope, $routeParams, $location, $filter, ss_alert, $translate, CompanyService) {
			$scope.filterType = function(url) {
				if ($routeParams.id)
					url = '/company_public_profile/' + $routeParams.id + url
				else
					url = '/company_public_profile' + url
				$location.path(url)
			}
			CompanyService.getFeaturedList({id: $routeParams.id}).$promise.then(function(data) {
							$scope.details = data
						})
			CompanyService.getDocumentsList({id: $scope.companyId}).$promise.then(function(data) {
						 	$scope.documentsdata = data
						 })
		}

	])
	.controller('CompanyPublicProfileFollowCtrl', ['$rootScope', '$scope', '$http', '$routeParams', '$location', '$filter', 'ss_alert', '$translate', 'CompanyService', 'ui', 'FollowService',
		function($rootScope, $scope, $http, $routeParams, $location, $filter, ss_alert, $translate, CompanyService, ui, FollowService) {

			ui.follow_dialog_box()

			CompanyService.getOperationsList({id: $routeParams.id}).$promise.then(function(data) {
				$scope.operations = data
			})

			CompanyService.getProductsList({id: $routeParams.id}).$promise.then(function(data) {
				$scope.products = data
			})

			CompanyService.getServicesList({id: $routeParams.id}).$promise.then(function(data) {
				$scope.services = data
			})

			$scope.follow_me = function(followable) {
				FollowService.save(followable, {company_id: $rootScope.public_company.id}).$promise.then(function(data) {
					followable.followed_by_current_user = true
					$rootScope.public_company.follows_count = data.follows_count
					console.log("Success")
				}, function(reason) {
					console.log("Error")
				})
			}

			$scope.unfollow_me = function(followable) {
				followable.company_id = $rootScope.public_company.id
				FollowService.delete(followable).$promise.then(function(data) {
					followable.followed_by_current_user = false
					$rootScope.public_company.follows_count = data.follows_count
					console.log("Success")
				}, function(reason) {
					console.log("Error")
				})
			}

			$scope.follow_all = function() {
				FollowService.followAll({id: $rootScope.public_company.id}).$promise.then(function(data) {
					CompanyService.getOperationsList({id: $routeParams.id}).$promise.then(function(data) {
						$scope.operations = data
					})

					CompanyService.getProductsList({id: $routeParams.id}).$promise.then(function(data) {
						$scope.products = data
					})

					CompanyService.getServicesList({id: $routeParams.id}).$promise.then(function(data) {
						$scope.services = data
					})
					$rootScope.public_company.follows_count = data.follows_count
					console.log("Success")
				}, function(reason) {
					console.log("Error")
				})
			}
		}
	])
});