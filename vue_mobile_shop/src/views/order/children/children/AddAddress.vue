<template>
    <div id="addAddress">
        <van-nav-bar
          title="添加地址"
          left-arrow
          @click-left="onClickLeft"
        />
        <van-address-edit
          :area-list="areaList"
          show-postal
          show-set-default
          :area-columns-placeholder="['省', '市', '区']"
          @save="onSave"
          @change-detail="onChangeDetail"
        />
    </div>
</template>

<script>
// 1.提示框
import { Toast } from 'vant';
// 2.省市区
import areaListArr from '@/config/area.js'
// 3.接口
import { getAddUserAddressData } from '@/service/index.js'
// 4.vuex
import {mapState} from 'vuex'
// 5. 通知组件
import {PubSub} from 'pubsub-js'

export default {
    data() {
      return {
        areaList:areaListArr,
        searchResult: [],
      };
    },
    computed:{
      ...mapState(['userInfo'])
    },
    mounted(){
    },
    methods:{
        // 返回上一个页面
        onClickLeft(){
            this.$router.back();
        },
        async onSave(content) {
          if(this.userInfo.token){
            let result = await getAddUserAddressData(this.userInfo.token, content.name, content.tel, content.province+content.city+content.county,
            content.addressDetail, content.postalCode, content.isDefault, content.province, content.city, content.county, content.areaCode);
            if(result.success_code == 200){
              PubSub.publish('pub-myAddressList');
              Toast({
                message: '添加成功',
                duration: 500
              });
              this.$router.back();
            }else{
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
        onChangeDetail(val) {
          if (val) {
            this.searchResult = [
              {
                name: '黄龙万科中心',
                address: '杭州市西湖区',
              },
            ];
          } else {
            this.searchResult = [];
          }
        },
    }
}
</script>

<style lang="less" scoped>
#addAddress{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    z-index: 999;
}
</style>