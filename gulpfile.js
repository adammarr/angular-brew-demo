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
var runSequence = require('run-sequence');
var deleteLines = require('gulp-delete-lines');
var karma = require('karma').server;

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

/************** UTILITY *****************************************/

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

gulp.task('clean-maps', function() {
    return del(['maps/*']);
});

gulp.task('clean', function() {
    return del(['dist/*']);
});

/************** SASS *****************************************/

// Compile Our Sass
var doSass = function(doConcat) { 
	var onError = function(err) {
        notify.onError({
                    title:    "Gulp Sass",
                    subtitle: "Failure!",
                    message:  "Error: <%= err.message %>",
                    sound:    "Beep"
                })(err);
        this.emit('end');
    };

    var distPath = (doConcat) ? '.' : 'dist/css';

    //clean the css dest directory
    var cssfiles = gulp.src(files.scss)
    	.pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(sass());

    if(doConcat) {
        cssfiles = cssfiles.pipe(concat('dist/css/style.css'));
    }

    cssfiles = cssfiles
        .pipe(autoprefixer())
        .pipe(rev())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(distPath + '/'));

    return gulp.src('index.html')
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
}

gulp.task('sass', function() {
    return doSass();
});

gulp.task('sass-prod', function() {
    return doSass(true);
});

/************** VENDOR *****************************************/

var doVendor = function(doConcat) {
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

    if(doConcat) {
        cssfiles = cssfiles
            .pipe(concat('dist/lib/css/vendor.css'))
            .pipe(rev())
            .pipe(gulp.dest('./'));

        jsfiles = jsfiles
            .pipe(concat('dist/lib/js/vendor.js'))
            .pipe(rev())
            .pipe(gulp.dest('./'));
    }

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
}

gulp.task('vendor', function() {
    return doVendor();
});

gulp.task('vendor-mock', function() {
    files.vendorJS.push('bower_components/angular-mocks/angular-mocks.js');
    return doVendor();
});

gulp.task('vendor-prod', function() {
    return doVendor(true);
});

/************** SCRIPTS *****************************************/

var doScripts = function(src, doMin) {
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

    if(doMin) {
        jsfiles = jsfiles
            .pipe(plumber({errorHandler: onError}))
            .pipe(ngAnnotate())
            .pipe(sourcemaps.init())
            .pipe(concat('dist/js/app.js'))
            .pipe(deleteLines({
                'filters' : [/(toastr|console)\.\S*/]
            }))
            .pipe(uglify())
            .pipe(rev())
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest('./'));
    }

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

gulp.task('scripts-prod', function() {
    return doScripts(files.js, true);
});

/************** TASK Groups *****************************************/

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(files.js, ['lint', 'clean', 'clean-maps', 'scripts']);
    gulp.watch(files.scss, ['clean', 'clean-maps', 'sass']);
});

// Watch Files For Changes
gulp.task('watch-mock', function() {
    gulp.watch(files.mockjs, ['lint', 'clean', 'clean-maps', 'scripts-mock']);
    gulp.watch(files.scss, ['clean', 'clean-maps', 'sass']);
});

//Testing with Karma
gulp.task('test', function(cb) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function() {
        if(cb) cb();
    });
});

// Default Task
gulp.task('default', function(cb) {
    runSequence('lint', 'clean-maps', 'clean', 'sass', 'scripts', 'vendor', cb);
});

gulp.task('mock', function(cb) {
    runSequence('lint', 'clean-maps', 'clean', 'sass', 'scripts-mock', 'vendor-mock', cb);
});

gulp.task('prod', function(cb) {
    runSequence('lint', 'clean-maps', 'clean', 'sass-prod', 'scripts-prod', 'vendor-prod', cb);
});