<template>
    <div class="youLikeItemWaper">
        <img class="youLikeImg" :src="product.small_image" :alt="product.name">
        <div class="youLikeDes">
            <p class="youLikeItemTitle">{{product.name}}</p>
            <div class="youLikeItemBottom"></div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        product: Object
    }
}
</script>

<style lang="less" scoped>
.youLikeItemWaper{
    width: 50%;
    margin: 1.25rem 0.625rem;
    float: left;
}

.youLikeImg{
    display: block;
    width: 100%;
}

</style>