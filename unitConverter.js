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
    $scope.unitValue0 = 1 / $scope.unitSelected0.toStandard;
    $scope.unitValue1 = 1 / $scope.unitSelected1.toStandard;
    $scope.unitValue2 = 1 / $scope.unitSelected2.toStandard;
    $scope.unitValue3 = 1 / $scope.unitSelected3.toStandard;
  });
  $scope.valueChange = function(unitValue, StandardSelected) {
    $scope.unitValue0 = unitValue * StandardSelected / $scope.unitSelected0.toStandard;
    $scope.unitValue1 = unitValue * StandardSelected / $scope.unitSelected1.toStandard;
    $scope.unitValue2 = unitValue * StandardSelected / $scope.unitSelected2.toStandard;
    $scope.unitValue3 = unitValue * StandardSelected / $scope.unitSelected3.toStandard;
  };
  $scope.unitChange = function(unitValue, newUnit) {
    //console.log(unitValue);
    $scope.valueChange(unitValue, newUnit.toStandard);
  };
});


