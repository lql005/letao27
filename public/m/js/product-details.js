$(function () {
    var id = getPrarmeter("id")
    $.ajax({
        type: "get",
        url: "/product/queryProductDetail",
        dataType: "json",
        data: {
            id: id
        },
        success: function (obj) {

            var min = obj.size.split("-")[0];
            var max = obj.size.split("-")[1];
            var size = []
            for (var i = min; i <= max; i++) {
                size.push(i)
            }
            obj.size = size;
            console.log(obj);

            var html = template("product-details", obj);
            $("#main").html(html);


            //轮播初始化
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
            });
            //区域滚动初始化
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                indicators: false, //是否显示滚动条
            });


            mui(".mui-numbox").numbox()


            $(".product-size").on("tap",function(){
                $(this).addClass("mui-btn-warning").siblings().removeClass("mui-btn-warning");
            })
        }
    })
    
  

    $(".add-cart").on("tap",function(e){
        var size = $(".product-size.mui-btn-warning").data("btn-size");
        if(!size){
            mui.toast('请选择尺码',{ duration:'long', type:'div' }) 
            return false;
        }
        
        var num = $(".product-num").val();
        if(num==0){
            mui.toast('请选择数量',{ duration:'long', type:'div' }) 
            return false;
        }
        
        $.ajax({
            type:"post",
            url:"/cart/addCart",
            dataType:"json",
            data:{
                productId:id,
                num:num,
                size:size
            },
            success:function(obj){
                
                if(obj.error==400){
                    //跳转到登陆页面
                    location="login.html?returnUrl="+location.href;
                }else{
                    location="cart.html?productId="+id+"&num="+num+"&size="+size+""
                }
            }
        })
        
    })













    //获取想要的传递过来的参数
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
    //轮播初始化
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
    });
    //区域滚动初始化
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false, //是否显示滚动条
    });
})