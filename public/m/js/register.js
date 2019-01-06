$(function(){
    
    $(".btn-register").on("tap",function(){

        var phone = $(".phone").val()
        var phoneY = /^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}$/.test(phone)  
        var userName = $(".userName").val()
        var password = $(".password").val()
        var passWord = $(".passWord").val()
        var yanzhen = $(".yanzhen").val()
           
        // if(!phoneY){
        //     mui.toast("手机号码不合法",{ duration:500, type:'div' })
        //     return false
        // }
        
        if(password!=passWord){
            mui.toast("两次密码不一致",{ duration:500, type:'div' })
            return false
        }
        
        $("#main input").each(function(index,ele){
            var text = $(ele).prev().text();         
            if(!$(ele).val()){               
                mui.toast(text+'不能为空',{ duration:'long', type:'div' }) 
                return false
            }
        })

        $.ajax({
            type:"post",
            dataType:"json",
            url:"/user/register",
            data:{
                username:userName,
                password:password,
                mobile:phone,
                vCode:yanzhen
            },
            success:function(obj){
                if(obj.success){
                    location="login.html?returnUrl="+"usercenter.html"
                }else{
                    mui.toast(obj.message,{ duration:'long', type:'div' }) 
                }
                
            }
        })



    })

    $(".btn-yanzhen").on("tap",function(){      
        $.ajax({
            type:"get",
            url:"/user/vCode",
            dataType:"json",
            success:function(obj){
                console.log(obj);
                
            }
        })
    })

})