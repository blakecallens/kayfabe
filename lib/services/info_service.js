/**
 * Retrieves and outputs information about kayfabe
 *
 * @category Services
 * @class InfoService
 * @constructor
 */

var InfoService = function() {};

/**
 * Outputs the current version of the kayfabe installation
 *
 * @method outputVersion
 */
InfoService.prototype.outputVersion = function() {
	this.getVersion(function(version) {
		if(!version) {
			console.log(colors.yellow('No version number available'));
			return;
		}

		console.log(colors.green('kayfabe v' + version));
	})
}

/**
 * Retrieves the current version of the kayfabe installation
 *
 * @method getVersion
 * @parameter {Function} cb The callback function
 */
InfoService.prototype.getVersion = function(cb) {
	if(fs.existsSync('./package.json')) {
		fs.readFile('./package.json', function(error, data) {
			var packageData = JSON.parse(data);

			if(!packageData.version) {
				cb(null);
				return;
			}

			cb(packageData.version);
		});
	}
	else {
		cb(null);
	}
}

/**
 * Outputs the kayfabe help text
 *
 * @method outputHelpText
 */
InfoService.prototype.outputHelpText = function() {
	this.getHelpText(function(helpText) {
		if(!helpText) {
			console.log(colors.yellow('Help text unavailable'));
			return;
		}

		console.log(helpText);
	})
}

/**
 * Gets the kayfabe help text
 *
 * @method getHelpText
 * @parameter {Function} cb The callback function
 */
InfoService.prototype.getHelpText = function(cb) {
	var self = this;

	if(fs.existsSync('./assets/console/help_text.txt')) {
		fs.readFile('./assets/console/help_text.txt', function(error, helpText) {
			if(!helpText) {
				cb(null);
				return;
			}

			self.getVersion(function(version) {
				var versionText = version ? 'kayfabe v' + version : '';
				helpText = helpText.toString().split('^version^').join(versionText);
				cb(helpText);
			})
		});
	}
	else {
		cb(null);
	}
}

module.exports = InfoService;
