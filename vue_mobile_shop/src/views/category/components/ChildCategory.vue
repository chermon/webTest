<template>
    <div class="childCategoryWrapper">
        <div class="sectionCategory" v-for="item in cateContent" :key="item.id">
            <div class="sectionTitle">{item.name}</div>
            <div class="sectionContent">
                <ProductItem v-for="goods  in item" :key="goods.id" :goods='goods'></ProductItem>
            </div>
        </div>
    </div>
</template>

<script>
import ProductItem from './ProductItem'
export default {
    props:{
        cateContent:Array
    },
    components:{
        ProductItem
    },
    mounted(){
        console.log(this.cateContent);
    }
}
</script>

<style lang="less" scoped>
.childCategoryWrapper{
    width: 100%;
    height: 100%;
    padding: 0 0.3125rem;
    box-sizing: border-box;
    background: #FFF;
}
.sectionTitle{
    padding: 0.625rem 0 ;
    height: 1.25rem;
    line-height: 1.25rem;
    font-size: 0.75rem;
    background: #FFF;
    color: #666666;
    border-bottom: 1px solid #E6E6E6;
}
// .sectionContent{

// }
</style>