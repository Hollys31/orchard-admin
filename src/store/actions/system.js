import api from '@/lib/api'
import types from '@/store/constants/types'

export default {
    [types.SYSTEM_GET_MODULES] (context, amount) { //获取所有模块
        const that = this
        that.dispatch( 'ajax', api.getSystemModules).then(res => {
            if(res.status === 200) {
                res = res.data
                let modules = {
                    titles: ['序号', '子模块名称', '修改管理员', '修改时间', '效果图', '操作'], 
                    values: []
                }
                if(res instanceof Array) {
                    res.forEach((item, i) => {
                        modules.values.push([
                            i + 1,
                            item.productName,
                            item.updateBy,
                            item.updateTime,
                            {type: 'clickText', text: '查看效果图', event: 'einfo', disabled: false},
                            {type: 'buttons', list: [
                                {text: '编辑', class: 'primary', event: 'info', value: item.productId, disabled: false},
                                {text: '删除', class: 'danger', event: 'delete', value: res.productId, disabled: false}
                            ]}
                        ])
                    })
                }
                context.commit(types.SYSTEM_SET_MODULES, modules)
            }
        })
    },

    [types.SYSTEM_GET_MODULE] (context, amount) { //获取单个模块
        const that = this
        that.dispatch( 'ajax', api.getSystemModule + amount).then(res => {
            if(res.status === 200) {
                res = res.data
                context.commit(types.SYSTEM_SET_MODULES, {
                    titles: ['序号', '子模块名称', '修改管理员', '修改时间', '效果图', '操作'], 
                    values: [[
                        1,
                        res.moduleName,
                        res.updateBy,
                        res.updateTime,
                        {type: 'clickText', text: '查看效果图', event: 'einfo', disabled: false},
                        {type: 'buttons', list: [
                            {text: '编辑', class: 'primary', event: 'info', value: res.productId, disabled: false},
                            {text: '删除', class: 'danger', event: 'delete', value: res.productId, disabled: false}
                        ]}
                    ]]
                })
            }
        })
    },

    [types.SYSTEM_GET_OPTIONS] (context, amount) { //获取选项列表
        const that = this
        that.dispatch( 'ajax', api.getSystemOptions).then(res => {
            if(res.status === 200) {
                res = res.data
                let options = [{label: '所有模块', value: ''}]
                if(res instanceof Array) {
                    res.forEach(item => {
                        options.push({label: item.moduleName, value: item.moduleId})
                    })
                }
                context.commit(types.SYSTEM_SET_OPTIONS, options)

            }
        })
    },

    [types.SYSTEM_GET_DETAIL] (context, amount) { //获取系统模块详情
        const that = this
        that.dispatch( 'ajax', {
            method: 'get',
            url: api.getSystemDetail + amount,
            blankLoading: true
        }).then(res => {
            if(res.status === 200) {
                res = res.data
                let detail = []
                context.commit(types.SYSTEM_SET_DETAIL, detail)
            }
        })
    },

    [types.SYSTEM_UPDATE_DETAIL] (context, amount) { //更新系统模块详情
        const that = this
        return that.dispatch( 'ajax', {
            method: 'form',
            url: api.postSystemUpdateDetail,
            data: amount
        })
    },

    [types.SYSTEM_POST_ADD] (context, amount) { //添加系统模块
        const that = this
        return that.dispatch( 'ajax', {
            method: 'form',
            url: api.postSystemAdd,
            data: amount
        })
    },

    [types.SYSTEM_DELETE_MODULES] (context, amount) { //删除系统模块
        const that = this
        return that.dispatch( 'ajax', {
            method: 'delete',
            url: api.deleteSystemDelete + amount
        })
    },
}