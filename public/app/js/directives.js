'use strict';

/* Directives */

angular.module('scumApp.directives', []).
    directive('appVersion', ['version', function (version) {
    return function (scope, elm, attrs) {
        elm.text(version);
    };
}]).directive("appName", ['applicationName', function (applicationName) {
    return function (scope, elm, attrs) {
        elm.text(applicationName)
    }
}]);