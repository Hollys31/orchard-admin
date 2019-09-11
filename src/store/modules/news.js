import actions from '@/store/actions/news'
import mutations from '@/store/mutations/news'

export default {
    namespaced: true,
    state: {
        list: {titles: [], values: []}, //新闻列表
        times: {}, //新闻筛选时间段
        detail: [], //新闻详情
    },
    actions,
    mutations
}