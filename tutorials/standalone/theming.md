The theming functionality of kayfabe has been optimized for use with [AngularJS](http://angularjs.org) templatizing, but AngularJS is not a requirement. The [app structure](#/class/parsingservice/appstructure) and [options](#/class/optionsservice/getoptions) objects are outputted to the theme's JavaScript and everything else is left in the designer and developer's hands.

You can modify the default kayfabe theme or build something completely on your own. In this tutorial you'll be walked through the default theme's architecture, so you can gain a deep enough understanding to build your own themes from scratch.

### appStructure and options

The [app structure](#/class/parsingservice/appstructure) and options objects contain the documentation definition and kayfabe options, respectively. They are parsed out by kayfabe and passed into your theme through the directives, *^app_structure^* and *^doc_options^*. You can find them in the *kayfabe* controller of the default theme at *templates/kayfabe/js/controllers/kayfabe.js*.

```
kayfabe.controller('kayfabeController', function($scope, $sce) {
    $scope.appStructure = ^app_structure^;
    $scope.options = ^doc_options^;
    ...
```

With these objects now in AngularJS scope, you can use them to build your documentation page templates.

### Creating trusted HTML

In order to insert your parsed markdown (to HTML) content inside AngularJS templates, it must by marked as trusted html with the AngularJS *$sce* service. The main tutorial, standaloneTutorials, and appStructure element descriptions will need to be run through this process at the start of your AngularJS application. Adding the trusted HTML lines to your main controller will take care of this. These are the lines that begin with the following snippet and continue to the end of the *kayfabe* controller.

```
// Mark all HTML documentation as trusted
if($scope.options.tutorial) {
    $scope.options.htmlTutorial = $sce.trustAsHtml($scope.options.tutorial);
}
...
```

### Navigation

The default theme uses an AngularJS partial template to draw the navigation, it's located at *tempaltes/kayfabe/partials/navbar.html*. The navbar template turns the appStructure's categories and the standaloneTutorials options (individual tutorial pages like the one you're reading now) to create dropdown menus.

```
...
<ul class="nav navbar-nav">
    <li class="dropdown">
        <a class="dropdown-toggle" data-toggle="dropdown">
            Categories <span class="caret"></span>
        </a>
        <ul class="dropdown-menu" role="menu">
            <li ng-repeat="category in appStructure">
                <a ng-href="{{'#category/' + category.name.toLowerCase()}}" ng-bind="category.name"></a>
            </li>
        </ul>
    </li>
    ...
</ul>
...
```

### Landing page

You'll probably want your documentation's home page to contain an overview of your project and some quick links to categories and classes. The landing page template of the default theme is an example of this. The the location for the main project tutorial/overview's markdown file is set in *kayfabe.json* with the *tutorial* setting. You can also retrieve this setting in client side JavaScript through the options object.

### Standalone tutorials

Individual tutorial pages, like this one, draw from the array of standaloneTutorials in the options object. Each standalone tutorial has a name and description, and a content variable that holds the parsed markdown (now HTML) content of the tutorial. Because of this, the tutorial page requires little template HTML.

```
<div class="jumbotron">
    <div class="container">
        <h1 ng-bind="tutorial.name"></h1>
        <p ng-bind-html="tutorial.description"></p>
    </div>
</div>
<div class="container">
    <div class="row">
        <div class="col-md-12" ng-bind-html="tutorial.htmlContent"></div>
    </div>
</div>
```

### Categories, classes, variables, and methods

The rest of the pages are templates drawing from the [app structure](#/class/parsingservice/appstructure) object. Refer to the default theme's *category* and *class* controllers and pages to get a sense of how appStructure is iterated through.

The default theme's category page provides a pill nav that changes the selectedClass.

```
<ul class="nav nav-pills nav-stacked">
    <li ng-class="{'active': selectedClass === class}" ng-repeat="class in category.classes">
        <a ng-href="{{'#category/' + category.name.toLowerCase() + '/' + class.name.toLowerCase()}}" ng-bind="class.name"></a>
    </li>
</ul>
```

That selectedClass object is then used to render out variables.

```
<div id="variables" class="tab-pane" ng-class="{'active': activeClassTab === 'variables'}">
    <div class="panel panel-default" ng-repeat="variable in selectedClass.variables">
        <div class="panel-heading">
            <h4 style="margin: 0">
                <span class="label label-primary parameter-type" ng-bind="variable.type" ng-if="!getParameterLink(variable)"></span>
                <span class="label label-primary parameter-type" ng-if="getParameterLink(variable)">
                    <a ng-href="{{getParameterLink(variable)}}" ng-bind="variable.type"></a>
                </span>
                <a ng-href="{{'#class/' + selectedClass.name.toLowerCase() + '/' + variable.name.toLowerCase()}}" ng-bind="variable.name"></a>
            </h4>
            <span ng-bind-html="variable.htmlDescription"></span>
        </div>
    </div>
</div>
```
