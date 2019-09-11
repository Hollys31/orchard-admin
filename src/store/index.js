import Vue from 'vue'
import Vuex from 'vuex'
import mutations from '@/store/mutations'
import modules from '@/store/modules'
import actions from '@/store/actions'
Vue.use(Vuex)
const userInfo = JSON.parse(localStorage.getItem('user_info'))
export default new Vuex.Store({
    state: {
        loading: false, // loading的状态
        loadTips: '数据加载中', //数据加载提示信息
        message: '', //app信息
        refreshState: 0, //刷新页面状态
        menuInOut: true, //菜单打开关闭
        breadcrumb: [], //顶部面包屑导航
        userInfo: userInfo ? userInfo : {name: 'Admin', photo: 'http://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', date: '2019-09-01'}, //用户信息
        pageSize: 10, //默认分页大小
        windowResizeState: 0, //窗口大小变化状态
        windowSize: { width: 0, height: 0, rm: 0 }, //窗口大小
        router: {to: '', from: ''} //路由信息
    },
    mutations,
    modules,
    actions
})
