'use strict';

/**
 * This file is part of the Greenfence package.
 *
 * (c) Ivan Proskuryakov
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @name            GreenfenceSearch
 * @description     ...
 */

define(['app'], function (app) {
    app.controller('SearchRightMenuCtrl', ['$rootScope', '$scope', '$location', 'ui', 'list',
        function ($rootScope, $scope, $location, ui, list) {

            ui.select_menu_hidden();

            $scope.countries = list.countries
            $scope.states = list.states
            $scope.location = {
                country: "",
                state: "",
                city: ""
            };

            $scope.inventory = {
                min: 0,
                max: 0
            };
            $scope.price = {
                min: 0,
                max: 0
            };

            $scope.filter = function (filter_type) {
                $scope.location = {
                    country: "",
                    state: "",
                    city: ""
                }
                var params = $location.search()
                if (params) {
                    $location.search({q: params.q, f: filter_type, page: null})
                }
            }

            $scope.sub_filter_inventory = function (sub_filter_type) {
                var params = $location.search()
                if (params) {
                    params.sub_filter_min = $scope.inventory.min
                    params.sub_filter_max = $scope.inventory.max
                    params.sub_filter = 'inventory'
                    params.f = 'Operation'
                    params.page = null
                    $location.search(params)
                }
            }

            $scope.sub_filter_price = function (sub_filter_type) {
                var params = $location.search()
                if (params) {
                    params.sub_filter_min = $scope.price.min
                    params.sub_filter_max = $scope.price.max
                    params.sub_filter = 'price'
                    params.f = 'Operation'
                    params.page = null
                    $location.search(params)
                }
            }

            $scope.locationFilter = function () {
                var params = $location.search()
                if (params) {
                    var location = ui.location($scope.location.country, $scope.location.state, $scope.location.city)
                    params.l = location
                    params.page = null
                    $location.search(params)
                }
            }

            $scope.search = $rootScope.search;

            $scope.updateSearch = function (search) {
                $scope.search = search
            }

            $rootScope.$on('SEARCH', function (event) {
                $scope.updateSearch($rootScope.search)
            })
        }
    ])
        .controller('SearchCtrl', ['$rootScope', '$scope', '$routeParams', '$location', 'SearchService',
            function ($rootScope, $scope, $routeParams, $location, SearchService) {

                $scope.$parent.template = {
                    header: '/community/common/header',
                    slider: '',
                    rightmenu: '/community/search/search_right_menu',
                    footer: ''
                }

                var searching = function () {
                    // HERE
                    SearchService.query({
                        query: params.q.trim(),
                        filter: params.f,
                        location: params.l,
                        page: params.page,
                        sub_filter: params.sub_filter,
                        sub_filter_min: params.sub_filter_min,
                        sub_filter_max: params.sub_filter_max
                    }).$promise.then(function (data) {
                        if (params.f == null && params.l == null && data[0]) {
                            $rootScope.search = {
                                companies: data[0].company_results,
                                operations: data[0].operation_results,
                                users: data[0].user_results,
                                services: data[0].service_results
                            }
                        } else if (params.f == null && params.l == null) {
                            $rootScope.search = {
                                companies: 0,
                                operations: 0,
                                users: 0,
                                services: 0
                            }
                        }
                        if (data[0]) {
                            pagination(data[0])
                        }
                        $rootScope.$emit('SEARCH')
                        $scope.results = data
                    })
                }

                var pagination = function (data) {
                    $("#pagination_container").pagination({
                        pages: data.total_pages,
                        currentPage: data.current_page,
                        onPageClick: navigate_away
                    })
                }

                var navigate_away = function (page, event) {
                    if (params.page) {
                        params.page = page
                    } else {
                        params['page'] = page
                    }
                    $location.search(params)
                    searching();
                    return false;
                }

                var params = $location.search();
                if (params.q) {
                    searching()
                }
            }
        ])

});