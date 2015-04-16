var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var queryString = require('querystring');
var util = require('util');
// var htmlFetch = require ('../workers/htmlfetcher');
// require more modules/folders here!


exports.handleRequest = function (req, res) {
  console.log ('serving a ' + req.method + 'request from ' + req.url );
  var reqUrl = req.url;
  var extName = path.extname(reqUrl);
  var contentType = "text/html"

  if (req.method === "POST") {
    // filePath = archive.paths.txt;

    var str = '';
    var obj;
    req.on('data', function(chunk){
      str += chunk;
    });

    req.on('end', function (){
      obj = queryString.parse(str);
      var siteUrl =  obj.url;
      archive.addUrlToList(siteUrl);
      // fs.appendFile( '../archives/sites.txt', siteUrl + '\n', function (err) {
      // });
      res.writeHead(302, {"Location": '/loading.html'});
      res.end();
      // htmlFetch.htmlFetcher();
    });
  }else{
    console.log('else statement');
    if (extName === ".css") {
      contentType = "text/css";
    }

    if (reqUrl === '/') {
      filePath = archive.paths.siteAssets + '/index.html'
    } else {
      filePath = archive.paths.siteAssets + '/' + req.url;

    }


    fs.readFile(filePath, function(error, content){
      if (error) {
        filePath = archive.paths.archivedSites + '/' + req.url;
        fs.readFile(filePath, function(error, content){
          if (error) {
            archive.addUrlToList(req.url.slice(1));
            res.writeHead(302, {"Location": '/loading.html'});
            res.end();
          } else {
            res.writeHead(200, {"Content-Type": contentType});
            res.end(content, "utf-8");
          }
        })
      } else {
        res.writeHead(200, {"Content-Type": contentType});
        res.end(content, "utf-8")
      }
    })
  }
};


