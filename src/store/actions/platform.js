import api from '@/lib/api'
import types from '@/store/constants/types'

export default {
    [types.PLATFORM_GET_MODULES] (context, amount) { //获取所有模块
        const that = this
        that.dispatch( 'ajax', api.getPlatformModules).then(res => {
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
                context.commit(types.PLATFORM_SET_MODULES, modules)
            }
        })
    },

    [types.PLATFORM_GET_MODULE] (context, amount) { //获取单个模块
        const that = this
        that.dispatch( 'ajax', api.getPlatformModule + amount).then(res => {
            if(res.status === 200) {
                res = res.data
                context.commit(types.PLATFORM_SET_MODULES, {
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

    [types.PLATFORM_GET_OPTIONS] (context, amount) { //获取选项列表
        const that = this
        that.dispatch( 'ajax', api.getPlatformOptions).then(res => {
            if(res.status === 200) {
                res = res.data
                let options = [{label: '所有模块', value: ''}]
                if(res instanceof Array) {
                    res.forEach(item => {
                        options.push({label: item.moduleName, value: item.moduleId})
                    })
                }
                context.commit(types.PLATFORM_SET_OPTIONS, options)

            }
        })
    },

    [types.PLATFORM_GET_DETAIL] (context, amount) { //获取平台详情
        const that = this
        that.dispatch( 'ajax', {
            method: 'get',
            url: api.getPlatformDetail + amount,
            blankLoading: true
        }).then(res => {
            if(res.status === 200) {
                res = res.data
                let detail = []
                context.commit(types.PLATFORM_SET_DETAIL, detail)
            }
        })
    },

    [types.PLATFORM_UPDATE_DETAIL] (context, amount) { //更新平台详情
        const that = this
        return that.dispatch( 'ajax', {
            method: 'form',
            url: api.postPlatformUpdateDetail,
            data: amount
        })
    },

    [types.PLATFORM_POST_ADD] (context, amount) { //添加平台
        const that = this
        return that.dispatch( 'ajax', {
            method: 'form',
            url: api.postPlatformAdd,
            data: amount
        })
    },

    [types.PLATFORM_DELETE_MODULES] (context, amount) { //删除平台
        const that = this
        return that.dispatch( 'ajax', {
            method: 'delete',
            url: api.deletePlatformDelete + amount
        })
    },
}