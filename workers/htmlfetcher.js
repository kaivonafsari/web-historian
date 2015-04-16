var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpGet = require('http-get');


exports.htmlFetcher = function (){
  var urlList = archive.readListOfUrls();
  for (var i = 0; i < urlList.length; i++){
    var filePath = archive.paths.archivedSites + '/' + urlList[i];
    fs.readFile(filePath, function(error, content){
      if (error){
        httpGet.get(urlList[i], JSON.stringify(filePath), function (err, res) {
          if (err) {
            console.error(err);
            return;
        }

        console.log('html fetcher', res.code, res.headers, res.buffer.toString());
        });
        //go get the website
      }
      return;
    })
  }


}
