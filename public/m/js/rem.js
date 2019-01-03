function resize(){
    var html = document.documentElement;
    var layout = html.offsetWidth;
    // console.log(layout);
    html.style.fontSize = layout/7.5+"px";
    // console.log(html.style.fontSize );
    
}

resize();
window.addEventListener("resize",resize);