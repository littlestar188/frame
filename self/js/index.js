$(function(){
	var personal = {
		arrayVal:[],
		// contKey:$('.table-striped>tbody>tr>td:nth-child(1)'),
		// contVal:$('.table-striped>tbody>tr>td:nth-child(2)'),
		init:function(){
			
			//必须是ID选择器
			$('#nav-header').load('nav.html',function(){});
			this.renderData();
			
		},
		renderData:function(){
			var that = this;
			$.ajax({
				 // url:'../../self/json/person.json',
				url:'/manage/user/personInfo',
				type:'post',
				dataType:"json",
				success:function(res){
					console.log('个人中心-------');
					console.log(res);
					var str = "";
					//var result = res[0];
					var result = res.data;
					str = '<tr class="cont">'
			              +'<td>用户ID</td>'
			              +'<td>'+result.userId+'</td>'
			            +'</tr>'
			            +'<tr class="cont">'
			              +'<td>用户名</td>'
			              +'<td>'+result.userName+'</td>'
			            +'</tr>'
			            +'<tr class="cont">'
			              +'<td>真实姓名</td>'
			              +'<td>'+result.realName+'</td>'
			            +'</tr>'
			            +'<tr class="cont">'
			              +'<td>角色名</td>'
			              +'<td>'+result.roleName+'</td>'
			            +'</tr>'
			            +'<tr class="cont">'
			              +'<td>类型</td>'
			              +'<td>'+result.type+'</td>'
			            +'</tr>'
			            
			            +'<tr class="cont">'
			              +'<td>性别</td>'
			             +'<td>'+result.sex+'</td>'
			            +'</tr>'
			            +'<tr class="cont">'
			              +'<td>电话</td>'
			              +'<td>'+result.phone+'</td>'
			            +'</tr>'
			            +'<tr class="cont">'
			              +'<td>邮箱</td>'
			              +'<td>'+result.email+'</td>'
			            +'</tr>'
			            +'<tr class="cont">'
			              +'<td>创建时间</td>'
			              +'<td>'+result.createTime+'</td>'
			            +'</tr>'
			            +'<tr class="cont">'
			              +'<td>上次登录时间</td>'
			              +'<td>'+result.lastLoginTime+'</td>'
			            +'</tr>'			            
			            +'<tr class="cont">'
			              +'<td>上次登录IP</td>'
			              +'<td>'+result.lastLoginIp+'</td>'
			            +'</tr>'
			            +'<tr class="cont">'
			              +'<td>登录次数</td>'
			              +'<td>'+result.count+'</td>'
			            +'</tr><tr class="cont">'
			              +'<td>区域权限</td>'
			              +'<td>'+result.location+'</td>'
			            +'</tr>'
			            +'<tr class="cont">'
			              +'<td>备注</td>'
			              +'<td>'+result.remark+'</td>'
			            +'</tr>';
			   	$('#person_table>tbody').append(str);
				$('.user.user-menu .user-name').html(result.userName);

				   
				},
				error:function(){
					console.log('get person information -----后台报错');
				}
			})
		}
	}
	personal.init();
});