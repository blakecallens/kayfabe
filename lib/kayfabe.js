#! /usr/bin/env node

'use strict';

global.fs = require('fs');
global.colors = require('colors');
global.ncp = require('ncp').ncp;
global.markdown = require('markdown').markdown;

global.prompt = require('prompt');
prompt.message = "kayfabe".green;

global.kf = {};

var InfoService = require('./services/info_service');
kf.info = new InfoService();

var OptionsService = require('./services/options_service');
kf.options = new OptionsService();

var ParsingService = require('./services/parsing_service');
kf.parsing = new ParsingService();

var DirectoryService = require('./services/directory_service');
kf.directory = new DirectoryService();

var TemplateService = require('./services/template_service');
kf.template = new TemplateService();

var args = process.argv;

this.buildDocumentation = function() {
	var options = kf.options.getOptions();

	kf.parsing.parse(process.cwd(), options, function(appStructure) {
		kf.template.buildDocs(appStructure, options, function(error) {
			if(error) {
				console.log(colors.red(error));
			}
			console.log(colors.blue('Documentation built'));
		});
	});
}

if(!args[2]) {
	this.buildDocumentation();
	return;
}
switch(args[2]) {
	case '.':
		this.buildDocumentation();
		break;
	case '-v':
	case '--version':
	case 'version':
		kf.info.outputVersion();
		break;
	case '-h':
	case '--help':
	case 'help':
		kf.info.outputHelpText();
		break;
	case 'init':
		kf.options.createOptionsJson();
		break;
}
