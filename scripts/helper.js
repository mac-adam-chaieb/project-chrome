var fs = require('fs');

var lang_map = {
	".java" : "Java",
	".cpp" : "C++",
	".cc" : "C++",
	".h" : "C",
	".c" : "C",
	".py" : "Python",
	".js" : "JavaScript",
	".rb" : "Ruby",
	".mm" : "Objective-C"
}

var comment_map = {
	".java" : "\/\/",
	".cpp" : "\/\/",
	".cc" : "\/\/",
	".c" : "\/\/",
	".h" : "\/\/",
	".py" : "#",
	".js" : "\/\/",
	".rb" : "#",
	".mm" : "\/\/"
}

var endsWith = function(str, end) {
	var rev = function reverse(s){
    return s.split("").reverse().join("");
	}
	return (rev(str).search(rev(end)) == 0);
}

var getFileDescription = function(path) {
	var file_contents = fs.readFileSync(path).toString().split('\n');
	// Determine the extension
	var extension = null;
	for(var key in lang_map) {
		// If name ends with given extension
		if(endsWith(path, key)) {
			extension = key;
			break;
		}
	}
	if(extension == null)
		return false;
	var language = lang_map[extension];
	var loc = 1;
	var comments = 0;
	var i = 0;
	var cur;
	while (i < file_contents.length) {
		cur = file_contents[i].trim();
		if(cur.search(comment_map[extension]) == 0) {
			comments++;
			i++;
		} else {
			loc++;
			i++;
		}
	}
	return {
		lang: language,
		loc: loc,
		comments: comments
	};
}

var generateCodeMetrics = function(path) {
	if(isDirectory(path)) {
		// console.log("RECURSING")
		var files = fs.readdirSync(path);
		// console.log(JSON.stringify(files, null, 2));
		var metrics = [];
		var m;
		for(var i = 0; i < files.length; i++) {
			m = generateCodeMetrics(path+'/'+files[i]);
			if(m)
				metrics.push(m);
		}
		return mergeMetrics(metrics);
	} else {
		var desc = getFileDescription(path);
		if(desc) {
			var metric = {};
			var lang_dist = {};
			lang_dist[desc.lang] = desc.loc;
			metric['language_distribution'] = lang_dist;
			metric['loc'] = desc.loc - desc.comments;
			metric['comments'] = desc.comments;
			// console.log(metric);
			return metric;
		}
	}
}

var mergeMetrics = function(metrics) {
	var loc = 0;
	var com = 0;
	var dist = {};
	if(metrics[0] && metrics.length > 0) {
		loc = metrics[0].loc;
		com = metrics[0].comments;
		dist = metrics[0].language_distribution;
	}
	for(var i = 1; i < metrics.length; i++) {
		if(metrics[i] && metrics[i].loc && metrics[i].comments && metrics[i].language_distribution) {
			loc += metrics[i].loc;
			com += metrics[i].comments; 
			for (var key in metrics[i].language_distribution) {
	  		if (metrics[i].language_distribution.hasOwnProperty(key)) {
	    		if(dist[key])
	    			dist[key] += metrics[i].language_distribution[key];
	    		else
	    			dist[key] = metrics[i].language_distribution[key]; 
	  		}
			}
		}
	}
	return {
		language_distribution : dist,
		loc : loc,
		comments : com
	};
}

var isDirectory = function(path) {
	try {
		fs.readdirSync(path);
		return true;
	}	catch (err) {
		return false;
	}
}

module.exports = {
	getFileDescription : getFileDescription,
	generateCodeMetrics : generateCodeMetrics,
	mergeMetrics : mergeMetrics,
	isDirectory : isDirectory,
	lang_map : lang_map,
	comment_map : comment_map
}