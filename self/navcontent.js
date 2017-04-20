$(function(){
	var nav = {
		sidebar:$('.sidebar-menu'),
		personlBtn:$('.user-footer>.pull-left>.btn'),
		init:function(){
			//加载顶部导航
			$('#nav-header').load('./pages/forms/nav.html',function(){
				// 未来元素 只能委托 更换顶部导航的用户链接
				//console.log($('#nav-header .user-body .person-center')[0]);
				//console.log($('#nav-header .user-body .person-center')[0].attributes[0]['value'])
				$('#nav-header .user-body .person-center')[0]['attributes'][0]['value'] = 'pages/forms/personal.html';
				$('#nav-header .user-body .pswc-hange')[0]['attributes'][0]['value'] = 'pages/forms/password.html';
				$('#nav-header .user-body .signout')[0]['attributes'][0]['value'] = 'pages/forms/login.html';

				//ajax请求获取用户名
				$.ajax({
					// url:'../../self/js/person.json',
					url:'/manage/user/personInfo',
					type:'post',
					dataType:"json",
					success:function(res){
						console.log(res);
						$('.user-name').html(res.data.userName);
					},
					error:function(){
						console.log("后台报错")
					}
				})
			});
			
			this.navRender();
			this.toPersonl();
			//console.log(login.navData);
		},
		navRender:function(){
			var that = this;		
			$.ajax({
				url:'../../self/js/data.json',
				type:"get",
				// url:'/manage/menu/leftTree',
				// type:'post',
				dataType:"json",
				success:function(data){
					//console.log(data.data);
					//var data = data.data;
					var first = "";//一级导航
					var sencond = "";//二级导航
					var third = "";//三级导航
					var rightIcon = "";
					var arr1 = [];
					var arr2 = [];
					for(var key = 0;key<data.length;key++){
						(function(i){
						//console.log(i);//0 1 					
							var li = $('<li class="treeview first"></li>');
							//定义第一级导航id
							li.attr('data-id',i);

							first ='<a href="'+data[i].link+'">'
								    +'<i class="fa '+data[i].icon+'"></i>' 
								    +'<span class="nav-name">'+data[i].name+'</span>'  
								  +'</a>'
							li.append(first);
							that.sidebar.append(li);

							//判断是否有二级菜单
							console.log(data[i].sub_menu);
							if(data[i].sub_menu !== "null"){
								//将有二级导航的一级导航下标存放到数组中
							    return	arr1.push(i);
								console.log(arr1)
							}
						})(key);
					}
					console.log(arr1)
					var fid,ul,li;
					for(var j=0;j<arr1.length;j++){						
							//找到对应有二级导航的一级导航
							li = $('.sidebar-menu li.first').eq(arr1[j]);
							var a = li.find('a');
							rightIcon = "<span class='pull-right-container'>"
											+"<i class='fa fa-angle-left pull-right'></i>"
										 +"</span>";
							a.append(rightIcon);
							console.log(j)

							li.append													
					}
					for(var k=0;k<data[arr1].sub_menu.length;k++){
						console.log(data[arr1].sub_menu.length);
						second = '<ul class="treeview-menu">'
									+'<li class="second-menu">'
							      +'<a href="'+data[fid].sub_menu[k].link+'">'
							        +'<i class="fa fa-circle-o"></i>'+data[fid].sub_menu[k].name
							      +'</a>'
							   +'</li>'
							   +'</ul>';
						ul.append(second);
						li.append(ul);
						//console.log(k)
						//console.log(data[fid].sub_menu[k].sub_menu)
						// if(data[fid].sub_menu[k].sub_menu !== "null"){
						// 	//将有三级导航的二级导航下标存放到数组中
						//     return	arr2.push(k);
						// 	console.log(arr2)
						// }
					}
					

					
				},
				error:function(){
					console.log('后台出错');
				}

			})
		},
		toPersonl:function(){
			this.personlBtn.click(function(){
				window.setTimeout(window.location.href="/frame/pages/forms/personal.html",500);
			})
		}
	};
	nav.init();
})
