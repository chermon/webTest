<template>
    <div id="mine" v-if="userInfo.token">
        <van-nav-bar
          style="background-color:#3bba63;"
          :fixed=true
          :border=false
        />
        <van-cell-group style="margin-top:2.3rem;">
            <van-cell 
                class="myMsg" 
                is-link 
                :center=true 
                style="background-color:#3bba63;color:#FFF;"
                @click="$router.push('/baseboard/mine/userCenter')"
            >
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                    <div class="myInfo">
                        <img class="myPhoto" :src="userInfo.icon_url" alt="">
                        <div class="myIntroduction">
                            <span>{{userInfo.real_name}}</span>
                            <span>微信：{{userInfo.phone}}</span>
                        </div>
                    </div>
                </template>
            </van-cell>
        </van-cell-group>
        <van-cell-group>
            <van-cell icon="balance-list-o" title="我的订单" is-link value="查看全部订单" />
            <van-grid >
               <van-grid-item v-for="(item,index) in orderData" :key="index" :icon="item.icon" :text="item.title" />
            </van-grid>
        </van-cell-group>
        <van-cell-group style="margin-top:0.5rem;">
            <van-cell icon="cash-on-deliver" title="我的优惠券" is-link value="" />
            <van-cell icon="home-o" title="我的收货地址" is-link value="" />
        </van-cell-group>
        <van-cell-group style="margin-top:0.5rem;">
            <van-cell icon="contact" title="联系客服" is-link value="" />
            <van-cell icon="smile-comment-o" title="意见反馈" is-link value="" />
        </van-cell-group>
        <router-view></router-view>
    </div>
    <SelectLogin v-else></SelectLogin>
</template>

<script>
import {mapState} from 'vuex'

import SelectLogin from './../login/SelectLogin'

export default {
    name: "Mine",
    data:function(){
        return { 
            orderData: [
                {icon: 'after-sale',title:'待支付'},
                {icon: 'logistics',title:'待收货'},
                {icon: 'comment-circle-o',title:'待评价'},
                {icon: 'cash-back-record',title:'售后/退款'}
            ]
        };
    },
    computed:{
        ...mapState(['userInfo'])
    },
    components:{
        SelectLogin
    }
}
</script>

<style lang="less" scoped>
#mine{
    height: 100%;
    background-color: #f5f5f5;
}
.myInfo{
    display: flex;
}
.myInfo .myPhoto{
    width: 3rem;
    height: 3rem;
    border-radius: 1.5rem;
}
.myInfo .myIntroduction{
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
}
.myMsg .van-icon-arrow{
    color: #fff;
    font-size: 1rem;
}
.van-cell__left-icon{
    color: rgb(250, 143, 20);
    font-size: 1.2rem;
}
</style>