<template>
    <div id="userCenter">
        <van-nav-bar
          title="用户中心"
          left-arrow
          @click-left="onClickLeft"
        />
        我是用户中心
    </div>
</template>

<script>
export default {
    name:'UserCenter',
    methods:{
        onClickLeft(){
            this.$router.back();
        }
    }
}
</script>

<style lang="less" scoped>

</style>