
	var device = Object.create(role);
	var device = $.extend(device,{
	//var device = {
		init:function(){
			var that = this;
			$('#nav-header').load('../../layout/top-nav.html',function(){
				$('#distpicker').distpicker({
			    //autoSelect: false
				});
				that.showDevicelist();
			});
			// $('#main-footer').load('../../layout/footer.html',function(){});
			
			
		},
		showDevicelist:function(){
			$('#device_table').bootstrapTable({
			       url : "http://192.168.0.15:80/frame/self/json/device/listDevice.json",
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

			           {field : 'product',title : '设备型号',align : 'center',width : 60,valign : 'middle',
			               formatter : function(value) {
			                   if(value){
			                       return value.model;
			                   }
			               }
			           },
			           {field : 'terminalSN',title : '设备SN码',align : 'center',width : 80,valign : 'middle',
			               formatter : function(value, row) {
			                   return '<a href="/device/detail/'+value+'" >'+value+'</a>';
			                   // return addClick(value, row.id);
			               }
			           },
			           {field : 'online',title : '在线状态',align : 'center',width : 20,valign : 'middle',
			               formatter : function(value) {
			                   if(value){
			                       return "<span class='label label-info'>在线</span>";
			                   }else{
			                       return "<span class='label label-default'>离线</span>";
			                   }
			               }
			           },
			           {field : 'status',title : '运行状态',align : 'center',width : 40,valign : 'middle',
			               formatter : function(value) {
			                   if(value==0 || value==4 || value==5 || value==6 ){
			                       return "<span class='label label-success'>正常</span>";
			                   }
			                   if(value==1 || value==2 || value==9 ){
			                       return "<span class='label label-danger'>故障</span>";
			                   }
			                   if(value==3){
			                       return "<span class='label label-danger'>欠费</span>";
			                   }
			                   if(value==7){
			                       return "<span class='label label-danger'>关机</span>";
			                   }
			                   if(value==8){
			                       return "<span class='label label-danger'>停机</span>";
			                   }
			               }
			           },
			           {field : 'feeManager',title : '消费方式',align : 'center',width : 40,valign : 'middle',
			               formatter : function(value) {
			                   return value.feeName;
			               }
			           },
			           {
			               field: 'address', title: '安装区域', align: 'center', width: 40, valign: 'middle',
			               formatter: function (value, row) {
			                   return row.province+row.city+row.county+value;
			               }
			           },
			           {field : 'outTime',title : '出库时间',align : 'center',width : 60,valign : 'middle',
			               formatter : function(value) {
			                   //return getSmpFormatDate(value);
			               }
			           },
			           {field : 'id',title : '操作',align : 'center',width : 100,valign : 'middle',
			               formatter : function(value,row) {
			               //     return '<a data-toggle="modal" href="#updateModal" class="btn btn-info btn-xs"  onclick="edit(\''+ row.sim + '\',\''+ row.id + '\')"><i class="fa fa-pencil"></i> 修改</a>'
			               //         + '<a href="javascript:void(0)" class="btn btn-danger btn-xs" onclick="remove(\''+ value + '\')"><i class="fa fa-trash-o"></i> 删除</a>';
			               // }
			               return device.optShow(value);}
			           }
			       ]
			   });
			
		}
	})
$(function(){
	device.init();
	console.log(device)
});
