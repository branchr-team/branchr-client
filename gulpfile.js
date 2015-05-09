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
    changed     = require('gulp-changed'),
    runSequence = require('run-sequence'),
    deploy      = require('gulp-gh-pages');

/*------------------------
 Environment
 -------------------------*/

var argv = require('yargs').argv;
var prod = !!argv['prod'];

/*------------------------
 Config
 -------------------------*/

var srcDir = 'src';
var destDir = 'build';

var paths = {
    styles: {
        src:  path.join(srcDir, 'styles'),
        dest: path.join(destDir, 'styles')
    },
    bower: {
        src: 'bower_components',
        jsDeps: [
          { script: 'es6-module-loader/dist/es6-module-loader.js*'},
          { script: 'traceur/traceur.min*'},
          { script: 'system.js/dist/system.js*'},
          { script: 'plugin-text/text.js'},
          { script: 'plugin-css/css.js'},
          { script: 'vue/dist/vue.min*'},
          { script: 'director/build/director.min.js'},
          { script: 'CodeMirror/**/*', sub: 'CodeMirror' }
        ],
        jsDest: path.join(destDir, 'lib'),
        assetDeps: [
            'loading/*.svg'
        ],
        assetDest: path.join(destDir, 'assets')
    }
};


/*------------------------
 Tasks
 -------------------------*/

gulp.task('clean', function(cb) {
    return del([destDir], cb);
});

gulp.task('build', function(cb) {
    runSequence('clean', ['copy', 'styles'], cb);
});

gulp.task('deploy', ['build'], function() {
    return gulp.src(path.join(destDir, '/**/*'))
        .pipe(deploy());
});

gulp.task('serve', ['build'], function() {
    if (!prod) {
        gulp.watch([
            path.join(srcDir, '**/*'),
            path.join('!'+paths.styles.src,'**/*')
        ], ['copy']);
        gulp.watch([path.join(paths.styles.src, '**/*')], ['styles']);
    }
    return gulp.src(destDir)
        .pipe(server({
            livereload: true,
            directoryListing: false,
            open: false
        }));
});

gulp.task('styles', ['bower'], function() {
    var sassOpts = prod? {style: 'compressed'} : {sourcemap: true};
    var task = sass(paths.styles.src, sassOpts);
    if (!prod) {
        task = task.pipe(sourcemaps.write('./maps'));
    }
    task.on('error', function (err) {console.error('Error', err.message);});
    return task.pipe(gulp.dest(paths.styles.dest));
});

gulp.task('copy', ['bower-js', 'bower-assets'], function() {
    return gulp.src([
        path.join(srcDir, '**/*'),
        path.join('!'+paths.styles.src,'**/*')
    ])
        .pipe(changed(destDir))
        .pipe(gulp.dest(destDir));
});

gulp.task('bower', function() {
    return gulp.src('./bower.json')
        .pipe(install());
});

//gulp.task('bower-folders', ['bower'], function() {
//    gulp.src(paths.bower.folderDeps.map(function(dep) {
//        return path.join(paths.bower.src, dep);
//    }),{base: paths.bower.src})
//        .pipe(gulp.dest(paths.bower.folderDest));
//});

gulp.task('bower-js', ['bower'], function() {
  paths.bower.jsDeps.forEach(function(dep) {
    var d = dep.sub ? path.join(paths.bower.jsDest,dep.sub) : paths.bower.jsDest;
    var s = path.join(paths.bower.src, dep.script);

    gulp.src(s)
      .pipe(changed(d))
      .pipe(gulp.dest(d));
  })
});

gulp.task('bower-assets', ['bower'], function() {
	return gulp.src(paths.bower.assetDeps.map(function(dep) {
		return path.join(paths.bower.src, dep);
	}), {base: paths.bower.src})
        .pipe(changed(paths.bower.assetDest))
        .pipe(gulp.dest(paths.bower.assetDest));
});

