var gulp = require('gulp'),
concat = require('gulp-concat'),
fs = require('fs'),
http = require('http');

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

gulp.task('default', ['js']);

