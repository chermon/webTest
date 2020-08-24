<template>
    <div class="myAddress">
        <van-nav-bar
          title="我的地址"
          left-arrow
          @click-left="onClickLeft"
        />
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
          @select='handleSelectedAddress'
        />
        <router-view/>
    </div>
</template>

<script>
// 1.引入提示框
import { Toast } from 'vant';
// 2. 引入vuex
import {mapState} from 'vuex';
// 3. 引入接口
import {getUserAddressData} from '@/service/index.js';
// 4. 通知组件
import {PubSub} from 'pubsub-js'

export default {
    name:'MyAddress',
    data() {
        return {
          chosenAddressId: '1',
          list: [],
        };
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
        // 1. 返回上一级
        onClickLeft(){
            this.$router.back();
        },
        // 2. 添加地址
        onAdd() {
          this.$router.push('/order/myAddress/addAddress');
        },
        // 3. 编辑地址
        onEdit(item, index) {
          this.$router.push('/order/myAddress/editAddress?address_id='+item.address_id);
        },
        // 4. 获取地址列表
        async gainMyAddressList(){
          if(this.userInfo.token){
            let result = await getUserAddressData(this.userInfo.token);
            if (result.success_code === 200) {
              let dataList = result.data;
              this.list = [];
              dataList.forEach((item, index) => {
                let address = {
                  id: String(index + 1),
                  name: item.address_name,
                  tel: item.address_phone,
                  address: item.address_area+item.address_area_detail,
                  isDefault: item.address_tag,
                  address_id: item._id,
                  user_id: item.user_id
                };
                this.list.push(address);
              });
            }
            else{
              Toast({ 
                message: '服务器错误',
                duration: 500
              });
            }
          }
          else{
            Toast({ 
              message: '登录已过期，请重新登录',
              duration: 500
            });
          }
        },
        // 5. 选中某个地址
        handleSelectedAddress(item,index){
          PubSub.publish('pub-address',item);
          this.$router.back();
        }

    },
    mounted(){
      this.gainMyAddressList();

      PubSub.subscribe('pub-myAddressList',(msg) => {
        if (msg === 'pub-myAddressList') {
          this.gainMyAddressList();
        }
      });
    },
    beforeDestroy(){
      PubSub.unsubscribe('pub-myAddressList');
    }

}
</script>

<style scoped>
.myAddress{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
}
</style>