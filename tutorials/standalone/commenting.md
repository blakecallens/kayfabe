kayfabe currently supports four comment types: categories, classes, variables and methods, each with their own sub objects (i.e., methods have parameters).

### Categories

A grouping of classes. Categories are the only app structure elements that are not directly tied to actual elements of your application. While all classes must belong to a category, they are only organizational in purpose.

Sample category definition:

```
/**
* The service classes of kayfabe
*
* @category Services
*/
```

Category elements

* **@category [name]**: category name (required)

### Classes

Classes hold variables and methods. All classes must belong to a category.

Sample class definition:

```
/**
* Parses the files returned by the DirectoryService and creates
* the application structure object.
*
* @category Services
* @class ParsingService
* @constructor
*/
```

Class elements/options:

* **@category [name]**: parent category of the class (required)
* **@class [name]**: class name (required)
* **@constructor**: marks that the class has a constructor method
* **@parameter {type} [name] [description]**: parameter of the constructor method

### Variables

Sample variable definition

```
/**
* The object containing the documentation structure
*
* @variable {Object} appStructure
* @tutorial tutorials/parsingservice/appstructure.md
*/
```

Variable elements/options

* **@variable {type} [name]**: variable type and name (required)
* **@tutorial [location]**: location of tutorial markdown

### Methods (Functions)

Sample method definition

```
/**
* Breaks the lines of a comment into an array
*
* @method breakCommentIntoLines
* @parameter {String} comment A comment string
* @returns   {Array}  Comment lines
* @tutorial tutorials/parsingservice/breakcommentintolines.md
*/
```

Method elements/options

* **@method [name]**: method name (required)
* **@parameter {type} [name] [description]**: parameter of the method
* **@returns {type} [description]**: method return value
* **@tutorial [location]**: location of tutorial markdown


### Markdown support

* All comment types allow markdown in their descriptions, which will be rendered out in the documentation. Here's an example of a markdown description:

```
/**
* *kayfabe* comments support **markdown** formatting,
* including [links](http://kayfabe.github.io).
*
* @method breakCommentIntoLines
* @parameter {String} comment A comment string
* @returns   {Array}  Comment lines
* @tutorial tutorials/parsingservice/breakcommentintolines.md
*/
```
