import actions from '@/store/actions/system'
import mutations from '@/store/mutations/system'

export default {
    namespaced: true,
    state: {
        modules: {titles: [], values: []}, //模块列表
        options: [], //筛选选项列表
        detail: [], //系统模块详情
    },
    actions,
    mutations
}