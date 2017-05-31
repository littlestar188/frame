
var message = Object.create(role);
var message = $.extend(message,{
    //var message = {
    init:function(){
        var that = this;
        $('#nav-header').load('../../layout/top-nav.html',function(){
        	//日历表
            that.showDatepicker();
            that.showMessagelist();
        });
       $('#main-footer').load('../../layout/footer.html',function(){});
    },
	showDatepicker:function(){
        $.fn.datepicker.defaults.format = "yyyy-mm-dd";
        $('.input-daterange input').each(function() {
        	//'clearDates'
            $(this).datepicker({
                clearBtn: true,
                autoclose: true
			});

        });
        // $("#endTime").click(function(){
        //     $('#endTime').datepicker('setStartDate', $("#startTime").val());
        // });
        // $("#startTime").click(function(){
        //     $('#startTime').datepicker('setEndDate', $("#endTime").val());
        // });
	},
    showMessagelist:function(){
        $('#message_table').bootstrapTable({
            //url: '/article/'+pageType+'/query?'+$("#dynamic_search").serialize(),
			url:'http://192.168.0.15:80/frame/self/json/message/listMessage.json',
            sidePagination:'server',
            cache: false,//设置False禁用AJAX请求的缓存
            height: '',
            striped: true,//使表格带有条纹
            pagination: true,//设置True在表格底部显示分页工具栏
           // queryParams:queryParams,
            pageList: [10, 25, 50, 100],
            toolbar:'#custom-toolbar',
            columns: [
				 {field: 'state',checkbox: true},
                {field: 'title',title: '标题',align: 'center',valign: 'bottom',width:300,
                    formatter : function(value, row) {
                       // return addClick(value, row.id);
                    }
                },
                {field: 'publishState',title: '发布状态',align: 'center',valign: 'bottom',formatter:function (value) {
                    return value==0?"未发布":"发布"
                }},
                {field: 'creater.realName',title: '创建人',align: 'center',valign: 'bottom'},
                {field: 'createTime',title: '创建时间',align: 'center',valign: 'bottom',formatter:function (value) {
                    if (value !=""){
                       // return getSmpFormatDate(value,true);
                    }else{
                        return "";
                    }
                }},
                {field: 'publishUser.realName',title: '发布人',align: 'center',valign: 'bottom'},
                {field: 'publishTime',title: '发布时间',align: 'center',valign: 'bottom',formatter:function (value) {
                    if (value != null){
                        //return getSmpFormatDate(value,true);
                    }else{
                        return "";
                    }
                }},
                {field: 'id',title: '操作',align: 'center',valign: 'bottom',formatter:'showOpt'}
            ]
        });

    }
})
$(function(){
    message.init();
    console.log(message)
});
