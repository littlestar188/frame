var publicFun = {
	ajaxUrlheader:"http://127.0.0.1:8080",
    localHeader:"http://127.0.0.1:80",
	init:function(){
		this.getHash();
		this.selectTotal();
		this.replaceAll();
	},
	//获取hash值
	getHash:function(){
		window.onhashchange = function(){
			alert(1)
			var hash = location.hash;
			console.log(hash)
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
// publicFun.init();

$(document).ready(function(){
   $.ajaxSetup({
        complete:function(XMLHttpRequest){
           var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus");
           alert(sessionstatus)
           if(sessionstatus=="timeout"){
               //跳转到登录界面，待改进
           }
        }
    });
});