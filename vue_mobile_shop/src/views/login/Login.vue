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
                    <section class="tel">
                        <input class="telInput" type="number" maxlength="11" placeholder="手机号" v-model="phone"/>
                        <button class="codeBtn" v-if="!downCount" @click.prevent="gaintVetifyCode()">获取验证码</button>
                        <button class="codeBtn" v-else>已发送（{{downCount}}）s</button>
                    </section>
                    <section>
                        <input class="codeInput" type="number" maxlength="6" placeholder="验证码" v-model="verifyCode"/>
                    </section>
                    <section class="loginHint">
                        温馨提示：测试账号请输入手机号码，获取验证码，验证码均为666666
                        <a href="javascript:;">采用微信扫码支付</a>
                    </section>
                    <button class="loginBtn" @click.prevent="handleLogin()">登录</button>
                    <button class="backBtn" @click.prevent="handleBackAction()">返回</button>
                </div>
                <!-- 密码登录 -->
                <div class="passwordLoginBg" v-show="!isPhoneLogin">
                    <section >
                        <input class="nickInput" type="tel" maxlength="11" placeholder="用户名" v-model="userName"/>
                    </section>
                    <section class="passwordSec">
                        <input class="passwordInput" type="password" maxlength="20" placeholder="密码" autocomplete="off" v-model="passward"/>
                        <div class="switch-show">
                            <img v-if="!isShowPwd" src="./images/hide_pwd.png"  alt="" width="20" @click='handlePwdShowState(true)'>
                            <img v-else src="./images/show_pwd.png"  alt="" width="20" @click='handlePwdShowState(false)'>
                        </div>
                    </section>
                    <section>
                        <input class="codeInput" type="text" maxlength="4" placeholder="验证码" v-model="captcha"/>
                        <img class="captcha" src="http://demo.itlike.com/web/xlmc/api/captcha?" alt="">
                    </section>
                    <button class="loginBtn" @click.prevent="handleLogin()">登录</button>
                    <button class="backBtn" @click.prevent="handleBackAction()">返回</button>
                </div>
             </form>
           </div>
       </div>
       
    </div>
</template>

<script>
// 1. 请求首页数据
import {getVerityCodeData, getLoginByCodeData, getLoginUserPwdData} from './../../service/index'
// 2. 提示
import {Toast} from 'vant'

import {SAVE_USERINFOR} from '@/store/mutations-type.js'

export default {
    name: "Login",
    data(){
        return {
            isPhoneLogin: true, //是否是手机号登录
            isShowPwd: false, //是否显示密码
            downCount: 0, //倒计时
            phone: null, //手机号
            verifyCode: null, //验证码

            userName: null, //用户名
            passward: null, //密码
            captcha: null, //图形验证码
        }
    },
    computed:{
        //手机号是否正确
        phoneRight(){
            return (/^1[3456789]\d{9}$/.test(this.phone));
        }
    },
    methods:{
        // - 切换登录方式
        changeLoginPattern(isByPhone){
            this.isPhoneLogin = isByPhone;
        },
        // - 显示或者隐藏密码
        handlePwdShowState(showPwd){
            this.isShowPwd = showPwd;
        },
        handleBackAction(){
            this.$router.back(-1);
        },
        // - 登录
        async handleLogin(){
            
            if(this.isPhoneLogin){//验证码登录
               if(!this.phoneRight){
                   Toast({
                       message: "请输入正确的手机号！",
                       duration: 500
                   });
                   return;
               }
               else if (!(/^\d{6}$/gi.test(this.verifyCode))){
                   Toast({
                       message: '请输入正确的验证码',
                   });
                   return;
               }
 
               let response = await getLoginByCodeData(this.phone, this.verifyCode);
               if(response.success_code == 200){
                   this.$store.commit(SAVE_USERINFOR, response.data);
                   // 4.2 回到主面板
                   this.$router.back();
               }
               else{
                   Toast({
                       message: '手机号或者验证码错误！',
                       duration: 500
                   });
               }
            }
            else{//密码登录
                if(!this.userName){
                    Toast({
                        message: '请输入用户名！',
                        duration: 500
                    });
                    return;
                }else if(!this.passward){
                    Toast({
                        message: '请输入密码！',
                        duration: 500
                    });
                    return;
                } else if(!this.captcha){
                    Toast({
                        message: '请输入验证码！',
                        duration: 500
                    });
                    return;
                }

                let response = await getLoginUserPwdData(this.userName, this.passward, this.captcha);
                console.log(response);
                


            }
        },
        // - 获取验证码
        async gaintVetifyCode(){
            if(this.phoneRight){
                // 倒计时
                this.downCount = 60;
                this.downCountTime = setInterval(() => {
                    this.downCount--;
                    if(this.downCount == 0){
                        clearInterval(this.downCountTime);
                    }
                },1000);
                let response = await getVerityCodeData(this.phone);
                console.log(response);
            }else{
                Toast("手机号有误，请重填!");
                return;
            }
            
        },
        
    },
}
</script>

<style lang="less" scoped>
.login{
    width: 100%; 
    height: 100%;
    background: #fff;
}
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
.loginContent{
    margin-top: 2rem;
}
.loginContent .phoneLoginBg .tel{
    position: relative;
}
.loginContent .phoneLoginBg .telInput{
    width: 100%;
    height: 2.5rem;
    padding-right: 5rem;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: Arial;
    font-size: 14px;
    padding-left: 8px;
}
.loginContent .phoneLoginBg .codeBtn{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    font-size: 14px;
    background: transparent;
}
.loginContent .phoneLoginBg .codeInput{
    margin-top: 1rem;
    width: 100%;
    height: 2.5rem;
    padding-left: 8px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: Arial;
    font-size: 14px;
}
.loginContent .phoneLoginBg .loginHint{
    margin: 12px 0 2rem;
    color: #999;
    font-size: 12px;
    line-height: 20px;
}
.loginContent .phoneLoginBg .loginHint a{
    color: #75a342;
}
.loginContent .loginBtn{
    width: 100%;
    height: 2.5rem;
    background: #75a342;
    color: #ffffff;
    border: none;
    margin: 1rem 0 1rem;
    border-radius: 5px;
}
.loginContent .backBtn{
    width: 100%;
    height: 2.5rem;
    background: #ffffff;
    color: #75a342;
    border: 1px solid #75a342;
    border-radius: 5px;
}
.loginContent .passwordLoginBg section{
    margin-bottom: 1rem;
    position: relative;
}
.loginContent .passwordLoginBg input{
    width: 100%;
    height: 2.5rem;
    padding-left: 8px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: Arial;
    font-size: 14px;
}
.loginContent .passwordLoginBg input.passwordInput{
   padding-right: 2rem;
}
.loginContent .passwordLoginBg .passwordSec .switch-show{
    width: 2rem;
    height: 2.5rem;
    position: absolute;
    right: 0;
    top: 0;
    text-align: center;
    line-height: 2.5rem;
}
.loginContent .passwordLoginBg .codeInput{
    box-sizing: border-box;
    padding-right: 7.5rem;
}
.loginContent .passwordLoginBg .captcha{
    position: absolute;
    right: 0;
    top: 0;
    display: block;
    height: 2.5rem;
}

</style>