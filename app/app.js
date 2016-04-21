'use strict';

// Declare app level module which depends on views, and components
angular.module('myContacts', [
  'ngRoute',
  'firebase',
  'myContacts.contacts'
]).
// => ^ in the above code it is declaring the dependency for this app
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/contacts'}); // => this basically sets the root route to this page
}]);
