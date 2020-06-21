<template>
    <section class="bg">
        <header>
            <span class="score">{{this.score}}</span>
            <p class="scoredes">{{this.scoreTips}}</p>
        </header>
    </section>
</template>
<script>
import {mapState} from 'vuex'
import func from '../../vue-temp/vue-editor-bridge'
export default {
    data: function (){
        return {
            score:0,
            rightAnswers:[2,7,12,13,18],
            scoreTips:'', //分数提示
            scoreTipsArr:['你说，是不是把知识都还给小学老师了？','还不错，但还需要继续加油哦！','不要嘚瑟还有进步的空间！','智商离爆表只差一步了！','你也太聪明啦，葡萄之家欢迎你！'],
        }
    },
    computed:{
        ...mapState(['answerid'])
    },
    created: function (){
        this.allGrade();
    },
    methods:{
        allGrade: function(){
            this.answerid.forEach((item,index) => {
                if(item == this.rightAnswers[index]){
                    this.score += 20;
                    // console.log('循环');
                }
            });

           let scoreNum = Math.ceil(this.score/20);
           this.scoreTips = this.scoreTipsArr[scoreNum];
            // console.log('跳出');
        }
    }

    
}
</script>

<style lang="scss" scoped>
.bg{
    width: 100%;
    height: 100%;
    background: url(../assets/4-1.jpg) no-repeat;
    background-size: cover;
    padding-top:3rem;
    position: relative;
    header{
        width: 17rem;
        height: 15.94rem;
        margin: 0px auto;
        background: url(../assets/4-2.png) no-repeat;
        background-size: contain;
        position: relative;
        .score{
            width: 16rem;
            line-height: 3rem;
            text-align: center;
            position: absolute;
            top: 8.5rem;
            left: 1rem;
            font-size: 42px;
            font-weight: bold;
            color: orangered;
        }
        .scoredes{
            width: 14rem;
            line-height: 1.5rem;
            font-size: 18px;
            text-align: center;
            position: absolute;
            top: 12rem;
            left: 2rem;
            color: gray;
        }
    }
}
</style>