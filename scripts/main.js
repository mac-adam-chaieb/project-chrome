/*
	Author: Mohamed Adam Chaieb
	CS 529 Project - Winter 2015
*/

var m = require("./helper.js");
var fs = require('fs');

console.log("Starting metrics script...");

var metrics = m.generateCodeMetrics(process.argv[2]);

console.log(JSON.stringify(metrics, null, 2));

// TODO: complete the script