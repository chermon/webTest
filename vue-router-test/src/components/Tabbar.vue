<template>
    <div>
        <ul>
            <!-- 声明式导航 -->
            <router-link to='/film' tag='li' active-class='currentcul'>
            <span class="iconfont icon-dianyingpiao">电影</span>
            </router-link>
            <router-link to='/cinema' tag='li' active-class='currentcul'>
            <span class="iconfont icon-yingyuan">影院</span>
            </router-link>
            <router-link to='/center' tag='li' active-class='currentcul'>
            <span class="iconfont icon-wode">个人中心</span>
            </router-link>
        </ul>
    </div>

</template>
<style lang="scss" scoped>
div{
    position: fixed;
    width: 100%;
    height: 50px;
    bottom: 0px;
    left: 0px;
    background-color: lightgray;
    ul {
       display: flex;
       li {
          flex:1;
          height: 50px;
          text-align: center;
          line-height: 50px;
        }
    }
}

.currentcul {
    color: orangered;
}
</style>
