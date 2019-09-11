import actions from '@/store/actions/about'
import mutations from '@/store/mutations/about'

export default {
    namespaced: true,
    state: {
        modules: {titles: [], values: []}, //模块列表
        options: [], //筛选选项列表
        info: [], //关于我们
        culture: [], //企业文化
        honor: [], //企业荣誉
        team: [], //团队资源
    },
    actions,
    mutations
}