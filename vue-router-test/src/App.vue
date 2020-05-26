
<template>
  <div>
    <tabbar v-show="hideBar"></tabbar>
    <router-view></router-view>
  </div>

</template>
<script>
import tabbar from '@/components/Tabbar'
import bus from '@/bus'
import {mapState} from 'vuex'  // ES6导出
export default {
  data: function () {
    return {isshow: true};
  },
  beforeMount: function () {
    // // 事件总线 - 订阅者（作用：监听发起者传来的值，根据值的改变对底部tab做出隐藏和显示）
    // bus.$on("hidenbar",(data) => {
    //   this.isshow = data;
    // });
  },
  components: {
    tabbar
  },
  computed: {
    /**
     *  获取store的状态值方式有两种：
     *  方式1：
     *     this.$store.state.状态名
     *  方式2：
     *     通过ES6的导出方式 + 展开合并运算符
     *     import {mapState} from 'vuex'
     *     
     *     依赖计算后方法：
     *     ...mapState(['状态名'])
     *     
     *     使用：
     *        直接使用状态名
     * */ 

    ...mapState(['hideBar']) //ES6展开合并运算符
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
