// import express framework and http module
var express = require('express');
var http = require('http');
var app = express();


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// require module for watson api
var watson = require('watson-developer-cloud');
// require fs module, used to process image later
var fs = require('fs');
var visual_recognition = watson.visual_recognition({
	api_key: '5da0662bcd2108322b4c35372c9181d9f21337e0',
	version: 'v3',
	version_date: '2016-05-20'
});

app.all('/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

//console.log("Start of Program\n");
// array of items that contain recycle
var recycle = ["bottle", "can", "plastic", "paper", "aluminum", "steel", "glass", "water"];
var tokenlist = [];

	// params is a function that takes in a jpg image
var params = {
    images_file: fs.createReadStream('./toothpaste.jpg')
};
// process the params and has another function that takes in err and response
visual_recognition.classify(params, function(err, res) {
  if (err)
  	console.log(err);
  else
  	//create an array of classList that contains all the classes name of the image
      var classlist = res.images[0].classifiers[0].classes.map(function(classObj){ return classObj.class; });
          for(var i = 0; i < res.images[0].classifiers[0].classes.length; i++) {
              //console.log(classlist[i]);
              //do we have to put it into tokenlist array.
              tokenlist.push(classlist[i]);
        }
    //console.log(JSON.stringify(res, null, 2));
});

var x = 0;
var result = [];
var s = "Recycleable";
setTimeout(function() {
for (i = 0; i < recycle.length; i++) {
	x++;
    for (j = 0; j < tokenlist.length; j++) {
        if(tokenlist[j].includes(recycle[i]) || recycle[i].includes(tokenlist[j])){
       		//if tokenlist
            result.push(s);
            return;
        }

    }
    // if x == recycle.length, means that no item in the array was recycable
    if( x == recycle.length){
    	s = "Not Recycleable";
    	result.push(s);
    }
}
}, 5000)

app.get('/', function(req, res) {
    res.send(result);
});
app.server = http.createServer(app);
app.server.listen(3000);




//console.log("\nEnd of Program");