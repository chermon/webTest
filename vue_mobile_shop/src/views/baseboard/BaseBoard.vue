<template>
    <div id="board">
        <!-- 通过$route.meta.keepAlive决定哪些视图页面需要缓存，哪些不需要缓存 -->
        <keep-alive>
           <router-view v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"/>

        <van-tabbar v-model="active" active-color="#75a342">
            <van-tabbar-item replace to="/baseboard/home">
               <span>首页</span>
               <img slot="icon" slot-scope="props" :src="props.active ? home_icon.active : home_icon.inactive" />
            </van-tabbar-item>
            <van-tabbar-item replace to="/baseboard/category">
               <span>分类</span>
               <img slot="icon" slot-scope="props" :src="props.active ? category_icon.active : category_icon.inactive" />
            </van-tabbar-item>
            <van-tabbar-item replace to="/baseboard/cart">
               <span>购物车</span>
               <img slot="icon" slot-scope="props" :src="props.active ? cart_icon.active : cart_icon.inactive" />
            </van-tabbar-item>
            <van-tabbar-item replace to="/baseboard/mine">
               <span>我的</span>
               <img slot="icon" slot-scope="props" :src="props.active ? mine_icon.active : mine_icon.inactive" />
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    name: "BaseBoard",
    data() {
        return {
          active: 0,
          home_icon: {
            active: require('@/images/home_selected.png'),
            inactive: require('@/images/home_default.png'),
          },
          category_icon: {
            active: require('@/images/category_selected.png'),
            inactive: require('@/images/category_default.png'),
          },
          cart_icon: {
            active: require('@/images/shoppingcart_selected.png'),
            inactive: require('@/images/shoppingcart_default.png'),
          },
          mine_icon: {
            active: require('@/images/mine_selected.png'),
            inactive: require('@/images/mine_default.png'),
          }
        }
    },
    mounted(){
    }
}
</script>

<style lang="less" scoped>
#board{
    width: 100%;
    height: 100%;
    background: salmon;
}
</style>