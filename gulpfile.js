var gulp = require('gulp');
var fs = require('fs');

//-- read in all files from gulp/tasks and create tasks for them
fs.readdirSync('./gulp/tasks')
  .filter(function (filename) {
    return filename.match(/\.js$/i);
  })//filter the _* files
  .filter(function (filename) {
    return !filename.match(/^_.*$/i);
  })
  .map(function (filename) {
    return {
      name: filename.substr(0, filename.length - 3),
      contents: require('./gulp/tasks/' + filename)
    };
  })
  .forEach(function (file) {
    gulp.task(file.name, file.contents.dependencies, file.contents.task);
  });