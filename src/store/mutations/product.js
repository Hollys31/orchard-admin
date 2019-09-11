import types from '@/store/constants/types'
export default {
    //设置模块列表
    [types.PRODUCT_SET_MODULES] (state, payload) {
        state.modules = payload
    },

    //设置选项列表
    [types.PRODUCT_SET_OPTIONS] (state, payload) {
        state.options = payload
    },

    //设置产品信息
    [types.PRODUCT_SET_INFO] (state, payload) {
        state.info = payload
    },

    //设置产品详情
    [types.PRODUCT_SET_DETAIL] (state, payload) {
        state.detail = payload
    },
}