<template>
    <div id="editAddress">
        <van-nav-bar
          title="编辑地址"
          left-arrow
          @click-left="onClickLeft"
        />
        <van-address-edit
          :area-list="areaList"
          :address-info='addressInfo'
          show-postal
          show-delete
          show-set-default
          show-search-result
          :search-result="searchResult"
          :area-columns-placeholder="['请选择', '请选择', '请选择']"
          @save="onSave"
          @delete="onDelete"
          @change-detail="onChangeDetail"
        />
    </div>
</template>

<script>
// 1.提示
import { Toast } from 'vant';
// 2.服务器
import { getUpdateUserAddressData, getEditUserAddressData, getDeleteUserAddressData } from '@/service/index'
// 3.vuex
import {mapState} from 'vuex'
// 4.省市区
import areaList from '@/config/area.js'
// 5. 通知组件
import {PubSub} from 'pubsub-js'

export default {
    data() {
      return {
        areaList: areaList,// 省市区
        searchResult: [],
        addressInfo: {}, // 地址信息
      };
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
        // 1.返回上一个页面
        onClickLeft(){
            this.$router.back();
        },
        // 2.修改地址
        async onSave(content) {
          if(this.userInfo.token){
            let result = await getEditUserAddressData(this.addressInfo.id, this.userInfo.token, content.name, content.tel, content.province+content.city+content.county,
            content.addressDetail, content.postalCode, content.isDefault, content.province, content.city, content.county, content.areaCode);
            if (result.success_code === 200) {
              PubSub.publish('pub-myAddressList');
              Toast({
                message: '修改成功',
                duration: 500
              });
              this.$router.back();
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
        // 3.删除地址
        async onDelete() {
          let result = await getDeleteUserAddressData(this.addressInfo.id);
           if (result.success_code === 200) {
              PubSub.publish('pub-myAddressList');
              Toast({
                message: '删除成功',
                duration: 500
              });
              this.$router.back();
            }
            else{
              Toast({
                message: '服务器错误',
                duration: 500
              });
            }
        },
        // 4.获取修改地址的数据
        async gainEditAddressInfo(){
            let result = await getUpdateUserAddressData(this.userInfo.token, this.$route.query.address_id);
            if (result.success_code === 200) {
              let addressData = result.data;
              this.addressInfo = {
                id: addressData._id,
                name: addressData.address_name,
                tel: addressData.address_phone,
                province: addressData.province,
                city: addressData.city,
                county: addressData.county,
                addressDetail: addressData.address_area_detail,
                areaCode: addressData.areaCode,
                postalCode: addressData.address_post_code,
                isDefault: addressData.address_tag
              }
            }
            else{
              Toast({
                message: '服务器错误',
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
    },
    mounted(){
      if (this.$route.query.address_id) {
        if(this.userInfo.token){
          this.gainEditAddressInfo();
        }
        else{
           Toast({ 
             message: '登录已过期，请重新登录',
             duration: 500
           });
        }
      }
    }

}
</script>

<style lang="less" scoped>
#editAddress{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    z-index: 999;
}
</style>