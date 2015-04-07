// fs = require('fs');
// bfs = require('browserify-fs');

// ind = fs.readFile('./index.html', 'utf-8', function(err, data){
// 	if (err) throw err;
// 	charAt = data.indexOf('charset')+9;
// 	encoding = data.substr(charAt, 5);
// 	if(encoding !== 'UTF-8') {
// 		alert("Encoding failed. Expected 'UTF-8' but found: "+encoding);
// 	}
// 	console.log(data.indexOf('charset'), data.substr(charAt, 5));
	
	
// 	// return data;
// });

// bfs.writeFile('./validationResults.txt', 'derp', function(err){
// 		if (err) throw err;
// 		console.log("finished?");
// 		bfs.readFile('./validationResults.txt', 'utf-8', function(err, data){
// 			console.log(data);
// 		})
// });


function horatio() {
	a = true;
};

function emailCheck(email) {
	var isValidEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return isValidEmail.test(email);
}