<template>
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

export default {
  data: function () {
    return { filmId: '',filminfo: null}
  },
  components: {
    swiper
  },
  beforeMount: function (){
      bus.$emit('hidenbar',false);
  },
  destroyed: function (){
      bus.$emit('hidenbar',true);
  },
  mounted: function () {
    this.filmId = this.$route.params.id
    console.log(this.filmId)
    axios({
      url: `https://m.maizuo.com/gateway?filmId=${this.filmId}&k=2788033`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15898734134870492913889"}',
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(response => {
      console.log(response.data.data.film)
      this.filminfo = response.data.data.film;
    })
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