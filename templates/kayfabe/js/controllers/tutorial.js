kayfabe.controller('tutorialController', function($scope, $location, $routeParams) {
	if(!$routeParams.name) {
		$location.url('/');
		return;
	}

	$scope.tutorial = $scope.getTutorial($routeParams.name);
	if(!$scope.tutorial) {
		$location.url('/');
		return;
	}
});
