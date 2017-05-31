
	var outstock = Object.create(role);
	var outstock = $.extend(outstock,{
	//var device = {
		init:function(){
			var that = this;
			$('#nav-header').load('../../layout/top-nav.html',function(){
				that.showDatepicker();
				that.showStocklist();
			});
			// $('#main-footer').load('../../layout/footer.html',function(){});


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
		showStocklist:function(){
			$('#outstock_table').bootstrapTable({
			      // url : "http://192.168.0.15:80/frame/self/json/device/listDevice.json",
			       sidePagination : 'server',
			       cache : false,// 设置False禁用AJAX请求的缓存
			       height : '',
			       striped : true,// 使表格带有条纹
			       pagination : true,// 设置True在表格底部显示分页工具栏
			       pageList : [ 10, 15, 20, 30 ],
			       search : false,
			      // queryParams : queryParams,
			       showColumns : false,// 设置为True可显示表格显示/隐藏列表
			       showRefresh : false,// 设置为True可显示刷新按钮
			       minimumCountColumns : 1,// 表格显示/隐藏列表时可设置最小隐藏的列数
			       clickToSelect : false,// 设置为True时点击行即可选中单选/复选框
			       toolbar : '#custom-toolbar',
			       columns : [
			       	   {field: 'state',checkbox: true},
			           {field : 'product',title : '资产编号',align : 'center',width : 60,valign : 'middle'

			           },
			           {field : 'terminalSN',title : '芯片编号',align : 'center',width : 80,valign : 'middle'

			           },
			           {field : 'online',title : '条形码',align : 'center',width : 20,valign : 'middle'
			           },
			           {field : 'status',title : '终端序列号',align : 'center',width : 40,valign : 'middle'
			           },
			           {field : 'feeManager',title : '类型',align : 'center',width : 40,valign : 'middle'
			           },
			           {
			               field: 'address', title: '型号', align: 'center', width: 40, valign: 'middle'
			           },
			           {field : 'outTime',title : '出库时间',align : 'center',width : 60,valign : 'middle'
			           },
                       {field : 'outTime',title : '出库时间',align : 'center',width : 60,valign : 'middle'
                       },
			           {field : 'id',title : '操作',align : 'center',width : 100,valign : 'middle',
			               formatter : function(value,row) {
			               return outstock.optShow(value);}
			           }
			       ]
			   });
			
		}
	})
$(function(){
	outstock.init();
	console.log(outstock)
});
