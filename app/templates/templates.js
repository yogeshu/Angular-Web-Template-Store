angular.module('templateStore.templates', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.
    when('/templates', {
      templateUrl: 'templates/templates.html',
      controller: 'TemplatesCtrl'
    }).
    when('/templates/:templateId', {
      templateUrl: 'templates/template-details.html',
      controller: 'TemplateDetailsCtrl'
    })
}])

.controller('TemplatesCtrl', ['$scope', '$http', function($scope, $http){
  $http.get('json/templates.json').success(function(data){
    $scope.templates = data;
  });
}])
.controller('TemplateDetailsCtrl', ['$scope', '$http', '$routeParams', '$filter', function($scope, $http, $routeParams, $filter){
  var templateId = $routeParams.templateId;
  $http.get('json/templates.json').success(function(data){
    console.log("test");
    console.log(templateId);
    $scope.template = $filter('filter')(data, {id: templateId})[0];
    $scope.mainImage = $scope.template.images[0].name;
  });

  $scope.setImage = function(image){
    $scope.mainImage = image.name
  }
}]);