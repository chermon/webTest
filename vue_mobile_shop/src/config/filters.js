import Vue from 'vue'

// 全局过滤器 - moneyFormat ：将参数保留两位数并转换为人民币输出
Vue.filter('moneyFormat',(value)=>{
    return '￥' + Number(value).toFixed(2);
});