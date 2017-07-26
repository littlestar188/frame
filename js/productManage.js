$(function(){
	var proManage = {

		init:function(){

			var that = this;
            this.addPro();

			$('#nav-header').load('resources/layout/top-nav.html',function(){});
				$("#product_table").bootstrapTable({
	             // url: '/manage/role/listRoles',
	             url:'resources/json/listProduct.json',
	             dataType: 'json',
	             sidePagination:'server',
	             cache: false,//设置False禁用AJAX请求的缓存
	             height: '',
	             striped: true,//使表格带有条纹
	             pagination: true,//设置True在表格底部显示分页工具栏
	             pageSize: 10,
	             pageList: [10, 25, 50, 100],
	             // queryParams:that.queryParams,
	             toolbar:'#custom-toolbar',
	             columns: [
	                       
	                       {field: 'name',title: '产品名称',align: 'center',valign: 'middle'},
	                       {field: 'model',title: '产品型号',align: 'center',valign: 'middle'},
	                       {field: 'hasFlowAccount',title: '流量计费功能',align: 'center',valign: 'middle'},
	                       {field: 'hasTDS',title: 'TDS值功能',align: 'center',valign: 'middle'},
	                       {field: 'fees',title: '资费名称',align: 'center',valign: 'middle'},
	                       {field: 'instr',title: '说明书',align: 'center',valign: 'middle',formatter:function(value){
	                       	//console.log(value)
	                       	return '<a href="/frame/pages/forms/instruction?id='+this.value.id+'" class="">'+value.name+'</a>'
	                       }},
	                       {field: 'describe',title: '产品描述',align: 'center',valign: 'middle'},
	                       {field: 'createTime',title: '创建时间',align: 'center',valign: 'middle'},
	                       {field: 'modifyTime',title: '最后编辑时间',align: 'center',valign: 'middle'},
	                       {field: 'id',title: '操作',align: 'center',valign: 'middle',formatter:function(value){
		                   	return "<span data-id="+value+"><a href='javascript:void(0)' class='btn btn-info btn-xs' id='btn-edit'>修改</a>&nbsp;&nbsp;<a href='javascript:void(0)' class='btn btn-danger btn-xs' id='btn-del'>删除</a></span>&nbsp;&nbsp;"}
		                   	}
	       				]
	         	})
		},
		addPro:function(){
			$('#add_product').click(function(){
				//alert(1)
				$("#proModalLabel").html("新增");
				
		 		$("#productModal").on("hidden.bs.model",function(e){
		    			$(this).removeData();
		    	});

		    	
		    	
		 		$('#productModal').modal({show:true})
			})
		}
		
		
	}
	proManage.init();
})