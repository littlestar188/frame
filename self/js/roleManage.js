$(function(){

	//var role = Object.create(publicFun)

	//var role = $.extend(role,{
	var role = {
		datas:{},
		cdatas:{},
		valueName:"",
		menuId:[],
		firstMenuLi:{},
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
             //queryParams: role.queryParams,
             striped: true,//使表格带有条纹
             pagination: true,//设置True在表格底部显示分页工具栏
             pageSize: 10,
             pageList: [10, 25, 50, 100],
             toolbar:'#custom-toolbar',
             columns: [
                       {field: 'state',checkbox: true,formatter:function(row,value,index){
                       	return role.disableDel(row,value,index);}
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
			this.searchRole();
			//改 查 删 功能实现
			this.btnPer();
			this.batchDel();
			

		},
		//批量删除
		batchDel:function(){
			var that = this;
			$('.delGoupBtn').click(function(){
				var rows = $("#role_table").bootstrapTable('getAllSelections');
				var realIdArr = [];
				//批量验证角色是否为【超级管理员】
				for(var i=0;i<rows.length;i++){									
					// if(rows[i].roleName !== "超级管理员"){
						realIdArr.push(rows[i].id);
					// }													
				}
				console.log(realIdArr)
				that.sendDelData(realIdArr);
				
			})

			 
		},
		/*
		  table初始化 登录账户的超级管理员禁止选中 避免误删操作
		*/
		disableDel:function(row,value,index){
			//默认在第一行
			if(index == 0){
           		return {
           			disabled:true
           		}          		
           		return value
           	}

		},		
		/*
			@param  roleIdArr  可删除的角色ID的数组集合
		*/
		sendDelData:function(roleIdArr){
			$.ajax({
				url:"/manage/role/deleteRoles",
				type:"post",
				dataType:"json",
				cache:false,
				data:{'roleIds':roleIdArr},
				success:function(res){

					console.log('删除成功')
					console.log(res)
					if(res.returnCode == 0){
                		//刷新listRole              	   
                	    //模态框500毫秒后消失
                	    if(confirm('批量删除成功')){
                	    	$('#roleModal').modal('hide').delay(500);
                	    	$("#role_table").bootstrapTable('refresh', {url:'/manage/role/listRoles'});
                	   } // else{
                	    // 	$('#roleModal').modal('hide').delay(500);
                	    // 	$("#role_table").bootstrapTable('refresh', {url:'/manage/role/listRoles'});
                	    // }               	   
                	}else{
                		if(confirm('批量删除失败')){
                			$('#roleModal').modal('hide').delay(500);
                		}
                	}
					
				}

			})
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
				html += '<a href="javascript:void(0)" class="btn btn-info btn-xs" id="btn-edit" data-id="'+value+'">修改</a>&nbsp;&nbsp;'
					+'<a href="javascript:void(0)" class="btn btn-info btn-xs" id="btn-edit2" data-id="'+value+'">修改2</a>&nbsp;&nbsp;';
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
			
			$('#role_table').on('click','.btn.btn-xs',function(event){
				//阻止冒泡
				window.event? window.event.cancelBubble = true : event.stopPropagation();

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
					setTimeout(that.checkEditRole('/manage/role/updateCheck',roleId),1000);
					var tableLis = '#list_table .list_edit li';
					//解绑click事件
					$('#btn-edit-save').off('click');				 
			 		$('#btn-edit-save').click(function(event){			 			
			 			event.stopPropagation();
			 			that.saveClick(tableLis,'/manage/role/updateRole',roleId);
			 		})

					
				}
				//判断是否是ztree版修改
				if($(this).is('#btn-edit2')){

					that.EditRoleTree();
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
		// //判断当前账号的角色 是否有角色管理的权限
		// judgePer:function(){
		// 	//../../self/json/listFirstMenu.json
		// 	//$.get("/manage/menu/listFirstMenu.json",{"cache": false},function(res){})
		// 	$.post("/manage/menu/listFirstMenu.json",{"cache": false},function(res){})
		// },
		//新增
		addRole:function(){	

			var that = this;
			//登录账号对应角色的权限菜单列表
			this.firstMenu('#list_table>.list_choice .modal-footer');			

			$('.addBtn').click(function(event){

				event.stopPropagation();

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
			this.checkRole($('.role-input'),"/manage/role/addCheck");
			//单个按钮
	 		//监视所有复选框 data-id =  navId-permission
	 		var tableLis = '#list_table .list_choice li';
	 		//避免【保存失败】窗口多次弹出
	 		$('#btn-role-save').off('click');
	 		$('#btn-role-save').click(function(){	 				 			
	 			that.saveClick(tableLis,'/manage/role/addRole');
	 		})
	 		
		},
		/*
			@param  elem     【修改保存】/【新增保存】按键
			@param  ajaxURL   updateRole/addRole 接口
			@param  editId    当前【修改】对象的Id
		*/
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

            //根据参数个数选择that.datas类型
            //增
            // var tdatas = {"menus":that.menuId, "roleName":that.valueName};
 
           //增
           	if(arguments.length == 2){
           		that.datas = {"menus":that.menuId, "roleName":that.valueName};
           	}
            //改
           
            if(arguments.length == 3){
            	//判断角色名称输入框的两种情况 不曾失焦？曾失焦
            	var name = $('.role-input[data-id="'+editId+'"]').val();
            	that.valueName = (that.valueName == ""||that.valueName != name) ? name : that.valueName;
            	that.datas = {"menus":that.menuId, "roleName":that.valueName};
            	that.datas["roleId"] = editId

            	
           }
            
            console.log(ids,that.menuId,that.datas)
            console.log(JSON.stringify(that.datas))
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
                // async:false,
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

              	$('.error').hide();
				$('.correct').hide();

				$('#roleModal').modal({show:true})
			//})
		},
		//查询角色
		searchRole:function(){
			$('.searchBtn').click(function(event){
				event.stopPropagation();
				$("#role_table").bootstrapTable('refreshOptions',{
					url:'/manage/role/selectRoles',
					queryParams: role.queryParams
					
				})
				// var temp = role.queryParams({limit:1,offset:10});
				// console.log(temp)

			})

		},
		queryParams:function(params){
			//console.log($('#custom-toolbar input[type="text"]').val())
			var value = $('#custom-toolbar input[type="text"]').val();
			var temp = {
				roleName:value,
				limit:params.limit,
				offset:params.offset,
								
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
		
		/*
			//角色查重
			@param elem      输入框对象$('')
			@param ajaxURL   /addCheck

		*/
		checkRole:function(elem,ajaxURL){
			var that = this;

			elem.off('blur');
			elem.on('blur',function(){
				that.valueName = $(this).val();	
				that.cdatas = {"roleName":that.valueName};
				console.log(that.valueName,ajaxURL,that.cdatas)
				that.sendCheck(that.valueName,ajaxURL,that.cdatas);
			})

			elem.on("focus",function(){				
				$('.error i').html('');
				$('.error').hide();
			})
    		
			
		},
		/* 
			@param  ajaxURL    /updataCheck
			@param  editId      
			@param  editName     
		*/
		checkEditRole:function(ajaxURL,editId,editName){
			//console.log(ajaxURL,editId)

			var that = this;
			//角色名称未修改
			// that.valueName = $('.role-input[data-id="'+editId+'"]').val();
			// console.log(that.valueName)

			//角色名称有修改 
			$('.role-input').off('blur');
			$('.role-input').on('blur',function(){
				//that.valueName = $(this).val();
				that.valueName = $(this).val();	
				that.cdatas = {"roleName":that.valueName,"roleId":editId};

				that.sendCheck(that.valueName,ajaxURL,that.cdatas);
				console.log('editcheck1111111111111111111')
				
			})
			
			$('.role-input').on("focus",function(){
				$('.error i').html('');
				$('.error').hide();
			})
		},
		/* 
			@param  valueName    修改或新增的角色名称
			@param  ajaxURL      /addCheck或/updataCheck访问地址
			@param  data         {roleId:,raleName,menu}
		*/
		sendCheck:function(valueName,ajaxURL,data){
			var that = this;
			console.log(valueName)
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
				$('.correct').hide();
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

		/*
			//某角色的菜单权限初始状态
			@param  roleId 
		*/	
		oneMenu:function(roleId){
			var that = this;
			$.ajax({
				//url:"../../self/json/getOneRole.json",
				url:"/manage/role/getOneRole",
				type:'get',
				// async:"true",
				data:{
					"roleId":roleId	
				},
				success:function(res){
					//调用一级菜单函数 使之初始化
					that.firstMenu('#list_table>.list_edit>.modal-footer',true,that.innerMenuAjax,res);

					
				},
				error:function(){
					console.log('edit-getMenu--报错');
				}
			})
		},
		/*
			@param  elem          某个模态框
			@param  flag          是否初始化显示原有权限
			@param  nextMenu      某角色的现有权限/innerMenuAjax
			@param  oneRoleData   getOneRole的数据获取
			
		*/
		//获取对应权限的一级菜单列表 如果是超级管理员默认是全部菜单
		firstMenu:function(elem,flag,nextMenu,oneRoleData){
			var that = this;
	 		var str = "";
	 		var data;
	 		var idArr = []
	 	 	//$.get("../../self/json/listFirstMenu.json",{"cache": false},function(res){
	 	 	$.post("/manage/menu/listFirstMenu",{"cache": false,"async":true},function(res){
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

		 	 		$(elem).before(str);
		 	 		
	 	 			
	 	 		}
	 	 		if(flag){
	 	 			//console.log(111111111)
            		nextMenu(oneRoleData,data,key);
            		//console.log('flag---'+key)
            	}	
            	
		 	})
		 	
		 	
		},
		
		/* 

			@param  oneRoleData    getOneRole接口的数据获取
			@param  firstMenuData   firstMenu接口 获取的所有一级菜单id
			@param  i               继承firstMenu接口 所有一级菜单下标
		*/
		innerMenuAjax:function(oneRoleData,firstMenuData,i){
			var that = this;
			//获取到的角色名赋值给input
			console.log(oneRoleData)
			console.log('innerMenuAjax---'+i)
			$('#search-wrap .role-input').attr('data-id',oneRoleData.data.id);
			$('#search-wrap .role-input[data-id="'+oneRoleData.data.id+'"]').val(oneRoleData.data.roleName);

				//获取菜单permission
				var data = oneRoleData.data.menus;
				console.log(data)
				var str = "";
				//console.log(22222222222)	

				//角色用户的权限菜单长度【小于】所有一级菜单长度时					
				for(var i=0;i<firstMenuData.length;i++){

					for(var n=0 ;n<data.length;n++){

						//匹配oneMenu 与 firstMenu -->记录【id相等】的firstMenu下标
						if(firstMenuData[i].id == data[n].id){
							//index.push(i)
							for(var j = 0;j<data[n].permission.length;j++){
			 	 				//console.log(3333330+j);			 	 				
			 	 				var permStr = data[n].permission[j].toString();
			 	 				//console.log(permStr)

			 	 				//判断权限中是否包含1 增
			 	 				if(permStr.indexOf("1") != -1 ){
			 	 					
			 	 					//当前对象的增加选择框
			 	 					// var addChioce = $('#list_table>.list_edit>li[data-id='+data[i].id+'] #add'+i);
			 	 					var addChoice =$('#list_table>.list_edit #add'+i);
			 	 					console.log(addChoice.attr("data-id"))
			 	 					//checked
			 	 					addChoice.attr("checked",true);
			 	 					//console.log(addChoice)
			 	 					
			 	 				}
			 	 				//删
			 	 				if(permStr.indexOf("2") != -1 ){
			 	 					var delChoice = $('#list_table>.list_edit #delet'+i);
			 	 					//console.log(delChoice)
			 	 					delChoice.prop('checked',true);
		 	 					}

		 	 					//改
			 	 				if(permStr.indexOf("3") != -1 ){
			 	 					var edtChoice = $('#list_table>.list_edit #edit'+i);
			 	 					//console.log(edtChoice)
			 	 					edtChoice.prop('checked',true);
			 	 					
			 	 				}
		 	 				
		 	 					//查
			 	 				if(permStr.indexOf("4") != -1 ){		 	 				
			 	 					//当前对象的增加选择框
			 	 					var seaChoice = $('#list_table>.list_edit #search'+i);
			 	 					//console.log(seaChoice)
			 	 					seaChoice.prop('checked',true);
			 	 					
			 	 				}
		 	 				}
						}
					}
				}
				//console.log(index)
					
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
				type:'get',
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
		/*
		  第二版功能模板
		*/
		funZtree:function(){
		    this.addRoleTree();		    
		    		   
		},
		addRoleTree:function(){
			var that = this;
			$('.addBtn2').click(function(event){
				
				that.falshZtree('新增');
				that.initZtree('/frame/self/json/listPerMenu.json','get');
		    	that.checkRole($('.ztreeRoleInput'),"/manage/role/addCheck");
		    	that.ztreeDateSave();	
				
			})

		},	
		/*
			@param elem   
			@param title
		*/
		falshZtree:function(title){

			$('.ztree_title').html(title);
			$('.ztreeWrapper').removeClass('slideOutRight')
			$('.table_wrapper').addClass('col-lg-9');
			$('.ztreeWrapper').addClass('slideInRight').fadeIn();

			$('.btnWrapper .treeCancel').click(function(){

				$('.table_wrapper').removeClass('col-lg-9');
				$('.ztreeWrapper').removeClass('slideInRight').addClass('slideOutRight');
			})

		},
		/*
			@param ajaxURL 
			@param method  get/post
			@param id
		*/
		initZtree:function(ajaxURL,method,id,callback){
			var zNodes =[];
		    //ajax获取数据 模拟数据
		    var setting = {
		   		view:{
		   			showIcon:false,
		   			fontCss:{}
		   		},
			   	check:{
			   		enable:true,
			   		chkboxType :{ "Y" : "ps", "N" : "ps" },
			   		chkStyle:"checkbox"
			   	},
			   	data: {
					simpleData: {
						enable: true,
						idKey: "id",
						pIdKey: "pId",
						rootPId: 0
					}
				}
		    };
		    
		    var ajaxObj = {
		   		url:ajaxURL,
		   		type:method,
		   		dataType:"json",
		   		async : false,//必写
		   		success:function(res){
		   			console.log(res)
		   			zNodes = res.menus;
		   			callback();
		   		}
		    }
		    var params = {
		   		data:{"id":id}
		    }

		    if(method == "get"){
		   		$.ajax(ajaxObj)
		    }
		    if(method == "post"){
		   		$.ajax($.extend(ajaxObj,params))
		    }
		   
		   	console.log($.extend(ajaxObj,params))

		    $.fn.zTree.init($('#treePermission'), setting, zNodes); 

		    var zTreeObj = $.fn.zTree.getZTreeObj('treePermission'); 
		    //必须有延迟才能实现初始化时全部展开
		    // setTimeout(function(){
		    // 	zTreeObj.expandAll(true);
		    // },500);		    
		   
		},
		/*
			@param roleId 
		*/
		EditRoleTree:function(roleId){
			this.falshZtree('修改');
			this.initZtree('/frame/self/json/listEditPer.json','get',"123456789");


		},
		ztreeDateSave:function(){
			$('.btnWrapper .treeSave').click(function(){

				var ztreeObj = $.fn.zTree.getZTreeObj("treePermission");
            	var znodes = ztreeObj.getCheckedNodes(true);
            	//console.log(znodes)
            	//所选的权限菜单数组 pid
	            // var nodesArr = znodes.map(function(item){	            	
	            // 	if(item.checked == true){
	            // 		return item.id
	            // 	}	            		            	
	            // })
	            // console.log(nodesArr)

	            //所选的权限菜单数组
	            var childs = [];
	            for(var i in znodes){
	            	console.log(znodes[i].children)
	            	if(znodes[i].checked){
	            		for(var j in znodes[i].children){
	            			if(znodes[i].children[j].checked){
	            				for(var k in znodes[i].children[j].children){
	            					if(znodes[i].children[j].children[k].checked){
	            						childs.push(znodes[i].children[j].children[k].id) ;
	            					}
	            					
	            				}	            				
	            			}	            		
	            		}
	            	}	            		            	
	            }

	            // var param = {
	            // 	roleName:that.name
	           	//	menus : childs
	            // }
	            console.log(childs)
	           
				setTimeout(function(){
					$('.table_wrapper').removeClass('col-lg-9');
					$('.ztreeWrapper').removeClass('slideInRight').addClass('slideOutRight');
				},500)
				
				
			})
		},
		ztreeDateFilter:function(treeId, parentNode, childNodes){
			if (!childNodes) return null;
			for (var i=0, l=childNodes.length; i<l; i++) {
				childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
			}
			return childNodes;
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
	role.funZtree();	
})














