<template>
    <div>
        <ul>
            <li v-for='item in datalist' :key='item.filmId' @click='enterDetail(item.filmId)'>
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
import axios from 'axios'
import Vue from 'vue'

Vue.filter('actorsfilte', function (data) {
  var actorsList = data.map(item => item.name)
  return actorsList.join(' ')
})

export default {
  data: function () {
    return { datalist: [] }
  },
  methods: {
    enterDetail: function (filmId) {
      /**
       * 编程式导航
       *   方式1：- 通过路径跳转
       *         格式：this.$router.push(`/路由中的地址路径/${要传递的数据}`);
       *
       *   方法2：- 通过名字跳转
       *         格式：this.$router.push({name:路由中定义的name,params:{动态路由中冒号后面的名字:要传递的数据}});
       *
       *   下一个页面数据接收：
       *   this.$router.params.动态路由中冒号后面的名字
       *
       *   路由页面格式：
       *   {
       *      path:'/路径/:向下传递的参数名',
       *      name: '为该路径定义的名字',
       *      component: 组件名
       *   }
       **/

      // //通过路径跳转
      // this.$router.push(`/detail/${filmId}`);
      console.log('初始值：' + filmId)
      // 通过名字跳转
      this.$router.push({ name: 'mydetail', params: { id: filmId } })
    }
  },
  mounted: function () {
    axios({
      url: 'https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=2&k=7657440',
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15898734134870492913889"}',
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(response => {
      this.datalist = response.data.data.films
      console.log(this.datalist)
    })
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
        // display: block;
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
