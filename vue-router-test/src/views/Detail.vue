<template>
    <div>详情页:{{info}}</div>
</template>
<script>
export default {
  data: function () {
    return { info: '' }
  },
  mounted: function () {
    this.info = this.$route.params.id
  }

}
</script>
