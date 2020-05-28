export const ADD_ANSWER_LIST = 'aswer_list'
export const DO_NUM = 'do_num'

export default {
    [ADD_ANSWER_LIST]: function (state,id){
        state.answerid.push(id);
    },
    [DO_NUM]: function (state){
        state.currentQueNum += 1;
    }
}