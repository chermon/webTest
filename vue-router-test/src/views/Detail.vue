<template>
<!-- v-if='filminfo' 防止页面刚进来时数据为空，控制台报错 -->
    <div v-if='filminfo' class="filminfo">
      <img :src="filminfo.poster" alt="" class="infopic">
      <div class='introction'>
        <h2>{{filminfo.name}}</h2>
        <p>{{filminfo.category}}</p>
        <p>{{filminfo.nation}} <span>|</span> {{filminfo.runtime}}</p>
      </div>
      <div class="actors">
        <h3>演职人员</h3>
        <swiper class="actorswiper" myswiper="actorswiper" picnumber='4'>
          <div class="swiper-slide" v-for="actor in filminfo.actors" :key="actor.name">
            <img :src="actor.avatarAddress" alt="">
            <p class="actorname">{{actor.name}}</p>
            <p class="actorrole">{{actor.role}}</p>
          </div>
        </swiper>
      </div>
      <div class="teampic">
        <h3>剧照</h3>
        <swiper class="teamswiper" myswiper="teamswiper" picnumber='3'>
          <div class="swiper-slide" v-for="(photo,index) in filminfo.photos" :key="index">
            <img :src="photo" alt=""/>
          </div>
        </swiper>
      </div>
    </div>
</template>
<script>
import axios from 'axios'
import swiper from './Detail/DetailSwiper'
import Vue from 'vue'
import bus from '@/bus'
import {SHOW_TABBAR_MUTATION} from '@/type' // - ES6部分导出

export default {
  data: function () {
    return { filmId: '',filminfo: null}
  },
  components: {
    swiper
  },
  beforeMount: function (){
      /**
       *  方法1 ： 事件总线 - 发起者（作用：页面进来时隐藏底部tab）
       *         
       * */ 

      /**
       *  方法2：状态管理器Vuex
       *        作用：可以记录谁对哪个变量进行了修改。
       *        1. 同步：将状态交给mutation进行处理
       *        2. 异步：将事件分发给 Actions ，然后在Actions中通过commit将状态提交给mutaion进行对state的处理
       *        3. 分发事件的格式：this.$store.dispatch(store中Actions的方法名)
       *        4. 调用mutation进行处理：this.$store.commit(store中mutations的方法名,传递的值)
       * */ 

       // 方法1：
      // bus.$emit('hidenbar',false);

      // 方法2：
      // 注：该方法的第一个参数是使用变量的方式，这样做的好处是如果方法名改变直接改变该变量对应的值就行
      // 与 this.$store.commit('handleHideBar',true); 做对比
      this.$store.commit(SHOW_TABBAR_MUTATION,false);
      

  },
  destroyed: function (){
     // 事件总线 - 发起者（作用：页面离开时隐藏底部tab）
    //   bus.$emit('hidenbar',true);

    // - 利用状态管理器Vuex，将状态的修改交给mutation来处理，以便记录谁对哪个变量进行了修改
    this.$store.commit('handleHideBar',true);
  },
  mounted: function () {
    this.filmId = this.$route.params.id
    axios({
      url: `https://m.maizuo.com/gateway?filmId=${this.filmId}&k=2788033`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15898734134870492913889"}',
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(response => {
      this.filminfo = response.data.data.film;
    })
  },
  //路由钩子
  beforeRouteEnter(to, from, next){
    console.log("进入之前调用");
    next();
  },
  beforeRouteUpdate(to, from, next){
    console.log("路由的参数变化了");
    next();
  },
  beforeRouteLeave(to, from, next){
    console.log("路由离开前调用");
    next();
  }

}
</script>
<style lang="scss" scoped>
.filminfo{
  background-color: rgb(250, 246, 246);
  color: rgb(43, 42, 42);
  h2{
    line-height: 38px;
  }
  .infopic{
      width: 100%; 
  }
  .introction{
    background-color: white;
    padding:10px 10px;
    p{
      color: rgb(156, 155, 155);
      font-size: 14px;
      line-height: 24px;
      span{
        padding: 0 5px 0;
      }
     }
  }
  
  .actors{
    margin-top: 10px;
    background-color: white;
    padding: 10px 0px 5px 10px;
    h3{
      line-height: 30px;
      font-weight: normal;
    }
    .actorname{
      font-size: 14px;
    }
    .actorrole{
      font-size: 14px;
      color: rgb(156, 155, 155);
    }
    .actorswiper{
      margin-top: 15px;
    }
  }

  .teampic{
    margin-top: 10px;
    background-color: white;
    padding: 10px 0px 5px 10px;
    h3{
      line-height: 30px;
      font-weight: normal;
    }
    .teamswiper{
      margin-top: 15px;
    }
  }
  
}

</style>