(function() {

  angular.module('company').controller('OperationDetailCtrl', ['$rootScope', '$scope','$routeParams', '$compile', '$location', '$translate', 'OperationService', 'ss_alert', 'ui', 'list','$upload',
    function($rootScope,$scope,$routeParams, $compile, $location, $translate, OperationService, ss_alert, ui, list,$upload) {

      $scope.$parent.template = {
        header : '/community/common/header',
        footer: ''
      }
     if($scope.operation == undefined){
        $scope.operation = {}
        $scope.store = {}
      }
      $scope.checkedValues = function(definitionid) {
            var checked  = ""
            angular.forEach($scope.operation.definition_value[definitionid],function(key,value){
              if(checked == "")
                checked += value
              else
                checked = checked + "," + value
              });
              return checked;
            }
      $scope.definitions = []
            if($routeParams.operationId){

          OperationService.get({id: $routeParams.operationId}).$promise.then(function(data) {
          $scope.store = data
          $scope.operation = angular.copy($scope.store)

          delete $scope.operation.operation_definition
          $scope.definitions = $scope.store.operation_definition.definition
        })

      }


    }
  ])

})();