<template>
    <div class="room">
        <!-- 轮播图 -->
        <cube-slide ref="slide" :data="advArr" @change="changePage" class="swiperSlide">
            <cube-slide-item v-for="(item, index) in advArr" :key="index" @click.native="clickHandler(item, index)">
                <a :href="item.url">
                    <img :src="item.image">
                </a>
            </cube-slide-item>
        </cube-slide>

        <!-- 滚动分类 -->
        <cube-slide ref="slide" :auto-play="false">
            <cube-slide-item v-for="(list, index) in sortArr" :key="index" class="sortkind">
                <ul>
                    <li v-for="(item, index) in list" :key="index">
                        <a :href="item.url">
                            <img :src="item.image">
                            <p>{{item.label}}</p>
                        </a>
                    </li>
                </ul>
            </cube-slide-item>
        </cube-slide>

    </div>
</template>
<script>
export default {
  data() {
    return {
      advArr:[],
      sortArr:[]
    }
  },
  methods:{
      changePage(){

      },
      clickHandler(){

      }
  },
  async created(){
      try{
          //获取轮播图数据
          const responseSwiper = await this.$http.get('/api/banner');
          this.advArr = responseSwiper.data;

          //获取滚动分类数据
          const resSort = await this.$http.get('/api/rollinglist');
          this.sortArr = resSort.data;

      }
      catch(err){
          console.log(err);
      }
      
  }
}
</script>

<style lang="scss" scoped>
.room{
    width: 100%;
    height: 100%;
    .swiperSlide{
        height: 200px;
    }
 
    ul{
        width: 100%;
        overflow: hidden;
        li{
          width: 20%;
          list-style: none;
          float: left;
            a{
               display: block;
               width: 100%;
               img{
                   display: block;
                   width: 35px;
                   height: 35px;
                   padding: 5px 0;
                   border-radius: 50%;
               }
               p{
                   line-height: 20px;
                   text-align: center;
                   font-size: 14px;
               }
            }
        }
    }  
}
</style>