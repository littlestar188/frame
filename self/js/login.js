
$(function () {
  var login = {
    ajaxUrlheader:"http://127.0.0.1:8080",
    localHeader:"http://192.168.0.15:80",//本地服务器 必须是localhost
    result:{},
    navData:{},
    name:"",
    password:"",
    code:"",
    back:"",
    message:"",
    init:function(){
      var that=this;
      $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
      });
      this.name = $(".username").val();
      this.password = $(".password").val();
      this.code = $(".incode").val();

      console.log(this.password,this.name,this.code);        
      this.imgCode();
      this.checkBlank();
      this.pageChange();
      this.keyReturn();

    },
    infoCheck:function(){
      var that = this;
      //console.log(this.name);//有
      $.ajax({
        url:'/manage/user/login',
        //url:'self/js/user.json',
        type:"post",
        timeout:1000,//设置超时时间
        cache:false,
        async:false,
        dataType:"json",
        data:{
          userName:this.name,
          passWord:this.password,
          checkCode:this.code           
        },
        success:function(res){
          console.log(res); 
          //return res;
          that.result = res;        
        },
        error:function(XMLHttpRequest, textStatus,errorThrown){
          if(textStatus == 'timeout'){
            confirm('请求超时');
          }else{
            console.log('login/'+textStatus+'----------后台报错')
          }
          
        }
      
      })
       
    },
    //验证码生成
    imgCode:function(){
      var that = this;
      //var num = Math.random();
      $('.imgCheckCode').click(function(){
       $('.imgCheckCode').attr('src', that.ajaxUrlheader+'/checkCode?');
      // alert(1);
      //return num
      //consle.log(num);
      });
    },
    //页面跳转
    pageChange:function(){
      //判断信息是否正确
      //0 正确 1 错误 
      var that = this;     
      $('.login').click(function(){
        that.callback();       
      });
     
    },
    keyReturn:function(){
      var that = this;
      document.onkeydown = function(event){
        event = event || window.event;
        if(event.keyCode == 13 || event.which == 13){
          that.callback();
        }
      }
    },
    callback:function(){
       this.infoCheck();
       if( this.result.returnCode == 0 ){
         $(this).removeAttr('disabled',"true");
         //延迟跳转页面           
          window.setTimeout(window.location.href = this.localHeader+"/frame/index.html",10000);//index.html
          //that.getNav();
       }else{
          this.errorInfo(this.result.message);
          $(this).attr('disabled',"true");
        }      
    },
    //报错信息提示
    errorInfo:function(message){
      //console.log(this.message);

      if(message == "0"){
        $(".username").parent().children('.error').html('账号不存在').show();
      }
      if(message == "2"){
        $(".password").parent().children('.error').html('用户名或密码错误').show();
      }
      if(message == "1"){
        $(".error").parent().children('.error').html('验证码错误').show();
      }
      if(message == "3"){
        $(".username").parent().children('.error').addClass('codeRed').html('用户名或密码错误不能为空').show();
        $(".username").parent().children('.warn').hide();
      }
      
    },
    //验证是否为空
    checkBlank:function(){
      var that = this;
      var reg = /^[\d]{4}$/;
      $('.login-box-body').on('blur','input',function(){ 
      
      if($(this).hasClass('username')){
        that.name = $(this).val();

      }        
      if($(this).hasClass('password')){
        that.password = $(this).val();
      }
      if($(this).hasClass('incode')){
        that.code = $(this).val();
        //console.log(reg.test(that.code),that.imgCode())

        if(reg.test(that.code) == 0 || that.code == ""/*|| that.code !== that.imgCode()*/){
          $(this).attr('placeholder','');
          $(this).addClass('codeRed');
          $('.error').hide();
          $('.coderror').show();
        }else{
          $('.coderror').attr('placeholder','验证码');
          $('.incode').removeClass('codeRed');
          $('.coderror').hide();
          $(this).next().hide();
        }
        
      }    
        console.log(that.password,that.name,that.code);
        var cname = $(this).attr('class');              
        if(that.name == ""|| that.password == ""){
         
         //  if(cname.indexOf('incode') !== -1){
         //   console.log(cname.indexOf('incode'))

             // $(this).attr('placeholder','');
             // $(this).addClass('codeRed');
             // $('.coderror').show();
         //   // console.log($(this).parents().eq(1));
         // }else{

            $(this).next().show();
            $('.error').hide();
            $(this).parent().siblings().children('.warn').hide();
            
        // }         
        }
      });

       $('.login-box-body').on('focus','input',function(){

          $('.coderror').attr('placeholder','验证码');
          $('.coderror').removeClass('codeRed');
          $('.coderror').hide();

         
          $('.warn').hide();
          $('.error').hide(); 
                                                        
      });
    }
    
  }

  login.init();

});


  
