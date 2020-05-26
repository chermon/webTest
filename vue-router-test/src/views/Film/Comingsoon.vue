<template>
    <div>
         <ul>
            <li v-for='item in comingSoonData' :key='item.filmId' @click='enterDetail(item.filmId)'>
                <img :src='item.poster' alt=""/>
                <h3>{{item.name}}</h3>
                <p v-show='item.grade'>观众评分<span class="grade">{{item.grade}}</span> </p>
                <p v-if='item.actors'>主演：{{item.actors | actorsfilte}}</p>
                <p v-else>暂无演员</p>
                <p>{{item.nation}} | {{item.runtime}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    mounted : function (){
        // 通过动态管理器中的异步分发dispatch可以将异步数据缓存下来，只要不刷新页面都会使用旧数据进行显示
        if(this.comingSoonData.length == 0){
            this.$store.dispatch('comingSoonAction');
        }else{
            console.log('使用缓存数据');
        }
        
    },
    computed:{
        ...mapState(['comingSoonData'])
    }

}
</script>

<style lang="scss" scoped>
li{
    width: 100%;
    height: 200px;
    box-sizing: border-box;
    padding: 10px;
    img{
        width: 100px;
        float: left;
        margin-right: 10px;
    }
    h3{
        height: 32px;
        font-size: 16px;
        line-height: 32px;
        color: rgb(37, 37, 37);
    }
    p{
        color: rgb(121, 123, 124);
        font-size: 14px;
        .grade{
          margin: 0 10px;
          color: orange;
        }
    }
}
</style>
