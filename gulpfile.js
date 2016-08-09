require("babel-register");

var gulp = require("gulp"),
    jasmine = require("gulp-jasmine");

var allFiles = [
    'client/src/**/*.spec.js'
];

gulp.task('test', () => {
    gulp.src(allFiles)
        .pipe(jasmine({
            includeStackTrace: true
        }));
});
