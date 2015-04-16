var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var queryString = require('querystring');
var util = require('util');
// require more modules/folders here!

// var collectData = function(req){
//   var str = '';
//   req.on('data', function(chunk){
//     str += chunk;
//   });

//   req.on('end', function ()){
//     JSON.parse(str);
//   }
// }

exports.handleRequest = function (req, res) {
  //res.end(archive.paths.list);
  console.log ('serving a ' + req.method + 'request from ' + req.url );
    var filePath = req.url;
    var extName = path.extname(filePath);
    var contentType = "text/html"

    if (extName === ".css") {
      contentType = "text/css";
    }

    if (filePath === '/') {
      filePath = archive.paths.index
    } else if (filePath === "/styles.css"){
      filePath = archive.paths.styles;
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

    if (req.method === "POST") {
      var str = '';
      var obj;
      req.on('data', function(chunk){
        str += chunk;
      });

      req.on('end', function (){
        obj = util.inspect(queryString.parse(str));
      console.log('obj ' + obj);
      });

      fs.writeFile('sites.txt', JSON.stringify(req.url), function (err) {
        console.log("I AM INSIDE!!!"+req.url)
        // if (err) console.log("err")
      });
    }

};



//want filePath = '../archives/sites'
  //then check to see if path filePath + req.url (/archives/sites/www.google.com) exists
