'use strict';

// Declare app level module which depends on views, and components
angular.module('webApp', [
  'ngRoute',
  'webApp.login',
  'webApp.register',
  'webApp.profile',
  'webApp.addReport',
  'webApp.home',
  'webApp.admin',
  'webApp.addAnnouncement',
  'webApp.showReport',
  'webApp.addComplaint',
  'webApp.showComplaint'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

  $routeProvider.otherwise({redirectTo: '/home'});
}]);
