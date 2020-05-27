<template>
    <section>
        <header class="top_tip">
           <span v-if="fathercontainer == 'home' " class="num_tip">{{this.week}}</span>
           <span v-else-if="fathercontainer == 'subject'" class="num_tip">题目{{this.currentQueNum}}</span>
        </header>
        <div v-if="fathercontainer == 'home'" class="container">
            <div class="home_logo item_container"></div>
            <router-link class="button_style home_button" to="/subject"></router-link>
        </div>
    </section>
</template>

<script>
import {mapState} from 'vuex'
export default {
    props:['fathercontainer'],
    computed:{
        ...mapState(['currentQueNum','qustionList','week'])
    }
}
</script>

<style lang="scss" scoped>
.top_tip{
    position: absolute;
	height: 17.05rem;
	width: 9.75rem;
	top: -6.9rem;
    right: 0.6rem;
    background: url(../images/cloud.png) no-repeat;
    background-size: 9.75rem 100%;
    // background: olive;
    .num_tip{
        position: absolute;
        bottom: 0.7rem;
        line-height: 5rem;
        width: 100%;
        font-size: 0.6rem;
        text-align: center;
        font-family: '黑体';
        font-weight: bold;
        font-size: 16px;
        color: orangered;
    }
}
.container{
    position: relative;
    top: 6.05rem;
    width: 100%;
    // padding: 0px 4rem;
}
.item_container{
    position: absolute;
    width: 21rem;
    height: 19.25rem;
    left: 2.25rem;
    top: 2rem;
    background-repeat: no-repeat;
}
.home_logo{
    background: url(../assets/1-2.png);
    background-size: contain;
}
.button_style{
    display: block;
    width: 7.5rem;
    height: 3.625rem;
    position: absolute;
    top:21.5rem;
    left: 50%;
    margin-left: -3.75rem;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: top center;
}
.home_button{
    background-image: url(../assets/1-4.png);
}
</style>