var inArr = [null,function (){},function (){},function (){},function (){},function (){},function (){},function (){}];
var outArr = [null,function (){},function (){},function (){},function (){},function (){},function (){},function (){}];

//首页数据是否准备好
var already = false;

inArr[1] = function (){
    //如果已经加载好了首屏的所有图片
    if(already){
        updateUI();
        //后面语句不执行了
		return;
    }

    var $page1Content = $(".page1 .inner_c");
    // 资源文件
    var resourse = [
        {
            "imgSrc": "images/b1_01.png",
            "imgClass": "b1_01"
        },
        {
            "imgSrc": "images/b1_02.png",
            "imgClass": "b1_02"
        },
       {
           "imgSrc": "images/b1_03.png",
           "imgClass": "b1_03"
       },
       {
           "imgSrc": "images/b1_03_btn.png",
           "imgClass": "b1_03_btn"
       },
       {
        "imgSrc": "images/b1_04.png",
        "imgClass": "b1_04"
       },
    ];
    var allNum = 0;
    for(var i = 0; i < resourse.length; i++){
        var img = new Image();
        img.src = resourse[i]["imgSrc"];
        img.className = resourse[i]["imgClass"];
        img.onload = function (){
            allNum++;
            //将加载好的这个图片转为jQuery对象，然后添加到DOM树上
            $(this).hide().appendTo($page1Content);
            if(allNum == resourse.length){
                already = true;
                updateUI();
            }
        }
    }

    function updateUI (){
        // 龙卷风
       $(".page1 .b1_02").show().css({"margin-left":"-100px","opacity":0}).animate({"margin-left":0,"opacity":1},1000);
       //标题
       $(".page1 .b1_03").show()
       .css({"margin-right":"-100px","opacity":0})
       .animate({"margin-right":0,"opacity":1},1000);
       //按钮
       $(".page1 .b1_03_btn").show()
       .css({"margin-right":"-100px","opacity":0})
       .animate({"margin-right":0,"opacity":1},1000);

       //石头
       $(".page1 .b1_04").delay(1000).fadeIn();
       // 云
       $(".page1 .b1_01").delay(1000).fadeIn();
    
    }
}
outArr[1] = function (){
     $(".page1 img").fadeOut();
}

inArr[2] = function (){
    $(".page2 .b2_01").hide().css({"margin-left":"-100px","margin-top":"100px"}).show().animate({"margin-left":0,"margin-top":0},1000);
    $(".page2 .ballon").each(function (i){
        $(this).delay(i*200).fadeIn();
    });
}
outArr[2] = function (){
    $(".page2 img").fadeOut();
}

inArr[3] = function (){
    console.log("进来了~~");
    $(".page3 .b3_01").show().velocity({"rotateZ": "0deg"},0).delay(500).velocity({"rotateZ":"360deg"},1000);
    $(".page3 ul li").show().velocity({"margin-top":-25,"left":"50%"},0).velocity("reverse",1000);
}
outArr[3] = function (){
    $(".page3 img").fadeOut();
    $(".page3 ul li").fadeOut();
}

