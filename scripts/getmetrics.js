/*
	Author: Mohamed Adam Chaieb
	CS 529 Project - Winter 2015
*/

var m = require("./helper.js");
var fs = require('fs');
var exec = require('child_process').execFile;
var path = process.argv[2];
var files = fs.readdirSync(path);

for(var i = 0; i < files.length; i++) {
	console.log('Analyzing '+path+'/'+files[i]);
	if(m.isDirectory(path+'/'+files[i]))
		exec('node', ['scripts/getmetrics.js', path+'/'+files[i]], function(err, stdout, stderr) {});
	else
		exec('node', ['scripts/main.js', path+'/'+files[i], 'metrics/code_metrics' + i + '.json'], function(err, stdout, stderr) {});
}