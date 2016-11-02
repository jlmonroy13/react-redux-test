var gulp    = require('gulp'),
    concat  = require('gulp-concat'),
    sass    = require('gulp-sass');

var options = {
  default : {
    tasks : [ 'build', 'watch' ]
  },
  build : {
    tasks : [ 'styles', 'scripts', 'vendors' ]
  },
  styles : {
    files       : [ 'client/assets/stylesheets/scss/**/*.scss' ],
    destination : 'client/assets/stylesheets'
  },
  vendors : {
    files: [
      'node_modules/react/dist/react.js',
      'node_modules/react-dom/dist/react-dom.js'
    ],
    destination : 'client/assets/javascripts/vendor',
    fileName: 'bundle.js'
  },
  scripts : {
    files: [ 
      'client/app/application.js'
    ],
    destination : 'client/assets/javascripts',
    fileName: 'main.js'
  }
};

gulp.task( 'default', options.default.tasks );

gulp.task( 'build', options.build.tasks );

gulp.task('styles', function () {
  return gulp.src(options.styles.files, { noCache: true })
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(options.styles.destination));   
});

gulp.task('watch', function() {
  gulp.watch(options.styles.files, ['styles']);
  gulp.watch(options.scripts.files, ['scripts']);
});

gulp.task('vendors', function() {
  return gulp.src(options.vendors.files)
    .pipe(concat(options.vendors.fileName))
    .pipe(gulp.dest(options.vendors.destination));
});

gulp.task('scripts', function() {
  return gulp.src(options.scripts.files)
    .pipe(concat(options.scripts.fileName))
    .pipe(gulp.dest(options.scripts.destination));
});
