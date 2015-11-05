var UnitConverterApp = angular.module('UnitConverterApp', ['ngRoute']);
UnitConverterApp.config(function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'welcome.html'
    }).
    when('/:UnitType', {
      templateUrl: 'unitDetail.html',
      controller: 'UnitDetailCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
});

UnitConverterApp.factory('unitTypes', function($http){
  function getData(unitType, callback){
    $http({
      method: 'GET',
      url: '/file/'+unitType+'.json',
      cache: true
    }).success(callback);
  }
  return {
    find: function(unitType, callback){
      getData(unitType, function(data) {
        cachedData = data;
        callback(data);
      });
    }
  };
});

UnitConverterApp.controller('IndexCtrl', function ($scope) {
  $scope.UnitTypes = ['Length','Weight', 'Area', 'Volume', 'Speed'];
  $scope.InitClass = function() {
    for(var i=0;i<5;i++) {
      $('#link-'+$scope.UnitTypes[i]).removeClass();
    }
  }
  $scope.InitClass();
  $scope.changeUnit = function(unitType) {
    $scope.InitClass();
    $('#link-'+unitType).addClass("selected");
  };
});



UnitConverterApp.controller('UnitDetailCtrl', function ($scope, $routeParams, unitTypes){
  $scope.unittype=$routeParams.UnitType;
  
  unitTypes.find($routeParams.UnitType, function(data) {
    $scope.units=data;
    $scope.unitSelected0 = data[0];
    $scope.unitSelected1 = data[1];
    $scope.unitSelected2 = data[2];
    $scope.unitSelected3 = data[3];
    $scope.unitValue0 = 1 / $scope.unitSelected0.toStandard;
    $scope.unitValue1 = 1 / $scope.unitSelected1.toStandard;
    $scope.unitValue2 = 1 / $scope.unitSelected2.toStandard;
    $scope.unitValue3 = 1 / $scope.unitSelected3.toStandard;
  });

  $('#link-'+$scope.unittype).addClass("selected");

  $scope.value0Change = function(unitValue, StandardSelected) {
    //$scope.unitValue0 = unitValue * StandardSelected / $scope.unitSelected0.toStandard;
    $scope.unitValue1 = unitValue * StandardSelected / $scope.unitSelected1.toStandard;
    $scope.unitValue2 = unitValue * StandardSelected / $scope.unitSelected2.toStandard;
    $scope.unitValue3 = unitValue * StandardSelected / $scope.unitSelected3.toStandard;
  };
  $scope.value1Change = function(unitValue, StandardSelected) {
    $scope.unitValue0 = unitValue * StandardSelected / $scope.unitSelected0.toStandard;
    //$scope.unitValue1 = unitValue * StandardSelected / $scope.unitSelected1.toStandard;
    $scope.unitValue2 = unitValue * StandardSelected / $scope.unitSelected2.toStandard;
    $scope.unitValue3 = unitValue * StandardSelected / $scope.unitSelected3.toStandard;
  };
  $scope.value2Change = function(unitValue, StandardSelected) {
    $scope.unitValue0 = unitValue * StandardSelected / $scope.unitSelected0.toStandard;
    $scope.unitValue1 = unitValue * StandardSelected / $scope.unitSelected1.toStandard;
    //$scope.unitValue2 = unitValue * StandardSelected / $scope.unitSelected2.toStandard;
    $scope.unitValue3 = unitValue * StandardSelected / $scope.unitSelected3.toStandard;
  };
  $scope.value3Change = function(unitValue, StandardSelected) {
    $scope.unitValue0 = unitValue * StandardSelected / $scope.unitSelected0.toStandard;
    $scope.unitValue1 = unitValue * StandardSelected / $scope.unitSelected1.toStandard;
    $scope.unitValue2 = unitValue * StandardSelected / $scope.unitSelected2.toStandard;
    //$scope.unitValue3 = unitValue * StandardSelected / $scope.unitSelected3.toStandard;
  };
  $scope.unit0Change = function(unitValue, newUnit) {
    $scope.value0Change(unitValue, newUnit.toStandard);
  };
  $scope.unit1Change = function(unitValue, newUnit) {
    $scope.value1Change(unitValue, newUnit.toStandard);
  };
  $scope.unit2Change = function(unitValue, newUnit) {
    $scope.value2Change(unitValue, newUnit.toStandard);
  };
  $scope.unit3Change = function(unitValue, newUnit) {
    $scope.value3Change(unitValue, newUnit.toStandard);
  };
});

UnitConverterApp.directive('isNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope) {    
            scope.$watch('unitValue0', function(newValue,oldValue) {
              console.log(newValue, oldValue);
                if (isNaN(newValue)) {
                    scope.unitValue0 = oldValue;
                    StandardSelected=scope.unitSelected0.toStandard;
                    scope.value0Change(oldValue, StandardSelected);
                }
            });
        }
    };
});
