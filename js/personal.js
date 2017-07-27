// $(function(){
	var personal = Object.create(publicFun)
	var personal = $.extend(personal,{
	//var personal = {
		arrayVal:[],
		init:function(){
			
			//必须是ID选择器
			console.log('personal_init')
			this.renderData()
		}
		renderData:function(){
			$.ajax({
				url:'resources/json/person.json',
				//url:'/manage/user/personInfo',
				//type:'post',
				cache:false,
				dataType:"json",
				success:function(res){
					console.log(res)
					var data = res.data;
					
					var tr = $('<tr><td></td><td></td></tr>');
					$.each(data,function(i,n){
						var trc = tr.clone();
						trc.find('td:nth-child(1)').text(i);						
						trc.find('td:nth-child(2)').text(n);
						//console.log(i,n)
						trc.appendTo('#person_table>tbody');
						//console.log(trc)
					})

					$('#person_table>tbody').find('tr>td:nth-child(1)').each(function(){
						var txt = $(this).text();
						var newTxt = redefine(txt);
						$(this).text(newTxt);
						console.log(txt)
					})

					$('.box-profile .profile-username').html(data.userName);
			     	$('.box-profile .profile-rolename').html(data.roleName);
					

				},
				error:function(){
					console.log('renderData2 --- fall')
				}
			})
		}
	})
	// personal.init();
// });
$(function(){
	//console.log(role)
	personal.init();	
})

function redefine(text){
	switch(text){
		case "userId":
		     text = "用户ID";
		     break;
		case "userName":
		     text = "用户姓名";
		     break;
		case "realName":
			text = "真实姓名"
		    break;
		case "roleName":
			text = "角色名";
			 break;
		case "type":
			text = "角色类型"
		    break;
		case "sex":
			text = "性别"
		    break;
		case "phone":
			text = "电话"
		    break;
		case "email":
			text = "邮箱"
		    break;
		case "createTime":
			text = "创建时间"
		    break;
		case "lastLoginTime":
			text = "最后登录时间"
		    break;
		case "lastLoginIp":
			text = "最后登录IP"
		    break;
		case "count":
			text = "登录次数"
		    break;
		case "limit":
			text = "权限区域"
		    break;
		case "remark":
			text = "备注"
		    break;
		    
	}
	return text;
}


/*	var str2="";
	str2 = '<li class="list-group-item">'
              +'<span>用户ID</span>'
              +'<a class="pull-right">'+result.userId+'</a>'
            +'</li>'
            +'<li class="list-group-item">'
              +'<span>真实姓名</span>'
              +'<a class="pull-right">'+result.realName+'</a>'
            +'</li>'			           
            +'<li class="list-group-item">'
              +'<span>类型</span>'
              +'<a class="pull-right">'+result.type+'</a>'
            +'</li>'
            
            +'<li class="list-group-item">'
              +'<span>性别</span>'
             +'<a class="pull-right">'+result.sex+'</a>'
            +'</li>'
            +'<li class="list-group-item">'
              +'<span>电话</span>'
              +'<a class="pull-right">'+result.phone+'</a>'
            +'</li>'
            +'<li class="list-group-item">'
              +'<span>邮箱</span>'
              +'<a class="pull-right">'+result.email+'</a>'
            +'</li>'
            +'<li class="list-group-item">'
              +'<span>创建时间</span>'
              +'<a class="pull-right">'+result.createTime+'</a>'
            +'</li>'
            +'<li class="list-group-item">'
              +'<span>上次登录时间</span>'
              +'<a class="pull-right">'+result.lastLoginTime+'</a>'
            +'</li>'			            
            +'<li class="list-group-item">'
              +'<span>上次登录IP</span>'
              +'<a class="pull-right">'+result.lastLoginIp+'</a>'
            +'</li>'
            +'<li class="list-group-item">'
              +'<span>登录次数</span>'
              +'<a class="pull-right">'+result.count+'</a>'
            +'</li><li class="list-group-item">'
              +'<span>区域权限</span>'
              +'<a class="pull-right">'+result.location+'</a>'
            +'</li>'
            +'<li class="list-group-item">'
              +'<span>备注</span>'
              +'<a class="pull-right">'+result.remark+'</a>'
            +'</li>';
     $('#person_table2').append(str2); */