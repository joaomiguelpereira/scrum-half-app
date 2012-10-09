'use strict';

/* Services */

//Application configuration values
angular.module('scumApp.services', ['ngResource']).
    value('version', '0.2').value('applicationName', 'Scrum Half').
    factory('Projects', function ($resource) {

        return $resource('/projects/:projectId.json', {}, {
            query:{method:'GET', params:{projectId:'projects'}, isArray:true}
        });
    });

