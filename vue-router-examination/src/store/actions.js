import {ADD_ANSWER_LIST, DO_NUM} from './mutations'

export default {
    submitAnswer: function ({commit,state},id){
        commit(ADD_ANSWER_LIST,id);
        if(state.currentQueNum < state.questionList.length ){
            commit(DO_NUM);
        }
    }
}