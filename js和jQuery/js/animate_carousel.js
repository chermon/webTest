// 名称：第一个动画 - cm
// 版本：1.0
// 用途：运动函数、获取计算后样式


/*
  elem:运动元素对象
  targetJson: 目标样式集合
  time：运动时间
  callBack：回调函数
*/
function animate(elem,targetJson,time,callBack){
    console.log("进来了");
    if(arguments.length < 3 || typeof(arguments[0]) != "object" || typeof(arguments[1]) != "object" || typeof(arguments[2]) != "number"){
        // 要么参数不够，要不数据类型不对
        throw new Error("参数最少输入3个，且前两个是对象型，第三个必须是数字");
    }
    else if(arguments.length == 3){
        callBack == null;
    }
    else{
        switch(typeof(arguments[3])){
            case "string":
            case "number":
                callBack == null;
                break;
            case "function":
            case "object":
                callback = arguments[3];
        }
    }

    //控制节流，能走到这里说明运动正常运行
    elem.isAnimated = true;

    var interval = 10; // 动画间隔
    var cycleCount = time / interval; // 运动周期
    var currentCount = 0; //当前帧编号

    var originalJson = {};
    var stepJson = {};

    for (var k in targetJson) {
        originalJson[k] = parseFloat(fecthCurrentStyle(elem,k));
        //把每个targetJSON中的值都去掉px
        targetJson[k] = parseFloat(targetJson[k]);
        //步长
        stepJson[k] = (targetJson[k] - originalJson[k]) / cycleCount;
    }
    console.log(originalJson);
    console.log(targetJson);
    console.log(stepJson);
    //定时器变量
	var timer;
    timer = setInterval(function(){
        currentCount++;
        for (var k in targetJson) {
            if(currentCount >= cycleCount){
                if (k == "opacity"){
                    elem.style.opacity = targetJson[k];
                    elem.style.filter = "alpha(opacity = " + targetJson[k]*100 +")";
                }
                else{
                    elem.style[k]= targetJson[k] + "px";
                }
                //停止定时器
                clearInterval(timer);
                //运动结束，函数节流的锁可以打开了
                elem.isAnimated = false;
                callBack && callBack.call(elem);
            }else{
                if(k == "opacity"){
                    elem.style.opacity = originalJson[k] + stepJson[k]*currentCount;
                    elem.style.filter = "alpha(opacity = " + (originalJson[k] + stepJson[k]*currentCount)*100 + ")";
                }
                else{
                    elem.style[k] = (originalJson[k] + stepJson[k]*currentCount)+"px";
                    // console.log(elem.style[k]);
                }
            }
        }   
    },interval);
}

function fecthCurrentStyle(obj,property){
    // - 高级浏览器
    if(window.getComputedStyle){
            property = property.replace(/([A-Z])/g,function(match,$1){
            return "-" + $1.toLowerCase();
        });
        return window.getComputedStyle(obj)[property];
    }
    else{
            property = property.replace(/\-([a-z])/g,function(macth,$1){
            return $1.toUpperCase();
        })
        return obj.currentStyle.property;
    }
}