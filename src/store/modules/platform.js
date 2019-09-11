import actions from '@/store/actions/platform'
import mutations from '@/store/mutations/platform'

export default {
    namespaced: true,
    state: {
        modules: {titles: [], values: []}, //模块列表
        options: [], //筛选选项列表
        detail: [], //平台详情
    },
    actions,
    mutations
}