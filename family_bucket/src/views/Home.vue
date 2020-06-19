<template>
  <div class="home">
    <router-view class="router"></router-view>
    <tabbar class="tabbar"></tabbar>
  </div>
</template>

<script>
import tabbar from '@/components/Tabbar.vue'

export default {
  name: 'Home',
  components:{
    tabbar
  }
}
</script>

<style lang="scss" scoped>
.router{
  height: 100%;
  padding-bottom: 64px;
  box-sizing: border-box;
}
.tabbar{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>
