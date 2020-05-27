<template>
    <section>
        <header class="top_tip">
           <span v-if="fathercontainer == 'home' " class="num_tip">第一周</span>
           <span v-else-if="fathercontainer == 'subject'" class="num_tip">第一题</span>
        </header>
        <div v-if='fathercontainer == "home" ' class="container">
            <div class="home_logo item_container"></div>
            <route-link class="button_style home_button" ></route-link>
        </div>
    </section>
</template>

<script>
export default {
    props:['fathercontainer']
    
}
</script>

<style lang="scss" scoped>
.top_tip{
    position: absolute;
	height: 7.35rem;
	width: 3.25rem;
	top: -1.3rem;
    right: 1.6rem;
    // background: url(../images/cloud.png) no-repeat;
    background: olive;
    .num_tip{
        position: absolute;
        bottom: 0.7rem;
        line-height: 0.7rem;
        width: 100%;
        font-size: 0.6rem;
        text-align: center;
        font-family: '黑体';
        font-weight: bold;
    }
}
.container{
    position: relative;
    top: 6.05rem;
    width: 100%;
}
.item_container{
    position: absolute;
    left: 50%;
    margin-left: -8.75rem;
    width: 17.5rem;
    height: 15.5rem;
    background-repeat: no-repeat;
}
.home_logo{
    background: url(../assets/1-2.png);
    background-size: 17.5rem 100%;
}
.button_style{
    display: block;
    width: 7.5rem;
    height: 3.625rem;
    position: absolute;
    top:18.5rem;
    left: 50%;
    margin-left: -3.75rem;
    background-repeat: no-repeat;
    background-size: 7.5rem 100%;
    background-position: top center;
}
.home_button{
    background: url(../assets/1-4.png);
}
</style>