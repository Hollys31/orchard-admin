import types from '@/store/constants/types'
export default {
    //设置模块列表
    [types.ABOUT_SET_MODULES] (state, payload) {
        state.modules = payload
    },

    //设置选项列表
    [types.ABOUT_SET_OPTIONS] (state, payload) {
        state.options = payload
    },

    //设置关于我们
    [types.ABOUT_SET_INFO] (state, payload) {
        state.info = payload
    },

    //设置企业文化
    [types.ABOUT_SET_CULTURE] (state, payload) {
        state.culture = payload
    },

    //设置裕丰荣誉
    [types.ABOUT_SET_HONOR] (state, payload) {
        state.honor = payload
    },

    //设置团队资源
    [types.ABOUT_SET_TEAM] (state, payload) {
        state.team = payload
    }
}