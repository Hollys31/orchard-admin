import types from '@/store/constants/types'
export default {
    //设置app数据加载状态
    [types.APP_SET_LOADING_STATUS] (state, payload) { //Bool
        state.loading = payload
    },

    //设置app加载中的提示信息
    [types.APP_SET_LOADING_TIPS] (state, payload) { //String
        state.loadTips = payload
    },

    //设置app通知消息
    [types.APP_SET_MESSAGE] (state, payload) { //String
        state.message = payload
    },

    //设置app页面刷新状态
    [types.APP_SET_REFRESH_STATUS] (state) {
        state.refreshState++
    },
    
    //获取当前窗口大小
    [types.APP_GET_WINDOWS_SIZE] (state) {
        const width = window.innerWidth
        const height = window.innerHeight
        const rm = parseInt(width / 192)
        state.windowSize = {
            width: width,
            height: height,
            rm: rm
        }
        document.documentElement.setAttribute('style', 'font-size: ' + (rm * 10) + 'px;')
        state.windowResizeState++
    },

    //打开关闭菜单
    [types.APP_CHANGE_MENU_INOUT] (state) {
        state.menuInOut = !state.menuInOut
        state.windowResizeState++
    },

    //设置面包屑导航
    [types.APP_SET_BREADCRUMB] (state, payload) {
        state.breadcrumb = payload
    },

    //设置路由
    [types.APP_SET_ROUTER] (state, payload) {
        state.router = payload
    },
    
    //设置当前登录用户的信息
    [types.APP_SET_USER_INFO] (state, payload) {
        state.userInfo = payload
    },
}