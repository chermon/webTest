import navbar from '@/components/Navbar'
import swiper from '@/views/Film/Swiper'
<template>
    <div>
        <swiper>
          <div class="swiper-slide" ></div>
        </swiper>
        <navbar class="bar"></navbar>
        <router-view></router-view>
    </div>
</template>
<script>

export default {
  data: function () {
    return {}
  },
  components: {
    navbar
  },
  mounted: function(){
    
  }
}
</script>
