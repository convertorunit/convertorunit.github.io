var UnitConverterApp = angular.module('UnitConverterApp', ['ngRoute']);
//var UnitConverterApp = angular.module('UnitConverterApp', []);
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

UnitConverterApp.controller('IndexCtrl', function ($scope) {
  $scope.UnitTypes = ['Length','Weight', 'Area', 'Volume', 'Speed'];
  $scope.InitClass = function() {
    for(var i=0;i<5;i++) {
      $('#link-'+$scope.UnitTypes[i]).removeClass();
    }
  }
  $scope.InitClass();
  $scope.changeUnit = function(unitType) {
    //console.log(unitType);
    $scope.InitClass();
    $('#link-'+unitType).addClass("selected");
    //$scope.valueChange(unitValue, newUnit.toStandard);
  };
});



UnitConverterApp.controller('UnitDetailCtrl', function ($scope, $routeParams, $http){
  $scope.unittype=$routeParams.UnitType;
  //console.log($routeParams);
  $('#link-'+$scope.unittype).addClass("selected");
  $http.get('/file/'+$routeParams.UnitType+'.json').success(function(data) {
    $scope.units=data;
    $scope.unitSelected0 = data[0];
    $scope.unitSelected1 = data[1];
    $scope.unitSelected2 = data[2];
    $scope.unitSelected3 = data[3];
    $scope.unitValue0 = (1 / $scope.unitSelected0.toStandard).toFixed(3);
    $scope.unitValue1 = (1 / $scope.unitSelected1.toStandard).toFixed(3);
    $scope.unitValue2 = (1 / $scope.unitSelected2.toStandard).toFixed(3);
    $scope.unitValue3 = (1 / $scope.unitSelected3.toStandard).toFixed(3);
  });
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
  $scope.valueFixed= function(unitValue){
     //console.log($scope.unitValue0);
     //unitValue=unitValue.toFixed(3);
     $scope.unitValue0 = unitValue;
    // $scope.unitValue1 = ($scope.unitValue1).toFixed(3);
    // $scope.unitValue2 = ($scope.unitValue2).toFixed(3);
    // $scope.unitValue3 = ($scope.unitValue3).toFixed(3);
  };
});

UnitConverterApp.directive('isNumber', function () {
  return {
    require: 'ngModel',
    link: function (scope) {  
      scope.$watch('unitValue0', function(newValue,oldValue) {
          var arr = String(newValue).split("");
          console.log(newValue, oldValue);
          // if (arr.length === 0) return;
          // if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.' )) return;
          // if (arr.length === 2 && newValue === '-.') return;
          // var countdot=0;
          // arr.forEach(function(entry) {
          //     if(entry==='.')
          //       countdot+=1;
          // });
          // if (countdot<2) return;
          // console.log(countdot);
          if (isNaN(newValue)) {
              scope.unitValue0 = oldValue;
          }
      });
    }
  };
});


