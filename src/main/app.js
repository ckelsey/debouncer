(function(app) {
	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: "main.html"
		})
		.otherwise({
			redirectTo: '/'
		});
	}])
	.controller('AppCtlr', function($scope, $q) {
		console.log('AppCtlr');
	});

})(angular.module('app', [
	'ngResource',
	'ngSanitize',
	'ngRoute'
]));
