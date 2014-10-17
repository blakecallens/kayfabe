kayfabe.controller('kayfabeController', function($scope, $sce) {
	$scope.appStructure = [{"name":"Services","description":"<p>The service classes of kayfabe</p>","classes":[{"name":"DirectoryService","description":"<p>Builds the list of files to be parsed by the ParsingService</p>","variables":[{"name":"directories","description":"<p>The array of files to be parsed</p>","type":"Array"}],"methods":[{"name":"getFiles","description":"<p>Retrieves the list of available files based on user options</p>","parameters":[{"name":"baseDirectory","description":"<p>The directory to begin the recursive search in</p>","type":"String","optional":false},{"name":"options","description":"<p>The search options</p>","type":"Object","optional":false},{"name":"cb","description":"<p>The callback function</p>","type":"Function","optional":false}],"returns":null},{"name":"buildDirectories","description":"<p>Builds the directory tree that the files to parse will be retrieved from</p>","parameters":[{"name":"baseDirectories","description":"<p>An array of directories to search</p>","type":"Array","optional":false},{"name":"exclusions","description":"<p>Filenames to exclude</p>","type":"Array","optional":false},{"name":"cb","description":"<p>The callback function</p>","type":"Function","optional":false}],"returns":null},{"name":"getSubDirectories","description":"<p>Retrieves the subdirectories of an array of parent directories</p>","parameters":[{"name":"baseDirectories","description":"<p>An array of directories to search</p>","type":"Array","optional":false},{"name":"exclusions","description":"<p>Filenames to exclude</p>","type":"Array","optional":false},{"name":"cb","description":"<p>The callback function</p>","type":"Function","optional":false}],"returns":null}]},{"name":"InfoService","description":"<p>Retrieves and outputs information about kayfabe</p>","variables":[],"methods":[{"name":"InfoService","description":"","parameters":[],"returns":null},{"name":"outputVersion","description":"<p>Outputs the current version of the kayfabe installation</p>","parameters":[],"returns":null},{"name":"getVersion","description":"<p>Retrieves the current version of the kayfabe installation</p>","parameters":[{"name":"cb","description":"<p>The callback function</p>","type":"Function","optional":false}],"returns":null},{"name":"outputHelpText","description":"<p>Outputs the kayfabe help text</p>","parameters":[],"returns":null},{"name":"getHelpText","description":"<p>Gets the kayfabe help text</p>","parameters":[{"name":"cb","description":"<p>The callback function</p>","type":"Function","optional":false}],"returns":null}]},{"name":"OptionsService","description":"<p>Sets, retrieves and displays kayfabe options</p>","variables":[],"methods":[{"name":"OptionsService","description":"","parameters":[],"returns":null},{"name":"getOptions","description":"<p>Retrieves kayfabe options and optionally appends them with settings from a package.json file</p>","parameters":[],"returns":{"type":"Object","description":"<p>kayfabe options</p>"},"tutorial":"<p>The options object holds the information parsed from <em>kayfabe.json</em> and, optionally, <em>package.json</em>. It holds the following values:</p>\n\n<ul><li><strong>name</strong>: application name.</li><li><strong>description</strong>: application description.</li><li><strong>version</strong>: application version.</li><li><strong>tutorial</strong>: the parsed mardown (HTML) of the main tutorial file.</li><li><strong>standaloneTutorials</strong>: array of tutorials that should be given their own page, separate of code-level documentation.</li><li><strong>fileTypes</strong>: the accepted file types for documentation parsing.</li><li><strong>exclusions</strong>: file and folder names that should be excluded from parsing.</li><li><strong>output</strong>: the output folder for the rendered documentation template.</li><li><strong>template</strong>: the folder location of the documentation template.</li></ul>"},{"name":"getTutorial","description":"<p>Retrieves the application&#39;s main tutorial markdown file and parses it into HTML</p>","parameters":[{"name":"location","description":"<p>The relative or absolute location of the tutorial file</p>","type":"String","optional":false}],"returns":{"type":"String","description":"<p>The tutorial HTML</p>"}},{"name":"createOptionsJson","description":"<p>Prompts the user for application information and creates a kayfabe.json file</p>","parameters":[{"name":"cb","description":"<p>An optional callback function</p>","type":"Function","optional":true}],"returns":null},{"name":"getPackageJsonOptions","description":"<p>Prompts the user to choose using their package.json file for kayfabe options</p>","parameters":[{"name":"options","description":"<p>kayfabe options object</p>","type":"Object","optional":false},{"name":"cb","description":"<p>The callback function</p>","type":"Function","optional":false}],"returns":null},{"name":"getNameVersionDescription","description":"<p>Prompts the user for application info, if a package.json file is not being used</p>","parameters":[{"name":"options","description":"<p>kayfabe options object</p>","type":"Object","optional":false},{"name":"cb","description":"<p>The callback function</p>","type":"Function","optional":false}],"returns":null},{"name":"getParsingOptions","description":"<p>Prompts the user for comment parsing options</p>","parameters":[{"name":"options","description":"<p>kayfabe options object</p>","type":"Object","optional":false},{"name":"cb","description":"<p>The callback function</p>","type":"Function","optional":false}],"returns":null}]},{"name":"ParsingService","description":"<p>Parses the files returned by the DirectoryService and creates the application structure object.</p>","variables":[{"name":"appStructure","description":"<p>The object containing the documentation structure</p>","type":"Object","tutorial":"<p>The app structure holds the documentation information of your application, including categories, classes, variables and methods. Its object hierarchy is as follows:</p>\n\n<h3>Categories</h3>\n\n<p>A grouping of classes. Categories are the only app structure elements that are not directly tied to actual elements of your application. While all classes must belong to a category, they are only organizational in purpose.</p>\n\n<p>Sample category definition:</p>\n\n<p><pre>\n/**\n* The service classes of kayfabe\n*\n* @category Services\n*/\n</pre></p>\n\n<p>Category elements</p>\n\n<ul><li><strong>@category [name]</strong>: category name (required)</li></ul>\n\n<h3>Classes</h3>\n\n<p>Classes hold variables and methods. All classes must belong to a category.</p>\n\n<p>Sample class definition:</p>\n\n<p><pre>\n/**\n* Parses the files returned by the DirectoryService and creates\n* the application structure object.\n*\n* @category Services\n* @class ParsingService\n* @constructor\n*/\n</pre></p>\n\n<p>Class elements/options:</p>\n\n<ul><li><strong>@category [name]</strong>: parent category of the class (required)</li><li><strong>@class [name]</strong>: class name (required)</li><li><strong>@constructor</strong>: marks that the class has a constructor method</li><li><strong>@parameter {type} [name] [description]</strong>: parameter of the constructor method</li></ul>\n\n<h3>Variables</h3>\n\n<p>Sample variable definition</p>\n\n<p><pre>\n/**\n* The object containing the documentation structure\n*\n* @variable {Object} appStructure\n* @tutorial tutorials/parsingservice/appstructure.md\n*/\n</pre></p>\n\n<p>Variable elements/options</p>\n\n<ul><li><strong>@variable {type} [name]</strong>: variable type and name (required)</li><li><strong>@tutorial [location]</strong>: location of tutorial markdown</li></ul>\n\n<h3>Methods (Functions)</h3>\n\n<p>Sample method definition</p>\n\n<p><pre>\n/**\n* Breaks the lines of a comment into an array\n*\n* @method breakCommentIntoLines\n* @parameter {String} comment A comment string\n* @returns   {Array}  Comment lines\n* @tutorial tutorials/parsingservice/breakcommentintolines.md\n*/\n</pre></p>\n\n<p>Method elements/options</p>\n\n<ul><li><strong>@method [name]</strong>: method name (required)</li><li><strong>@parameter {type} [name] [description]</strong>: parameter of the method</li><li><strong>@returns {type} [description]</strong>: method return value</li><li><strong>@tutorial [location]</strong>: location of tutorial markdown</li></ul>"}],"methods":[{"name":"ParsingService","description":"","parameters":[],"returns":null},{"name":"parse","description":"<p>Initiates the parsing process</p>","parameters":[{"name":"baseDirectory","description":"<p>The directory command was run from</p>","type":"String","optional":false},{"name":"options","description":"<p>kayfabe options</p>","type":"Object","optional":false},{"name":"cb","description":"<p>The callback function</p>","type":"Function","optional":false}],"returns":null},{"name":"buildAppStructure","description":"<p>Iterates through files and sends them to be parsed</p>","parameters":[{"name":"cb","description":"<p>The callback function</p>","type":"Function","optional":false}],"returns":null},{"name":"parseComments","description":"<p>Parses a files comments and sends them to be created as the proper application structure element</p>","parameters":[{"name":"comments","description":"<p>An array of comment strings</p>","type":"Array","optional":false}],"returns":null},{"name":"breakCommentIntoLines","description":"<p>Breaks the lines of a comment into an array</p>","parameters":[{"name":"comment","description":"<p>A comment string</p>","type":"String","optional":false}],"returns":{"type":"Array","description":"<p>Comment lines</p>"}},{"name":"getCategoryName","description":"<p>Parses a category name from a comment line</p>","parameters":[{"name":"commentLine","description":"<p>A comment line string string containing &#39;@category [name]&#39;</p>","type":"String","optional":false}],"returns":{"type":"String","description":"<p>Category name</p>"}},{"name":"getClassStructure","description":"<p>Parses class information from a comment line</p>","parameters":[{"name":"commentLine","description":"<p>A comment line string containing &#39;@class [name]&#39;</p>","type":"String","optional":false},{"name":"description","description":"<p>The class description</p>","type":"String","optional":false}],"returns":{"type":"Object","description":"<p>Class structure</p>"}},{"name":"createConstructor","description":"<p>Parses constructor method information from a comment and inserts it into the current class</p>","parameters":[{"name":"comment","description":"<p>A comment array starting from the line containing &#39;@constructor&#39;</p>","type":"Array","optional":false}],"returns":null},{"name":"createMethod","description":"<p>Parses method information from a comment and inserts it into the current class</p>","parameters":[{"name":"comment","description":"<p>A comment array starting from the line containing &#39;@constructor&#39;</p>","type":"Array","optional":false},{"name":"description","description":"<p>The method description</p>","type":"String","optional":false}],"returns":null},{"name":"getParameterStructure","description":"<p>Parses method parameter information from a comment line</p>","parameters":[{"name":"commentLine","description":"<p>A comment line string containing &#39; {[type]} [name] [description]&#39;</p>","type":"String","optional":false}],"returns":{"type":"Object","description":"<p>Parameter structure</p>"}},{"name":"getReturnStructure","description":"<p>Parses method return information from a comment line</p>","parameters":[{"name":"commentLine","description":"<p>A comment line string containing &#39;@returns {[type]} [description]&#39;</p>","type":"String","optional":false}],"returns":{"type":"Object","description":"<p>Return structure</p>"}},{"name":"createVariable","description":"<p>Parses variable information from a comment line and inserts it into the current class</p>","parameters":[{"name":"commentLine","description":"<p>A comment line string containing &#39;@variable {[type]} [name]&#39;</p>","type":"String","optional":false},{"name":"description","description":"<p>The variable description</p>","type":"String","optional":false}],"returns":null},{"name":"getTutorial","description":"<p>Retrieves the tutorial HTML for a variable or method</p>","parameters":[{"name":"commentLine","description":"<p>A comment line string containing &#39;@tutorial [location]&#39;</p>","type":"String","optional":false}],"returns":null},{"name":"parseMarkdown","description":"<p>Parses markdown to HTML with markdown-js and formats for better Bootstrap use</p>","parameters":[{"name":"markdownString","description":"<p>The markdown string to parse</p>","type":"String","optional":false}],"returns":{"type":"String","description":"<p>HTML string</p>"}},{"name":"insertStructureObject","description":"<p>Inserts a structure element from a fully parsed comment into the application structure</p>","parameters":[{"name":"structureObject","description":"<p>The structure element to insert</p>","type":"Object","optional":false}],"returns":null}]},{"name":"TemplateService","description":"<p>Handles the templatizing and rendering of documentation</p>","variables":[],"methods":[{"name":"TemplateService","description":"","parameters":[],"returns":null},{"name":"buildDocs","description":"<p>Builds the documentation output from templates and application structure</p>","parameters":[{"name":"appStructure","description":"<p>The outputted application structure from the <a href=\"#class/parsingservice\">ParsingService</a></p>","type":"Object","optional":false},{"name":"options","description":"<p>The outputted kayfabe options from the <a href=\"#class/infoservice\">InfoService</a></p>","type":"Object","optional":false},{"name":"cb","description":"<p>The callback function</p>","type":"Function","optional":false}],"returns":null}]}]}];
	$scope.options = {"tutorial":"<h3>Auto-generated documentation doesn&#39;t need to be split up into a heap of static HTML files.</h3>\n\n<h3>Documentation is data, and JavaScript can delineate that data into the templates of a responsive, single page application. That&#39;s what kayfabe is here to do.</h3>\n\n<hr/>\n\n<h2>Installing kayfabe</h2>\n\n<p>Open a terminal and run  <pre>npm -g install kayfabe</pre></p>\n\n<h2>The kayfabe.json file</h2>\n\n<p>The <em>kayfabe.json</em> file contains the configuration for the documentation. If your application has a package.json file, name, description and version will be pulled from it, unless you have set those variables explicitly in kayfabe.json.</p>\n\n<p>The <em>kayfabe.json</em> should exist in the main directory of your application. It can hold the following values:</p>\n\n<ul><li><strong>output</strong>: the folder location to output documentation to.</li><li><strong>logo</strong>: the file location of a logo image (optional).</li><li><strong>template</strong>: the folder location of the output template.</li><li><strong>tutorial</strong>: absolute or relative location of the application&#39;s tutorial file.</li><li><strong>standaloneTutorials</strong>: array of standalone markdown tutorial objects with the following values:<ul><li>name: tutorial name.</li><li>description: tutorial description.</li><li>location: absolute or relative location of the tutorial file.</li></ul></li><li><strong>name</strong>: application name (pulled from package.json).</li><li><strong>description</strong>: application description (pulled from package.json).</li><li><strong>version</strong>: application version (pulled from package.json).</li><li><strong>fileTypes</strong>: array of file extensions to look for comments in ([&quot;.js&quot;, &quot;.css&quot;]).</li><li><strong>exclusions</strong>: array of file/folder names to exclude from parsing ([&quot;.&quot;, &quot;node_modules&quot;]).</li></ul>\n\n<p>kayfabe can create a <em>kayfabe.json</em> file for you. Open a terminal, navigate to the base directory of your application and run <pre>kayfabe init</pre></p>\n\n<h2>Running kayfabe</h2>\n\n<p>Open a terminal, navigate to your application&#39;s directory and run <pre>kayfabe</pre></p>","standaloneTutorials":[{"name":"Commenting","description":"How to write comments that will be parsed by kayfabe.","location":"tutorials/standalone/commenting.md","content":"<p>kayfabe currently supports four comment types: categories, classes, variables and methods, each with their own sub objects (i.e., methods have parameters).</p>\n\n<h3>Categories</h3>\n\n<p>A grouping of classes. Categories are the only app structure elements that are not directly tied to actual elements of your application. While all classes must belong to a category, they are only organizational in purpose.</p>\n\n<p>Sample category definition:</p>\n\n<p><pre>\n/**\n* The service classes of kayfabe\n*\n* @category Services\n*/\n</pre></p>\n\n<p>Category elements</p>\n\n<ul><li><strong>@category [name]</strong>: category name (required)</li></ul>\n\n<h3>Classes</h3>\n\n<p>Classes hold variables and methods. All classes must belong to a category.</p>\n\n<p>Sample class definition:</p>\n\n<p><pre>\n/**\n* Parses the files returned by the DirectoryService and creates\n* the application structure object.\n*\n* @category Services\n* @class ParsingService\n* @constructor\n*/\n</pre></p>\n\n<p>Class elements/options:</p>\n\n<ul><li><strong>@category [name]</strong>: parent category of the class (required)</li><li><strong>@class [name]</strong>: class name (required)</li><li><strong>@constructor</strong>: marks that the class has a constructor method</li><li><strong>@parameter {type} [name] [description]</strong>: parameter of the constructor method</li></ul>\n\n<h3>Variables</h3>\n\n<p>Sample variable definition</p>\n\n<p><pre>\n/**\n* The object containing the documentation structure\n*\n* @variable {Object} appStructure\n* @tutorial tutorials/parsingservice/appstructure.md\n*/\n</pre></p>\n\n<p>Variable elements/options</p>\n\n<ul><li><strong>@variable {type} [name]</strong>: variable type and name (required)</li><li><strong>@tutorial [location]</strong>: location of tutorial markdown</li></ul>\n\n<h3>Methods (Functions)</h3>\n\n<p>Sample method definition</p>\n\n<p><pre>\n/**\n* Breaks the lines of a comment into an array\n*\n* @method breakCommentIntoLines\n* @parameter {String} comment A comment string\n* @returns   {Array}  Comment lines\n* @tutorial tutorials/parsingservice/breakcommentintolines.md\n*/\n</pre></p>\n\n<p>Method elements/options</p>\n\n<ul><li><strong>@method [name]</strong>: method name (required)</li><li><strong>@parameter {type} [name] [description]</strong>: parameter of the method</li><li><strong>@returns {type} [description]</strong>: method return value</li><li><strong>@tutorial [location]</strong>: location of tutorial markdown</li></ul>\n\n<h3>Markdown support</h3>\n\n<ul><li>All comment types allow markdown in their descriptions, which will be rendered out in the documentation. Here&#39;s an example of a markdown description:</li></ul>\n\n<p><pre>\n/**\n* *kayfabe* comments support **markdown** formatting,\n* including [links](http://kayfabe.github.io).\n*\n* @method breakCommentIntoLines\n* @parameter {String} comment A comment string\n* @returns   {Array}  Comment lines\n* @tutorial tutorials/parsingservice/breakcommentintolines.md\n*/\n</pre></p>"},{"name":"Theming","description":"Changing the look and functionality of your documentation.","location":"tutorials/standalone/theming.md","content":"<p>The theming functionality of kayfabe has been optimized for use with <a href=\"http://angularjs.org\">AngularJS</a> templatizing, but AngularJS is not a requirement. The <a href=\"#/class/parsingservice/appstructure\">app structure</a> and <a href=\"#/class/optionsservice/getoptions\">options</a> objects are outputted to the theme&#39;s JavaScript and everything else is left in the designer and developer&#39;s hands.</p>\n\n<p>You can modify the default kayfabe theme or build something completely on your own. In this tutorial you&#39;ll be walked through the default theme&#39;s architecture, so you can gain a deep enough understanding to build your own themes from scratch.</p>\n\n<h3>appStructure and options</h3>\n\n<p>The <a href=\"#/class/parsingservice/appstructure\">app structure</a> and options objects contain the documentation definition and kayfabe options, respectively. They are parsed out by kayfabe and passed into your theme through the directives, <em>^app_structure^</em> and <em>^doc_options^</em>. You can find them in the <em>kayfabe</em> controller of the default theme at <em>templates/kayfabe/js/controllers/kayfabe.js</em>.</p>\n\n<p><pre>\nkayfabe.controller(&#39;kayfabeController&#39;, function($scope, $sce) {\n    $scope.appStructure = ^app_structure^;\n    $scope.options = ^doc_options^;\n    ...\n</pre></p>\n\n<p>With these objects now in AngularJS scope, you can use them to build your documentation page templates.</p>\n\n<h3>Creating trusted HTML</h3>\n\n<p>In order to insert your parsed markdown (to HTML) content inside AngularJS templates, it must by marked as trusted html with the AngularJS <em>$sce</em> service. The main tutorial, standaloneTutorials, and appStructure element descriptions will need to be run through this process at the start of your AngularJS application. Adding the trusted HTML lines to your main controller will take care of this. These are the lines that begin with the following snippet and continue to the end of the <em>kayfabe</em> controller.</p>\n\n<p><pre>\n// Mark all HTML documentation as trusted\nif($scope.options.tutorial) {\n    $scope.options.htmlTutorial = $sce.trustAsHtml($scope.options.tutorial);\n}\n...\n</pre></p>\n\n<h3>Navigation</h3>\n\n<p>The default theme uses an AngularJS partial template to draw the navigation, it&#39;s located at <em>tempaltes/kayfabe/partials/navbar.html</em>. The navbar template turns the appStructure&#39;s categories and the standaloneTutorials options (individual tutorial pages like the one you&#39;re reading now) to create dropdown menus.</p>\n\n<p><pre>\n...\n&lt;ul class=&quot;nav navbar-nav&quot;&gt;\n    &lt;li class=&quot;dropdown&quot;&gt;\n        &lt;a class=&quot;dropdown-toggle&quot; data-toggle=&quot;dropdown&quot;&gt;\n            Categories &lt;span class=&quot;caret&quot;&gt;&lt;/span&gt;\n        &lt;/a&gt;\n        &lt;ul class=&quot;dropdown-menu&quot; role=&quot;menu&quot;&gt;\n            &lt;li ng-repeat=&quot;category in appStructure&quot;&gt;\n                &lt;a ng-href=&quot;{{&#39;#category/&#39; + category.name.toLowerCase()}}&quot; ng-bind=&quot;category.name&quot;&gt;&lt;/a&gt;\n            &lt;/li&gt;\n        &lt;/ul&gt;\n    &lt;/li&gt;\n    ...\n&lt;/ul&gt;\n...\n</pre></p>\n\n<h3>Landing page</h3>\n\n<p>You&#39;ll probably want your documentation&#39;s home page to contain an overview of your project and some quick links to categories and classes. The landing page template of the default theme is an example of this. The the location for the main project tutorial/overview&#39;s markdown file is set in <em>kayfabe.json</em> with the <em>tutorial</em> setting. You can also retrieve this setting in client side JavaScript through the options object.</p>\n\n<h3>Standalone tutorials</h3>\n\n<p>Individual tutorial pages, like this one, draw from the array of standaloneTutorials in the options object. Each standalone tutorial has a name and description, and a content variable that holds the parsed markdown (now HTML) content of the tutorial. Because of this, the tutorial page requires little template HTML.</p>\n\n<p><pre>\n&lt;div class=&quot;jumbotron&quot;&gt;\n    &lt;div class=&quot;container&quot;&gt;\n        &lt;h1 ng-bind=&quot;tutorial.name&quot;&gt;&lt;/h1&gt;\n        &lt;p ng-bind-html=&quot;tutorial.description&quot;&gt;&lt;/p&gt;\n    &lt;/div&gt;\n&lt;/div&gt;\n&lt;div class=&quot;container&quot;&gt;\n    &lt;div class=&quot;row&quot;&gt;\n        &lt;div class=&quot;col-md-12&quot; ng-bind-html=&quot;tutorial.htmlContent&quot;&gt;&lt;/div&gt;\n    &lt;/div&gt;\n&lt;/div&gt;\n</pre></p>\n\n<h3>Categories, classes, variables, and methods</h3>\n\n<p>The rest of the pages are templates drawing from the <a href=\"#/class/parsingservice/appstructure\">app structure</a> object. Refer to the default theme&#39;s <em>category</em> and <em>class</em> controllers and pages to get a sense of how appStructure is iterated through.</p>\n\n<p>The default theme&#39;s category page provides a pill nav that changes the selectedClass.</p>\n\n<p><pre>\n&lt;ul class=&quot;nav nav-pills nav-stacked&quot;&gt;\n    &lt;li ng-class=&quot;{&#39;active&#39;: selectedClass === class}&quot; ng-repeat=&quot;class in category.classes&quot;&gt;\n        &lt;a ng-href=&quot;{{&#39;#category/&#39; + category.name.toLowerCase() + &#39;/&#39; + class.name.toLowerCase()}}&quot; ng-bind=&quot;class.name&quot;&gt;&lt;/a&gt;\n    &lt;/li&gt;\n&lt;/ul&gt;\n</pre></p>\n\n<p>That selectedClass object is then used to render out variables.</p>\n\n<p><pre>\n&lt;div id=&quot;variables&quot; class=&quot;tab-pane&quot; ng-class=&quot;{&#39;active&#39;: activeClassTab === &#39;variables&#39;}&quot;&gt;\n    &lt;div class=&quot;panel panel-default&quot; ng-repeat=&quot;variable in selectedClass.variables&quot;&gt;\n        &lt;div class=&quot;panel-heading&quot;&gt;\n            &lt;h4 style=&quot;margin: 0&quot;&gt;\n                &lt;span class=&quot;label label-primary parameter-type&quot; ng-bind=&quot;variable.type&quot; ng-if=&quot;!getParameterLink(variable)&quot;&gt;&lt;/span&gt;\n                &lt;span class=&quot;label label-primary parameter-type&quot; ng-if=&quot;getParameterLink(variable)&quot;&gt;\n                    &lt;a ng-href=&quot;{{getParameterLink(variable)}}&quot; ng-bind=&quot;variable.type&quot;&gt;&lt;/a&gt;\n                &lt;/span&gt;\n                &lt;a ng-href=&quot;{{&#39;#class/&#39; + selectedClass.name.toLowerCase() + &#39;/&#39; + variable.name.toLowerCase()}}&quot; ng-bind=&quot;variable.name&quot;&gt;&lt;/a&gt;\n            &lt;/h4&gt;\n            &lt;span ng-bind-html=&quot;variable.htmlDescription&quot;&gt;&lt;/span&gt;\n        &lt;/div&gt;\n    &lt;/div&gt;\n&lt;/div&gt;\n</pre></p>"}],"fileTypes":[".js"],"exclusions":[".","node_modules","assets","docs","templates","tutorials"],"output":"docs","template":"templates/kayfabe","name":"kayfabe","version":"0.0.3","description":"Themeable documentation generator using AngularJS and Bootstrap"};

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
