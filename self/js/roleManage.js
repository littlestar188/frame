$(function(){
	//var role = Object.create(publicFun)

	//var role = $.extend(role,{
	var role = {
		datas:{},
		cdatas:{},
		valueName:"",
		menuId:[],
		//roleId:"",
		init:function(){
			var that = this;
			$('#nav-header').load('nav.html',function(){});
			$("#role_table").bootstrapTable({
             url: '/manage/role/listRoles',
             //url:'../../self/json/listRoles.json',
             dataType: 'json',
             sidePagination:'server',
             cache: false,//设置False禁用AJAX请求的缓存
             height: '',
             striped: true,//使表格带有条纹
             pagination: true,//设置True在表格底部显示分页工具栏
             pageSize: 10,
             pageList: [10, 25, 50, 100],
             toolbar:'#custom-toolbar',
             columns: [
                        {field: 'state',checkbox: true,formatter:function(value, row){
                        role.stateFormatter(value, row)}//function(value,row){
                       // 		if (row.state == true)
                       // 	        return {
                       // 	            disabled : true,//设置是否可用
                       // 	            checked : true//设置选中
                       // 	        }
                       // 		   // return value;
                       // 		}
                       // }
                   		},
                       {field: 'roleName',title: '角色名称',align: 'center',valign: 'middle'},
                       {field: 'id',title: '操作',align: 'center',valign: 'middle',formatter:function(value){
                       	//console.log(value)                     	
                       //return "<span><a href='javascript:void(0)' class='btn btn-success btn-xs' id='btn-watch' data-id="+value+">详情</a>&nbsp;&nbsp;<a href='javascript:void(0)' class='btn btn-info btn-xs' data-id="+value+" id='btn-edit'>修改</a>&nbsp;&nbsp;<a href='javascript:void(0)' class='btn btn-danger btn-xs' data-id="+value+" id='btn-del'>删除</a>&nbsp;&nbsp;</span>"
                       	return role.optShow(value);}
                       }
       				]
         	})
         	
			this.addRole();
			//查询
			//this.searchRole();
			//改 查 删 功能实现
			this.btnPer();
			
			

		},
		stateFormatter:function(value, row){
			if (row.state == true){
		        return {
		            disabled : true,//设置是否可用
		            checked : true//设置选中
		        };
			   return value;
			}
			
		},
		//根据一级菜单权限显示/隐藏  功能按键
		optShow:function(value){
			//获取hash值
			var hash = location.hash;
			hash = hash.substring(1,hash.length);

			//创建功能按键
			var htmlwrap = $('<span></span>');
			var html = "<a href='javascript:void(0)' class='btn btn-success btn-xs' id='btn-watch' data-id="+value+">详情</a>&nbsp;&nbsp;";
			
			//增 查按键
			var addBtn = $('.box-body .addBtn');
			var searchBtn = $('.box-body .searchBtn');

			//html = "<span><a href='javascript:void(0)' class='btn btn-success btn-xs' id='btn-watch' data-id="+value+">详情</a>&nbsp;&nbsp;<a href='javascript:void(0)' class='btn btn-info btn-xs' data-id="+value+" id='btn-edit'>修改</a>&nbsp;&nbsp;<a href='javascript:void(0)' class='btn btn-danger btn-xs' data-id="+value+" id='btn-del'>删除</a>&nbsp;&nbsp;</span>"

			//增
			if(hash.indexOf("1")!= -1 ){
				addBtn.show();
			}else{
				addBtn.hide();
			}
			//删
			if(hash.indexOf("2")!= -1 ){
				html += '<a href="javascript:void(0)" class="btn btn-danger btn-xs" id="btn-del" data-id="'+value+'">删除</a>&nbsp;&nbsp;';
			}
			//改
			if(hash.indexOf("3")!= -1 ){
				html += '<a href="javascript:void(0)" class="btn btn-info btn-xs" id="btn-edit" data-id="'+value+'">修改</a>&nbsp;&nbsp;';
			}
			//查
			if(hash.indexOf("4")!= -1 ){
				searchBtn.show();
			}else{
				searchBtn.hide();
			}
			
			html = htmlwrap.append(html)[0].outerHTML;
			//console.log(htmlwrap.append(html)[0].outerHTML)-->span+a
			return html;
		},
		btnPer:function(){
			var that = this;
			//监视option 实现某个option功能
			var roleId="";
			var modalCon = "";
			$('#role_table').on('click','.btn',function(){
				console.log($(this))
				//console.log($(this).attr('data-id'))

				//判断是否为【详情】
				if($(this).is('#btn-watch')){

					roleId = $(this).attr('data-id');
					console.log($(this))
					modalCon = $(document).find('.list_person .table tbody tr').remove();
					//console.log(modalCon,modalCon.length)
					//判断是否存在个人信息内容 不存在则渲染
					//if(modalCon.length == 0){
						modalCon.html('');
						that.oneRole(roleId);
					//}
					that.watchRole();
				}

				//判断是否为【修改】
				if($(this).is('#btn-edit')){
					roleId = $(this).attr('data-id');
					modalCon = $(document).find('.list_edit li').remove();
					//初始化选项显示					
					that.oneMenu(roleId);
					that.editRole();

					//修改后
					that.checkEditRole('/manage/role/updateCheck',roleId);
					var tableLis = '#list_table .list_edit li';				 
			 		$('#btn-edit-save').click(function(){
			 			that.saveClick(tableLis,'/manage/role/updateRole',roleId);
			 		})

					
				}

				//判断是否为【删除】
				if($(this).is('#btn-del')){
					console.log("del")
					roleId = $(this).attr('data-id');
					//console.log(roleId)
					that.delRole(roleId);	
				}

			})
		},
		//判断当前账号的角色 是否有角色管理的权限
		// judgePer:function(){
		// 	//../../self/json/listFirstMenu.json
		// 	//$.get("/manage/menu/listFirstMenu.json",{"cache": false},function(res){})
		// 	$.post("/manage/menu/listFirstMenu.json",{"cache": false},function(res){})
		// },
		//新增
		addRole:function(){	

			var that = this;
			//登录账号对应角色的权限菜单列表
			this.firstMenu();			

			$('.addBtn').click(function(){

				$("#roleModalLabel").html("新增");
				//所有复选框初始化
				$('#list_table :checkbox').prop("checked",false);
				$('.role-input').val("");
				
				//新增区显示 
				$('#search-wrap').show();
				$('#list_table .list_choice').show();
				//角色名是否可用提示全部隐藏
				$('#search-wrap span').hide();
				

				//查看 修改区隐藏
				$('#list_table .list_person').hide();
				$('#list_table .list_edit').hide()

		    	
		    	
		 		$('#roleModal').modal({show:true})
		 		//角色名输入 显示是否可用请求判断 aadCheck
		    	that.saveRole();
		 	})	
		 	//获取对应权限的一级菜单列表	 			 	
 	 		this.selectTotal();
 	 		

		 	
		 	 
		 	    
		},		
		//新增->保存->刷新角色列表
		saveRole:function(){
			var that = this;

			//角色名是否重名
			this.checkRole("/manage/role/addCheck");
			//单个按钮
	 		//监视所有复选框 data-id =  navId-permission
	 		var tableLis = '#list_table .list_choice li';
	 		$('#btn-role-save').click(function(){
	 			that.saveClick(tableLis,'/manage/role/addRole');
	 		})
	 		
		},
		saveClick:function(elem,ajaxURL,editId){
			var that = this;

			var ids =[];		                
			//只负责传参数 "menus":[{"id":"",permission:[]}]					
 			var cmenu = {};
 			//$('#list_table li').each(function(){
 			//console.log(elem)
 			$(elem).each(function(){
	 			var cid,cper;
 				var perArray = [];
 				
				$(this).find('.menu-item :checkbox').each(function(){
					var status = $(this).prop("checked");
					console.log(status)
					if(status){
						$(this).prop('checked',true);
						cid = $(this).attr('data-id').substring(0,24);
						cper = parseInt($(this).attr('data-id').substring(25));
						console.log('sava-------------'+cid,cper)
						console.log($(this).attr('data-id'))
						perArray.push(cper)
					}else{
						$(this).prop('checked',false);
					}

				})	 					
				//构建cmenu
                cmenu = {"id":cid,"permission":perArray};
				if(cid != undefined){
					ids.push(cmenu);

				}					 
				console.log(cid,cper,perArray,cmenu);
 				
 			})
 			//cmenu-->[{},{}]
            that.menuId = ids;
			
            console.log(that.menuId,that.valueName)

            //根据参数个数选择that.datas类型
            //增
           var tdatas = {"menus":that.menuId, "roleName":that.valueName};
 
           //增
           	if(arguments.length == 2){
           		that.datas = tdatas;
           	}
            //改
            if(arguments.length == 3){
            	that.datas = tdatas;
            	that.datas["roleId"] = editId

            	
           }
            
            console.log(ids,that.menuId,that.datas)
            //that.saveCallback(role.datas);
            that.saveCallback(ajaxURL,that.datas);

		},
		saveCallback:function(ajaxURL,totalData){
            $.ajax({
                //url:"../../self/json/addRole.json",
               // url: "/manage/role/addRole",
                url:ajaxURL,
                type: "post",
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                cache: false,
                data: JSON.stringify(totalData),
				success:function(res){
                	console.log("saveCallback--------------")
                	console.log(res)
                	if(res.returnCode == 0){
                		//刷新listRole
                	   
                	    //模态框500毫秒后消失
                	    if(confirm('保存成功')){
                	    	$('#roleModal').modal('hide').delay(500);
                	    	$("#role_table").bootstrapTable('refresh', {url:'/manage/role/listRoles'});
                	   } // else{
                	    // 	$('#roleModal').modal('hide').delay(500);
                	    // 	$("#role_table").bootstrapTable('refresh', {url:'/manage/role/listRoles'});
                	    // }               	   
                	}else{
                		if(confirm('保存失败')){
                			$('#roleModal').modal('hide').delay(500);
                		}
                	}
                	
				}
            })

		},

		//单个删除->刷新角色列表
		delRole:function(roleId){
			var that = this;
			//$('#role_table').on("click","#btn-del",function(){
        
				if(confirm("确定删除这些记录吗？")){
					//var roleId = $(this).parent().prop('data-id');
					$.ajax({
						//url:'../../self/json/deleteOneRole.json',
						url:'/manage/role/deleteOneRole',
						type:"post",
						//async:false,
						data:{
							"roleId":roleId
						},
						success:function(res){
							console.log(res)
							if(res.returnCode == 0){
								$("#role_table").bootstrapTable('refresh', {url: '/manage/role/listRoles'});
			                }
						},
						error:function(){
							console.log('del-refresh----报错');
						}
					})
				}
		
			//})
		},
		//批量删除
		batchDel:function(){
			//role/deleteRoles post

			var checkBoxs = $('#role_table').find('.bs-checkbox input[type="checkbox"]');
			console.log(checkBoxs)
				

			
		},
		//修改
		editRole:function(){
			var that = this;

			//初始化选项
			//that.oneMenu(roleId);
			//$('#role_table').on("click","#btn-edit",function(){
								
				$("#roleModalLabel").html("修改");
				//显示角色名称修改框
				$('#search-wrap').show();				
				$('#list_table .list_choice').hide();
                $('#list_table .list_person').hide();
                $('#list_table .list_edit').show();
               

				$('#roleModal').modal({show:true})
			//})
		},
		//查询角色
		searchRole:function(){
			$('.searchBtn').click(function(){				
				$("#role_table").bootstrapTable('refresh',{
					url:'manage/role/selectRoles',
					queryParams: role.queryParams
				})


			})

		},
		queryParams:function(params){
			console.log($('#custom-toolbar input[type="text"]').val())
			var temp = {
				limit:params.limit,
				offset:params.offset,
				"roleName":$('#custom-toolbar input[type="text"]').val(),
				
			}
			return temp;
		},
		//查看功能
		watchRole:function(){
			var that = this;
		 	//$('#role_table').on("click","#btn-watch",function(){

				//初始化				
				$("#roleModalLabel").html("查看");
				$('#search-wrap').hide();
				$('#list_table .list_choice').hide();
				$('#list_table .list_edit').hide();
				$('#list_table .list_person').show();

				$('#roleModal').modal({show:true});
		  // })

		},

		//获取对应权限的一级菜单列表 如果是超级管理员默认是全部菜单
		firstMenu:function(){
	 		var str = "";
	 		var data;
	 	 	//$.get("../../self/json/listFirstMenu.json",{"cache": false},function(res){
	 	 	$.post("/manage/menu/listFirstMenu",{"cache": false},function(res){
	 	 		console.log('当前账号的所有菜单权限--------')
	 	 		console.log(res)	 	 		
	 	 		data = res.data; 
	 	 		for(var key = 0;key<data.length;key++){
	 	 			(function(i){
	 	 				var id = data[i].id;
		 	 			str = '<li data-id="'+id+'">'
                              +'<span class="menu-name">'+data[i].name+'&nbsp;&nbsp;:</span>'
                              +'<div class="menu-item"><input type="checkbox" id="add'+i+'" data-id="'+id+'-'+1+'"><label style="display=none" for="add'+i+'">新增</label></div>'
                              +'<div class="menu-item"><input type="checkbox" id="delet'+i+'"  data-id="'+id+'-'+2+'"><label for="delet'+i+'">删除</label></div>'
                              +'<div class="menu-item"><input type="checkbox" id="edit'+i+'"  data-id="'+id+'-'+3+'"><label for="edit'+i+'">修改</label></div>'
                              +'<div class="menu-item"><input type="checkbox" id="search'+i+'"  data-id="'+id+'-'+4+'"><label for="search'+i+'">查询</a></label></div>'
                            +'</li>';

	 	 			})(key)
	 	 			$('#list_table>.list_choice .modal-footer').before(str);
	 	 			
	 	 		}
            	
		 	})
		},
		//角色查重
		checkRole:function(ajaxURL){
			var that = this;
			
			$('.role-input').on("blur",function(){
				that.valueName = $(this).val();	
				that.cdatas = {"roleName":that.valueName};
				console.log(that.valueName,ajaxURL,that.cdatas)
				that.sendCheck(that.valueName,ajaxURL,that.cdatas);
			})
			$('.role-input').on("focus",function(){
				$('.error i').html('');
				$('.error').hide();
			})
    		
			
		},
		checkEditRole:function(ajaxURL,editId){
			//console.log(ajaxURL,editId)
			var that = this;
			$('.role-input').on("blur",function(){
				that.valueName = $(this).val();	
				that.cdatas = {"roleName":that.valueName,"roleId":editId};
				that.sendCheck(that.valueName,ajaxURL,that.cdatas);
				
			})

			$('.role-input').on("focus",function(){
				$('.error i').html('');
				$('.error').hide();
			})
		},
		sendCheck:function(valueName,ajaxURL,data){
			var that = this;
			if(valueName != ""){
    			$.ajax({
	    			//url:"../../self/json/addCheck.json",
	    			url:ajaxURL,
	    			type:"post",
	    			//contentType: 'application/json;charset=utf-8',
	    			cache: false,
	    			//async : false,
	    			data:data,
	    			success:function(res){
	    				var returnCode = res.returnCode;
	    				var returnMsg = res.message;
	    				that.checkCallback(returnCode,returnMsg,valueName);
	    				
	    				
	    			}
	    		})
    		
    		}else{

    			$('.error i').html('用户名不能为空');
    			$('.error').show()
    		}

			
		},
		checkCallback:function(returnCode,retrunMsg,value){
			if(returnCode == 0){
				$('.error').hide();
				$('.correct i').html(retrunMsg);
				$('.correct').show();
				
				return value;
			}else{
				$('.correct').hide();
				$('.error i').html(retrunMsg);
				$('.error').show();
			}
		},
		//某角色的菜单权限初始状态
		oneMenu:function(roleId){
			var that = this;
			$.ajax({
				//url:"../../self/json/getOneRole.json",
				url:"/manage/role/getOneRole",
				type:'get',
				cache: "false",
				data:{
					"roleId":roleId	
				},
				success:function(res){			
					//获取到的角色名赋值给input
					$('#search-wrap .role-input').val(res.data.roleName);

					//获取菜单permission
					var data = res.data.menus;
					var str = "";						
		 	 		for(var key = 0;key<data.length;key++){
		 	 			(function(i){
		 	 				var id = data[i].id;
			 	 			str = '<li data-id="'+id+'">'
	                              +'<span class="menu-name">'+data[i].name+'&nbsp;&nbsp;:</span>'
	                              +'<div class="menu-item"><input type="checkbox" id="add'+i+'" data-id="'+id+'-'+1+'"><label for="add'+i+'">新增</label></div>'
	                              +'<div class="menu-item"><input type="checkbox" id="delet'+i+'"  data-id="'+id+'-'+2+'"><label for="delet'+i+'">删除</label></div>'
	                              +'<div class="menu-item"><input type="checkbox" id="edit'+i+'"  data-id="'+id+'-'+3+'"><label for="edit'+i+'">修改</label></div>'
	                              +'<div class="menu-item"><input type="checkbox" id="search'+i+'"  data-id="'+id+'-'+4+'"><label for="search'+i+'">查询</a></label></div>'
	                            +'</li>';

		 	 			})(key)
		 	 			
		 	 			$('#list_table>.list_edit>.modal-footer').before(str);
		 	 			//初始化复选框状态
		 	 			for(var j = 0;j<data[key].permission.length;j++){
		 	 				//console.log(data[key].permission);			 	 				
		 	 				var permStr = data[key].permission[j].toString();
		 	 				//console.log(permStr)
		 	 				//判断权限中是否包含1
		 	 				if(permStr.indexOf("1") != -1 ){
		 	 					var perId = key;
		 	 					//当前的权限数组
		 	 					var perArr = data[key].permission;
		 	 					//console.log(perArr)
		 	 					//当前对象的增加选择框
		 	 					var addChioce = $('#list_table>.list_edit>li[data-id='+data[key].id+'] #add'+key);
		 	 					//console.log(addChioce)
		 	 					//checked
		 	 					addChioce.prop('checked',true);
		 	 					//console.log(addChioce.prop('checked'))
		 	 					
		 	 				}
                            
                            if(permStr.indexOf("2") != -1 ){
		 	 					var perId = key;
		 	 					//当前的权限数组
		 	 					var perArr = data[key].permission;
		 	 					console.log(perArr)
		 	 					//当前对象的增加选择框
		 	 					var delChioce = $('#list_table>.list_edit>li[data-id='+data[key].id+'] #delet'+key);
		 	 					//console.log(addChioce)
		 	 					//checked
		 	 					delChioce.prop('checked',true);
		 	 					
		 	 				}

		 	 				if(permStr.indexOf("3") != -1 ){
		 	 					var perId = key;
		 	 					//当前的权限数组
		 	 					var perArr = data[key].permission;
		 	 					console.log(perArr)
		 	 					//当前对象的增加选择框
		 	 					var edtChioce = $('#list_table>.list_edit>li[data-id='+data[key].id+'] #edit'+key);
		 	 					//console.log(addChioce)
		 	 					//checked
		 	 					edtChioce.prop('checked',true);
		 	 					
		 	 				}
		 	 				
		 	 				if(permStr.indexOf("4") != -1 ){
		 	 					var perId = key;
		 	 					//当前的权限数组
		 	 					var perArr = data[key].permission;
		 	 					console.log(perArr)
		 	 					//当前对象的增加选择框
		 	 					var seaChioce = $('#list_table>.list_edit>li[data-id='+data[key].id+'] #search'+key);
		 	 					//console.log(addChioce)
		 	 					//checked
		 	 					seaChioce.prop('checked',true);
		 	 					
		 	 				}
		 	 			}
		 	 		}
				},
				error:function(){
					console.log('edit-getMenu--报错');
				}
			})
		},
		//获取某角色的信息
		oneRole:function(roleId){
			var that = this;
			var data = "";
			var strTable = "";
			var strMenu = "";
			console.log(roleId)
			$.ajax({
				url:'/manage/role/getOneRole',
				type:'post',
				//url:"../../self/json/getOneRole.json",
				cache: "false",
				data:{
					"roleId":roleId	
				},
				success:function(res){
					console.log('点击【详情】获取对应roleId个人信息--------')
					console.log(res)					
					data = res.data;
					console.log(data.menus);					
					strTable = '<tr>'
	                        +'<td>角色ID</td>'
	                        +'<td>'+data.id+'</td>'
	                      +'</tr>'
	                      +'<tr>'
	                        +'<td>角色名</td>'
	                        +'<td>'+data.roleName+'</td>'
	                      +'</tr>'
	                      +'<tr>'
	                        +'<td>菜单权限</td>'
	                        +'<td class="menu_permission"></td>'
	                      +'</tr>'
	                     +'<tr>'
	                        +'<td>创建时间</td>'
	                        +'<td>'+data.createTime+'</td>'
	                      +'</tr>';            
	                $('.list_person .table>tbody').prepend(strTable);

	                //处理菜单权限 
	                for(var i = 0;i<data.menus.length;i++){	                	
	                	//替换 1 2 3 4 ->增删改查
	                	var strPer = data.menus[i].permission.toString();
	                	//console.log(strPer)
	                	var a = that.replaceAll(strPer,',',' ');
	                	var b = that.replaceAll(a,'1','新增');
	                	var c = that.replaceAll(b,'2','删除');
	                	var d = that.replaceAll(c,'3','修改');
	                	strPer= that.replaceAll(d,'4','查看');
	                	console.log(strPer)
	                	strMenu ='<tr>'
	                			   +'<td>'+data.menus[i].name+'&nbsp;&nbsp;&nbsp;&nbsp;</td>'
	                			   +'<td>'+strPer+'&nbsp;</td>'
	                	         +'</tr>'
	                	$('.menu_permission').append(strMenu);
	                	

	                }

	             },
	             error:function(){
	             	console.log('getOneRole----后台报错');
	             }

			})			
		},
		replaceAll:function(str,old,now){
			var reg = new RegExp(old,'g');
			return str.replace(reg,now);
			console.log(reg)
		},
		//全选
		selectTotal:function(){
 	 		//全选按钮
			var selectAll = $('.checkAll input[type="checkbox"]');
			//全选
			selectAll.click(function(){
				var status = $(this).prop('checked');
				//如果【全选】选中
				if(status){
					//让所有的复选框选中
					$('#list_table li input').prop('checked',true);
				}else{
					$('#list_table li input').prop('checked',false);
				}
			});

		}
	}//)
	role.init();
	// role.getHash();
	// console.log(role)
})














