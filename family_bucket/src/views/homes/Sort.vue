<template>
    <div class="sort">
        <cube-scroll class="leftside" ref="scroll" >
            <ul>
                <li v-for="(list,index) in tabslabel" :class="list.active ? 'active':''" :key="index" @click="selectList(index)">{{list.label}}</li>
            </ul>
        </cube-scroll>
        <cube-scroll class="rightside" ref="scroll" >
            <ul>
                <li v-for="(list,index) in tabs" :key="index" @click="buyHandle(list)" >
                    <img :src="list.image" alt="">
                    <p>{{list.label}}</p>
                </li>
            </ul>
        </cube-scroll>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tabslabel:[
               {
                   label:'热门推荐',
                   active:true
               },
               {
                   label:'手机数码',
                   active:false
               },
               {
                   label:'家用电器',
                   active:false
               },
               {
                   label:'家用空调',
                   active:false
               },
               {
                   label:'电脑产品',
                   active:false
               },
               {
                   label:'计生情趣',
                   active:false
               },
               {
                   label:'美妆护肤',
                   active:false
               },
               {
                   label:'口红',
                   active:false
               },
               {
                   label:'手袋',
                   active:false
               },
               {
                   label:'金银财宝',
                   active:false
               },
               {
                   label:'手机数码',
                   active:false
               },
               {
                   label:'手机数码',
                   active:false
               },
           ] ,
           tabs:[]
        }
    },
    methods:{
        selectList(selectedindex){
            this.tabslabel.forEach((item,index) => {
               item.active = index == selectedindex ? true:false;
            });
            this.requestListData(selectedindex);

        },
        //获取分类中的商品
        async requestListData(index){
            const response = await this.$http.get('/api/classify',{params:{type:index}});
            this.tabs = response.data;
        },
        buyHandle(goods){
            this.$store.commit('gainGoodsList',goods);
        }
    },
    created() {
        //获取默认的分类数据
        this.requestListData(0);
    }
}
</script>

<style lang="scss" scoped>
.sort{
    width: 100%;
    height: 100%;
    padding-left: 100px;
    position: relative;
    .leftside{
        font-size: 16px;
        width: 100px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        ul{
            li{
                height: 50px;
                line-height: 50px;
                text-align: center;
                border-bottom: 1px solid white;
                background: rgb(223, 222, 221);
                color: rgb(66, 65, 65);
            }
            .active{
                color: orange;
                background: white;
            }
        }
    }
    .rightside{
        width: 100%;
        ul{
            overflow: hidden;
            li{
                width: 33.33%;
                float: left;
                img{
                    display: block;
                    width: 100%;
                }
                p{
                    line-height: 16px;
                    text-align: center;
                    font-size: 14px;
                }
            }
        }
    }
}
</style>