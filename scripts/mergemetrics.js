/*
	Author: Mohamed Adam Chaieb
	CS 529 Project - Winter 2015
*/

var m = require("./helper.js");
var fs = require('fs');

var files = fs.readdirSync('metrics');
var metrics = [];
var dirs = [];

console.log("Merging metrics...");
var json_content = {};
var mod_count = 0;
for(var i = 0; i < files.length; i++) {
	json_content = JSON.parse(fs.readFileSync('metrics/'+files[i]).toString());
	metrics.push(json_content.code_metrics);
	mod_count += json_content.module_count;
	fs.unlinkSync('metrics/'+files[i]);
}

output = {
	code_metrics : m.mergeMetrics(metrics),
	module_count : mod_count
}

fs.writeFileSync("metrics/master_metrics.json", JSON.stringify(output, null, 2));
console.log("Done.");