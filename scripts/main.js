/*
	Author: Mohamed Adam Chaieb
	CS 529 Project - Winter 2015
*/

var m = require("./helper.js");
var fs = require('fs');

var path = process.argv[2];
var OUTPUT_PATH = process.argv[3];
var files = [];
if(m.isDirectory(path)) {
	files = fs.readdirSync(path);
} else {
	files.push(path);
}

console.log("Generating code metrics of code in " + path);

var metrics = [];
var metric;
for(var i = 0; i < files.length; i++) {
	console.log(path+'/'+files[i]);
	if(m.isDirectory())
		metric = m.generateCodeMetrics(path+'/'+files[i]);
	else
		metric = m.generateCodeMetrics(path);
	if(metric)
		metrics.push(metric);
}

var output = {
	code_metrics: m.mergeMetrics(metrics),
	module_count : m.fileCount(path),
	per_file: metrics
}

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
console.log("Done");