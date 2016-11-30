var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });

exports.task = function () {
    $.util.log("Transpiling typescript files...");
    var tsProject = $.typescript.createProject('tsconfig.json');
    var tsResults = gulp
        .src(['./client/**/*.ts'])
        // .pip(sourcemaps.init())
        .pipe(tsProject());

    return tsResults.js
        // .pipe(sourcemaps.write({ includeContent: false, sourceRoot: './src' }))
        .pipe(gulp.dest(file => file.base));
};
