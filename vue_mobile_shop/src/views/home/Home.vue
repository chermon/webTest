<template>
    <div id="home">
         <!-- 头部 -->
       <TopHeader></TopHeader>

    </div>
</template>

<script>
import TopHeader from './components/header/TopHeader'
import {getHomeData} from './../../service/index'

export default {
    name: "Home",
    components:{
        TopHeader
    },
    created(){
        getHomeData().then( response => {
            console.log(response);
        });
    }
}
</script>

<style lang="less" scoped>
#home{
    width: 100%;
    height: 100%;
    // background: grey;
}
</style>