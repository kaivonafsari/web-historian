var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var queryString = require('querystring');
var util = require('util');
// require more modules/folders here!


exports.handleRequest = function (req, res) {
  console.log ('serving a ' + req.method + 'request from ' + req.url );
  var filePath = req.url;
  var extName = path.extname(filePath);
  var contentType = "text/html"

  if (req.method === "POST") {
    filePath = archive.paths.txt;

    var str = '';
    var obj;
    req.on('data', function(chunk){
      str += chunk;
    });

    req.on('end', function (){
      obj = queryString.parse(str);
      var siteUrl =  obj.url;
      fs.appendFile( 'archives/sites.txt', siteUrl + '\n', function (err) {
        res.writeHead(302);
        res.end();
      });

    });

  }

    if (extName === ".css") {
      contentType = "text/css";
    }

    if (filePath === '/') {
      filePath = archive.paths.siteAssets + '/index.html'
    } else if (filePath === "/styles.css"){
      filePath = archive.paths.siteAssets + filePath;
    }

    else {
      filePath = archive.paths.archivedSites + '/' + req.url;
    }

    fs.readFile(filePath, function(error, content){
      if (error) {
        res.writeHead(404);
        res.end();
      } else {
        res.writeHead(200, {"Content-Type": contentType});
        res.end(content, "utf-8")
      }
    })
};


