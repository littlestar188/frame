/* 工具模块 */
var gulp = require('gulp'),
    //autoprefixer = require('gulp-autoprefixer'), //补全浏览器兼容的css
    cleanCSS = require('gulp-clean-css'),   // css 压缩
    autoprefixer = require('gulp-autoprefixer'),//补全兼容
    //minifycss = require('gulp-minify-css'), //被废弃
    uglify = require('gulp-uglify'),    // js 压缩
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean') ; //清空文件
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin')
    
// gulp.task('default',function(){
//     gulp.start('js-common','css-common','ztree-common');
// });
/* ========================================
  js: 压缩
 ======================================== */
/**
 * 公用js
 */

var paths_script = ['./src/js/*.js'];
var paths_css = ['./src/css/*.css'];

gulp.task('js-common',function () {
    var jsSrc = [
            './plugins/jQuery/jquery-2.2.3.min.js',
            './plugins/bootstrap/js/bootstrap.min.js',
            './src/js/app.js',
            './src/js/demo.js'

        ],
        jsDst = './dist/js';
    return gulp.src(jsSrc)
        .pipe(concat('common.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(jsDst));
});

gulp.task('js-jqboot',function () {
    var jsSrc = [
            './plugins/jQuery/jquery-2.2.3.min.js',
            './plugins/bootstrap/js/bootstrap.min.js'

        ],
        jsDst = './dist/js';
    return gulp.src(jsSrc)
        .pipe(concat('js-jqboot.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(jsDst));
});
/*
* ztree.min.js
*/

gulp.task('ztree-common', function () {
    var ztreeSrc = [
            './plugins/zTree/js/jquery.ztree.core.min.js',
            './plugins/zTree/js/jquery.ztree.excheck.min.js',
            './plugins/zTree/js/jquery.ztree.exedit.min.js',
            './plugins/zTree/js/jquery.ztree.exhide.min.js'
        ],
        ztreeDst = './dist/js';
   return gulp.src(ztreeSrc)
        .pipe(concat('ztree.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(ztreeDst));
});

/*
* ckedior.plugins.min.js
*/
gulp.task('ckedior-plugin', function () {
    var ckediorSrc = [
            './plugins/ckeditor/lang/zh-cn.js',
            './plugins/ckeditor/plugins/uploadimage/plugin.js',
            './plugins/ckeditor/plugins/image2/plugin.js',
            './plugins/ckeditor/plugins/widget/plugin.js',
            './plugins/ckeditor/plugins/uploadwidget/plugin.js',
            './plugins/ckeditor/plugins/filetools/plugin.js',
            './plugins/ckeditor/plugins/notificationaggregator/plugin.js',
            './plugins/ckeditor/plugins/lineutils/plugin.js',
            './plugins/ckeditor/plugins/widgetselection/plugin.js',
            './plugins/ckeditor/plugins/notification/plugin.js',
            './plugins/ckeditor/plugins/image2/lang/zh-cn.js',
            './plugins/ckeditor/plugins/uploadwidget/lang/zh-cn.js',
            './plugins/ckeditor/plugins/widget/lang/zh-cn.js',
            './plugins/ckeditor/plugins/filetools/lang/zh-cn.js',
            './plugins/ckeditor/plugins/notification/lang/zh-cn.js'
        ],
        ckediorDst = './dist/js';
   return gulp.src(ckediorSrc)
        .pipe(concat('ckedior-plugins.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(ckediorDst));
});
/* ========================================
  css: 压缩
 ======================================== */
/*
* 公用css
*/
gulp.task('css-autoprefixer', function () {
     var cssSrc = [
            './self/css/public.css'
        ],
        cssDst = './src/css';
    return gulp.src(cssSrc)
        .pipe(autoprefixer())
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS())              
        .pipe(gulp.dest(cssDst));
})

gulp.task('css-common',['clean','css-autoprefixer'], function () {
    var cssSrc = [
        './src/css/AdminLTE.min.css',
       // './plugins/bootstrap/css/bootstrap.min.css', 
       // './src/css/font-awesome.min.css',    
        './src/css/skins/_all-skins.min.css',              
        './src/css/public.min.css'
        ],
        cssDst = './dist/css';
    return gulp.src(cssSrc)       
        .pipe(concat('common.css'))       
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS())       
        .pipe(gulp.dest(cssDst));
});


/*
*  index.html
*  index-plugins.min.css
*/
gulp.task('css-index',['clean'], function () {
    var cssSrc = [
            './src/css/AdminLTE.min.css',
            './src/css/skins/_all-skins.min.css',
            './self/css/public.css'
        ],
        cssDst = './dist/css';
    return gulp.src(cssSrc)
        .pipe(concat('css-index.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS())
        .pipe(gulp.dest(cssDst));
});

gulp.task('clean',function(){
    gulp.src('./dist/css/*.css')
        .pipe(clean());
});

gulp.task('watch',function(){
    gulp.watch(paths_css,['css-common']);
    //gulp.watch(paths_script,['js-common'])
});

/* ========================================
  image: 压缩
 ======================================== */
