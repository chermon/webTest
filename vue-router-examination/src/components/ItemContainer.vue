<template>
    <section>
        <header class="top_tip">
           <span v-if="fathercontainer == 'home' " class="num_tip">{{week}}</span>
           <span v-else-if="fathercontainer == 'subject'" class="num_tip">题目{{currentQueNum}}</span>
        </header>
        <div v-if="fathercontainer == 'home'" class="container">
            <div class="home_logo item_container"></div>
            <router-link class="button_style home_button" to="/subject"></router-link>
        </div>
        <div v-if="fathercontainer == 'subject'" class="container">
            <div class="subject_logo item_container">
                <ul class="subject_container">
                    <li class="subject_item" v-for="(item,index) in questionList[currentQueNum-1].topic_answer" :key="item.topic_answer_id" @click="choosed(index,item.topic_answer_id)" :class="currentChooseIndex == index ? 'item_cur':''">
                        <span class="item_no">{{convertNo(index)}}</span>
                        <span class="item_conten">{{item.answer_name}}</span>
                    </li>
                </ul>
            </div>
            <span v-if="currentQueNum == questionList.length" class="button_style subject_button" @click="submitAcion"></span>
            <span v-else class="button_style submit_button" @click="submitAcion"></span>
        </div>
    </section>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    data: function (){
        return {currentChooseIndex: null, currentChooseId: null};
    },
    props:['fathercontainer'],
    computed:{
        ...mapState(['currentQueNum','questionList','week'])
    },
    methods:{
        ...mapActions(['submitAnswer']),
        convertNo: function (index){
            switch (index){
                case 0:
                    return 'A';
                case 1:
                    return 'B';
                case 2:
                    return 'C';
                case 3:
                    return 'D';
                default:
                    break;
            }
        },
        choosed: function (index, choosedId){
            this.currentChooseIndex = index;
            this.currentChooseId = choosedId;
        },
        submitAcion: function (){
            if(this.currentChooseIndex != null){
                this.currentChooseIndex = null;
                this.submitAnswer(this.currentChooseId);
            }
            else{
                alert('您还没提交答案哦！');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.top_tip{
    position: absolute;
	height: 17.05rem;
	width: 9.75rem;
	top: -6.9rem;
    right: 0.6rem;
    background: url(../images/cloud.png) no-repeat;
    background-size: 9.75rem 100%;
    .num_tip{
        position: absolute;
        bottom: 0.7rem;
        line-height: 5rem;
        width: 100%;
        font-size: 0.6rem;
        text-align: center;
        font-family: '黑体';
        font-weight: bold;
        font-size: 16px;
        color: orangered;
    }
}
.container{
    position: relative;
    top: 6.05rem;
    width: 100%;
}
.item_container{
    position: absolute;
    width: 21rem;
    height: 19.25rem;
    left: 2.25rem;
    top: 2rem;
    background-repeat: no-repeat;
    background-size: contain;
}
.home_logo{
    background-image: url(../assets/1-2.png);
}
.subject_logo{
    background-image: url(../assets/2-1.png);
}
.button_style{
    display: block;
    width: 7.5rem;
    height: 3.625rem;
    position: absolute;
    top:20.5rem;
    left: 50%;
    margin-left: -3.75rem;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: top center;
}
.home_button{
    background-image: url(../assets/1-4.png);
}
.subject_button{
    background-image: url(../assets/2-2.png);
}
.subject_container{
    position: absolute;
    top: 3.5rem;
    left: 4rem;
    width: 60%;
    .subject_item{
        width: 100%;
        height: 2rem;
        position: relative;
        color: rgb(230, 219, 219);
        .item_no{
            position: absolute;
            left: 1rem;
            top: 0.5rem;
            width: 1rem;
            height: 1rem;
            border: 1px solid white;
            border-radius: 50%;
            font-size: 10px;
            line-height: 1rem;
            text-align: center;
        }
        .item_conten{
            position: absolute;
            left: 3rem;
            line-height: 2rem;
        }
    
    }
    .item_cur .item_no{
        border: 1px solid orangered;
        background: orangered;
    }
    
}


</style>