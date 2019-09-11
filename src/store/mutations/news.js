import types from '@/store/constants/types'
export default {
    //设置新闻列表
    [types.NEWS_SET_LIST] (state, payload) {
        state.list = payload
    },

    //新闻筛选时间段
    [types.NEWS_SET_TIMES] (state, payload) {
        state.times = payload
    },

    //新闻详情
    [types.NEWS_SET_DETAIL] (state, payload) {
        state.detail = payload
    },
}