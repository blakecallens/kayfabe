/**
* Sets, retrieves and displays kayfabe options
*
* @category Services
* @class OptionsService
* @constructor
*/

var OptionsService = function(){};

/**
 * Retrieves kayfabe options and optionally appends them with settings from a
 * package.json file
 *
 * @method getOptions
 * @returns {Object} kayfabe options
 * @tutorial tutorials/optionsservice/getoptions.md
 */
OptionsService.prototype.getOptions = function() {
	var options = {};
	var packageObject = {};
	var baseDirectory = process.cwd();

	if(fs.existsSync(baseDirectory + '/kayfabe.json')) {
		console.log(colors.green('Loading options JSON...'));
		options = JSON.parse(fs.readFileSync(baseDirectory + '/kayfabe.json').toString());
	}

	if(fs.existsSync(baseDirectory + '/package.json')) {
		console.log(colors.green('Loading package JSON...'));
		packageObject = JSON.parse(fs.readFileSync(baseDirectory + '/package.json').toString());
	}

	options.output = options.output || 'docs';
	options.template = options.template || 'templates/kayfabe';
	options.fileTypes = options.fileTypes || ['.js'];
	options.exclusions = options.exclusions || ['.', 'node_modules'];
	options.name = options.name || packageObject.name || '';
	options.version = options.version || packageObject.version || '';
	options.description = options.description || packageObject.description || '';
	options.tutorial = options.tutorial ? this.getTutorial(options.tutorial) : null;

	options.standaloneTutorials = options.standaloneTutorials || [];
	for(var i = 0; i < options.standaloneTutorials.length; i++) {
		options.standaloneTutorials[i].content = this.getTutorial(options.standaloneTutorials[i].location);
	}

	return options;
};

/**
 * Retrieves the application's main tutorial markdown file and parses it into HTML
 *
 * @method getTutorial
 * @parameter {String} location The relative or absolute location of the tutorial file
 * @returns {String} The tutorial HTML
 */
OptionsService.prototype.getTutorial = function(location) {
	if(fs.existsSync(location)) {
		return kf.parsing.parseMarkdown(fs.readFileSync(location).toString());
	}
	else if(fs.existsSync(process.cwd() + '/' + location)) {
		return kf.parsing.parseMarkdown(fs.readFileSync(process.cwd() + '/' + location).toString());
	}

	return null;
};

/**
 * Prompts the user for application information and creates a kayfabe.json file
 *
 * @method createOptionsJson
 * @parameter {Function} [cb] An optional callback function
 */
OptionsService.prototype.createOptionsJson = function(cb) {
	var self = this;
	var options = {};

	this.getPackageJsonOptions(options, function(options) {
		self.getNameVersionDescription(options, function(options) {
			self.getParsingOptions(options, function(options) {
				var optionsJson = JSON.stringify(options, null, '    ');

				fs.writeFile(process.cwd() + '/kayfabe.json', optionsJson, function(err) {
					if(err) {
						throw err;
					}

					console.log(colors.blue('kayfabe.json created'));
					if(typeof cb !== 'undefined') {
						cb();
					}
				});
			});
		});
	});
};

/**
 * Prompts the user to choose using their package.json file for kayfabe options
 *
 * @method getPackageJsonOptions
 * @parameter {Object}   options kayfabe options object
 * @parameter {Function} cb      The callback function
 */
OptionsService.prototype.getPackageJsonOptions = function(options, cb) {
	if(fs.existsSync(process.cwd() + '/package.json')) {
		var promptSchema = {
			properties: {
				usePackageJson: {
					description: 'Do you want to use settings from your package.json file?',
					default: 'Y/n',
					type: 'string'
				}
			}
		}

		prompt.start();
		prompt.get(promptSchema, function(err, packageJsonResult) {
			if(err) {
				throw err;
			}

			switch(packageJsonResult.usePackageJson.toLowerCase()) {
				case 'y':
				case 'y/n':
				case 'yes':
					options.usePackage = true;
					break;
				default:
					break;
			}

			cb(options);
		});
	}
	else {
		cb(options);
	}
};

/**
 * Prompts the user for application info, if a package.json file is not being used
 *
 * @method getNameVersionDescription
 * @parameter {Object}   options kayfabe options object
 * @parameter {Function} cb      The callback function
 */
OptionsService.prototype.getNameVersionDescription = function(options, cb) {
	if(options.usePackage) {
		delete options.usePackage;
		cb(options);
		return;
	}

	var promptSchema = {
		properties: {
			name: {
				description: 'application name',
				default: '',
				type: 'string'
			},
			version: {
				description: 'application version',
				default: '',
				type: 'string'
			},
			description: {
				description: 'application description',
				default: '',
				type: 'string'
			}
		}
	}

	prompt.get(promptSchema, function(err, promptResult) {
		if(err) {
			throw err;
		}

		options.name = promptResult.name;
		options.version = promptResult.version;
		options.description = promptResult.description;

		cb(options);
	});
};

/**
 * Prompts the user for comment parsing options
 *
 * @method getParsingOptions
 * @parameter {Object}   options kayfabe options object
 * @parameter {Function} cb      The callback function
 */
OptionsService.prototype.getParsingOptions = function(options, cb) {
	var promptSchema = {
		properties: {
			logo: {
				description: 'logo image file',
				default: 'leave empty for none',
				type: 'string'
			},
			tutorial: {
				description: 'main tutorial markdown file location',
				default: 'leave empty for none',
				type: 'string'
			},
			fileTypes: {
				description: 'file type(s) that contain documentation comments [^C to continue]',
				default: "['.js']",
				type: 'array'
			},
			exclusions: {
				description: 'folder and file name pattern(s) to exclude from parsing [^C to continue]',
				default: "['.', 'node_modules']",
				type: 'array'
			},
			output: {
				description: 'output folder',
				default: 'docs',
				type: 'string'
			}
		}
	}

	prompt.get(promptSchema, function(err, promptResult) {
		if(err) {
			throw err;
		}

		if(promptResult.logo.length && promptResult.logo !== 'leave empty for none') {
			options.logo = promptResult.logo;
		}
		if(promptResult.tutorial.length && promptResult.tutorial !== 'leave empty for none') {
			options.tutorial = promptResult.tutorial;
		}
		options.fileTypes = promptResult.fileTypes;
		options.exclusions = promptResult.exclusions;
		options.output = promptResult.output;

		cb(options);
	});
}

module.exports = OptionsService;
