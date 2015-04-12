/*------------------------
 Imports
 -------------------------*/

// util
var fs  = require('fs'),
    del = require('del'),
    path = require('path');

// gulp
var gulp        = require('gulp'),
    install     = require('gulp-install'),
    server      = require('gulp-server-livereload'),
    sass        = require('gulp-ruby-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    runSequence = require('run-sequence');

/*------------------------
 Environment
 -------------------------*/

var argv = require('yargs').argv;
var prod = !!argv['prod'];

/*------------------------
 Paths
 -------------------------*/

var paths = {
    scss: {
        src:  path.join('src', 'scss'),
        dest: path.join('build', 'css')
    },
    js: {
        src:  path.join('src', 'js'),
        dest: path.join('build', 'js')
    },
    html: {
        src:  path.join('src', 'html'),
        dest: path.join('build', 'html')
    },
    assets: {
        src:  path.join('src', 'assets'),
        dest: path.join('build', 'assets')
    },
    bower: {
        src:  path.join('bower_components')
    }
};

/*------------------------
 Tasks
 -------------------------*/

gulp.task('bower', function() {
    return gulp.src('./bower.json')
        .pipe(install());
});


gulp.task('bower-copy-js', ['bower'], function() {
    var deps = [
        'es6-module-loader/dist/es6-module-loader.js*',
        'traceur/traceur.min*',
        'system.js/dist/system.js*',
        'vue/dist/vue.min*',
        'director/build/director.min.js'
    ];
    return gulp.src(deps.map(function(dep) {
        var a = path.join(paths.bower.src, dep);
        console.log(a);
        return a;
    }))
        .pipe(gulp.dest(paths.js.dest))
});

gulp.task('js', ['bower-copy-js'], function() {
    return gulp.src(path.join(paths.js.src, '**/*'))
        .pipe(gulp.dest(paths.js.dest));
});

gulp.task('html', function() {
    gulp.src(path.join('src', '*.html')).pipe(gulp.dest(path.join('build')));
    return gulp.src(path.join(paths.html.src, '**/*'))
        .pipe(gulp.dest(paths.html.dest));
});

gulp.task('scss', ['bower'], function() {
    var sassOpts = prod? {style: 'compressed'} : {sourcemap: true};

    // Compile sass
    var task = sass(paths.scss.src, sassOpts);

    if (!prod) {
        task = task.on('error', function (err) {
            console.error('Error', err.message);
        });
        // Generate sourcemaps
        task = task.pipe(sourcemaps.write('./maps'));
    }

    return task.pipe(gulp.dest(paths.scss.dest));
});

gulp.task('assets', function() {
    return gulp.src(paths.assets.src)
        .pipe(gulp.dest(paths.assets.dest));
});

gulp.task('clean', function(cb) {
    return del([
        path.join('build')
    ], cb);
});

gulp.task('build', function(cb) {
    runSequence(
        'clean',
        ['js', 'scss', 'html', 'assets'],
        cb
    );
});

gulp.task('serve', ['build'], function() {
    if (!prod) {
        gulp.watch([path.join(paths.html.src, '/**/*'), path.join('src', '*.html')], ['html']);
        gulp.watch([path.join(paths.js.src, '/**/*')], ['js']);
        gulp.watch([path.join(paths.scss.src, '/**/*')], ['scss']);
    }
    return gulp.src(path.join('build'))
        .pipe(server({
            livereload: true,
            directoryListing: false,
            open: false
        }));
});
