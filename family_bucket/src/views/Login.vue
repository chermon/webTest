<template>
    <div>
        登录界面
        <cube-form :model="dataModel" :schema="schema" @submit="submitHandler"></cube-form>
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
                        label: '注册'
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
                
            })
        }
    }
}
</script>