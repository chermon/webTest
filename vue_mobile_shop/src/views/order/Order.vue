<template>
    <div id="order" v-if='goodsList'>
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
          <van-cell title='送达时间' is-link :value='arriveTime' @click="handleTimePopup"/>
          <van-cell :value='`共${goodsAllNum}件`' is-link center @click='enterGoodsDetail'>
            <template #title>
              <img v-for='goods in goodsList.slice(0, 3)' class='goodsImgBg' :src='goods.small_image'/>
            </template>
          </van-cell>
        </van-cell-group>
        <van-cell-group style='margin-top:0.5rem;'>
          <van-cell title='支付方式' value='微信'></van-cell>
        </van-cell-group>
        <van-cell-group style='margin-top:0.5rem;'>
          <van-cell title='备注'>
            <input type='text' style="text-align: right;border:none;" placeholder="备注您的特殊需求" v-model='remarks'>
          </van-cell>
        </van-cell-group>
        <van-cell-group style='margin-top:0.5rem;'>
          <van-cell title='商品金额' :value='`￥${goodsTotalPrice}`'></van-cell>
          <van-cell title='配送费' :value='`￥${deliveryFee}`'></van-cell>
        </van-cell-group>
        <van-submit-bar style='position:fixed;left:0;bottom:0;' :price="goodsTotalPrice*100 + deliveryFee*100" label='实付' button-text="提交订单" @submit="onSubmit" />
        <van-popup v-model="showTimePopup" position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            type="datetime"
            title="选择配送时间"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm='handleDeliveryTime'
            @cancel='handleCancleTime'
          />
        </van-popup>
        
        <router-view></router-view>
    </div>
    <!-- 未得到数据前显示加载框 -->
    <van-loading v-else type='spinner' size="24px" style="position:absolute;top:40%;left:50%;transform:translate(-50%)">加载中...</van-loading>
</template>

<script>
// 1. 通知组件
import { PubSub} from 'pubsub-js';
// 2. vuex
import { mapState } from 'vuex';
// 3. 接口
import { getSearchAllSelectedGoodsData, getSubmitOrderData, getDelCheckedGoodsData, getOrderStatus, getPayQRCode, getSearchPayStatus} from '@/service/index'
// 4. 时间格式化
import Moment from 'moment'
// 5. 提示框
import { Toast } from 'vant';

export default {
    name: "Order",
    data() {
       return {
         // - 地址
         chosenContactId: null,//地址id
         address_name: null, // 收货人
         address_phone: null, // 收货人电话
         address_id: null, // 收货人地址ID
         // - 订单商品
         goodsList:[],

         // - 配送时间
         minDate: new Date(),
         maxDate: new Date(2022, 10, 1),
         currentDate: new Date(),
         arriveTime: '请选择配送时间',
         showTimePopup: false, // 是否展示时间选择器

         remarks: null,// 备注
         showQRCodePopup: false, // 是否展示支付二维码
       };
    },
    computed: {
      ...mapState(['userInfo']),
      //卡变类型
       cardType() {
         return this.chosenContactId !== null ? 'edit' : 'add';
       },
       //总价
       goodsTotalPrice(){
         let allPrice = 0;
         this.goodsList.forEach(goodsItem => {
           allPrice += goodsItem.goods_price*goodsItem.num;
         });
         return Number(allPrice).toFixed(2);
       },
       //总数
       goodsAllNum(){
         return this.goodsList.length;
       },
       //配送费
       deliveryFee(){
         return this.goodsTotalPrice > 50 ? Number(0).toFixed(2): Number(5).toFixed(2);
       },
    },
    methods: {
        // - 返回上一级
        onClickLeft() {
           this.$router.back();
        },
        // - 获取被选中的商品
        async gainSelectedGoods(){
          if(this.userInfo.token){
            let result = await getSearchAllSelectedGoodsData(this.userInfo.token);
            if(result.success_code === 200){
              this.goodsList = result.data;
            }
            console.log(result);
          }
          else{
               Toast({
                   message: '登录已过期，请重新登录',
                   duration: 500
               });
           }
          
        },
        // - 弹出时间选择器
        handleTimePopup(){
          this.showTimePopup = true;
        },
        // - 处理配送时间
        handleDeliveryTime(value){
          this.showTimePopup = false;
          this.arriveTime = Moment().format('YYYY-MM-DD HH:mm'); 
        },
        // - 取消选择配送时间
        handleCancleTime(){
          this.showTimePopup = false;
        },
        // - 选择收货地址
        chooseAddress(){
            this.$router.push('/order/myAddress');
        },
        // - 进入商品详情页
        enterGoodsDetail(){
          this.$router.push('/order/orderDetail');
        },
        // - 提交订单
        async onSubmit(){
          if(!this.goodsList){
            return;
          }
          else if(!this.chosenContactId){
            Toast({
              message: '请选择收货地址',
              duration: 500
            });
            return;
          }
          else if(this.arriveTime === '请选择配送时间'){
            Toast({
              message: '请选择配送时间',
              duration: 500
            });
            return;
          }
          else if(!this.remarks){
            Toast({
              message: '请备注您的需求',
              duration: 500
            });
            return;
          }
          // - 提交订单
          let submitOrderResult = await getSubmitOrderData(this.userInfo.token, this.chosenContactId, this.arriveTime, this.goodsList, this.remarks, this.goodsTotalPrice, this.deliveryFee);
          console.log(submitOrderResult);
          if(submitOrderResult.success_code === 200){
            let deletedOrderResult = await getDelCheckedGoodsData(this.userInfo.token);
            console.log(deletedOrderResult);
            if(deletedOrderResult.success_code === 200){
              let qrCodeResult = await getPayQRCode(submitOrderResult.data.order_id, 0.01);
              console.log(qrCodeResult);
              if(qrCodeResult.code_url){

              }
              else{
                Toast({
                  message: '生成支付二维码失败',
                  duration: 500
                });
              }
            }
            else{
              Toast({
                message: '删除失效的商品失败',
                duration: 500
              });
            }
            // let rrderStatusResult = await getOrderStatus(this.userInfo.token, );
          }
          else{
            Toast({
              message: '创建订单失败',
              duration: 500
            });
          }

        }
    },
    mounted(){
      this.gainSelectedGoods();
      PubSub.subscribe('pub-address',(msg, addressItem) => {
        if (msg === 'pub-address') {
          this.chosenContactId = addressItem.address_id;
          this.address_name = addressItem.name;
          this.address_phone = addressItem.tel;
        }
      });
    },
    beforedestrory(){
      PubSub.unsubscribe('pub-address');
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