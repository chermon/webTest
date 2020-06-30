import axios from 'axios'


export default function ajax(url = '', params = {}, type = 'GET'){
   let promise = new Promise(function (resolve, reject){

    //判断请求类型
    if (type.toUpperCase() === "GET"){ // get请求
        let paramsStr = '?';
        // for (const key in params) {
        //     paramsStr = paramsStr + key + "=" + params[key] + "&";
        // }
        //遍历 拼接字符串
       Object.keys(params).forEach(key => {
        paramsStr += key + '=' + params[key] + '&';
       });
    
       let newParamsStr = paramsStr.substr(0, paramsStr.length);
       console.log(newParamsStr);

       //发起get请求
       axios.get(url+newParamsStr).then( response => {
           resolve(response.data);
       }).catch(err => {
           reject(err);
       });
    }
    else if(type.toUpperCase() === 'POST'){ //post请求
        //发起post请求
        axios.post(url,params).then(response => {
            resolve(response.data);
        }).catch(err => {
            reject(err);
        });
    }   
   });

   return promise;
}