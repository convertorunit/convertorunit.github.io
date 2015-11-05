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
    // $scope.unitValue0 = 1 / $scope.unitSelected0.toStandard;
    // $scope.unitValue1 = 1 / $scope.unitSelected1.toStandard;
    // $scope.unitValue2 = 1 / $scope.unitSelected2.toStandard;
    // $scope.unitValue3 = 1 / $scope.unitSelected3.toStandard;
    $scope.unitValue0 = $scope.organizedUnitValue(1 / $scope.unitSelected0.toStandard);
    $scope.unitValue1 = $scope.organizedUnitValue(1 / $scope.unitSelected1.toStandard);
    $scope.unitValue2 = $scope.organizedUnitValue(1 / $scope.unitSelected2.toStandard);
    $scope.unitValue3 = $scope.organizedUnitValue(1 / $scope.unitSelected3.toStandard);

  });

  $('#link-'+$scope.unittype).addClass("selected");

  $scope.value0Change = function(unitValue, StandardSelected) {
    //$scope.unitValue0 = unitValue * StandardSelected / $scope.unitSelected0.toStandard;
    $scope.unitValue1 = unitValue * StandardSelected / $scope.unitSelected1.toStandard;
    $scope.unitValue2 = unitValue * StandardSelected / $scope.unitSelected2.toStandard;
    $scope.unitValue3 = unitValue * StandardSelected / $scope.unitSelected3.toStandard;
    $scope.organizedUnitValue();
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
  $scope.organizedUnitValue = function(unitValue) {
    var array = String(unitValue).split("");    
    var dotIndex = array.indexOf(".");
    if (dotIndex > -1 && dotIndex+4<array.length) {
      for (i = dotIndex+1; i < array.length; i++) { 
        if(array[i]=="0")
          dotIndex++;
        else
          break;
      }
      array.splice(dotIndex+4, array.length-4-dotIndex);
    }

    dotIndex = array.indexOf(".");
    if (dotIndex > -1){
      for (i = array.length-1; i > 0; i--) { 
        if(array[i]=="0")
          array.splice(i, 1);
        else
          break;
      }
    }

    if(array[array.length-1]==".")
      array.splice(i, 1);

    return array.join("");
  };

  $scope.organizedAllUnitValue = function() {
    $scope.unitValue0 = $scope.organizedUnitValue($scope.unitValue0);
    $scope.unitValue1 = $scope.organizedUnitValue($scope.unitValue1);
    $scope.unitValue2 = $scope.organizedUnitValue($scope.unitValue2);
    $scope.unitValue3 = $scope.organizedUnitValue($scope.unitValue3);
  };


});

UnitConverterApp.directive('isNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope) {    
            scope.$watch('unitValue0', function(newValue,oldValue) {
                if (isNaN(newValue)&&scope.unitSelected0) {
                    scope.unitValue0 = oldValue;
                    StandardSelected=scope.unitSelected0.toStandard;
                    scope.value0Change(oldValue, StandardSelected);
                }
            });
        }
    };
});
