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
          :name="currentContact.name"
          :tel="currentContact.tel"
          @click="chooseAddress"
          style="margin-top:1rem"
        />
        <router-view></router-view>
    </div>

</template>

<script>
export default {
    name: "Order",
    data() {
       return {
         chosenContactId: null,
         editingContact: {},
         showList: false,
         showEdit: true,
         isEdit: false,
        
       };
    },
    computed: {
       cardType() {
         return this.chosenContactId !== null ? 'edit' : 'add';
       },
   
       currentContact() {
         const id = this.chosenContactId;
         return id !== null ? this.list.filter((item) => item.id === id)[0] : {};
       },
    },
    methods: {
        // 返回上一级
        onClickLeft() {
           this.$router.back();
        },
        
        // 选择收货地址
        chooseAddress(){
            this.$router.push('/order/myAddress');
        }
    },
}
</script>

<style lang="less" scoped>
#order{
    // position: relative;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
}
</style>