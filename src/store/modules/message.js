import actions from '@/store/actions/message'
import mutations from '@/store/mutations/message'

export default {
    namespaced: true,
    state: {
        list: {titles: [], values: []}, //留言列表
        detail: [], //留言详情
    },
    actions,
    mutations
}