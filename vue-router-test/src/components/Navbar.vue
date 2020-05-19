<template>
    <div>
        <ul>
            <router-link to='/nowplaying' tag='li' active-class="current">正在热映</router-link>
            <router-link to='/comingsoon' tag='li' active-class="current">即将上映</router-link>
        </ul>
    </div>
</template>
<script>
export default {
  data: function () {
    return {}
  }
}
</script>
<style lang="scss" scoped>
div{
    width: 100%;
    ul {
        width: 100%;
        overflow: hidden;
        li {
            width: 50%;
            float: left;
            text-align: center;
            line-height: 50px;
        }
    }
}

.current {
    color: lightseagreen;
}
</style>
