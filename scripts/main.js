/*
	Author: Mohamed Adam Chaieb
	CS 529 Project - Winter 2015
*/

var m = require("./helper.js");
var fs = require('fs');

var OUTPUT_PATH = 'metrics/code_metrics.json';
var path = process.argv[2];

console.log("Generating code metrics of code in " + path);

var metrics = [];
var files = fs.readdirSync(path);

for(var i = 0; i < files.length; i++) {
	metrics.push(m.generateCodeMetrics(path+'/'+files[i]))
}
var output = {
	general_metrics: m.mergeMetrics(metrics),
	per_file: metrics
}
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));