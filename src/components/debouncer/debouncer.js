/**
 * Simple module for debouncing
 * @param {object} options - Options object with properties defined below
 * @param {string} name - Specifies the key to debounce.
 * @param {function} fn - The function that will be called
 * @param {array} arguments - Arguments passed in which can be accessed in the function as aguments[0], arguments[1], etc.
 * @param {object} time - The length of time before calling the function
 */

(function(app){
	'use strict';
	
	app.service('debouncer', function($q){

		var debouncerTimers = {};

		var setDebouncer = function(data, defer){
			debouncerTimers[data.name] = setTimeout(function(){
				var result = data.fn.apply(this, data.arguments);

				if(result && result.hasOwnProperty('$$state')){
					result.then(function(res){
						defer.resolve(res);
					}, function(rej){
						defer.reject(rej);
					});
				}else{
					defer.resolve(result);
				}
			}, (data.time || 100));
		};

		var debounce = function(data, defer){
			if(debouncerTimers.hasOwnProperty(data.name)){
				clearTimeout(debouncerTimers[data.name]);
				setDebouncer(data, defer);
			}else{
				setDebouncer(data, defer);
			}
		};

		return function(data){
			var defer = $q.defer();

			if(data){
				debounce(data, defer);
			}else{
				defer.reject();
			}

			return defer.promise;
		};
	});

})(angular.module('debouncerModule', []));

/* EXAMPLE

debouncer({
	name: 'test',
	fn: function(){
		var defer = $q.defer();

		setTimeout(function () {
			defer.resolve('somthing cool');
		},3000);

		return defer.promise;
	},
	arguments: ['arg1', 'arg2'],
	time: 100
}).then(function(res){

});
*/
