import axios from 'axios'

// 请求超时时间
axios.defaults.timeout = 10000;
// post的请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 配置请求拦截器
axios.interceptors.request.use((config)=>{
    return config;
}, (error)=>{
    return Promise.error(error);
});

// 配置响应拦截器
axios.interceptors.response.use((response)=>{
    // 过滤
    if(response.status === 200){
        return Promise.resolve(response.data);
    }else {
        return Promise.reject(response.data);
    }

}, (error)=>{
    console.log(error);
});

export default function ajax(url = '', params = {}, type = 'GET') {
    // 0. 变量
     let promise;
    // 1. 返回promise
    return new Promise((resolve, reject)=>{
         // 1.1 判断请求的类型
        if(type.toUpperCase() === 'GET'){ // get请求
            // 添加随机时间戳, 去除缓存
            params['itlike'] = randomCode(20);
            promise = axios({
                url,
                params
            })
        }else if(type.toUpperCase() === 'POST'){ // post请求
            promise = axios({
                method: 'post',
                url,
                data: params
            })
        }

        //  1.2 处理结果并返回
        promise.then((response)=>{
            resolve(response);
        }).catch((error)=>{
            reject(error);
        })
    });
}

/*
  生成指定长度的随机数
*/
function randomCode(length) {
    const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let result = '';
    for (let i=0; i<length; i++){
        let index = Math.ceil(Math.random()*9);
        result += chars[index];
    }
    return result;
}


// export default function ajax(url = '', params = {}, type = 'GET'){
//    let promise = new Promise(function (resolve, reject){

//     //判断请求类型
//     if (type.toUpperCase() === "GET"){ // get请求
//         let paramsStr = '?';
//         // for (const key in params) {
//         //     paramsStr = paramsStr + key + "=" + params[key] + "&";
//         // }
//         //遍历 拼接字符串
//        Object.keys(params).forEach(key => {
//         paramsStr += key + '=' + params[key] + '&';
//        });
    
//        let newParamsStr = paramsStr.substr(0, paramsStr.length);

//        //发起get请求
//        axios.get(url+newParamsStr).then( response => {
//            resolve(response.data);
//        }).catch(err => {
//            reject(err);
//        });
//     }
//     else if(type.toUpperCase() === 'POST'){ //post请求
//         //发起post请求
//         axios.post(url,params).then(response => {
//             resolve(response.data);
//         }).catch(err => {
//             reject(err);
//         });
//     }   
//    });

//    return promise;
// }