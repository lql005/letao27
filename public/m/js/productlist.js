$(function () {
    //此函数返回搜索框传过来的参数；
    var obj = {
        page: 1,
        pageSize: 2,
        proName: "",
    }
    //给obj添加上一个proName属性  ,它的值为  上一个页面带过来的   且我们需求的值   
    obj.proName = getPrarmeter("key");
    //页面跳转过来后先用带过来的参数发送一次请求，获取数据
    getProductList()
    //点击当前页面的搜索按钮  重置参数key，在发送请求，获取数据；
    $(".searchBtn").on("tap", function () {
        obj.proName = $(".searchText").val().trim()
        if (obj.proName) {
            getProductList()
            $(".searchText").val("")
        } else {
            mui.toast('请输入内容', {
                duration: 'long',
                type: 'div'
            })
        }
    })
    //给销量  和  价格   添加点击事件
    $(".productList .mui-card-header a").on("tap", function () {
        //价格price
        //销量num
        var con = $(this).data("product-con");
        var sort = $(this).data("sort");
        if (!con) {
            return false;
        }
        sort = sort == 1 ? 2 : 1
        obj = {
            page: 1,
            pageSize: 2,
            proName: obj.proName,
        }
        obj[con] = sort
        getProductList()
        $(this).data("sort", sort)
        //点击变色   和  切换上下图标
        //变色  就是添加类
        $(this).addClass("active").siblings().removeClass("active");
        if (sort == 1) {
            $(this).find("span").removeClass("fa-angle-down").addClass(" fa-angle-up")
        } else {
            $(this).find("span").removeClass("fa-angle-up").addClass(" fa-angle-down")
        }

    })

    //------------封装ajax-------------
    function getProductList() {
        $.ajax({
            type: "get",
            url: "/product/queryProduct",
            data: obj,
            dataType: "json",
            success: function (res) {
                var html = template("productListTpl", res)
                $(".productList .mui-card .mui-card-content .mui-row").html(html)
            }
        })
    }

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



    $(".mui-card-content ").on("tap",".btn-buy",function(){
       var id = $(this).data("product-id")
       
      location="product-details.html?id="+id+"";
    })


    mui.init({
        pullRefresh: {
            container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                callback: function () {

                    setTimeout(function () {
                        obj.page = 1
                        getProductList()
                        mui('#refreshContainer').pullRefresh().endPulldownToRefresh()
                        mui('#refreshContainer').pullRefresh().refresh(true);

                    }, 500)

                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            up: {
                callback: function () {
                    setTimeout(function () {
                        obj.page++
                        $.ajax({
                            type: "get",
                            url: "/product/queryProduct",
                            data: obj,
                            dataType: "json",
                            success: function (res) {
                                console.log(res);

                                var html = template("productListTpl", res)
                                $(".productList .mui-card .mui-card-content .mui-row").append(html)
                                if (res.data.length > 0) {
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                                } else {
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                                }

                            }
                        })


                    }, 500)

                }
            }
        }
    });




})