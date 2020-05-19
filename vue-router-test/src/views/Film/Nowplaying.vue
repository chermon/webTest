<template>
    <div>
        <ul>
            <li v-for='item in datalist' :key='item.filmId' @click='enterDetail(item)'>
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
    enterDetail: function (data) {
      // 编程式导航
      // 注：在跳转页面中中的是this.$router,而在接收界面中用的是this.$route
      this.$router.push(`/detail/${data}`)
    }
  },
  mounted: function () {
    axios({
      url: 'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=462458',
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15898734134870492913889","bc":"110100"}',
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
