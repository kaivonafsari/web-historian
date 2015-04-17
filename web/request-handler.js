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
      //we have the url
      archive.isUrlInList(siteUrl, function(found){
      //check if the url is on the list
        if (found){
        //if it is on the list
          //is it archived
        archive.isURLArchived(siteUrl, function(exists){
          if (exists){
            //if its archived
              //send to page
            res.writeHead(302, {"Location": archive.paths.archivedSites + '/' + siteUrl});
            res.end();
          }
          else {
            //if not archived
              //send to loading page
            res.writeHead(302, {"Location": '/loading.html'});
            res.end();
          }
        })


        }
        //if not on the list
          //add it to the list

      })




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
            res.writeHead(404);
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


