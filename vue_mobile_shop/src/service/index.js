import ajax from './ajax'

// 1. 定义基础路径
// const BASE_URL = 'http://demo.itlike.com/web/xlmc';
const BASE_URL = '/api';

//首页
export const getHomeData = () => ajax(BASE_URL + '/api/homeApi');
// 分类
export const getCategaryData = () => ajax(BASE_URL + '/api/homeApi/categories')
//分类详情
export const getCategaryDetailData = (id) => ajax(BASE_URL + '/api/homeApi/categoriesdetail'+id);
//获取短信验证码
export const getVerityCodeData = (phone) => ajax(BASE_URL + '/api/send_code',{phone});