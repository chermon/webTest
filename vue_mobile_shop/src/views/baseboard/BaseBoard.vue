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
          active: Number(sessionStorage.getItem('selectedTabBarIndex')),
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
    /**
     * - computed 和 watch 的区别：
     *   1.computed是计算出一个新的属性，并将该属性挂在到vue实例上，
     *     而watch则是监听一个已经存在的且已经挂在到vue实例上的数据。所以watch也可以监听computed计算属性的变化，还有data、props.
     *   2.computed能做到的事情watch一定也能做到，反之则不行。
     *   3.能用computed的地方尽量使用computed。
     *   4.computed是个惰性求值的观察者，具有缓存性，只有当依赖发生变化后，第一次访问computed属性才会计算新的值。
     *     而watch是当数据发生便会就会调用执行函数。
     *   5.从使用场景上说，computed适用一个数据被多个数据影响，而watch使用一个数据影响多个数据。
     * */ 
    // computed:{
    //   activeState(){
    //     let str = "我发现了active变化为了:"+ this.active;
    //     console.log(str);
    //     return str;
    //   }
    // },
    watch:{
      active(value){
        sessionStorage.setItem('selectedTabBarIndex',value);
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
    background: #f5f5f5;
}
</style>