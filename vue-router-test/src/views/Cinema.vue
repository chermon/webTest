<template>
    <div :style="mystyle" class="cinema">
        <ul>
            <li v-for="cinema in cinemaslist" :key="cinema.cinemaId">
                <h3>{{cinema.name}}</h3>
                <p>{{cinema.address}}</p>
                <span>{{cinema.lowPrice | filterPrice}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import BetterSroll from 'better-scroll'

Vue.filter('filterPrice', function (price){
    var newPrice = parseFloat(price/100);
    return  '¥' + newPrice + "起";
});
export default {
    data: function (){
        return {"cinemaslist":[],"mystyle":{height:'0px'}}
    },
    mounted: function () {
        this.mystyle.height = document.documentElement.clientHeight - 50 + "px";
        axios({
            url: `https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=5804935`,
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15898734134870492913889","bc":"110100"}',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        }).then( response => {

            this.cinemaslist = response.data.data.cinemas;
            console.log(this.cinemaslist);
            // 以上数据加载完毕再执行this.$nextTick回调函数中的数据
            this.$nextTick(() => {
                new BetterSroll(".cinema",{
                    scrollbar: {
                       fade: true,
                       interactive: false // 1.8.0 新增
                    }    
                })
            })
        });
    }
}
</script>
<style lang="scss" scoped>
div{
    overflow: hidden;
    ul{
       margin: 0 10px;
       li{
         height: 50px;
         border-bottom: 1px solid rgb(235, 233, 233);
         padding: 10px 80px 10px 0;
         position: relative;
         h3{
             font-size: 16px;
             font-weight: normal;
             line-height: 30px;
             color: rgb(68, 67, 67);
         }
         p{
            //  文字多时省略后面的文字
             overflow: hidden;
             text-overflow: ellipsis;
             white-space: nowrap;

             color: gray;
             font-size: 14px;
             line-height: 20px;
         }
         span{
             position: absolute;
             right: 0;
             top: 0;
             display: block;
            //  width: 80px;
             line-height: 70px;

             color: orange;
             text-align: center;
         }
       }
    }
}

</style>