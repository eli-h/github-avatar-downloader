var request = require('request');
var fs = require('fs');
var owner = process.argv[2];
var name = process.argv[3]
console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = "eli-h";
var GITHUB_TOKEN = "69b35fc62c9049c0a4b2122120f26da7a4cccf45";

function getRepoContributers(repoOwner, repoName, cb){
  if (!name){
  	console.log("invalid input!");
  }
  else {
	  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
	  var requestObj = {
	  	url: requestURL,
	    headers: {'User-Agent': 'GitHub Avatar Downloader - Student Project'}
	  };
	  
	  request.get(requestObj, function(error, response, body){
	  	 var parsed = JSON.parse(body);
	  	 cb(error, parsed);
	  });
	}
}

function downloadImageByUrl(url, filePath){
  request.get(url)
         .pipe(fs.createWriteStream(filePath));
}

getRepoContributers(owner, name, function(err, result){
	for (var key in result){
		downloadImageByUrl(result[key].avatar_url, './downloads/' + result[key].login + '.jpg')
	}
});

//downloadImageByUrl("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./downloads/pic.jpg");