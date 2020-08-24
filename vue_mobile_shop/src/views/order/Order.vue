<template>
    <div id="order">
        <van-nav-bar
          title="填写订单"
          left-arrow
          @click-left="onClickLeft"
        />

        <!-- 联系人卡片 -->
        <van-contact-card
          :type="cardType"
          add-text='选择收货地址'
          :name="address_name"
          :tel="address_phone"
          @click="chooseAddress"
          style="margin-top:1rem"
        />
        <van-cell-group style='margin-top:0.5rem;'>
          <van-cell title='送达时间' is-link value='请选择送达时间'/>
          <van-cell value='供3件商品' is-link center>
            <template #title>
              <img class='goodsImgBg' src='./images/detail1.jpg'/>
              <img class='goodsImgBg' src='./images/detail1.jpg'/>
            </template>
          </van-cell>
        </van-cell-group>
        <van-cell-group style='margin-top:0.5rem;'>
          <van-cell title='支付方式' value='微信'></van-cell>
        </van-cell-group>
        <van-cell-group style='margin-top:0.5rem;'>
          <van-cell title='备注'>
            <input type='text' style="text-align: right;border:none;" placeholder="备注您的特殊需求">
          </van-cell>
        </van-cell-group>
        <van-cell-group style='margin-top:0.5rem;'>
          <van-cell title='商品金额' value='￥50.50'></van-cell>
          <van-cell title='配送费' value='￥0.00'></van-cell>
        </van-cell-group>
        <van-submit-bar style='position:fixed;left:0;bottom:0;' :price="3050" label='实付' button-text="提交订单" @submit="onSubmit" />
        <router-view></router-view>
    </div>

</template>

<script>
// 1. 通知组件
import { PubSub} from 'pubsub-js';

export default {
    name: "Order",
    data() {
       return {
         // - 地址
         chosenContactId: null,//地址id
         address_name: null, // 收货人
         address_phone: null, // 收货人电话
         address_id: null, // 收货人地址ID

         editingContact: {},
         showList: false,
         showEdit: true,
         isEdit: false,
        
       };
    },
    computed: {
      //卡变类型
       cardType() {
         return this.chosenContactId !== null ? 'edit' : 'add';
       },
   
      //  currentContact() {
      //    const id = this.chosenContactId;
      //    return id !== null ? this.list.filter((item) => item.id === id)[0] : {};
      //  },
    },
    methods: {
        // 返回上一级
        onClickLeft() {
           this.$router.back();
        },
        
        // - 选择收货地址
        chooseAddress(){
            this.$router.push('/order/myAddress');
        },
        // - 提交订单
        onSubmit(){

        }
    },
    mounted(){
      PubSub.subscribe('pub-address',(msg, addressItem) => {
        if (msg === 'pub-address') {
          this.chosenContactId = addressItem.address_id;
          this.address_name = addressItem.name;
          this.address_phone = addressItem.tel;
        }
      });
    },
    beforedestrory(){

    }
}
</script>

<style lang="less" scoped>
#order{
    // position: relative;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
}
.goodsImgBg{
  display: inline-block;
  height: 2.5rem;
  
}
</style>