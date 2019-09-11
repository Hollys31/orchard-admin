import axios from 'axios'
import router from '@/router.js'
import types from '@/store/constants/types'
const Qs = require('qs')
const CancelToken = axios.CancelToken
axios.defaults.timeout = 10000
export default {
    ajax (context, amount) {
        if(!amount.blankLoading) context.commit(types.APP_SET_LOADING_STATUS, true)
        context.commit(types.APP_SET_LOADING_TIPS, '数据加载中')
        const source = CancelToken.source()

        if(typeof amount === 'string') {
            return send( 'get', amount )
        }else {
            switch(amount.method) {
                case 'get': return send( 'get', amount.url + '?' + Qs.stringify(amount.data) )
                case 'post': return send( 'post', amount.url, Qs.stringify(amount.data, {arrayFormat: 'repeat'}) )
                case 'json': return send( 'post', amount.url, amount.data, 'application/json')
                case 'put': return send( 'put', amount.url, Qs.stringify(amount.data, {arrayFormat: 'repeat'}) )
                case 'delete': return send( 'delete', amount.url, Qs.stringify(amount.data, {arrayFormat: 'repeat'}) )
                case 'form': return send( 'post', amount.url, amount.data, 'application/x-www-form-urlencoded' )
            }
        }

        function send(method, url, data = '', type = '') { //发起网络请求
            let headers = { Authorization: localStorage.getItem('yf_token') }
            if(type) headers['Content-Type'] = type
            return axios({
                method: method,
                url: url,
                data: data,
                cancelToken: source.token,
                headers: headers
            }).then( response => { 
                return callback( response )
            }).catch( error => {
                return errorHandler( error, error.response ? error.response.status : '' )
            })
        }

        function callback(response) { //请求成功回调函数
            response.status = parseInt(response.status)
            if(response.status != 200) {
                stateHandling(response.status)
            }else {
                if(!response.data.data) response.data.data = {}
                response.data.status = parseInt(response.data.status) | 0
                if(response.data.status != 200) {
                    stateHandling(response.data.status, response.data.msg)
                }else {
                    context.commit(types.APP_SET_LOADING_TIPS, '暂无数据')
                }
            }
            context.commit(types.APP_SET_LOADING_STATUS, false)
            return response.data
        }

        function errorHandler(error, status) { //请求失败回调函数
            status = parseInt(status)
            if(/timeout/.test(error.message)) stateHandling('', '请求超时，请刷新重试！')
            else stateHandling(status, error.message)
            context.commit(types.APP_SET_LOADING_STATUS, false)
            return { status: status, msg: error.message, data: {} }
        }

        function stateHandling(status, msg) { //请求失败或服务器错误 状态码处理
            if(status === 999007 || status === 999012) router.push('login') //未登录 | 签名已过期
            if(!msg) {
                switch(status) {
                    case 500: msg = '服务器错误！'; break
                    case 404: msg = '未找到服务器文件！'; break
                    default: msg = '系统异常！'
                }
            }
            context.state.message === msg ? msg += ' ' : msg.trim()
            context.commit(types.APP_SET_MESSAGE, msg)
            context.commit(types.APP_SET_LOADING_TIPS, status + ' ' + msg)
        }
    }
}