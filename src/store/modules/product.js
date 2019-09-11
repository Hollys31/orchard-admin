import actions from '@/store/actions/product'
import mutations from '@/store/mutations/product'

export default {
    namespaced: true,
    state: {
        modules: {titles: [], values: []}, //模块列表
        options: [], //筛选选项列表
        info: [], //产品信息
        detail: [], //产品详情
    },
    actions,
    mutations
}