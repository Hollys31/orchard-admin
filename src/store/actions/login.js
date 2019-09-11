import api from '@/lib/api'
import types from '@/store/constants/types'

export default {
    [types.LOGIN_POST_IN] (context, amount) { //登录
        const that = this
        return that.dispatch( 'ajax', {
            method: 'post',
            url: api.postLogin,
            data: { account: amount.account, password: amount.password }
        })
    },
    
    [types.LOGIN_GET_OUT] () { //退出登录
        const that = this
        return that.dispatch( 'ajax', api.getLogout)
    }
}