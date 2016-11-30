var gulp = require('gulp');

exports.task = function () {
    gulp.watch('**/*.ts', ['build']);
};