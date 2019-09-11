import types from '@/store/constants/types'
export default {
    //设置模块列表
    [types.SYSTEM_SET_MODULES] (state, payload) {
        state.modules = payload
    },

    //设置选项列表
    [types.SYSTEM_SET_OPTIONS] (state, payload) {
        state.options = payload
    },

    //设置系统模块详情
    [types.SYSTEM_SET_DETAIL] (state, payload) {
        state.detail = payload
    },
}