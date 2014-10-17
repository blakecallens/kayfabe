var kayfabe = angular.module('kayfabe', [
    'ngRoute',
    'ngSanitize',
    'kfPartials'
]);

kayfabe.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'pages/landing.html',
        controller: 'landingController',
        reloadOnSearch: false
    })
    .when('/category/:name', {
        templateUrl: 'pages/category.html',
        controller: 'categoryController',
        reloadOnSearch: false
    })
    .when('/category/:name/:class', {
        templateUrl: 'pages/category.html',
        controller: 'categoryController',
        reloadOnSearch: false
    })
    .when('/class/:name', {
        templateUrl: 'pages/class.html',
        controller: 'classController',
        reloadOnSearch: false
    })
    .when('/class/:name/:element', {
        templateUrl: 'pages/class.html',
        controller: 'classController',
        reloadOnSearch: false
    })
    .when('/tutorial/:name', {
        templateUrl: 'pages/tutorial.html',
        controller: 'tutorialController',
        reloadOnSearch: false
    })
    .when('/search/:query', {
        templateUrl: 'pages/search.html',
        controller: 'searchController',
        reloadOnSearch: false
    })
}]);
