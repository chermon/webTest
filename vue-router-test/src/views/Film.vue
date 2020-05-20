<template>
    <div>
        <div class="swiper"></div>
        <navbar class="bar"></navbar>
        <router-view></router-view>
    </div>
</template>
<script>
import navbar from '@/components/Navbar'

export default {
  data: function () {
    return { datalist: [] }
  },
  components: {
    navbar
  },
  mounted: function () {
    setTimeout(() => {
      this.datalist = ['11111', '22222', '33333']
    }, 2000)
  }
}
</script>
<style lang="scss" scoped>
.swiper{
  width: 100%;
  height: 100px;
  background-color: salmon;

}
</style>
