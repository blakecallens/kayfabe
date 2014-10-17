/**
 * Handles the templatizing and rendering of documentation
 *
 * @category Services
 * @class TemplateService
 * @constructor
 */
var TemplateService = function(){};

/**
 * Builds the documentation output from templates and application structure
 *
 * @method buildDocs
 * @parameter {Object}   appStructure The outputted application structure from the [ParsingService](#class/parsingservice)
 * @parameter {Object}   options      The outputted kayfabe options from the [InfoService](#class/infoservice)
 * @parameter {Function} cb           The callback function
 */
TemplateService.prototype.buildDocs = function(appStructure, options, cb) {
    var source = '';
    var destination = '';
    var scriptDir = __dirname.split('/lib/services').join('');

    if(fs.existsSync(options.template)) {
        source = options.template;
    }
    else if(fs.existsSync(scriptDir + '/' + options.template)) {
        source = scriptDir + '/' + options.template;
    }
    else if(fs.existsSync(process.cwd() + '/' + options.template)) {
        source = process.cwd() + '/' + options.template;
    }
    else {
        cb('Invalid template location provided');
        return;
    }

    if(fs.existsSync(options.output)) {
        destination = options.output;
    }
    else {
        destination = process.cwd() + '/' + options.output;
    }

    ncp(source, destination, function(error) {
        if(error) {
            cb(error);
            return;
        }

        if(options.logo) {
            var fileType = options.logo.substr(options.logo.lastIndexOf('.'));

            if(fs.existsSync(options.logo)) {
                fs.writeFileSync(destination + '/logo' + fileType, fs.readFileSync(options.logo));
                options.logo = 'logo' + fileType;
            }
            else if(fs.existsSync(process.cwd() + '/' + options.logo)) {
                fs.writeFileSync(destination + '/logo' + fileType, fs.readFileSync(process.cwd() + '/' + options.logo));
                options.logo = 'logo' + fileType;
            }
            else {
                delete options.logo;
            }
        }

        kf.directory.getFiles(destination, {fileTypes: ['.js', '.html', '.css'], exclusions: []}, function(templateFiles) {
            for(var i = 0; i < templateFiles.length; i++) {
                var template = fs.readFileSync(templateFiles[i]).toString();
                template = template.split('^app_structure^').join(JSON.stringify(appStructure))
                                   .split('^doc_options^').join(JSON.stringify(options))
                                   .split('^app_name^').join(options.name)
                                   .split('^app_version^').join(options.version);
                fs.writeFileSync(templateFiles[i], template);
            }

            cb();
        });
    });
};

module.exports = TemplateService;
