<template>
    <div id="selectLogin">
        <div class="bgImg">
            <img src="./images/lk_logo_sm.png" alt=""/>
        </div>
        <h3>选择登录方式</h3>
        <router-link tag="button" class="loginBtn" to="/login">手机登录</router-link>

    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
#selectLogin{
    width: 100%;
    height: 100%;
    background: #f5f5f5;
}
.bgImg{
    width: 300px;
    margin-top: 130px;
    margin-bottom: 50px;
    position: relative;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

}
.bgImg img{
    display: block;
    width: 300px;
}
h3{
    margin: 2rem 0;
    text-align: center;
}
.loginBtn{
    width: 80%;
    height: 38px;
    background-color: #2eba5a;
    font-size: 20px;
    border: none;
    border-radius: 5px;
    color: white;
    margin-left:10%;
    
}
</style>