'use strict';
// Declare app level module which depends on filters, and services
angular.module('scumApp', ['scumApp.filters', 'scumApp.services', 'scumApp.directives']).
    config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/projects/', {templateUrl:'partials/projects.html', controller:ProjectsController});
    $routeProvider.when('/projects/new', {templateUrl:'partials/newProject.html'});
    $routeProvider.otherwise({redirectTo:'/view1'});

}]);
