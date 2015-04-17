var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'index' : path.join(__dirname, '../web/public/index.html'),
  'styles' : path.join(__dirname, '../web/public/styles.css'),

  'archivedSites' : path.join(__dirname, '../archives/sites'),
  // 'fixtureName' : path.join(__dirname, '../archives/sites/www.google.com'),

  'list' : path.join(__dirname, '../archives/sites.txt'),
  'txt'  : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  console.log('reading the list');
  fs.readFile('../archives/sites.txt', function(err, data) {
      if(err) throw err;
      var array = data.toString().split("\n");
     if (callback){
      callback(array);
     }
  });
};

exports.isUrlInList = function(url, callback){

  exports.readListOfUrls(function(sites){
   var found = false;
   console.log(Array.isArray(sites));
   for (var i = 0; i < sites.length; i++){
    if (url === sites[i]){
      console.log('match!');
      found = true;
    }
    callback(found);
   }

  });
}


exports.addUrlToList = function(url, callback){
  console.log('add to list callback');
  fs.appendFile( '/Users/student/Documents/2015-03-web-historian/archives/sites.txt', url + '\n', function (err, file) {
    callback();
  });
};

exports.isURLArchived = function(url, callback){
  var filePath = exports.paths.archivedSites + '/' + url
  fs.exists(filePath, function(exists){
    callback(exists);
  })
};

exports.downloadUrls = function(){
};
