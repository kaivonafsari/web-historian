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
  this.readListOfUrls(function(sites){
   var found;
   sites.each(function(item){
      if (url === item){
        found = item;
      }else{
        found = null;
      }
        callback(found);
    };
  });
};

exports.addUrlToList = function(siteUrl){
  fs.appendFile( '../archives/sites.txt', siteUrl + '\n', function (err) {
  });
};

exports.isURLArchived = function(url, callback){
  var filePath = this.paths.archivedSites + '/' + url
  fs.exists(filePath, function(exists){
    callback(exists);
  })
};

exports.downloadUrls = function(){
};
