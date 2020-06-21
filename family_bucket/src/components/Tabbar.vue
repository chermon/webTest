<template>
    <div class="bottombar">
        <cube-tab-bar
    v-model="selectedLabelDefault"
    :data="tabs"
    @click="clickHandler"
    @change="changeHandler">
  </cube-tab-bar>
    </div>
</template>

<script>
export default {
  data () {
    return {
      selectedLabelDefault: '课堂',
      tabs: [{
        label: '课堂',
        icon: 'cubeic-home'
      }, {
        label: '分类',
        icon: 'cubeic-like'
      }, {
        label: '购物车',
        icon: 'cubeic-vip'
      }, {
        label: '我的',
        icon: 'cubeic-person'
      }]
    }
  },
  methods: {
    clickHandler (label) {
      // if you clicked home tab, then print 'Home'
      console.log(label)
    },
    //点击与自身不同的导航
    changeHandler (label) {
        switch (label) {
            case '课堂':
                this.$router.push({path: '/home/schoolroom'});
                break;
            case '分类':
                this.$router.push({path: '/home/sort'});
                break;
            case '购物车':
                this.$router.push({path: '/home/cart'});
                break;
            case '我的':
                this.$router.push({path: '/home/my'});
                break;
            default:
                break;
        }
    }
  },
  created:function (){
      switch (this.$route.path) {
          case '/home/schoolroom':
              this.selectedLabelDefault = "课堂";
              break;
          case '/home/sort':
              this.selectedLabelDefault = "分类";
              break;
          case '/home/cart':
              this.selectedLabelDefault = "购物车";
              break;
          case '/home/my':
              this.selectedLabelDefault = "我的";
              break;
          default:
              break;
      }
  }

}
</script>

<style lang="scss">
.bottombar{
  background: white;
  .cube-tab-bar{
    height: 64px;
    background: rgb(230, 228, 228);
  }
}


</style>