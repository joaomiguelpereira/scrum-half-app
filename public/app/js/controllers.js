'use strict';

/**
 * ProjectsController
 * @param $scope The scope of the controller
 * @param $http http services
 * @constructor
 */
function ProjectsController($scope, $http, Projects) {

    $scope.projects = Projects.query();

}
//Inject a scope and an http
ProjectsController.$inject = ['$scope', '$http', 'Projects']








