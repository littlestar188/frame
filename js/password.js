// $(function(){
	var psw = Object.create(publicFun)
	var psw = $.extend(psw,{
	//var psw = {
		old:"",
		new:"",
		conf:"",
		data:{},
		init:function(){
			var that = this;
			//this.old = $('#oldPaw').val();
			// this.new = $('#newPaw').val();
			// this.conf = $('#inputConfirmPaw').val();	
			$('#nav-header').load('resources/layout/top-nav.html',function(){});				
			this.judge();
		},
		//基本校验
		judge:function(){
			var that = this;
			//console.log(this.old)
			$('.box-body').on('blur','input',function(){

				if($(this).is('#oldPaw')){
					that.old = $(this).val().trim();
					console.log(that.old);
				}
				if($(this).is('#newPaw')){
					that.new = $(this).val().trim();
					console.log(that.new);
				}
				if($(this).is('#inputConfirmPaw')){
					that.conf = $(this).val().trim();
					console.log(that.conf);
				}
				//新密码的基本校验 
				//字母数字 6-16位 
				var reg=/[a-zA-Z\d]{6,16}/;
				if(reg.test($(this).val().trim()) == 1){
					if(that.new != that.conf){								
						$('.confPsw').css('color','#c33').html('密码不一致').show();
						console.log(that.new !== that.conf)
					}
				}else{
					$(this).parent().next().css('color','#c33').html('密码格式不正确').show();
				}

				//点击保存 向后台传参
				$('.save').click(function(e){
					$.ajax({
						// url:'resources/json/password.json',
						// type:'get',
						url:"/user/updatePassword",
						type:"post",
						dataType:'json',
						data:{
							password:that.old,
							newPassword:that.new,
							confirmPassword:that.conf
						},
						success:function(res){
							//判断是否修改成功
							console.log(res);
							if(res.returnCode == 0){
								//模态框显示
								$('.modal-wrapper .box').html('密码修改成功');
								$('.modal-wrapper').show();								
							}else{
								$('.modal-wrapper .box').html(res.message);
								$('.modal-wrapper').show()
							}

							$('.beTure').click(function(){
								$('.modal-wrapper').hide();
							})
						},
						error:function(){
							console.log('后台报错');
						}

					})	
				})
				
			})	

			$('.box-body').on('input','input',function(){
				$('.confPsw').hide();
			});
			
		}
	})
	// psw.init();
//})
$(function(){
	//console.log(role)
	psw.init();	
})