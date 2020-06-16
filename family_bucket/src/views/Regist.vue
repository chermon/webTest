<template>
    <div>
        注册界面
        <cube-form :model="dataModel" :schema="schema" @submit="submitHandler"></cube-form>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            dataModel: {
                username: '',
                password: ''
            },
            schema: {
                fields: [
                    {
                        type: 'input',
                        modelKey: 'username',
                        label: '用户名',
                        props: {
                            placeholder: '请输入用户名'
                        },
                        rules: {
                            //校验规则
                            required: true,
                            type: 'string',
                            min: 3,
                            max: 15
                        },
                        //什么时候进行校验
                        trigger: 'blur', //光标离开
                        messages: {
                            required: '用户名不能为空',
                            min: '用户名不能少于3个字符',
                            max: '用户名不能大于15个字符'
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
        submitHandler(event){
            event.preventDefault();
            this.$http.get('/api/register',{
                params: this.dataModel
            })
            .then(response => {
                console.log(response.data.message);
            })
            .catch(err => {
                console.log('尽力啊~~~');
                console.log(err);
            })
        }
    }
}
</script>