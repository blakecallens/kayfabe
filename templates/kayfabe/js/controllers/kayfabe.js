kayfabe.controller('kayfabeController', function($scope, $sce, $location) {
	$scope.appStructure = ^app_structure^;
	$scope.options = ^doc_options^;
	$scope.searchText = '';

	$scope.gotoSearch = function() {
		if(!$scope.searchText.length) {
			return;
		}

		$location.url('/search/' + $scope.searchText);
	}

	$scope.setSearchText = function(searchText) {

	}

	$scope.search = function(searchText) {
		$scope.searchText = searchText;
		searchText = $scope.searchText.toLowerCase().trim();

		var searchResults = {
			categories: [],
			classes: [],
			variables: [],
			methods: []
		};


		for(var i = 0; i < $scope.appStructure.length; i++) {
			if($scope.appStructure[i].name.toLowerCase().indexOf(searchText) > -1) {
				var category = {
					name: $scope.appStructure[i].name,
					htmlDescription: $sce.trustAsHtml($scope.appStructure[i].description),
					link: '#category/' + $scope.appStructure[i].name.toLowerCase()
				};

				searchResults.categories.push(category);
			}

			for(var j = 0; j < $scope.appStructure[i].classes.length; j++) {
				if($scope.appStructure[i].classes[j].name.toLowerCase().indexOf(searchText) > -1) {
					var classObject = {
						name: $scope.appStructure[i].classes[j].name,
						htmlDescription: $sce.trustAsHtml($scope.appStructure[i].classes[j].description),
						link: '#class/' + $scope.appStructure[i].classes[j].name.toLowerCase()
					}
					searchResults.classes.push(classObject);
				}

				for(var s = 0; s < $scope.appStructure[i].classes[j].variables.length; s++) {
					if($scope.appStructure[i].classes[j].variables[s].name.toLowerCase().indexOf(searchText) > -1) {
						var variableObject = {
							name: $scope.appStructure[i].classes[j].variables[s].name,
							htmlDescription: $sce.trustAsHtml($scope.appStructure[i].classes[j].variables[s].description),
							link: '#class/' + $scope.appStructure[i].classes[j].name.toLowerCase() + '/' + $scope.appStructure[i].classes[j].variables[s].name.toLowerCase()
						}
						searchResults.variables.push(variableObject)
					}
				}

				for(s = 0; s < $scope.appStructure[i].classes[j].methods.length; s++) {
					if($scope.appStructure[i].classes[j].methods[s].name.toLowerCase().indexOf(searchText) > -1) {
						var method = {
							name: $scope.appStructure[i].classes[j].methods[s].name,
							htmlDescription: $sce.trustAsHtml($scope.appStructure[i].classes[j].methods[s].description),
							link: '#class/' + $scope.appStructure[i].classes[j].name.toLowerCase() + '/' + $scope.appStructure[i].classes[j].methods[s].name.toLowerCase()
						}
						searchResults.methods.push(method)
					}
				}
			}
		}

		return searchResults;
	}

	$scope.getYear = function() {
		return (new Date()).getFullYear();
	}

	$scope.getCategory = function(categoryName) {
		categoryName = categoryName.toLowerCase();

		for(var i = 0; i < $scope.appStructure.length; i++) {
			if($scope.appStructure[i].name.toLowerCase() === categoryName) {
				return $scope.appStructure[i];
			}
		}

		return null;
	}

	$scope.getCategoryClass = function(className, category) {
		for(var i = 0; i < category.classes.length; i++) {
			if(category.classes[i].name.toLowerCase() === className.toLowerCase()) {
				return category.classes[i];
			}
		}

		return null;
	}

	$scope.getClass = function(className) {
		className = className.toLowerCase();

		for(var i = 0; i < $scope.appStructure.length; i++) {
			for(var j = 0; j < $scope.appStructure[i].classes.length; j++) {
				if($scope.appStructure[i].classes[j].name.toLowerCase() === className) {
					return $scope.appStructure[i].classes[j];
				}
			}
		}

		return null;
	}

	$scope.getClassElement = function(elementName, classObject) {
		for(var i = 0; i < classObject.variables.length; i++) {
			if(classObject.variables[i].name.toLowerCase() === elementName.toLowerCase()) {
				return classObject.variables[i];
			}
		}

		for(i = 0; i < classObject.methods.length; i++) {
			if(classObject.methods[i].name.toLowerCase() === elementName.toLowerCase()) {
				return classObject.methods[i];
			}
		}

		return null;
	}

	$scope.getTutorial = function(tutorialName) {
		tutorialName = tutorialName.toLowerCase();

		for(var i = 0; i < $scope.options.standaloneTutorials.length; i++) {
			if($scope.options.standaloneTutorials[i].name.toLowerCase() === tutorialName) {
				return $scope.options.standaloneTutorials[i];
			}
		}

		return null;
	}

	$scope.getParameterLink = function(parameter) {
		for(var j = 0; j < $scope.appStructure.length; j++) {
			for(var s = 0; s < $scope.appStructure[j].classes.length; s++) {
				if(parameter.type === $scope.appStructure[j].classes[s].name) {
					return '#class/' + parameter.type.toLowerCase();
				}
			}
		}

		return null;
	}

	// Mark all HTML documentation as trusted
	if($scope.options.tutorial) {
		$scope.options.htmlTutorial = $sce.trustAsHtml($scope.options.tutorial);
	}

	for(var i = 0; i < $scope.options.standaloneTutorials.length; i++) {
		$scope.options.standaloneTutorials[i].htmlContent = $sce.trustAsHtml($scope.options.standaloneTutorials[i].content);
	}

	for(i = 0; i < $scope.appStructure.length; i++) {
		$scope.appStructure[i].htmlDescription = $sce.trustAsHtml($scope.appStructure[i].description);
		for(var j = 0; j < $scope.appStructure[i].classes.length; j++) {
			$scope.appStructure[i].classes[j].htmlDescription = $sce.trustAsHtml($scope.appStructure[i].classes[j].description);

			var s;
			for(s = 0; s < $scope.appStructure[i].classes[j].variables.length; s++) {
				$scope.appStructure[i].classes[j].variables[s].htmlDescription = $sce.trustAsHtml($scope.appStructure[i].classes[j].variables[s].description);
				if($scope.appStructure[i].classes[j].variables[s].tutorial) {
					$scope.appStructure[i].classes[j].variables[s].htmlTutorial = $sce.trustAsHtml($scope.appStructure[i].classes[j].variables[s].tutorial);
				}
			}
			for(s = 0; s < $scope.appStructure[i].classes[j].methods.length; s++) {
				$scope.appStructure[i].classes[j].methods[s].htmlDescription = $sce.trustAsHtml($scope.appStructure[i].classes[j].methods[s].description);
				if($scope.appStructure[i].classes[j].methods[s].tutorial) {
					$scope.appStructure[i].classes[j].methods[s].htmlTutorial = $sce.trustAsHtml($scope.appStructure[i].classes[j].methods[s].tutorial);
				}

				for(var o = 0; o < $scope.appStructure[i].classes[j].methods[s].parameters.length; o++) {
					$scope.appStructure[i].classes[j].methods[s].parameters[o].htmlDescription = $sce.trustAsHtml($scope.appStructure[i].classes[j].methods[s].parameters[o].description);
				}

				if($scope.appStructure[i].classes[j].methods[s].returns) {
					$scope.appStructure[i].classes[j].methods[s].returns.htmlDescription = $sce.trustAsHtml($scope.appStructure[i].classes[j].methods[s].returns.description);
				}
			}
		}
	}
});
