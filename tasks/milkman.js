var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
module.exports = function( grunt ) {
	 // Internal lib.
  	
  	 grunt.registerMultiTask('milkman', 'Synch files to projects', function() {
  	 	console.log('milk task run'.rainbow);
  	 	var options = this.options({
	      compress: false
	    });

	    // Iterate over all src-dest file pairs.
	    this.files.forEach(function (both) {
	    	 
	    	var target = both.dest;
	    	var source = both.orig.src[0];
			/*var src = source.src.filter(function (filepath) {

			// Warn on and remove invalid source files (if nonull was set).
			if (!grunt.file.exists(filepath)) {
			  grunt.log.warn('Source file ' + chalk.cyan(filepath) + ' not found.');
			  return false;
			} else {
			  return true;
			}
			});*/

	    	
	    	var imported = {};
	    	/* Смотрим тип файла */
	    	if (fs.lstatSync(source).isDirectory) {
	    		fs.readdir(source, function(err, files) {
	    			for (var i = 0;i<files.length;i++) {
	    				imported[source+files[i]] = target+files[i];
	    			}
	    		});
	    	} else {
	    		imported[source] = target;
	    	}

			if (source.length === 0) {
				grunt.log.warn('Destination ' + chalk.cyan(f.dest) + ' not written because src files were empty.');
				return;
			}
			// Get local file
			//
			imported.forEach(function(t, s) {
				mkdirp(path.dirname(t), function() {
					fs.createReadStream(s).pipe(fs.createWriteStream(t));
					console.log('copy '+s+' to '+t);
				});	    
			});
			
	    });
	    console.log('files are synchronized to `'+this.name+'`'.green);
  	 });
};
