
	var userManage = Object.create(role);
	var userManage = $.extend(userManage,{

		init:function(){

			var that = this;
			//this.btnInit();
			this.searchUser();
			$("#user_table").bootstrapTable({
             url: '/manage/user/listUser',
            //url:'../../self/json/listUsers.json',
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
                       {field: 'state',checkbox: true},
                       {field: 'userName',title: '用户名称',align: 'center',valign: 'middle'},
                       {field: 'roleName',title: '角色名称',align: 'center',valign: 'middle'},
                       {field: 'sex',title: '性别',align: 'center',valign: 'middle'},
                       {field: 'phone',title: '手机',align: 'center',valign: 'middle'},
                       {field: 'department',title: '部门',align: 'center',valign: 'middle'},
                       {field: 'app登录',title: 'app登录',align: 'center',valign: 'middle'},
                       {field: 'remark',title: '备注',align: 'center',valign: 'middle'},
                       {field: 'roleId',title: '操作',align: 'center',valign: 'middle',formatter:function(value){
	                   	//return "<span data-id="+value+"><a href='javascript:void(0)' class='btn btn-info btn-xs' id='btn-edit'>修改</a>&nbsp;&nbsp;<a href='javascript:void(0)' class='btn btn-danger btn-xs' id='btn-del'>删除</a>&nbsp;&nbsp;<a href='javascript:void(0)' class='btn btn-success btn-xs' id='btn-watch'>重置密码</a>&nbsp;&nbsp;</span>"}
	                   	return that.__proto__.optShow(value);}

	                   	}
       				]
         	})
		},
		/*
			拓展功能按键--利用构造器的继承
			有改的权限 就有重置密码的权限
		*/
		btnInit:function(){
			var that = this;
			//从当前url中获取hash 即获取一级菜单权限数组 #1234
			var hash = location.hash;
			hash = hash.substring(1,hash.length);

		    console.log(hash)
	
				
			
		},
		searchUser:function(){
			var that= this;

			var name = $('#user_name').val();

			$('#btn_search').click(function(){
				//'../../self/json/getSomeUser.json'
				$("#user_table").bootstrapTable('refresh','../../self/json/getSomeUser.json'+name)				
				// $.ajax({
				// 	url:'../../self/json/getSomeUser.json',
				// 	data:{
				// 		roleName:name
				// 	},
				// 	success:function(res){
				// 		console.log(res)
						
				// 	},
				// 	error:function(){
				// 		console.log('userManage---后台报错')
				// 	}
				// })
				
			})
		}
		
	})
$(function(){
	console.log(userManage)
	userManage.init();	
})