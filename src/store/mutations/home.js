import types from '@/store/constants/types'
export default {
    //设置官网首页管理页面模块列表
    [types.HOME_SET_MODULES] (state, payload) {
        state.modules = payload
    },

    //设置选项列表
    [types.HOME_SET_OPTIONS] (state, payload) {
        state.options = payload
    },

    //设置公司简介
    [types.HOME_SET_COMPANY_PROFILE] (state, payload) {
        state.companyProfile = payload
    },

    //设置全部合作伙伴
    [types.HOME_SET_PARTNER] (state, payload) {
        state.partner = payload
    }
}