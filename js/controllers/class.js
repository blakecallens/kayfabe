kayfabe.controller('classController', function($scope, $location, $routeParams) {
	if(!$routeParams.name) {
		$location.url('/');
		return;
	}

	$scope.class = $scope.getClass($routeParams.name);
	if(!$scope.class) {
		$location.url('/');
		return;
	}

	$scope.setSelectedElement = function(element) {
		$scope.selectedElement = element;
	}

	$scope.forceDefaultElement = function() {
		if($scope.class.variables.length) {
			$scope.setSelectedElement($scope.class.variables[0]);
		}
		else if($scope.class.methods.length) {
			$scope.setSelectedElement($scope.class.methods[0]);
		}
	}

	if($routeParams.element) {
		var element = $scope.getClassElement($routeParams.element, $scope.class);
		if(element) {
			$scope.setSelectedElement(element);
		}
	}
	if(!$scope.selectedElement) {
		$scope.forceDefaultElement();
	}
});
