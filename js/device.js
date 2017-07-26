
	var device = Object.create(role);
	var device = $.extend(device,{
	//var device = {
		init:function(){
			var that = this;
			$('#nav-header').load('resources/layout/top-nav.html',function(){
				$('#distpicker').distpicker({
			    //autoSelect: false
				});
				that.showDevicelist();
			});
			// $('#main-footer').load('../../layout/footer.html',function(){});
			this.batchExport();
			this.settingBtn();
		},
        /*参数设置*/
        settingBtn:function(){

            $('.settingBtn').click(function(){

                $("#deviceModalLabel").html("参数修改");

                //新增区显示
                $('.list_table .list_setting').show();
                //角色名是否可用提示全部隐藏

                $('#deviceModal').modal({show:true})
                //角色名输入 显示是否可用请求判断 aadCheck

            })
        },
        batchImport:function(){

        },
        /*批量导出*/
        batchExport:function(){
            var size = '10';
            var current = '1';
            var customer = '';
            var leaseState = '0';
            var deviceState = '0';
            var search = '';
            var keyword = '';

            var key = '0';
            var	freezerType = '0';
            var	deviceModel = "0";
            var	province = '';
            var	city = '';
            var online = '';
            $("#b_key option[value="+key+"]").attr("selected", "selected");
            if(province!='')
                $("#province option[value="+province+"]").attr("selected", "selected");
            if(city!='')
                $("#city option[value="+city+"]").attr("selected", "selected");
            $("#b_freezerType option[value='"+freezerType+"']").attr("selected", "selected");
            $("#b_deviceModel option[value='"+deviceModel+"']").attr("selected", "selected");
            $("#b_online option[value='"+online+"']").attr("selected", "selected");

            if(customer!=''){
                $('select[id="b_customer"] option[value='+customer+']').attr("selected", "selected");
            }
            $('select[id="b_leasestate"] option[value='+leaseState+']').attr("selected", "selected");
            $('select[id="b_dstatus"] option[value='+deviceState+']').attr("selected", "selected");
            var that = this;
            $('.exportBtn').click(function(){
                var ids = [];
                var i = 0;
                //#role_table -> 选项框
                $("input[name='btSelectItem']").each(function() {
                    if($(this).prop("checked")){
                        ids[i] = $(this).val();
                        i++;
                    }
                });
                //$btSelectAll全选

                if(ids.length==0){

                    window.location.href = '/manage/device/export/2?search='+search+'&key='+key+'&keyword='+keyword
                        +'&customer='+customer+'&freezerType='+freezerType+'&deviceModel='+deviceModel+'&online='+online
                        +'&province='+province+'&city='+city+'&deviceState='+deviceState+'&leaseState='+leaseState;
                    return false;
                }else{
                    window.location.href = '/manage/device/confirmExport/2?ids='+ids
                }
            })
        },
		showDevicelist:function(){
			$('#device_table').bootstrapTable({
			       url : "resources/json/device/listDevice.json",
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
