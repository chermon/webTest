
<template>
  <div>
    <tabbar v-show="isshow"></tabbar>
    <router-view></router-view>
  </div>

</template>
<script>
import tabbar from '@/components/Tabbar'
import bus from '@/bus'
export default {
  data: function () {
    return {isshow: true};
  },
  beforeMount: function () {
    // 事件总线 - 订阅者（作用：监听发起者传来的值，根据值的改变对底部tab做出隐藏和显示）
    bus.$on("hidenbar",(data) => {
      this.isshow = data;
    });
  },
  components: {
    tabbar
  }
}
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html {
  height: 100%;
}
ul {
  list-style: none;
}
</style>
