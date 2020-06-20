import axios from 'axios'
import store from '@/store'
import router from '@/router'

export default function axiosInterceptors(){
    // - request 拦截器
    axios.interceptors.request.use(
        config => {
            if (store.state.userToken){
                config.headers.Authorization = store.state.userToken;
            }
            return config;
        }
    )

    // - response 拦截器
    axios.interceptors.response.use(
        response => {
            if(response.status == 200){
                const data = response.data;
                if (data.code == -1){
                    // 登录过期，需要重新登录，并清除vuex的token和localStorage中的token
                    store.commit('gainToken','');
                    localStorage.removeItem('token');
                    // 重新登录
                    router.replace({
                        path: '/login',
                        query: {redirect: router.currentRoute.fullPath} //将目标路由path作为参数，登录成功后跳转到该路由
                    });
                }
                return data;
            }

            return response;
        }
    )

}