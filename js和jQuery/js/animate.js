/*
 * animateFun函数是动画封装函数
 * @para0 obj:运动对象
 * @para1 targetJson:运动的终点状态，可以写px,也可以不写
 * @para2 allTime:运动总时间，单位为毫秒
 * @para3 bufferType:缓冲描述词 （可选）
 * @para4 callBack:回调函数 （可选）
 * return 本函数没有返回值
*/
function animateFun(obj, targetJson, allTime, bufferType, callBack){

    if(arguments.length < 3 || typeof(arguments[0]) != "object" || typeof(arguments[1]) != "object" || typeof(arguments[2]) != "number"){
        throw new Error("对不起，你传进来的参数数量不对或者参数类型不对，请仔细检查哦！");
        return;
    }
    else if(arguments.length == 3){
        bufferType = "Linear";
        callBack = null;
    }
    else if(arguments.length == 4){
        //用户只传进来4个参数，第4个参数可能传进来的是缓冲字符串，也可能是callback
        switch ( typeof(arguments[3])){
            case "string":
                callBack = null;
                break;
            case "object":
                callBack = arguments[3];
                arguments[3] = "Linear";
                break;
            default : 
				throw new Error("抱歉，第4个参数要么是缓冲描述词，要么是回调函数，请检查！");
        }
    }

    //用于存放初始化状态
    var originJson = {};
    //用于存放变化量
    var deltaJson = {};
  
    //当前帧编号
    var frameNumber = 0;
    
    //动画间隔要根据不同浏览器来设置：
	if(window.navigator.userAgent.indexOf("MSIE") != -1){
		var interval = 50;	
	}else{
		var interval = 10;
    }
    
    //强行给我们的动画元素增加一个isanimated的属性，是否正在运动
    obj.isAnimated = true;
    //最大帧编号
    var maxFrameNumber = allTime/interval;

    for(var k in targetJson){
        //初始化json状态
        originJson[k] = parseFloat(_fetchComputedStyle(obj, k));
        //把每个targetJSON中的值都去掉px
        targetJson[k] = parseFloat(targetJson[k]);
        //变化量JSON
        deltaJson[k] = targetJson[k] - originJson[k];
    }

    var time = setInterval(function (){
        for(var k in targetJson){
            //state表示这一帧所处的位置状态
            var state = Tween[bufferType](frameNumber, originJson[k], deltaJson[k],maxFrameNumber);
            if (k == "opacity"){
                obj.style[k] = state;
                obj.style["filter"] = "opacity(opacity="+ state * 100 +")";
            }
            else{
                obj.style[k] = state + "px";
            }
        }

        //记录下次的帧编号
        frameNumber++;
        if(frameNumber > maxFrameNumber){
            // 到达次数后强行拉到targetJSON那个位置
            for(var k in targetJson){
                if (k == "opacity"){
                    obj.style[k] = targetJson[k];
                    obj.style["filter"] = "opacity(opacity="+ targetJson[k] * 100 +")";
                }
                else{
                    obj.style[k] = targetJson[k] + "px";
                }
            }

            //停止计时器
            clearInterval(time);
            //设置isAnimated为false，以待接收下一次运动
            obj.isAnimated = false;
            //调用回调函数，并让这个回调函数中的this指代该运动对象
            callBack && callBack.apply(obj);
            
        }

    },interval);
}

//计算后样式
function _fetchComputedStyle(obj, property){
    if(window.getComputedStyle){//高级浏览器
        //将字符串转为css样式
        property = property.replace(/([A-Z])/g,function (match, $1){
            return "-" + $1.toLowerCase();
        });

        return window.getComputedStyle(obj)[property];
    }
    else{
        //将字符串转为驼峰命名法
        property = property.replace(/\-([a-z])/g,function (match, $1){
            return $1.toUpperCase();
        });

        return obj.currentStyle[property];
    }
}

 //缓冲的各种公式
 var Tween = { 
    Linear: function(t, b, c, d) {
        return c * t / d + b;
    },
    //二次的
    QuadEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    QuadEaseOut: function(t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    QuadEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    //三次的
    CubicEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    CubicEaseOut: function(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    CubicEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    //四次的
    QuartEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    QuartEaseOut: function(t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    QuartEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    QuartEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    QuartEaseOut: function(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    QuartEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    //正弦的
    SineEaseIn: function(t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    SineEaseOut: function(t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    SineEaseInOut: function(t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    ExpoEaseIn: function(t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    ExpoEaseOut: function(t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    ExpoEaseInOut: function(t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    CircEaseIn: function(t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    CircEaseOut: function(t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    CircEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    ElasticEaseIn: function(t, b, c, d, a, p) {
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    ElasticEaseOut: function(t, b, c, d, a, p) {
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
    },
    ElasticEaseInOut: function(t, b, c, d, a, p) {
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    //冲过头系列
    BackEaseIn: function(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    BackEaseOut: function(t, b, c, d, s ) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    BackEaseInOut: function(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    //弹跳系列
    BounceEaseIn: function(t, b, c, d) {
        return c - Tween.BounceEaseOut(d - t, 0, c, d) + b;
    },
    BounceEaseOut: function(t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    BounceEaseInOut: function(t, b, c, d) {
        if (t < d / 2) return Tween.BounceEaseIn(t * 2, 0, c, d) * .5 + b;
        else return Tween.BounceEaseOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
};