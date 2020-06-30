import ajax from './ajax'

// 1. 定义基础路径
const BASE_URL = 'http://demo.itlike.com/web/xlmc';


export const getHomeData = () => ajax(BASE_URL + '/api/homeApi');
export const getTestData = function (){console.log('网络请求~~~进来了')};
export const aaaa = '我是测试';