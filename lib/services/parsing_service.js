/**
 * The service classes of kayfabe
 *
 * @category Services
 */

/**
 * Parses the files returned by the DirectoryService and creates
 * the application structure object.
 *
 * @category Services
 * @class ParsingService
 * @constructor
 */

var ParsingService = function(){};

/**
 * The object containing the documentation structure
 *
 * @variable {Object} appStructure
 * @tutorial tutorials/parsingservice/appstructure.md
 */
ParsingService.prototype.appStructure = {};

/**
 * Initiates the parsing process
 *
 * @method parse
 * @parameter  {String}   baseDirectory The directory command was run from
 * @parameter  {Object}   options       kayfabe options
 * @parameter  {Function} cb            The callback function
 */
ParsingService.prototype.parse = function(baseDirectory, options, cb) {
	var self = this;

	this.appStructure = [{
		name: 'Uncategorized',
		description: '',
		classes: []
	}];

	kf.directory.getFiles(baseDirectory, options, function(filesToSearch) {
		self.filesToSearch = filesToSearch;
		self.buildAppStructure(function() {
			for(var i = 0; i < self.appStructure.length; i++) {
				if(!self.appStructure[i].classes.length) {
					self.appStructure.splice(i, 1);
					i--;
				}
			}

			console.log(colors.green('Application structure built'));
			cb(self.appStructure);
		});
	});
};

/**
 * Iterates through files and sends them to be parsed
 *
 * @method buildAppStructure
 * @parameter {Function} cb The callback function
 */
ParsingService.prototype.buildAppStructure = function(cb) {
	var self = this;

	this.parseFile = function(index) {
		fs.readFile(self.filesToSearch[index], function(error, data) {
			var comments = [];
			data = data.toString();

			// Trim all lines
			var dataLines = data.split('\n');
			for(var i = 0; i < dataLines.length; i++) {
				dataLines[i] = dataLines[i].trim();
			}
			data = dataLines.join('\n');

			while(data.indexOf('/**\n') > -1) {
				var comment = data.substr(data.indexOf('/**\n'), data.substr(data.indexOf('/**\n')).indexOf('*/') + 2);
				if(comment.indexOf('@') > -1) {
					comments.push(comment);
				}

				data = data.substr(data.indexOf('/**\n') + data.substr(data.indexOf('/**\n')).indexOf('*/') + 2);
			}

			self.parseComments(comments);

			index++;
			if(index >= self.filesToSearch.length) {
				cb();
				return;
			}

			self.parseFile(index);
		});
	};

	this.parseFile(0);
};

/**
 * Parses a files comments and sends them to be created as the proper
 * application structure element
 *
 * @method parseComments
 * @parameter {Array} comments An array of comment strings
 */
ParsingService.prototype.parseComments = function(comments) {
	for(var i = 0; i < comments.length; i++) {
		var comment = this.breakCommentIntoLines(comments[i]);
		var description = '';
		var tagFound = false;
		var descriptionUsed = false;

		if(!this.structureObject) {
			this.structureObject = {
				name: 'Uncategorized',
				description: '',
				classes: []
			};
		}
		else {
			if(this.structureObject.classes.length) {
				this.structureObject.classes[0].variables = [];
				this.structureObject.classes[0].methods = [];
			}
		}

		for(var j = 0; j < comment.length; j++) {
			if(comment[j].charAt(0) !== '@' && !tagFound) {
				if(description.length) {
					description += ' ';
				}
				description += comment[j];
			}
			else {
				if(comment[j].indexOf('@category') === 0) {
					this.structureObject.name = this.getCategoryName(comment[j]);
				}
				else if(comment[j].indexOf('@class') === 0) {
					this.structureObject.classes = [this.getClassStructure(comment[j], description)];
					descriptionUsed = true;
				}
				else if(comment[j].indexOf('@constructor') === 0) {
					this.createConstructor(comment);
					break;
				}
				else if(comment[j].indexOf('@method') === 0) {
					this.createMethod(comment, description);
					descriptionUsed = true;
					break;
				}
				else if(comment[j].indexOf('@variable') === 0) {
					this.createVariable(comment, description);
					descriptionUsed = true;
					break;
				}
			}

			comment.splice(j, 1);
			j--;
		}

		if(!descriptionUsed) {
			this.structureObject.description = this.parseMarkdown(description);
		}
		this.insertStructureObject(JSON.parse(JSON.stringify(this.structureObject)));
	}
};

/**
 * Breaks the lines of a comment into an array
 *
 * @method breakCommentIntoLines
 * @parameter {String} comment A comment string
 * @returns   {Array}  Comment lines
 */
ParsingService.prototype.breakCommentIntoLines = function(comment) {
	var commentLines = comment.split('\n');
	for(var i = 0; i < commentLines.length; i++) {
		commentLines[i] = commentLines[i].trim();

		if(commentLines[i].indexOf('*') === 0) {
			commentLines[i] = commentLines[i].substr(1);
		}

		commentLines[i] = commentLines[i].trim();

		if(!commentLines[i].length || commentLines[i] === '/**' || commentLines[i] === '/') {
			commentLines.splice(i, 1);
			i--;
			continue;
		}
	}

	return commentLines;
};

/**
 * Parses a category name from a comment line
 *
 * @method getCategoryName
 * @parameter {String} commentLine A comment line string string containing '@category [name]'
 * @returns   {String} Category name
 */
ParsingService.prototype.getCategoryName = function(commentLine) {
	return commentLine.split('@category').join('').trim();
};

/**
 * Parses class information from a comment line
 *
 * @method getClassStructure
 * @parameter {String} commentLine A comment line string containing '@class [name]'
 * @parameter {String} description The class description
 * @returns   {Object} Class structure
 */
ParsingService.prototype.getClassStructure = function(commentLine, description) {
	return {
		name: commentLine.split('@class').join('').trim(),
		description: this.parseMarkdown(description),
		variables: [],
		methods: []
	};
};

/**
 * Parses constructor method information from a comment and inserts it into the current class
 *
 * @method createConstructor
 * @parameter {Array} comment A comment array starting from the line containing '@constructor'
 */
ParsingService.prototype.createConstructor = function(comment) {
	if(!this.structureObject.classes.length) {
		return;
	}

	for(var i = 0; i < this.structureObject.classes[0].methods.length; i++) {
		if(this.structureObject.classes[0].methods[i].name === this.structureObject.classes[0].name) {
			return;
		}
	}

	var method = {
		name: this.structureObject.classes[0].name,
		description: '',
		parameters: [],
		returns: null
	};

	for(i = 1; i < comment.length; i++) {
		if(comment[i].indexOf('@parameter') === 0) {
			method.parameters.push(this.getParameterStructure(comment[i]));
		}
		else if(comment[i].indexOf('@tutorial') == 0) {
			method.tutorial = this.getTutorial(comment[i]);
		}
	}

	this.structureObject.classes[0].methods.push(method);
};

/**
* Parses method information from a comment and inserts it into the current class
*
* @method createMethod
* @parameter {Array}  comment     A comment array starting from the line containing '@constructor'
* @parameter {String} description The method description
*/
ParsingService.prototype.createMethod = function(comment, description) {
	if(!this.structureObject.classes.length) {
		return;
	}

	var methodName = comment[0].split('@method').join('').trim();

	for(var i = 0; i < this.structureObject.classes[0].methods.length; i++) {
		if(this.structureObject.classes[0].methods[i].name === methodName) {
			return;
		}
	}

	var method = {
		name: methodName,
		description: this.parseMarkdown(description),
		parameters: [],
		returns: null
	};

	for(i = 1; i < comment.length; i++) {
		if(comment[i].indexOf('@parameter') === 0) {
			method.parameters.push(this.getParameterStructure(comment[i]));
		}
		else if(comment[i].indexOf('@returns') === 0) {
			method.returns = this.getReturnStructure(comment[i]);
		}
		else if(comment[i].indexOf('@tutorial') == 0) {
			method.tutorial = this.getTutorial(comment[i]);
		}
	}

	this.structureObject.classes[0].methods.push(method);
};

/**
 * Parses method parameter information from a comment line
 *
 * @method getParameterStructure
 * @parameter {String} commentLine A comment line string containing '@parameter {[type]} [name] [description]'
 * @returns   {Object} Parameter structure
 */
ParsingService.prototype.getParameterStructure = function(commentLine) {
	var parameterString = commentLine.split('@parameter').join('').trim();
	var parameterArray;
	var parameterStructure = {
		name: '',
		description: '',
		type: '',
		optional: false
	};

	if(parameterString.indexOf('{') === 0) {
		parameterArray = parameterString.split('}');
		parameterStructure.type = parameterArray[0].split('{').join('').trim();
		parameterArray.splice(0, 1);
		parameterString = parameterArray.join('}').trim();
	}

	if(parameterString.indexOf('[') === 0) {
		parameterArray = parameterString.split(']');
		parameterStructure.name = parameterArray[0].split('[').join('').trim();
		parameterStructure.optional = true;
		parameterArray.splice(0, 1);
		parameterString = parameterArray.join(']').trim();
	}
	else {
		parameterArray = parameterString.split(' ');
		parameterStructure.name = parameterArray[0].trim();
		parameterArray.splice(0, 1);
		parameterString = parameterArray.join(' ').trim();
	}

	parameterStructure.description = this.parseMarkdown(parameterString);

	return parameterStructure;
};

/**
* Parses method return information from a comment line
*
* @method getReturnStructure
* @parameter {String} commentLine A comment line string containing '@returns {[type]} [description]'
* @returns   {Object} Return structure
*/
ParsingService.prototype.getReturnStructure = function(commentLine) {
	var returnString = commentLine.split('@returns').join('').trim();
	var returnArray;
	var returnStructure = {
		type: '',
		description: ''
	};

	if(returnString.indexOf('{') === 0) {
		returnArray = returnString.split('}');
		returnStructure.type = returnArray[0].split('{').join('').trim();
		returnArray.splice(0, 1);
		returnString = returnArray.join('}').trim();
	}

	returnStructure.description = this.parseMarkdown(returnString);

	return returnStructure;
};

/**
 * Parses variable information from a comment line and inserts it into the current class
 *
 * @method createVariable
 * @parameter {String} commentLine A comment line string containing '@variable {[type]} [name]'
 * @parameter {String} description The variable description
 */
ParsingService.prototype.createVariable = function(comment, description) {
	if(!this.structureObject.classes.length) {
		return;
	}

	var variableString = comment[0].split('@variable').join('').trim();
	var variableArray;
	var variableStructure = {
		name: '',
		description: this.parseMarkdown(description),
		type: ''
	};

	if(variableString.indexOf('{') === 0) {
		variableArray = variableString.split('}');
		variableStructure.type = variableArray[0].split('{').join('').trim();
		variableArray.splice(0, 1);
		variableString = variableArray.join('}').trim();
	}

	variableArray = variableString.split(' ');
	variableStructure.name = variableArray[0].trim();
	variableArray.splice(0, 1);
	variableString = variableArray.join(' ').trim();

	for(i = 1; i < comment.length; i++) {
		if(comment[i].indexOf('@tutorial') == 0) {
			variableStructure.tutorial = this.getTutorial(comment[i]);
		}
	}

	this.structureObject.classes[0].variables.push(variableStructure);
};

/**
 * Retrieves the tutorial HTML for a variable or method
 *
 * @method getTutorial
 * @parameter {String} commentLine A comment line string containing '@tutorial [location]'
 */
ParsingService.prototype.getTutorial = function(commentLine) {
	var location = commentLine.split('@tutorial').join('').trim();

	if(fs.existsSync(location)) {
		return this.parseMarkdown(fs.readFileSync(location).toString());
	}
	else if(fs.existsSync(process.cwd() + '/' + location)) {
		return this.parseMarkdown(fs.readFileSync(process.cwd() + '/' + location).toString());
	}

	return null;
}

/**
 * Parses markdown to HTML with markdown-js and formats for better Bootstrap use
 *
 * @method parseMarkdown
 * @parameter {String} markdownString The markdown string to parse
 * @returns {String} HTML string
 */
ParsingService.prototype.parseMarkdown = function(markdownString) {
	var htmlString = markdown.toHTML(markdownString)
					 .split('<code>').join('<pre>')
					 .split('</code>').join('</pre>')
					 .trim();

	return htmlString;
}

/**
 * Inserts a structure element from a fully parsed comment into the application structure
 *
 * @method insertStructureObject
 * @parameter {Object} structureObject The structure element to insert
 */
ParsingService.prototype.insertStructureObject = function(structureObject) {
	var categoryMatch = false;
	var classMatch = false;
	var methodMatch = false;

	for(var i = 0; i < this.appStructure.length; i++) {
		if(this.appStructure[i].name === structureObject.name) {
			if(!this.appStructure[i].description.length && structureObject.description.length) {
				this.appStructure[i].description = structureObject.description;
			}

			for(var j = 0; j < this.appStructure[i].classes.length; j++) {
				if(this.appStructure[i].classes[j].name === structureObject.classes[0].name) {
					var s = 0;

					if(structureObject.classes[0].methods.length) {
						for(s = 0; s < this.appStructure[i].classes[j].methods.length; s++) {
							if(this.appStructure[i].classes[j].methods[s].name === structureObject.classes[0].methods[0].name) {
								console.log(colors.yellow('Duplicate method name: ' + structureObject.classes[0].methods[0].name));
								return;
							}
						}

						this.appStructure[i].classes[j].methods.push(structureObject.classes[0].methods[0]);
						return;
					}
					else if(structureObject.classes[0].variables.length) {
						for(s = 0; s < this.appStructure[i].classes[j].variables.length; s++) {
							if(this.appStructure[i].classes[j].variables[s].name === structureObject.classes[0].variables[0].name) {
								console.log(colors.yellow('Duplicate variable name: ' + structureObject.classes[0].variables[0].name));
								return;
							}
						}

						this.appStructure[i].classes[j].variables.push(structureObject.classes[0].variables[0]);
						return;
					}

					return;
				}
			}

			this.appStructure[i].classes.push(structureObject.classes[0]);
			return;
		}
	}

	structureObject.classes = [];
	this.appStructure.push(structureObject);
};

module.exports = ParsingService;
