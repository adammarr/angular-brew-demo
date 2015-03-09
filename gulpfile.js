// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');
var inject = require('gulp-inject');
var rev = require('gulp-rev');
var del = require('del');
var plumber = require('gulp-plumber');

var files = {
    vendorJS : [
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/angular/angular.min.js',
        'bower_components/angular-resource/angular-resource.min.js',
        'bower_components/angular-animate/angular-animate.min.js',
        'bower_components/angular-messages/angular-messages.min.js',
        'bower_components/angular-aria/angular-aria.min.js',
        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'bower_components/angular-material/angular-material.min.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'bower_components/toastr/toastr.min.js'
    ],
    vendorCSS : [
        'bower_components/angular-material/angular-material.min.css',
        'bower_components/toastr/toastr.min.css'
    ],
    js : [
        'app/js/*.js',
        'app/js/**/*.module.js',
        'app/js/**/*.js',
        '!app/js/mock/*.js',
        '!app/js/mock/**/*.js'
    ],
    mockjs : [
        'app/js/*.js',
        'app/js/**/*.module.js',
        'app/js/**/*.js'
    ],
    scss : [
        'app/scss/*.scss'
    ]
}

// Lint Task
gulp.task('lint', function() {
    var onError = function(err) {
        notify.onError({
                    title:    "Gulp Lint",
                    subtitle: "Failure!",
                    message:  "Error: <%= err.message %>",
                    sound:    "Beep"
                })(err);
        this.emit('end');
    };

    return gulp.src(files.js)
        .pipe(plumber({errorHandler: onError}))
        .pipe(jshint())
        .pipe(notify(function (file) {
      		if (file.jshint.success) {
        		// Don't show something if success
        		return false;
      		}

      		var errors = file.jshint.results.map(function (data) {
        		if (data.error) {
          			return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
        		}
      		}).join("\n");
      		return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
    	}));
});

// Compile Our Sass
gulp.task('sass', function() {
	var onError = function(err) {
        notify.onError({
                    title:    "Gulp Sass",
                    subtitle: "Failure!",
                    message:  "Error: <%= err.message %>",
                    sound:    "Beep"
                })(err);
        this.emit('end');
    };

    //clean the css dest directory
    del(['dist/css/*'], function() {
        var cssfiles = gulp.src(files.scss)
        	.pipe(plumber({errorHandler: onError}))
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(rev())
            .pipe(sourcemaps.write('maps'))
            .pipe(gulp.dest('dist/css'));

        gulp.src('index.html')
            .pipe(plumber({errorHandler: onError}))
            .pipe(inject(cssfiles, {
                read: false,
                starttag: '<!-- app:css -->',
                endtag: '<!-- endinject -->',
                addRootSlash: false,  // ensures proper relative paths
                ignorePath: '/build/' // ensures proper relative paths
            }))
            .pipe(gulp.dest('./'))
            .pipe(notify({
                title: 'SASS Files Complete',
                message: 'Yay!'
            }));
    });
});

// Concatenate & Minify JS
gulp.task('scripts-prod', function() {
	var onError = function(err) {
        notify.onError({
                    title:    "Gulp Scripts",
                    subtitle: "Failure!",
                    message:  "Error: <%= err.message %>",
                    sound:    "Beep"
                })(err);
        this.emit('end');
    };

    return gulp.src(files.js)
    	.pipe(plumber({errorHandler: onError}))
        .pipe(ngAnnotate())
    	.pipe(sourcemaps.init())
        .pipe(concat('rdeploy.temp.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('rdeploy.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist'))
        .pipe(notify({
			title: 'Scripts Complete',
			message: 'Yay!'
		}));
});

gulp.task('vendor-files', function() {
    var onError = function(err) {
        notify.onError({
                    title:    "Gulp Scripts",
                    subtitle: "Failure!",
                    message:  "Error: <%= err.message %>",
                    sound:    "Beep"
                })(err);
        this.emit('end');
    };

    var jsfiles = gulp.src(files.vendorJS),
        cssfiles = gulp.src(files.vendorCSS);

    return gulp.src('index.html')
        .pipe(plumber({errorHandler: onError}))
        .pipe(inject(jsfiles, {
            read: false,
            starttag: '<!-- bower:js -->',
            endtag: '<!-- endinject -->',
            addRootSlash: false,  // ensures proper relative paths
            ignorePath: '/build/' // ensures proper relative paths
        }))
        .pipe(inject(cssfiles, {
            read: false,
            starttag: '<!-- bower:css -->',
            endtag: '<!-- endinject -->',
            addRootSlash: false,  // ensures proper relative paths
            ignorePath: '/build/' // ensures proper relative paths
        }))
        .pipe(gulp.dest('./'))
        .pipe(notify({
            title: 'Vendor Files Complete',
            message: 'Yay!'
        }));
});

var doScripts = function(src) {
    var onError = function(err) {
        notify.onError({
                    title:    "Gulp Scripts",
                    subtitle: "Failure!",
                    message:  "Error: <%= err.message %>",
                    sound:    "Beep"
                })(err);
        this.emit('end');
    };

    var jsfiles = gulp.src(src);

    return gulp.src('index.html')
        .pipe(plumber({errorHandler: onError}))
        .pipe(inject(jsfiles, {
            read: false,
            starttag: '<!-- app:js -->',
            endtag: '<!-- endinject -->',
            addRootSlash: false,  // ensures proper relative paths
            ignorePath: '/build/' // ensures proper relative paths
        }))
        .pipe(gulp.dest('./'))
        .pipe(notify({
            title: 'Scripts Complete',
            message: 'Yay!'
        }));
}

gulp.task('scripts', function() {
    return doScripts(files.js);
});

gulp.task('scripts-mock', function() {
    return doScripts(files.mockjs);
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(files.js, ['lint', 'scripts']);
    gulp.watch(files.scss, ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts']);