var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');
var GITHUB_USER = "eli-h";
var GITHUB_TOKEN = "69b35fc62c9049c0a4b2122120f26da7a4cccf45";
function getRepoContributers(repoOwner, repoName, cb){
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);
}

getRepoContributers("jquery", "jquery", function(err, result){
	console.log(err);
	console.log(result);
});