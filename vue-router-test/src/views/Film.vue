<template>
    <div>
        轮播
        <navbar class="bar"></navbar>
        <router-view></router-view>
    </div>
</template>
<script>
import navbar from '@/components/Navbar'
export default {
  data: function () {
    return {}
  },
  components: {
    navbar
  }
}
</script>
