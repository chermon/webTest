
<template>
  <div>
    <tabbar></tabbar>
    <router-view></router-view>
  </div>

</template>
<script>
import tabbar from '@/components/Tabbar'
export default {
  data: function () {
    return {}
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
