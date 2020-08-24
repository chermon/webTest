import ajax from './ajax'

// 1. 定义基础路径
const BASE_URL = 'http://demo.itlike.com/web/xlmc';
// const BASE_URL = '/api';

//首页
export const getHomeData = () => ajax(BASE_URL + '/api/homeApi');
// 分类
export const getCategaryData = () => ajax(BASE_URL + '/api/homeApi/categories')
//分类详情
export const getCategaryDetailData = (id) => ajax(BASE_URL + '/api/homeApi/categoriesdetail'+id);
//获取短信验证码
export const getVerityCodeData = (phone) => ajax(BASE_URL + '/api/send_code', {phone});
//手机验证码登录 - POST
export const getLoginByCodeData = (phone, code) => ajax(BASE_URL + '/api/login_code', {phone, code}, 'POST');
//用户名密码登录 - POST
export const getLoginUserPwdData = (user_name, user_pwd, captcha) => ajax(BASE_URL + '/api/login_pwd', {user_name, user_pwd, captcha}, 'POST');
//自动登录
export const getAutoLoginData = () => ajax(BASE_URL + '/api/userinfo');
//退出登录
export const getLogoutData = () => ajax(BASE_URL + '/api/logout');

// 2. 购物车相关的接口
// 2.1 增加商品 - POST
export const getAddGoodsToCartData = (user_id, goods_id, goods_name, goods_price, small_image) => ajax(BASE_URL + '/api/cart/add', {user_id, goods_id, goods_name, goods_price, small_image}, 'POST');
// 2.2 获取购物车数据
export const getSearchCartData = (user_id) => ajax(BASE_URL + '/api/cart/search/' + user_id);
// 2.3 修改购物车商品数量 - POST
export const getUpdateGoodsNumData = (user_id, goods_id, type) => ajax(BASE_URL + '/api/cart/num', {user_id, goods_id, type}, 'POST');
// 2.4 删除购物车数据
export const getDeleteCartData = (user_id) => ajax(BASE_URL + '/api/cart/clear/' + user_id);
// 2.5 单个商品的选中和取消选中 - POST
export const getSingleGoodsSelectedData = (user_id, goods_id) => ajax(BASE_URL + '/api/cart/singer_select', {user_id, goods_id}, 'POST');
// 2.6 所有商品的选中和取消选中 - POST
export const getAllGoodsSelectedData = (user_id, flag) => ajax(BASE_URL + '/api/cart/all_select', {user_id, flag} ,'POST');
// 2.7 查询所有已经被选中的商品
export const getSearchAllSelectedGoodsData = (user_id) => ajax(BASE_URL + '/api/cart/selected/' + user_id);
// 2.8 删除已经生成订单的商品
export const getDelCheckedGoodsData = (user_id) => ajax(BASE_URL + '/api/cart/del_checked/' + user_id);

// 3. 地址相关的接口
// 3.1 获取当前用户收货地址
export const getUserAddressData = (user_id) => ajax(BASE_URL + '/api/address/search/' + user_id);
// 3.2 添加用户收货地址
export const getAddUserAddressData = (user_id, address_name, address_phone, address_area, address_area_detail,
    address_post_code, address_tag, province, city, county, areaCode) => ajax(BASE_URL + '/api/address/add', {user_id, address_name, address_phone, address_area, address_area_detail,
        address_post_code, address_tag, province, city, county, areaCode}, 'POST');
// 3.3 获取修改用户信息
export const getUpdateUserAddressData = (user_id, address_id) => ajax(BASE_URL + '/api/address/one', {user_id, address_id}, 'POST');
// 3.4 修改用户地址
export const getEditUserAddressData = (address_id, user_id, address_name, address_phone, address_area, address_area_detail,
    address_post_code, address_tag, province, city, county, areaCode) => ajax(BASE_URL + '/api/address/edit',{address_id,user_id, address_name, address_phone, address_area, address_area_detail,
        address_post_code, address_tag, province, city, county, areaCode}, 'POST');
// 3.5 删除用户地址
export const getDeleteUserAddressData = (address_id) => ajax(BASE_URL + '/api/address/del/' + address_id);

// 4. 订单相关的接口
// 4.1 提交订单
export const getSubmitOrderData = (user_id, address_id, arrive_time, cart_shop, notice, shop_price, dis_price) => ajax(BASE_URL + '/api/order/post', {user_id, address_id, arrive_time, cart_shop, notice, shop_price, dis_price}, 'POST');
// 4.2 订单支付成功


