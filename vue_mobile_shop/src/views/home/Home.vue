<template>
    <div id="home">
        我是首页
    </div>
</template>

<script>
// ,,
import {getHomeData} from './../../service/index'

export default {
    name: "Home",
    mounted(){
        getHomeData().then( response => {
            console.log(response);
        });
        // console.log(aaaa);
    }
}
</script>

<style lang="less" scoped>
#home{
    background-color: seagreen;
}
</style>