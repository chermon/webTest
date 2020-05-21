
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
    bus.$on("hidenbar",(data) => {
      console.log("是否展示："+data);
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
