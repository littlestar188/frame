/**
 * @author Derek
 * @create 2016/12/28
 */
$(function() {
    //初始化判断是新增还是编辑或详情页面
    // var headName = "新增说明书";
    // if("edit" === pageType) {
    //     headName = "编辑说明书";
    // } else if("detail" === pageType) {
    //     headName = "说明书详情";
    //     $('input').attr("disabled",true);
    //     //编辑框不可用
    //     $('#editer').attr("disabled",true);
    //     //隐藏保存按钮
    //     $('#save_btn').hide();
    // }
    // $('#head_name').html(headName);


    CKEDITOR.replace( 'editer', {
        extraPlugins: 'uploadimage,image2',
        height: 300,

        // Upload images to a CKFinder connector (note that the response type is set to JSON).
       // uploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',

        // Configure your file manager integration. This example uses CKFinder 3 for PHP.
        //上传浏览器地址
      //  filebrowserBrowseUrl: '/baidu/',
        //图像浏览器地址
     //   filebrowserImageBrowseUrl: '/ckfinder/ckfinder222.html?type=Images',
        //图片上传的地址
    //    filebrowserUploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',

        //上传到服务器
        //filebrowserImageUploadUrl: '/upload/ck/image',

        // The following options are not necessary and are used here for presentation purposes only.
        // They configure the Styles drop-down list and widgets to use classes.

        stylesSet: [
            { name: 'Narrow image', type: 'widget', widget: 'image', attributes: { 'class': 'image-narrow' } },
            { name: 'Wide image', type: 'widget', widget: 'image', attributes: { 'class': 'image-wide' } }
        ],

        // Load the default contents.css file plus customizations for this sample.
        //contentsCss: [ CKEDITOR.basePath + 'contents.css', 'http://sdk.ckeditor.com/samples/assets/css/widgetstyles.css' ],

        // Configure the Enhanced Image plugin to use classes instead of styles and to disable the
        // resizer (because image size is controlled by widget styles or the image takes maximum
        // 100% of the editor width).
        image2_alignClasses: [ 'image-align-left', 'image-align-center', 'image-align-right' ],
        image2_disableResizer: true
    } );

});





