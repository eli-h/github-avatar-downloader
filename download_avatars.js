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

function downloadImageByUrl(url, filePath){
  request.get(url)
         .pipe(fs.createWriteStream(filePath));
}

var picLinks = getRepoContributers("jquery", "jquery", function(err, result){
	for (var key in result){
		downloadImageByUrl(result[key].avatar_url, './downloads/' + result[key].login + '.jpg')
	}
});

//downloadImageByUrl("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./downloads/pic.jpg");