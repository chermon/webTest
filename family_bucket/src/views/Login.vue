<template>
    <div>
         <img class="headerimg" src="https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png" alt="">
        <cube-form :model="dataModel" :schema="schema" @submit.prevent="submitHandler"></cube-form>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            dataModel:{
                username: '',
                password: ''
            },
            schema:{
                fields:[
                    {
                        type: "input",
                        modelKey: 'username',
                        label: '用户名',
                        props:{
                            placeholder: '请输入用户名'
                        },
                        rules:{
                            required: true,
                            type: 'string',
                            max: 15,
                            min: 3
                        },
                        trigger: 'blur',
                        messages:{
                            required: '用户名不能为空',
                            max: '长度不能超过15个字符',
                            min: '长度不能小于3个字符'
                        }
                    },
                    //密码配置
                    {
                        type: 'input',
                        modelKey: 'password',
                        label: '密码',
                        props: {
                            placeholder: '请输入密码',
                            type: 'password',
                            eye: {
                                open: false
                            }
                        },
                        rules:{
                            required: true,
                        },
                        messages: {
                            required: '密码不能为空'
                        },
                        trigger: 'blur'
                    },
                    {
                        type: 'submit',
                        label: '登录'
                    }
                ]
            }

        }
    },
    methods: {
        submitHandler(){
            this.$http.get('/api/login',{
                params: this.dataModel
            })
            .then(response => {
                if (response.code == '0'){
                    this.$store.commit('gainToken', response.token);
                    // 持久化本地保存
                    window.localStorage.setItem('token', response.token);
                    this.$router.replace({path:'/home/schoolroom'});
                }
                else{
                    alert(response.message);
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
img{
    // display: block;
    width: 100%;
    height: 200px;

}
</style>