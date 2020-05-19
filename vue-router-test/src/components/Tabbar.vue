<template>
    <div>
        <ul>
            <!-- 声明式导航 -->
            <router-link to='/film' tag='li' active-class='currentcul'>电影</router-link>
            <router-link to='/cinema' tag='li' active-class='currentcul'>影院</router-link>
            <router-link to='/center' tag='li' active-class='currentcul'>个人中心</router-link>
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
    ul {
       display: flex;
       li {
          flex:1;
          height: 50px;
          color: black;
          background-color: lightgray;
          text-align: center;
          line-height: 50px;
        }
    }
}

.currentcul {
    color: orangered;
}
</style>
