kayfabe.controller('searchController', function($scope, $routeParams, $location) {
	if(!$routeParams.query) {
		$location.url('/');
	}

	$scope.searchResults = $scope.search($routeParams.query);
});
