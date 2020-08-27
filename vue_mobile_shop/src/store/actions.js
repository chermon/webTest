
import {
    SAVE_USERINFOR,
} from './mutations-type'

import {getStore} from '@/config/global'
import {getAutoLoginData} from '@/service/index.js'

export default {
    // - 获取用户信息
    async gainUserInfo({commit}){
        //从本地获取
        let userInfo = JSON.parse(getStore('userInfo'));
        if(userInfo){
            console.log('我进到本地了');
            commit(SAVE_USERINFOR, {userInfo});
        }
        else{
            console.log('我从服务器中获取');
            //从服务器获取
            let result = await getAutoLoginData();
            console.log(result);
            if(result.success_code === 200){
                commit(SAVE_USERINFOR, {userInfo:result.data});
            }
        }
    }

    
}