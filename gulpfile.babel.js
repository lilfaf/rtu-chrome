import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';

const plugins = loadPlugins();

import backgroundWebpackConfig from './app/scripts/background/webpack.config';
import popupWebpackConfig from './app/scripts/popup/webpack.config';

gulp.task('background-js', (cb) => {
  webpack(backgroundWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);
    plugins.util.log('[webpack]', stats.toString());
    cb();
  });
});

gulp.task('popup-js', (cb) => {
  webpack(popupWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);
    plugins.util.log('[webpack]', stats.toString());
    cb();
  });
});

gulp.task('background-html', () => {
  return gulp.src('app/scripts/background/index.html')
    .pipe(plugins.rename('background.html'))
    .pipe(gulp.dest('./app/build'));
});

gulp.task('popup-html', () => {
  return gulp.src('app/scripts/popup/index.html')
    .pipe(plugins.rename('popup.html'))
    .pipe(gulp.dest('./app/build'));
});

gulp.task('popup-sass', () => {
  return gulp.src('app/scripts/popup/styles/**/*.sass')
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.rename('main.css'))
    .pipe(gulp.dest('./app/build/styles'));
});

gulp.task('popup-fonts', () => {
  return gulp.src('node_modules/materialize-css/fonts/roboto/Roboto-Regular.*')
    .pipe(gulp.dest('./app/build/fonts/roboto/'));
});

gulp.task('copy-manifest', () => {
  return gulp.src('app/manifest.json')
    .pipe(gulp.dest('./app/build'));
});

gulp.task('copy-images', () => {
  return gulp.src('app/images/**/*')
    .pipe(gulp.dest('./app/build/images'));
});

gulp.task('build', [
  'copy-manifest',
  'copy-images',
  'popup-html',
  'popup-sass',
  // 'popup-fonts',
  'popup-js',
  'background-html',
  'background-js'
]);

gulp.task('package', ['build'], () => {
  var manifest = require('./app/build/manifest.json');
  return gulp.src('./app/build/**')
    .pipe(plugins.zip(`rtu-chrome-${manifest.version}.zip`))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['default'], () => {
  gulp.watch('app/**/*', ['build']);
});

gulp.task('default', ['build']);
