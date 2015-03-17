/*
	Author: Mohamed Adam Chaieb
	CS 529 Project - Winter 2015
*/

var m = require("./helper.js");
var fs = require('fs');

var path = process.argv[2];
var OUTPUT_PATH = process.argv[3];

var metric = m.generateCodeMetrics(path);
if(metric) {
	var output = {
		code_metrics: m.mergeMetrics([metric]),
		module_count : m.fileCount(path)
	}

	fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
}