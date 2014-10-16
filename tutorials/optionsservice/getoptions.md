The options object holds the information parsed from *kayfabe.json* and, optionally, *package.json*. It holds the following values:

* **name**: application name.
* **description**: application description.
* **version**: application version.
* **tutorial**: the parsed mardown (HTML) of the main tutorial file.
* **standaloneTutorials**: array of tutorials that should be given their own page, separate of code-level documentation.
* **fileTypes**: the accepted file types for documentation parsing.
* **exclusions**: file and folder names that should be excluded from parsing.
* **output**: the output folder for the rendered documentation template.
* **template**: the folder location of the documentation template.
