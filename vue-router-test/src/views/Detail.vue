<template>
    <div></div>
</template>
<script>
import axios from 'axios'
export default {
  data: function () {
    return { filmId: '' }
  },
  mounted: function () {
    this.filmId = this.$route.params.id
    console.log(this.$route.params.id)
    axios({
      url: `https://m.maizuo.com/gateway?filmId=${this.filmId}&k=2788033`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15898734134870492913889"}',
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(response => {
      console.log(response.data)
    })
  }

}
</script>
