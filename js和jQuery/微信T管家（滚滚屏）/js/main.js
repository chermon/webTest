var $content = $(".content");
var $pages = $content.children("div");
inArr[1]();
var currentPage = 1;
var oldPage;
var lock = false;

//监听鼠标滚轮事件 鼠标向下滑动delta为-1，向上为1
$(document).mousewheel(function(event,delta){

    if(lock) return;
    //阻止默认事件
    event.preventDefault();
    // 备份当前页面以备出场时候用
    oldPage = currentPage;
    
    currentPage -= delta;
    if(currentPage < 1){
        currentPage = 1;
    }
    else if (currentPage > $pages.length){
        currentPage = $pages.length;
    }
    
    if(oldPage != currentPage){
        lock = true;
        //新页面进场
        inArr[currentPage]();
        //旧页面出场
        outArr[oldPage]();

        $content.animate({"top":-100*(currentPage - 1) + "%"},500,"easieEaseInQuint");
    
        setInterval(function(){
            lock = false;
        }, 1500);
    }
});