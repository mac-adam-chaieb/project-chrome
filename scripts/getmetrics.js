/*
	Author: Mohamed Adam Chaieb
	CS 529 Project - Winter 2015
*/

var m = require("./helper.js");
var fs = require('fs');
var exec = require('child_process').execSync;

var path = process.argv[2];
var files = fs.readdirSync(path);
var status = 0;
for(var i = 0; i < files.length; i++) {
	console.log('Analyzing '+path+'/'+files[i]);
	// console.log("Running: " + ' node ' + ' main.js ' + files[i] + " metrics/code_metrics"+i+".json")
	exec('node scripts/main.js ' + path+'/'+files[i] + ' metrics/code_metrics' + i + '.json');
	// console.log("Exited with status "+ status);
}

var metrics = [];

console.log("Generating master code metrics...");
var json_content = {};
var mod_count = 0;
for(var i = 0; i < files.length; i++) {
	json_content = JSON.parse(fs.readFileSync('metrics/code_metrics' + i + '.json').toString());
	metrics.push(json_content.code_metrics);
	mod_count += json_content.module_count;
	fs.unlinkSync('metrics/code_metrics' + i + '.json');
}

output = {
	directory: path,
	code_metrics : m.mergeMetrics(metrics),
	module_count : mod_count
}

var code = fs.readdirSync('metrics').length
fs.writeFileSync("metrics/master_metrics"+code+".json", JSON.stringify(output, null, 2));
console.log("Done.");