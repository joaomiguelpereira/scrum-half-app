'use strict';

/* jasmine specs for controllers go here */

describe('Controllers', function () {

    //include the services module
    beforeEach(module('scumApp.services'));

    //Unit tests for Projects Controller
    describe('Projects Controller Test Suite', function () {

        var controllerUnderTest, scope, $httpBackend;

        beforeEach(angular.mock.inject(function (_$httpBackend_, $rootScope, $controller) {

            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('/projects/projects.json').respond([
                {name:'Project 01'},
                {name:'Project 02'}
            ]);
            ;
            scope = $rootScope.$new();
            controllerUnderTest = $controller(ProjectsController, {$scope:scope});
        }));


        it('should have list of projects', function () {

            //After training responses, flush all pending requests
            $httpBackend.flush();
            expect(scope.projects.length).toEqual(2);

        });
    });

});

