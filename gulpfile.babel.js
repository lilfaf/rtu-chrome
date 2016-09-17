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

gulp.task('popup-html', () => {
  return gulp.src('app/scripts/popup/index.html')
    .pipe(plugins.rename('popup.html'))
    .pipe(gulp.dest('./app/build'));
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
  'popup-js',
  'background-js'
]);

gulp.task('watch', ['default'], () => {
  gulp.watch('app/**/*', ['build']);
});

gulp.task('default', ['build']);
