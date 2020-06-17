<template>
  <div class="home">
    <router-view></router-view>
    <tabbar></tabbar>
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
