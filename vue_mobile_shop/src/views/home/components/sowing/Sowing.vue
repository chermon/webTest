<template>
    <swiper class="carrousel"  ref="mySwiper" :options="swiperOption">
      <swiper-slide v-for="item in swiperList" :key="item.cid">
          <img :src="item.icon_url" alt="item.public_name">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
import { Swiper, SwiperSlide} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
    name: 'carrousel',
    props:{
        swiperList:Array
    },
    data(){
        return {
            swiperOption: {
                //分页
                pagination: {
                  el: '.swiper-pagination',
                  clickable: true
                },
                //自动播放
                autoplay: {
                    //切换时长
                    delay: 1000
                },
                //速度
                speed: 800,
                //循环
                loop: true,
                //手掌图标
                grabCursor: true,
                //滑动后回调函数
                on: {
                    slideChangeTransitionEnd(){

                    }
                }
            }
        };
    },
    components: {
      Swiper,
      SwiperSlide
    },
    mounted(){
        console.log(this.swiperList);
    }
}
</script>

<style scoped>
.carrousel{
    width: 100%;
    height: 14rem;
}
.carrousel img{
    width: 100%;
    height: 100%;
}

/**
*  css 穿透修改样式
*/ 
.carrousel >>> .swiper-pagination-bullet-active{
    background-color: #75a342 ;
}
</style>