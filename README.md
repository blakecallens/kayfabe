# kayfabe
#### Themeable documentation generator using AngularJS and Bootstrap

---

### Auto-generated documentation doesn't need to be split up into a heap of static HTML files.

### Documentation is data, and JavaScript can delineate that data into the templates of a responsive, single page application. That's what kayfabe is here to do.

---

## Installing kayfabe

Open a terminal and run  ```npm -g install kayfabe```

## The kayfabe.json file

The kayfabe.json file contains the configuration for the documentation. If your application has a package.json file, name, description and version will be pulled from it, unless you have set those variables explicitly in kayfabe.json.

The kayfabe.json should exist in the main directory of your application. It can hold the following values:

* **output**: the folder location to output documentation to.
* **template**: the folder location of the output template.
* **tutorial**: absolute or relative location of the application's tutorial file.
* **standaloneTutorials**: array of standalone markdown tutorial objects with the following values:
 * name: tutorial name.
 * description: tutorial description.
 * location: absolute or relative location of the tutorial file.
* **name**: application name (pulled from package.json).
* **description**: application description (pulled from package.json).
* **version**: application version (pulled from package.json).
* **fileTypes**: array of file extensions to look for comments in ([".js", ".css"]).
* **exclusions**: array of file/folder names to exclude from parsing ([".", "node_modules"]).

## Running kayfabe

Open a terminal, navigate to your application's directory and run ```kayfabe```
