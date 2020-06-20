<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/login">登录</router-link> |
      <router-link to="/regist">注册</router-link>
    </div> -->
    <router-view></router-view>

  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html,body,.bd {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#nav {
  // padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
