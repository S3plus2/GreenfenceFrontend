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
	app.controller('CompanyFolderCtrl', ['$rootScope', '$scope', '$filter', 'UserService', 'CompanyFolderService', 'ss_alert', '$translate', 'ui', '$http', '$timeout',
		function($rootScope, $scope, $filter, UserService, CompanyFolderService,  ss_alert, $translate, ui, $http, $timeout) {
	    	
	    	var authorId = $('#user_id').val()
			$scope.folder = {
				author_id: authorId
			}

	    	$scope.createFolder = function(folder) {
	    		CompanyFolderService.save(folder).$promise.then(success, error)
	    	}

	    	var success = function(data) {
				$('#company_folder_msg_box').text($translate.instant('FOLDER_CREATED_SUCCESSFULLY')).css({"font-size": "3", "color": 'Green'})
				$rootScope.$emit('COMPANY_FOLDER_ADDED');
				$timeout(function() {
					$('#company_folder_msg_box').empty()
					$('.dialog_cancel_butt').trigger('click')
				}, 2000)
			}

			var error = function(reason) {
				$('#company_folder_msg_box').text(reason.data.errors).css({"font-size": "3", "color": "Red"})  
				$timeout(function() {
					$('#company_folder_msg_box').empty()
				}, 4500)
			}		
		}
	])

});