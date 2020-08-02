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
        />
        <router-view/>
    </div>
</template>

<script>
// 1.引入提示框
import { Toast } from 'vant';

export default {
    name:'MyAddress',
    data() {
        return {
          chosenAddressId: '1',
          list: [
            {
              id: '1',
              name: '张三',
              tel: '13000000000',
              address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
              isDefault: true,
            },
            {
              id: '2',
              name: '李四',
              tel: '1310000000',
              address: '浙江省杭州市拱墅区莫干山路 50 号',
            },
          ],
        };
    },
    methods:{
        // 返回上一级
        onClickLeft(){
            this.$router.back();
        },
        onAdd() {
          this.$router.push('/order/myAddress/addAddress');
        },
        onEdit(item, index) {
          this.$router.push('/order/myAddress/editAddress');
        },
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