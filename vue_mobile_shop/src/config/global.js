export const handleBackTopAtion = (callBack) => {
    // 1.卷动对象
    let docTop = document.documentElement || document.body;
    let oldDocTop,requestFrame;
    /**
     *  addEventListener(type, listener,{
     *     capture: false,
     *     passive: false,
     *     once: false
     *  })
     *  DOM 新规范：第三个参数可以是一个对象了，即三个属性都是布尔类型，默认值为false,
     *  capture 属性等价于以前的 useCapture 参数
     *  once 属性就是表明该监听器是一次性的，执行一次后就被自动 removeEventListener 掉，还没有浏览器实现它
     *  passive: 属性值为true时表示不阻止默认事件.首先监听器是先执行监听事件，然后再去执行默认行为。
     *  所以浏览器在监听器中执行默认事件是非常耗时的，而且大多数监听器是不会阻止默认行为的，不然页面就会静止了。如果一个
     *  浏览器知道监听器是passive的，它就会在两个线程中同时执行监听器中js代表和浏览器的默认行为。注意：
     *  若在同一个Dom对象身上增加同一类型事件的监听器，只要有一个不是passive的，那浏览器就无法被优化
     * 
     * */ 
    // 2.滚动的监听事件
    document.addEventListener('scroll', () =>{
        judgeBackTopBtnState();
    },false);

    //触摸的监听事件 在监听事件中第三个参数{passive:true}可以不阻止游览器的默认事件，优化浏览器的性能。
    // 3.触摸开始
    document.addEventListener('touchstart', () =>{
        judgeBackTopBtnState();
    },{passive:true});

    // 4.触摸移动
    document.addEventListener('touchmove', () => {
        judgeBackTopBtnState();
    },{passive:true});

    // 5.触摸结束
    document.addEventListener('touchend', () => {
        //requestAnimationFrame 根据浏览器刷新屏幕的帧频率调用回调函数
        requestFrame = requestAnimationFrame(() => {
            oldDocTop = docTop.scrollTop;
            moveEnd();
        });
    },{passive:true});

    const moveEnd = () => {
        console.log('当前卷动值：'+ docTop.scrollTop + '，旧卷动值：' + oldDocTop);
        if(docTop.scrollTop !== oldDocTop){
            oldDocTop = docTop.scrollTop;
            moveEnd();
        }
        else{
            cancelAnimationFrame(requestFrame);
        }
        judgeBackTopBtnState();
    }

    //根据卷动值改变置顶按钮的状态
    function judgeBackTopBtnState(){
        if (docTop.scrollTop > 200){
            callBack(true);
        }
        else{
            callBack(false);
        }
    }
}

/**
 *  本地化存储
 * 
 * */ 
export const setStore = (key, value) => {
    if (!key) return;
    if (typeof(value) !== 'string'){
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(key, value);
}

/**
 *  获取本地化
 * 
 * */ 
export const getStore = (key) => {
    if (!key) return;
    return window.localStorage.getItem(key);
}

/**
 *  删除本地化
 * 
 * */ 
export const removeStore = (key) => {
    if (!key) return;
    return window.localStorage.removeStorage(key);
}