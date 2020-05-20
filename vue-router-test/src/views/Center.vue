<template>
    <div>center</div>
</template>
<script>
const auth = {
  isLogin: function () {
    return false
  }
}
export default {
  // - 局部守卫
  // 注：该方法在mounte之前执行，所以该组件还没被创建，因此不能获取到组件实例中的’this‘
  beforeRouteEnter: function (to, from, next) {
    if (auth) {
      next()
    } else {
      next('/login')
    }
  }
}
</script>
