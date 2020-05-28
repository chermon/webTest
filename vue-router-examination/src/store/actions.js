import {ADD_ANSWER_LIST, DO_NUM} from './mutations'

export default {
    submitAnswer: function ({commit,state},id){
        console.log("奥利给");
        commit(ADD_ANSWER_LIST,id);
        if(state.currentQueNum < state.questionList.length ){
            commit(DO_NUM);
        }
    }
}