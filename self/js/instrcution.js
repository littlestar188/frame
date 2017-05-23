// $(function(){
	var instruction = Object.create(publicFun)
	var instruction = $.extend(instruction,{
	//var instruList = {
		instrTable:$('#instr_table'),
		
		init:function(){
			console.log('ready')
			var that = this;
            //this.addPro();           
            //this.handleHash();

		    $('#main-content').load('instContent.html',function(){			
				$("#instr_table").bootstrapTable({
	             // url: '/manage/role/listRoles',
	             url:'http://192.168.0.15/frame/self/json/listInstructions.json',
	             //dataType: 'json',
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
	                       
	                       {field: 'name',title: '说明书标题',align: 'center',valign: 'middle',formatter:function(value,row){
	                       // console.log(value,row)  
	                       	return '<a href="javascript:void(0)" instr-id='+row.id+'">'+value+'</a>';
	                       }},
	                       {field: 'creater',title: '创建人',align: 'center',valign: 'middle',formatter:function(value){
	                         // console.log(value)
	                          return value.realName;
	                       }},
	                       {field: 'createTime',title: '创建时间',align: 'center',valign: 'middle'},
	                       {field: 'modifyUser',title: '最后编辑人',align: 'center',valign: 'middle',formatter:function(value){
	                          //console.log(value)
	                          return value.realName;
	                       }},
	                       {field: 'modifyTime',title: '最后编辑时间',align: 'center',valign: 'middle'},
	                       {field: 'id',title: '操作',align: 'center',valign: 'middle',formatter:function(value){
		                   	return "<span data-id="+value+"><a href='javascript:void(0)' class='btn btn-info btn-xs' id='btn-edit'>修改</a>&nbsp;&nbsp;<a href='javascript:void(0)' class='btn btn-danger btn-xs' id='btn-del'>删除</a></span>&nbsp;&nbsp;"}
		                   	}
	       				]
	         	})
	         	that.bindEvent();
	         	that.ckEditor();
			});

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
		},
		bindEvent:function(){
			//监视所有说明书标题链接
			var that = this;
			$('#instr_table').on('click','tbody>tr>td:nth-child(1)>a',function(){	
				//that.hashName = location.hash.split('=')[1];
				var instrId = $(this).prop('instr-id')
				console.log(instrId)
				// if(that.hashName.indexOf('detail') != -1){
					$('#instr-list').hide();
					$('#list-title').hide();

					$('#detail-title').show();
					//详情页面加载完毕
					$('#instr-detail').load('instr_detail.html',function(){
						
					});

					$.ajax({
						//url:'../../self/json/getOneInstructions',
						//url:'https://swf-test.yunext.com/static/instructions/detail/',
						data:{
							id:instrId
						},
						success:function(res){
							$('#detail').load('instr_detail.html',function(){});
							//console.log(res)
						}
					})

				// }
				
					
					
				
			})
				 
		},
		queryParams:function(params){
			var queryParam = {
			   //id : this.hashName,
		       pageSize : params.limit,
		       pageNumber : params.offset
		    }
		 
		   
		},
		ckEditor:function(){			
			
				var editer = $('#tab_2').find('#editer');
				console.log(editer);
				

				CKEDITOR.replace( 'editer', {
				    extraPlugins: 'uploadimage,image2',
				    height:300,
				    stylesSet: [
				        { name: 'Narrow image', type: 'widget', widget: 'image', attributes: { 'class': 'image-narrow' } },
				        { name: 'Wide image', type: 'widget', widget: 'image', attributes: { 'class': 'image-wide' } }
				    ],
				    image2_alignClasses: [ 'image-align-left', 'image-align-center', 'image-align-right' ],
				    image2_disableResizer: true,
				    customConfig:'../../../frame/plugins/ckeditor/config.js',
				    contentsCss:[ '../../../plugins/ckeditor/contents.css', '../../../plugins/ckeditor/skins/moono/editor.css','../../../plugins/ckeditor/plugins/scayt/skins/moono-lisa/scayt.css','../../../plugins/ckeditor/plugins/wsc/dialogs/wsc.css' ],
				    stylesSet:['mystyles:../../../plugins/ckeditor/styles.js']
				    // templates_files:

				})
			
		}
	})
	//instruction.init();
// })  
$(function(){
	//console.log(role)
	instruction.init();	
})