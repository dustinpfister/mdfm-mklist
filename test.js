var mklist = require('./index.js');

mklist.list(function(li){
	
	console.log('this is test');
	console.log(li);
	
},{recursive:true,source:'./'});