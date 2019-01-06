$(function(){
    $(".btn-login").on("click",function(){
        var userName = $(".userName").val();
        if(!userName){
            mui.toast('请输入用户名',{ duration:'long', type:'div' }) 
            return false
        }
        var password = $(".password").val();
        if(!password||password.length<6){
            mui.toast('密码不能为空或者小于6位',{ duration:'long', type:'div' }) 
            return false
        }
        var url = getPrarmeter("returnUrl")
        console.log(url);
        
        $.ajax({
            type:"post",
            url:"/user/login",
            dataType:"json",
            data:{
                username:userName,
                password:password
            },
            success:function(obj){
                console.log(obj);
                
                if(obj.success){
                    location=url;
                }else{
                    mui.toast('用户名或密码错误',{ duration:'long', type:'div' }) 
                }
            }
        })
    })
    $(".btn-register").on("click",function(){
        location="register.html"
    })





    //获取传过来的地址参数
    function getPrarmeter(name) {
        var keysWord = location.search;
        var parameter = "";
        keysWord = keysWord.substr(1);
        keysWord = decodeURI(keysWord)
        var arr = keysWord.split("&")
        arr.forEach(function (item, index) {
            var newarr = item.split("=");
            for (var i = 0; i < newarr.length; i++) {
                if (newarr[0] == name) {
                    parameter = newarr[1]
                }
            }
        })
        return parameter;
    }
})