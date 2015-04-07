var gulp = require('gulp'),
concat = require('gulp-concat'),
fs = require('fs'),
http = require('http'),
karma = require('gulp-karma'),
util = require('util'),
htmlVal = require('html-validator'), // require('w3cjs'),
css = require('css-validator');

var testFiles = [
	'tests/spec.js',
  'src/test.js' //,
  // 'index.html'//,
  // //'src/js/included.js'
];

var src = ['http://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.6.0/webcomponents.js', 'http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js', 'http://cdnjs.cloudflare.com/ajax/libs/qunit/1.16.0/qunit.min.js'];
var len = 0;


src.forEach(function(el, index, array){
	var req = http.get(el, function(res){
		lastSlash = el.lastIndexOf('/');
		name = el.slice(lastSlash)
		file = fs.createWriteStream('./src/js/'+name);
		var writeit = res.pipe(file);
		fs.readdir('./src/js/', function(err, arr){
		})
		len++;
		res.on('end', function(){
		})
	})
})

gulp.task('karma', function() {
  // Be sure to return the stream 
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'my.config.js', // 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero 
      throw err;
    });
});



gulp.task('js', function(){
	gulp.src(['./src/js/*.js'])
	.pipe(concat('./allqunit.js'))
	.pipe(gulp.dest('./'))
})

gulp.task('watch', function(){
	gulp.watch('./src/js/*.js', ['js'])
		.on('change', function(e){
			console.log(e.type);
		})
})



gulp.task('validate', function() {
// Define output file
	var file = './validationsResults.txt',
// Setup date to mark log
	d = new Date(),
	t = d.getFullYear().toString()+d.getDate().toString()+("0"+d.getMonth().toString().slice(-2))+" "+d.getHours().toString()+":"+d.getMinutes().toString()+":"+d.getSeconds().toString()+" START:";


	// var htmlOpts = {
	// 	format : 'text',
	// 	validator: 'http://validator.w3.org/check '
	// };

	// valHTML('./index.html');

// Setup timestamp for current run
	write("\r\n"+t);

// Select which HTML files you want check encoding for	
	// single file
	htmlEncoding('index.html');

	// multiple files
		// setup array of files
		var mArr = ['index.html', 'index2.html', './assets/index.php'];
		enumerate(mArr, 'encode');



// Determine size of all files in a directory
	directorySize('./src/js/');  // Outputs 'Size of ./src/js/ = xxxxbytes'

// Determine size of 1 file in a directory
	fileSize('./assets/js/landing.min.js');

// Determine size of each file in a directory 
	enumerate('./assets/js', 'size' ); // ('directory', ['size'] || ['lines'] || [encode])  size = size of each file || lines = # of lines in each file.  i.e. enumerate('./assets/js', 'lines');

// Determine number of lines in a file
	lines('./assets/js/landing.min.js');


// Validate css
	// Single file
	var cssLoc = './src/styles/styles.css',
	cssString = fs.readFileSync(cssLoc, 'utf-8');
	cssValidate(cssLoc, cssString);
	// Multiple files
		// var cssStringArr = ['./src/styles/styles.css', './src/styles/lp-styles.min.css'];
		// enumerate(cssStringArr, 'css');




// Validate HTML
	// Single file
	var htmlFile = './index.html';
	// htmlValidate(htmlFile);
	// Single URL 
		// htmlValidate('http://livalorx.com/index.php');
	// Multiple files
		// var htmlFileArr = ['./index.html', './index2.html' ];
		// enumerate(htmlFileArr, 'html');
	// Multiple URLs
		// enumerate(['http://livalorx.com', 'http://livalorx.com/whylivalo.php'], 'html');
	// Directory
		enumerate('./html/', 'html');
	 
	
	

	function htmlValidate(file) {
		var opts = {
			// url : 'http://livalorx.com',  // optionally validate a URL
			format : 'text' //
		};

		if (file.indexOf('http') >= 0) {
			opts.url = file;
		} else {
		opts.data = fs.readFileSync( file, 'utf8'); 
		}
		
		work();

		function work() {
			htmlVal(opts, function(err, data){
		    if(err) throw err;
		 		// console.log(data);
		    write("HTML Validation Results for "+file+":\r\n"+ data);
		  });
		}
	}




	function cssValidate(loc, string) {
		css({text: cssString, profile:'css3', warning:'no', output:'text'}, function (err, data) {
			if(err) throw err;
			console.log(data.errors.length);
			var errors = '',
			b = ' - ';
			data.errors.forEach(function(curr, index, arr){
				// console.log(curr);
				curr.skippedstring ? mess = curr.skippedstring.slice(1) : mess = curr.message;
				errors += '@LINE #: '+curr.line+b+'TYPE: '+curr.errortype+b+'CONTEXT: '+curr.context+b+'Error String: '+mess+'\r\n';
			});
			error = '\r\n@Line #: '+data.errors.line;
			write('CSS Errors in '+loc+': '+data.errors.length+'\r\n'+errors+'\r\n');
		  // assert.strictEqual(data.validity, true);
		  // assert.deepEqual(data.errors, []);
		  // assert.deepEqual(data.warnings, []);
		});
	}




	function htmlEncoding(file) {
		fs.readFile(file, 'utf-8', function(err, data){
			if (err) throw err;
			charAt = data.indexOf('charset')+9;
			encoding = data.substr(charAt, 5);
			if(encoding !== 'UTF-8') {
				console.log("UTF Not Correct");
			}
			write("Encoding in "+file+" = "+encoding);	
		})
	}

	function write(data) {
		if(fs.existsSync(file)) {
			fs.appendFile(file, data+"\r\n", function(err){
				if(err) throw err;
			})
		} else {
			fs.writeFile(file, t+"\r\n"+data+"\r\n")
		}
	}

	function fileSize(file){
		// console.log("file", file);
		var stat = fs.statSync(file);
		write("Size of "+file+" = "+stat.size);
		// return stat.size;

	}

	function directorySize(directory){
		var dir = fs.readdirSync(directory),
		size = 0;
		dir.forEach(function(curr, index, array){
			// console.log(curr);
			siz = fs.statSync(directory+"/"+curr);
			size+=siz.size;
			// console.log(siz.size);
			// fs.statSync(this);
		})
		write("Size of "+directory+" = "+size);
		// return size+" bytes";
 	}

 	function lines(file) {
 		var d = fs.readFileSync(file, 'utf-8');
 		fs.readFile(file, 'utf-8', function(err, data){
 			if(err) throw err;
 		});
 		var arr = d.split('\n');
 		write("# of lines in "+file+" = "+arr.length);
 		// return arr.length;
 	}

 	function enumerate(arr, type) {
 		var dir = '',
		size = 0,
		siz = true;
		if (typeof arr === 'object') {
			dir = arr;
		} else {
			dir =  fs.readdirSync(arr);
		}
		// console.log(type);
		// console.log(siz, " is siz");
		dir.forEach(function(curr, index, array){
			switch(type) {
				case 'size':
				fileSize(arr+"/"+curr);
				break;
				case 'lines':
				lines(arr+"/"+curr);
				break;
				case 'encode':
				htmlEncoding(curr);
				break;
				case 'css':
				var cssString = fs.readFileSync(curr, 'utf-8');
				cssValidate(curr, cssString);
				break;
				case 'html':
				htmlValidate(curr);
			}
		})

 	}
});





gulp.task('default', ['js']);

