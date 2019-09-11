import api from '@/lib/api'
import types from '@/store/constants/types'
function getModuleButton(name, value) {
    switch(name) {
        case '公司简介': return {text: '编辑', class: 'primary', event: 'cp', value: value, disabled: false}
        case '合作伙伴': return {text: '编辑', class: 'primary', event: 'pr', value: value, disabled: false}
        default: return {text: '编辑', class: 'primary', event: 'edit', value: value, disabled: true}
    }
}
function getModuleEffect(name){
    switch(name) {
        case '公司简介': return {type: 'clickText', text: '查看效果图', event: 'ecp', disabled: false}
        case '合作伙伴': return {type: 'clickText', text: '查看效果图', event: 'epr', disabled: false}
        default: return {type: 'clickText', text: '查看效果图', event: 'effect', disabled: true}
    }
}
export default {
    [types.HOME_GET_MODULES] (context, amount) { //获取官网首页管理页面全部模块
        const that = this
        that.dispatch( 'ajax', api.getHomeModules).then(res => {
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
                            item.moduleName,
                            item.updateBy,
                            item.updateTime,
                            getModuleEffect(item.moduleName),
                            {type: 'buttons', list: [getModuleButton(item.moduleName, item.moduleNum)]}
                        ])
                    })
                }
                context.commit(types.HOME_SET_MODULES, modules)
            }
        })
    },

    [types.HOME_GET_MODULE] (context, amount) { //获取官网首页管理页面单个模块
        const that = this
        that.dispatch( 'ajax', api.getHomeModule + amount).then(res => {
            if(res.status === 200) {
                res = res.data
                context.commit(types.HOME_SET_MODULES, {
                    titles: ['序号', '子模块名称', '修改管理员', '修改时间', '效果图', '操作'], 
                    values: [[
                        1,
                        res.moduleName,
                        res.updateBy,
                        res.updateTime,
                        getModuleEffect(res.moduleName),
                        {type: 'buttons', list: [getModuleButton(res.moduleName, res.moduleNum)]}
                    ]]
                })
            }
        })
    },

    [types.HOME_GET_OPTIONS] (context, amount) { //获取选项列表
        const that = this
        that.dispatch( 'ajax', api.getHomeOptions).then(res => {
            if(res.status === 200) {
                res = res.data
                let options = [{label: '所有模块', value: ''}]
                if(res instanceof Array) {
                    res.forEach(item => {
                        options.push({label: item.moduleName, value: item.moduleId})
                    })
                }
                context.commit(types.HOME_SET_OPTIONS, options)

            }
        })
    },

    [types.HOME_GET_COMPANY_PROFILE] (context, amount) { //获取公司简介
        const that = this
        that.dispatch( 'ajax', {
            method: 'get',
            url: api.getHomeCompanyProfile,
            blankLoading: true
        }).then(res => {
            if(res.status === 200) {
                res = res.data
                let companyProfile = [
                    {type: 'textarea', name: 'detailA', default: res.detailA ? res.detailA : '', tip: '请输入一级内容', label: '一级内容'},
                    {type: 'textarea', name: 'detailB', default: res.detailB ? res.detailB : '', tip: '请输入二级内容', label: '二级内容'}
                ]
                context.commit(types.HOME_SET_COMPANY_PROFILE, companyProfile)
            }
        })
    },

    [types.HOME_UPDATE_COMPANY_PROFILE] (context, amount) { //更新公司简介
        const that = this
        return that.dispatch( 'ajax', {
            method: 'put',
            url: api.putHomeCompanyProfile,
            data: amount
        })
    },

    [types.HOME_GET_PARTNER] (context, amount) { //获取全部合作伙伴
        const that = this
        that.dispatch( 'ajax', {
            method: 'get',
            url: api.getHomePartner,
            blankLoading: true
        }).then(res => {
            if(res.status === 200) {
                res = res.data
                let partner = [{type: 'images', name: 'images', default: [], tip: '', label: '合作伙伴logo'}]
                if(res instanceof Array) {
                    res.forEach(item => {
                        partner[0].default.push({
                            url: item.partnerPic, 
                            partnerId: item.partnerId,
                            partnerName: item.partnerName,
                            partnerWebsite: item.partnerWebsite
                        })
                    })
                }
                context.commit(types.HOME_SET_PARTNER, partner)
            }
        })
    },

    [types.HOME_UPDATE_PARTNER] (context, amount) { //更新合作伙伴
        const that = this
        return that.dispatch( 'ajax', {
            method: 'form',
            url: api.postHomePartner,
            data: amount
        })
    },

    [types.HOME_DELETE_PARTNER] (context, amount) { //删除合作伙伴
        const that = this
        return that.dispatch( 'ajax', {
            method: 'delete',
            url: api.deleteHomePartner + amount
        })
    },
}