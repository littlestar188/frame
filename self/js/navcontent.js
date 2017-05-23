$(function(){
	var nav = {
		ajaxUrlheader:"http://127.0.0.1:8080",
      	localHeader:"http://localhost:80",
		navData:{},
		sidebar:$('.sidebar-menu'),
		personlBtn:$('.user-footer>.pull-left>.btn'),
		init:function(){
			
			this.navRender();
			this.toPersonl();
			// this.initName();
			//console.log(login.navData);
		},
		navRender:function(){
			var that = this;

			$.ajax({
				// url:'../../self/js/data.json',
				// type:"get",
				url:'/manage/menu/leftTree',
				type:'post',
				dataType:"json",
				//async : false,
				success:function(data){
					console.log('初始化菜单-----')
					console.log(data);
					var data = data.data;
					var first = "";//一级导航
					var sencond = "";//二级导航
					var third = "";//三级导航
					var rightIcon = "";
					that.navData = data;

					for(var key = 0;key<data.length;key++){
						(function(i){
						//console.log(i);//0 1 2					
							var li = $('<li class="treeview first" data-id="'+i+'"></li>');
							//定义第一级导航id
							first ='<a href="'+data[i].link+'">'
								    +'<i class="fa '+data[i].icon+'"></i>' 
								    +'<span class="nav-name">'+data[i].name+'</span>'  
								  +'</a>'
							li.append(first);
							that.sidebar.append(li);

							//判断是否有二级菜单
							
							//console.log(a);
							if(data[i].sub_menu!==null){
								//一级导航栏右边添加箭头
								var a = $('.first[data-id="'+i+'"] a:nth-child(1)');//找到第一个a
								rightIcon = "<span class='pull-right-container'>"
												+"<i class='fa fa-angle-left pull-right'></i>"
											 +"</span>";

								a.append(rightIcon);

								//创建二级导航
								var ul = $('<ul class="treeview-menu"></ul>');
								//console.log(data[i].sub_menu.length);
								//查看当前可见元素的二级导航
								
								//处理一级菜单的权限格式 [1,2,3,4] -->1234
								//console.log(that.replaceAll(data[i].permission.toString(),',',''))
								var permission = that.replaceAll(data[i].permission.toString(),',','');
								for(var j = 0;j<data[i].sub_menu.length;j++){
									//console.log(i+"-a-"+j);	//0 1 0
									

									second = '<li class="second-menu" data-id="'+i+'-'+j+'">'
									      +'<a href="'+data[i].sub_menu[j].link+'#'+permission+'">'
									        +'<i class="fa fa-circle-o"></i>'+data[i].sub_menu[j].name
									      +'</a>'
									   +'</li>';
									ul.append(second);
									li.append(ul);
									//console.log(data[i].sub_menu.length);// 2 2 1 对

									//判断是否有三级子菜单
									if(data[i].sub_menu[j].sub_menu!==null){
										//二级导航栏右边添加箭头
										var data_id=i+"-"+j;
										ul.find('.second-menu[data-id='+data_id+']>a').append(rightIcon);
										var ul2 = $('<ul class="treeview-menu third-nav"></ul>');
										for(var k = 0;k<data[i].sub_menu[j].sub_menu.length;k++){
											//console.log(data[i].sub_menu[j].sub_menu.length)
											//console.log(j+"-b-"+k);//0 1 0 1									
											third = '<li>'
												      +'<a href="'+data[i].sub_menu[j].sub_menu[k].link+'">'
												        +'<i class="fa fa-circle-o"></i>'+data[i].sub_menu[j].sub_menu[k].name
												      +'</a>'
												    +'</li>';
											ul2.append(third);

											$('.second-menu[data-id='+data_id+']').append(ul2);
												    
										}
									}
									
								}								
								
							}
						})(key);
						
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
		},
		// initName:function(){
		// 	$.ajax({
		// 		// url:'../../self/js/person.json',
		// 		url:'/manage/user/personInfo',
		// 		type:'post',
		// 		dataType:"json",
		// 		success:function(res){
		// 			console.log('显示用户名在头部导航上-------')
		// 			console.log(res);
		// 			$('.user-name').html(res.data.userName);
		// 		}
		// 	})
		// },
		replaceAll:function(str,old,now){
			var reg = new RegExp(old,'g');
			return str.replace(reg,now);
			console.log(reg)
		}
	};
	//nav.init();
})
$(function(){
	//console.log(role)
	nav.init();	
})