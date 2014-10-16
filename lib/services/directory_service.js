/**
* Builds the list of files to be parsed by the ParsingService
*
* @category Services
* @class DirectoryService
* @constructor
*/

var DirectoryService = function(){};

/**
 * The array of files to be parsed
 *
 * @variable {Array} directories
 */
DirectoryService.prototype.directories = [];

/**
 * Retrieves the list of available files based on user options
 *
 * @method getFiles
 * @parameter {String}   baseDirectory The directory to begin the recursive search in
 * @parameter {Object}   options       The search options
 * @parameter {Function} cb            The callback function
 */
DirectoryService.prototype.getFiles = function(baseDirectory, options, cb) {
	var self = this;
	var exclusions = options.exclusions || [];
	var fileTypes = options.fileTypes || ['.js'];

	this.directories = [baseDirectory];
	this.files = [];

	this.getFilesFromDirectory = function(index) {
		fs.readdir(self.directories[index], function(error, files) {
			for(var i = 0; i < files.length; i++) {
				var excluded = false;
				for(var j = 0; j < exclusions.length; j++) {
					if(files[i].indexOf(exclusions[j]) === 0) {
						excluded = true;
						break;
					}
				}
				if(excluded) {
					continue;
				}

				var acceptedType = false;
				for(j = 0; j < fileTypes.length; j++) {
					if(files[i].indexOf(fileTypes[j]) === files[i].length - fileTypes[j].length) {
						acceptedType = true;
						break;
					}
				}
				if(!acceptedType) {
					continue;
				}

				var stats = fs.statSync(self.directories[index] + '/' + files[i]);
				if(!stats.isDirectory()) {
					self.files.push(self.directories[index] + '/' + files[i]);
				}
			}

			index++;
			if(index >= self.directories.length) {
				cb(self.files);
				return;
			}

			self.getFilesFromDirectory(index);
		});
	};

	this.buildDirectories(this.directories, exclusions, function() {
		self.getFilesFromDirectory(0);
	});
};

/**
 * Builds the directory tree that the files to parse will be retrieved from
 *
 * @method buildDirectories
 * @parameter {Array}    baseDirectories An array of directories to search
 * @parameter {Array}    exclusions      Filenames to exclude
 * @parameter {Function} cb              The callback function
 */
DirectoryService.prototype.buildDirectories = function(baseDirectories, exclusions, cb) {
	var self = this;

	this.getSubDirectories(baseDirectories, exclusions, function(subDirectories) {
		if(!subDirectories.length) {
			cb();
			return;
		}

		self.directories = self.directories.concat(subDirectories);
		self.buildDirectories(subDirectories, exclusions, cb);
	});
};

/**
 * Retrieves the subdirectories of an array of parent directories
 *
 * @method getSubDirectories
 * @parameter {Array}    baseDirectories An array of directories to search
 * @parameter {Array}    exclusions      Filenames to exclude
 * @parameter {Function} cb              The callback function
 */
DirectoryService.prototype.getSubDirectories = function(baseDirectories, exclusions, cb) {
	var self = this;
	var subDirectories = [];

	this.getDirectorySubs = function(index) {
		fs.readdir(baseDirectories[index], function(error, files) {
			for(var i = 0; i < files.length; i++) {
				var excluded = false;
				for(var j = 0; j < exclusions.length; j++) {
					if(files[i].indexOf(exclusions[j]) === 0) {
						excluded = true;
						break;
					}
				}
				if(excluded) {
					continue;
				}

				var stats = fs.statSync(baseDirectories[index] + '/' + files[i]);
				if(stats.isDirectory()) {
					subDirectories.push(baseDirectories[index] + '/' + files[i]);
				}
			}

			index++;
			if(index >= baseDirectories.length) {
				cb(subDirectories);
				return;
			}
			self.getDirectorySubs(index);
		});
	};

	self.getDirectorySubs(0);
};

module.exports = DirectoryService;
