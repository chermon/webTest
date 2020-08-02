<template>
    <div id="login">
       <div class="loginInner">
           <div class="loginIcon">
               <img src="./images/lk_logo_sm.png" alt="">
           </div>
           <div class="loginHead">
               <a href="javascript:" :class="{current: isPhoneLogin}" @click="changeLoginPattern(true)">手机登录</a>
               <a href="javascript:" :class="{current: !isPhoneLogin}" @click="changeLoginPattern(false)">密码登录</a>
           </div>
           <div class="loginContent">
             <form>
               <!-- 手机号登录 -->
                <div class="phoneLoginBg" v-show="isPhoneLogin">
                    <section>
                        <input type="number" maxlength="11" placeholder="手机号"/>
                        <button >获取验证码</button>
                        <button>已发送（{{downCount}}）s</button>
                    </section>
                </div>
                <!-- 密码登录 -->
                <div class="passwordLoginBg" v-show="!isPhoneLogin">
                    我是账号密码
                </div>
             </form>
           </div>
       </div>
       
    </div>
</template>

<script>
export default {
    name: "Login",
    data(){
        return {
            isPhoneLogin: true,//是否是手机号登录
            downCount:60
        }
    },
    methods:{
        // - 切换登录方式
        changeLoginPattern(isByPhone){
            this.isPhoneLogin = isByPhone;
        }
    }

}
</script>

<style lang="less" scoped>
.loginInner{
    width: 80%;
    margin: 0 auto;
}
.loginIcon{
    margin: 4rem 0 2rem;
    width: 300px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
}
.loginIcon img{
    display: block;
    width: 300px;
}
.loginHead{
    text-align: center;
}
.loginHead a{
    color: #333;
    margin:0 1rem;
    padding-bottom: 4px;
}
.loginHead a.current{
    color: #75a342;
    font-weight: bold;
    border-bottom: 2px solid #75a342;
}
// .loginContent .phoneLoginBg section{
//     width: ;
// }
</style>