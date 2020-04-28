(function(){
    //给window增加一个变量
    var myAjax = window.myAjax = {};

    // -  url：路径  param：请求参数  callBack：回调函数
    myAjax.get = function (url, param, callBack){
        //创建xhr对象，并解决兼容问题
        var xhr;
        if (window.XMLHttpRequest){//高级浏览器
            xhr = new XMLHttpRequest();
        }
        else if (window.ActiveXObject){//兼容IE6 or older
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        // readyState
        // 0:UNSET 即请求还未配置也就是open还未调用 
        // 1:OPENED 已调用send() 
        // 2:HEADERS_RECEIVED 头部已被服务器接收 
        // 3:LOADING 开始接收服务器返回的数据，但还没接收完
        // 4:DONE 完成
        xhr.onreadystatechange = function (){
            if(xhr.readyState == 4){ 
                //网络状态码：一般以1开头的都属于消息信息 2开头的代表一些成功信息 3开头代表重定向 4开头请求错误 5开头服务器错误
                //200代表成功， 304代表页面未被修改（刷新）
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
                    callBack(null,xhr.responseText);
                    //注意：data此时是个字符串，所以需要将字符串转换为json
                    //转为json的三种方法：
                    //1：eval("(" + data + ")"); //eval可以识别字符串并把字符串当做js语句来执行
                    //2：new Function ("return" + data)();
                    //3: JSON.parse(data)； 字符串转为json ，此方法IE6、7不兼容 ， JSON.stringify() JSON → 字符串
                }
                else{
                    callBack(new Error("服务器错误，请联系管理员！"),undefined);
                }
            }
            
        };

        //xhr对象配置一个请求，参数1：请求类型，参数2：路径，参数3：是否是异步
        xhr.open("get",url + "?" + myAjax._queryjsonToQueryString(param),true);

        //发送请求，get时参数为null,post时为传进来的参数
        xhr.send(null);

    };

    myAjax.post = function (url, param, callBack){
        //创建xhr对象并解决兼容问题
        var xhr;
        if(window.XMLHttpRequest){
            xhr = new XMLHttpRequest();
        }
        else if(window.ActiveXObject){
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        //xhr对象的就绪状态发生改变时触发
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4){
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
                    callBack(null,responseText);
                }
                else{
                    callBack(new Error("网络故障，请联系管理员！", undefined));
                }
            }
        }

        xhr.open("post",url,true);
        //网络请求都是一段一段传输，如果用post请求数据量过大会造成服务器接收数据不完整，所以需要将post请求模拟成表单提交
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        //发送请求
        xhr.send(myAjax._queryjsonToQueryString(param));
    };

    // - 为了安全，所有的服务器对来自其它服务器的XHR类型的HTTP请求，不予应答。浏览器也不予发送前往不同服务器的XHR类型请求.
    // - jsonp解决了Ajax不能跨域的问题
    // - jsonp利用的原理就是：初始化放在文件内部，调用放在外部文件中，故调用时要将引入的文件放在初始化代码的下面。
    // - 正常思维逻辑：初始化在外部文件中，调用在内部文件中
    // - 此处封装的jsonp就是将拧巴的jsonp再拧巴回来形成一个正向变成的思想，主要实现的功能如下：
    // - 1.关联函数（初始化函数关联到window上）
    // - 2.创建<script>节点  -->  增加节点到dom上
    // - 3.设置src属性，启动http请求
    // - 4.删除节点（请求完成节点删除）
    // - url:请求链接  param:请求参数  callBackName：将初始化函数（即回调函数）关联到window上  callBack：初始化函数（即回调函数）
    myAjax.jsonp = function (url, param, callBackName, callBack){
        //将初始化函数关联到window上
        window[callBackName] = callBack;
        //创建script节点
        var scriptNode = document.createElement("script");
        //将script节点增加到dom上
        document.body.appendChild(scriptNode);
        //设置src属性，开始HTTP请求
        scriptNode.src = param ? url + "?" + myAjax._queryjsonToQueryString(param) : url;
        //删除script标签
        document.body.removeChild(scriptNode);
        //删除刚刚给系统增加的函数
        delete(window[callBackName]);

    };

    // - 将json转换为用&连接的字符串
    myAjax._queryjsonToQueryString = function (json){
        var dataArr = [];
        for (var key in json) {
            //为了防止传中文服务器错乱，一般用encodeURIComponent函数将中文转换成URI标准字符
            dataArr.push(key + "=" + encodeURIComponent(json[key]));
        }
        return dataArr.join("&");
    };

})();