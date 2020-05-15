
<template>
<div>
  <h3>hello</h3>
  <input type="text" v-model="msg"/>
  <button @click="adddata">确定</button>
  <ul>
    <li v-for="item in datalist" :key="item"> {{item}}</li>
  </ul>
  <navbar>
    <button @click = "exchanghandle">转换</button>
  </navbar>
  <slidebar v-show="isShow"></slidebar>
</div>
</template>

<script>
import navbar from './components/NavBar'
import slidebar from './components/SlideBar'
import axios from 'axios'

export default {
  data: function () {
    return { msg: '', datalist: [], isShow: true }
  },
  methods: {
    adddata: function () {
      this.datalist.push(this.msg)
      this.msg = ''
    },
    exchanghandle: function () {
      this.isShow = !this.isShow
    }
  },
  components: {
    navbar: navbar,
    slidebar: slidebar
  },
  mounted: function () {
    axios.get('/ajax/comingList?ci=1&token=&limit=10&optimus_uuid=589A26B0967C11EA9494450F6753F68B9A110EEDBBE84DEDAA55E485FD9AF2A2&optimus_risk_level=71&optimus_code=10').then(response => {
      console.log(response.data)
    })
  }

}
</script>

<style lang="scss">
ul{
  li{
    background-color: olive;
  }
}
</style>
