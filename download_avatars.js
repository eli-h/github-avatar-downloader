var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = "eli-h";
var GITHUB_TOKEN = "69b35fc62c9049c0a4b2122120f26da7a4cccf45";

function getRepoContributers(repoOwner, repoName, cb){
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  //var parse = {};
  var requestObj = {
  	url: requestURL,
    headers: {'User-Agent': 'GitHub Avatar Downloader - Student Project'}
  };

  request.get(requestObj, function(error, response, body){
  	 var parsed = JSON.parse(body);
  	 cb(error, parsed);
  });
}

var picLinks = getRepoContributers("jquery", "jquery", function(err, result){
	var links = ""
	for (var key in result){
		links += (result[key].avatar_url + '\n')
	}
	return(links)
});

function downloadImageByUrl(url, filePath){
  request.get(url)
         .on('error', function(err){
         	throw err;
         })
         .on('response', function(response){
         	console.log(response.statusCode);
         })
         .pipe(fs.createWriteStream(filePath));
}

//downloadImageByUrl("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./downloads/pic.jpg");