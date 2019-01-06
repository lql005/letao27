$(function(){
    mui('.main-left .mui-scroll-wrapper').scroll({
        indicators: false,
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    mui('.main-right .mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    $.ajax({
        type:"get",
        url:"/category/queryTopCategory",
        dataType:"json",
        success:function(obj){
            console.log(obj);
            var html = template("catepageLeftTpl",obj)
            $(".main-left ul").html(html);
        }
    })

    $(".main-left ul").on("tap","li a",function(){
        var id = $(this).data("id")
        SecondCategory(id);
        
    })
    SecondCategory(1);
    function SecondCategory(id){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategory",
            dataType:"json",
            data:{id:id},
            success:function(obj){
                var html = template("catepageRightTpl",obj);
                if(obj.rows.length>0){
                    $(".main-right .mui-row").html(html)
                }else{
                    $(".main-right .mui-row").html("暂没有此商品")
                }
            }
        })
    }
})