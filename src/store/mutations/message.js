import types from '@/store/constants/types'
export default {
    //设置留言列表
    [types.MESSAGE_SET_LIST] (state, payload) {
        state.list = payload
    },

    //留言详情
    [types.MESSAGE_SET_DETAIL] (state, payload) {
        state.detail = payload
    },
}