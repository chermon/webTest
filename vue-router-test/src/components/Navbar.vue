<template>
    <div>
        <ul>
            <router-link to='/film/nowplaying' tag='li' active-class="current"><span>正在热映<span class="line"></span></span></router-link>
            <router-link to='/film/comingsoon' tag='li' active-class="current"><span>即将上映<span class="line"></span></span></router-link>
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
            height: 50px;
            span{
                line-height: 50px;
                position: relative;
                left: 25%;
                .line{
                    display: block;
                    width: 100%;
                    height: 2px;
                    background-color: lightseagreen;
                    display: none;
                    position: absolute;
                    bottom: -14px;
                    left: 0px;
                }
            }
        }
    }
}

.current {
    color: lightseagreen;
    .line{
        display: block;
    }

}
</style>
