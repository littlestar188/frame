/*
*  public function
*/
var publicFun = {
	pathname : window.location.pathname,
	ajaxUrlheader:"http://127.0.0.1:8080",
    localHeader:"http://127.0.0.1:80",
    init:function(){

    	console.log('public.init')
    	this.loadTopNav();
		this.loadeFooter();
    },
    /*
	* 加载头部导航页面
    */
	loadTopNav:function(){
		var that = this;	 
		var navUrl ;
		var nav1 ='./pages/layout/top-nav.html'
		var nav2 = '../../layout/top-nav.html';
		(this.pathname.indexOf('index') !== -1 ) ? navUrl = nav1 : navUrl = nav2;
		//console.log(navUrl)
		$('#nav-header').load(navUrl,function(){
			console.log('public.init-nav');
			$.ajax({
				 // url:'../../self/js/person.json',
				url:'/manage/user/personInfo',
				type:'post',
				cache:true,
				dataType:"json",
				success:function(res){
					console.log(res.data)
					//为了减少http请求userId 存储在cookie中
					$.cookie("user",[res.data.userId,res.data.roleName],{expires:1,path:'/'});
					//top-nav
					$('.user.user-menu .user-name').html(res.data.userName);
				}
			})
		});
	},
	/*
	* 加载底部导航页面
    */
	loadeFooter:function(){ 
		var footUrl;
		var foot1 ='./pages/layout/footer.html';
		var foot2 = '../../layout/footer.html';
		(this.pathname.indexOf('index') !== -1 ) ? footUrl = foot1 : footUrl = foot2;
		//console.log(footUrl)
		$('#main-footer').load(footUrl,function(){
			console.log('public.init-footer');
		});
	},
	//获取hash值
	getHash:function(){
		window.onhashchange = function(){
			//alert(1)
			var hash = location.hash;
			console.log(hash)
			return hash;
		}
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

	},
	//字符串替换
	replaceAll:function(str,old,now){
		var reg = new RegExp(old,'g');
		return str.replace(reg,now);
		console.log(reg)
	}
}
/*
* navigation
*/
var nav = {
	navData:{},
	sidebar:$('.sidebar-menu'),
	personlBtn:$('.user-footer>.pull-left>.btn'),
	init:function(){		
		this.navRender();
		this.toPersonl();
		// this.initName();
		//console.log(login.navData);
	},
	/*
	* 渲染左侧导航页面
    */
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
						var perFirst = data[i].permission;
						console.log(perFirst)
						if(data[i].sub_menu == false && data[i].permission !== null){}
						perFirst = publicFun.replaceAll(perFirst.toString(),',','');
																		
						var li = $('<li class="treeview first" data-id="'+i+'"></li>');
						//定义第一级导航id
						first ='<a href="'+data[i].link+'#'+perFirst+'">'
							    +'<i class="fa '+data[i].icon+'"></i>' 
							    +'<span class="nav-name">'+data[i].name+'</span>'  
							  +'</a>'
						li.append(first);
						that.sidebar.append(li);
						console.log(first)

						//判断是否有二级菜单
						if(data[i].sub_menu!==null){
							
							that.secondNav(li,i,data[i]);
									
						}								
							
						//}
					})(key);
					
				}
				
			},
			error:function(){
				console.log('后台出错');
			}

			
		})
	},
	/*
		第二级导航
		@param data sub_menu[i]
	*/
	secondNav:function(firstNav,i,data){
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
		var permission = publicFun.replaceAll(data.permission.toString(),',','');
		for(var j = 0;j<data.sub_menu.length;j++){
			//console.log(i+"-a-"+j);	//0 1 0
			
			// var permission = publicFun.replaceAll(data[i].sub_menu[j].permission.toString(),',','');
			second = '<li class="second-menu" data-id="'+i+'-'+j+'">'
			      +'<a href="'+data.sub_menu[j].link+'#'+permission+'">'
			        +'<i class="fa fa-circle-o"></i>'+data.sub_menu[j].name
			      +'</a>'
			   +'</li>';
			ul.append(second);
			firstNav.append(ul);

			if(data.sub_menu[j].sub_menu!==null){

				that.thirdNav(ul,j,data,sub_menu[j])
			}
		}	
	},
	/*
		第三级导航
		@param data1 sub_menu[i]
		@paran data2 sub_menu[j]
	*/
	thirdNav:function(secondNav,j,data1,data2){

		var data_id=i+"-"+j;
		secondNav.find('.second-menu[data-id='+data_id+']>a').append(rightIcon);
		var ul2 = $('<ul class="treeview-menu third-nav"></ul>');
		for(var k = 0;k<data1.data2.sub_menu.length;k++){
			//console.log(data[i].data2.sub_menu.length)
			//console.log(j+"-b-"+k);//0 1 0 1									
			third = '<li>'
				      +'<a href="'+data1.data2.sub_menu[k].link+'">'
				        +'<i class="fa fa-circle-o"></i>'+data1.data2.sub_menu[k].name
				      +'</a>'
				    +'</li>';
			ul2.append(third);

			$('.second-menu[data-id='+data_id+']').append(ul2);
				    
		}
	},
	toPersonl:function(){
		this.personlBtn.click(function(){
			window.setTimeout(window.location.href="/frame/pages/forms/personal.html",500);
		})
	}
};

$(function(){
	publicFun.init();
	nav.init();	
	//console.log(nav)
})
// $(document).ready(function(){
//    $.ajaxSetup({
//         complete:function(XMLHttpRequest){
//            var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus");
//            alert(sessionstatus)
//            if(sessionstatus=="timeout"){
//                //跳转到登录界面，待改进
//            }
//         }
//     });
// });