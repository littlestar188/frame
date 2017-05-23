// $(function(){
	var personal = Object.create(publicFun)
	var personal = $.extend(personal,{
	//var personal = {
		arrayVal:[],
		// contKey:$('.table-striped>tbody>tr>td:nth-child(1)'),
		// contVal:$('.table-striped>tbody>tr>td:nth-child(2)'),
		init:function(){
			
			//必须是ID选择器
			
			this.renderData();
			
		},
		renderData:function(){
			var that = this;
			$.ajax({
				 // url:'../../self/js/person.json',
				url:'/manage/user/personInfo',
				type:'post',
				cache:false,
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
			              +'<td>真实姓名</td>'
			              +'<td>'+result.realName+'</td>'
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


					//定义属性名数组
					// var arrayKey = ['用户ID','用户名','真实姓名','角色名','类型','性别','电话','邮箱','创建时间','上次登录时间','上次登录IP','登录次数','区域权限','备注'];
					// //contKey = table-striped下的所有第一个td元素
					// that.contKey.each(function(i){
     //                   $(this).html(arrayKey[i]);
					// })

					// //将从后台获取的所有属性值 定义成一个新数组
					// //var arrayVal = [];
					// for(var key in result){
					// 	that.arrayVal.push(result[key]);
					// }					
					// console.log(that.arrayVal);
					// //console.log(that.contKey,that.contVal);
					// //contVal = table-striped下的所有第二个td元素
					// //填充对应内容
					// that.contVal.each(function(i){
     //                   $(this).html(that.arrayVal[i]);
					// })

					//同步修改导航处用户名
					//右上角导航栏及点出框在.html添加class user-name

				//$('.user.user-menu .user-name').html(result.userName);

				var str2="";
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
			     $('#person_table2').append(str2); 
			     $('.box-profile .profile-username').html(result.userName);
			     $('.box-profile .profile-rolename').html(result.roleName);
				},
				error:function(){
					console.log('get person information -----后台报错');
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