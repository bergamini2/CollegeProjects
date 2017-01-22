var watson = require('watson-developer-cloud');
var fs = require('fs');

var visual_recognition = watson.visual_recognition({
  api_key: '5da0662bcd2108322b4c35372c9181d9f21337e0',
  version: 'v3',
  version_date: '2016-05-20'
});

//console.log("Start of Program\n");

var recycle = ["bottle", "can", "plastic", "paper", "aluminum", "steel", "glass", "water"];
var tokenlist = [];


var params = {
  images_file: fs.createReadStream('./trash_1120_14.jpg')
};

visual_recognition.classify(params, function(err, res) {
  if (err)
    console.log(err);
  else
  	var classlist = res.images[0].classifiers[0].classes.map(function(classObj){ return classObj.class; });
  		for(var i = 0; i < res.images[0].classifiers[0].classes.length; i++) {
      		console.log(classlist[i]);
      		tokenlist.push(classlist[i]);
		}
    //console.log(JSON.stringify(res, null, 2));
});


var x = 0;
setTimeout(function() {
for (i = 0; i < recycle.length; i++) { 
	x++;
    for (j = 0; j < tokenlist.length; j++) { 
    	if(tokenlist[j].includes(recycle[i]) || recycle[i].includes(tokenlist[j])){
    		console.log(tokenlist[j] + " is inside of " + recycle[i]);
    		console.log("Recycleable");
    		return;
    	}
	}
	if(x == recycle.length){
		console.log("Not Recycleable");
	}
}
}, 8000)

//console.log("\nEnd of Program");