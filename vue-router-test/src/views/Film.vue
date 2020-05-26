<template>
    <div>
        <div class="swiper" ref='myswiper'></div>
        <navbar class="isFixed ? 'fixbar':''"></navbar>
        <router-view></router-view>
    </div>
</template>
<script>
import navbar from '@/components/Navbar'

export default {
  data: function () {
    return { datalist: [], isFixed:false }
  },
  components: {
    navbar
  },
  mounted: function () {
    setTimeout(() => {
      this.datalist = ['11111', '22222', '33333']
    }, 2000)
    window.onscroll = this.handleScroll;
  },
  beforeDestroy: function (){
    window.onscroll = null;
  },
  methods: {
    handleScroll: function () {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > this.$refs.myswiper.$el.offsetHeight){
        this.isFixed = true;
      }else{
        this.isFixed = false;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.swiper{
  width: 100%;
  height: 100px;
  background-color: salmon;
}
.fixbar{
  position: fixed;
  top: 0;
  left: 0;
}
</style>
