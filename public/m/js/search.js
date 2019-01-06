

$(function(){
    var arr = [];
    $(".searchBtn").on("tap",function(){  
        arr = localStorage.getItem("searchHistory");
        arr = JSON.parse(arr)||[];    
        // console.log(arr);
        // 获取搜索框内容,并且取掉前后空格;
        var searchText = $(".searchText").val().trim()
        if(searchText){ 
            if(arr.indexOf (searchText)!=-1){
                arr.splice(arr.indexOf(searchText),1);
            }
            arr.unshift(searchText);
            arr = JSON.stringify(arr)
            localStorage.setItem("searchHistory",arr);
            $(".searchText").val("");
            searchHistory()
        }else{
            mui.toast('请输入内容',{ duration:'long', type:'div' }) 
        }
        // var  parameter = 'key='+searchText+'&time='+new Date()+'';
        var  parameter = 'time='+new Date()+'&key='+searchText+'';
        location = 'productlist.html?'+encodeURI(parameter);
    })
    //获取历史搜索记录,并渲染,之后返回记录数据
    
    function searchHistory(){
        arr = localStorage.getItem("searchHistory");
        arr = JSON.parse(arr)||[];
        var html = template("searchTpl",{rows:arr});
        $(".mui-card-content ul").html(html)  
        // return arr 
    }
    searchHistory()
    //清空本网站单个本地存储
    $(".mui-card-content ul").on("tap","li .closeHistory",function(){
        // var arr=searchHistory()
        var index =$(this).data("index");
        arr.splice(index,1);
        arr = JSON.stringify(arr)
        localStorage.setItem("searchHistory",arr);
        searchHistory()
        // console.log(searchHistory());
    })
    //清空本网站所有本地存储
    $(".closeHistoryAll").on("tap",function(){
        localStorage.remove("searchHistory");
        searchHistory();
    })
    $(".searchBottom .mui-table-view").on("tap","li",function(){
        var searchText = $(this).data("search-text");
        var  parameter = 'time='+new Date()+'&key='+searchText+'';
        location = 'productlist.html?'+encodeURI(parameter);
    })
})