<template>
    <div id="userCenter">
        <van-nav-bar
          title="用户中心"
          left-arrow
          @click-left="onClickLeft"
        ></van-nav-bar>
        <div class="loginoutBg" @click="logout">
            退出登录
        </div>
    </div>
</template>

<script>
import {getLogoutData} from '@/service/index.js'
import {RESET_USERINFOR,CLEAR_SHOP_CART} from '@/store/mutations-type.js'
import {Toast} from 'vant'

export default {
    methods:{
        onClickLeft(){
            this.$router.back();
        },
        async logout(){
            let result = await getLogoutData();
            if(result.success_code === 200){
                //清除用户信息
                this.$store.commit(RESET_USERINFOR);
                //清楚购物车信息
                this.$store.commit(CLEAR_SHOP_CART);
                Toast({
                    message: '退出登录成功！',
                    duration: 500
                });
            }
        }
    }
}
</script>

<style lang="less" scoped>
 #userCenter{
     position: fixed;
     top: 0;
     left: 0;
     bottom: 0;
     right: 0;
     background-color: #f5f5f5;
     z-index: 200;
 }
 .loginoutBg{
     height: 50px;
     width: 100%;
     margin-top: 20px;
     background: white;
     line-height: 50px;
     text-align: center;
 }
</style>