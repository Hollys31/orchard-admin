import actions from '@/store/actions/home'
import mutations from '@/store/mutations/home'

export default {
    namespaced: true,
    state: {
        modules: {titles: [], values: []}, //模块列表
        options: [], //筛选选项列表
        companyProfile: [], //公司简介
        partner: [], //合作伙伴
    },
    actions,
    mutations
}