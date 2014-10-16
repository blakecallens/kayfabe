kayfabe.controller('categoryController', function($scope, $location, $routeParams) {
	if(!$routeParams.name) {
		$location.url('/');
		return;
	}

	$scope.category = $scope.getCategory($routeParams.name);
	if(!$scope.category) {
		$location.url('/');
		return;
	}

	$scope.setSelectedClass = function(selectedClass) {
		$scope.selectedClass = selectedClass;
		$scope.activeClassTab = $scope.selectedClass.variables.length ? 'variables' : 'methods';
	};

	$scope.setActiveClassTab = function(tab) {
		$scope.activeClassTab = tab;
	}

	if($routeParams.class) {
		var classObject = $scope.getCategoryClass($routeParams.class, $scope.category);
		if(classObject) {
			$scope.setSelectedClass(classObject);
		}
	}
	if(!$scope.selectedClass) {
		$scope.setSelectedClass($scope.category.classes[0]);
	}
});
