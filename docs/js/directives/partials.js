angular.module('kfPartials', [])

.directive('navbar', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: false,
		templateUrl: 'partials/navbar.html'
	};
})
.directive('copyright', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: false,
		templateUrl: 'partials/copyright.html'
	};
});
