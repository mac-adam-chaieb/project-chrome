/*
	Author: Mohamed Adam Chaieb
	CS 529 Project - Winter 2015
*/

var m = require("./helper.js");
var fs = require('fs');
var exec = require('child_process').execFileSync;
var path = process.argv[2];
var files = fs.readdirSync(path);

for(var i = 0; i < files.length; i++) {
	console.log('Analyzing '+path+'/'+files[i]);
	if(m.isDirectory(path+'/'+files[i]))
		exec('node', ['scripts/getmetrics.js', path+'/'+files[i]]);
	else {
		// exec('node', ['scripts/main.js', path+'/'+files[i], 'metrics/code_metrics' + i + '.json'], function(err, stdout, stderr) {});
		var metric = m.generateCodeMetrics(path);
		if(metric) {
			var output = {
				code_metrics: m.mergeMetrics([metric]),
				module_count : m.fileCount(path)
			}
			fs.writeFileSync('metrics/code_metrics'+files.length+'.json', JSON.stringify(output, null, 2));
		}
	}	
}