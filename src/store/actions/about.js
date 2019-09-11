import api from '@/lib/api'
import types from '@/store/constants/types'
function getModuleButton(name, value) {
    switch(name) {
        case '关于我们': return {text: '编辑', class: 'primary', event: 'info', value: value, disabled: false}
        case '企业文化': return {text: '编辑', class: 'primary', event: 'culture', value: value, disabled: false}
        case '团队资质': return {text: '编辑', class: 'primary', event: 'team', value: value, disabled: false}
        case '裕丰荣耀': return {text: '编辑', class: 'primary', event: 'honor', value: value, disabled: false}
        default: return {text: '编辑', class: 'primary', event: 'edit', value: value, disabled: true}
    }
}
function getModuleEffect(name){
    switch(name) {
        case '关于我们': return {type: 'clickText', text: '查看效果图', event: 'einfo', disabled: false}
        case '企业文化': return {type: 'clickText', text: '查看效果图', event: 'eculture', disabled: false}
        case '团队资质': return {type: 'clickText', text: '查看效果图', event: 'eteam', disabled: false}
        case '裕丰荣耀': return {type: 'clickText', text: '查看效果图', event: 'ehonor', disabled: false}
        default: return {type: 'clickText', text: '查看效果图', event: 'effect', disabled: true}
    }
}
export default {
    [types.ABOUT_GET_MODULES] (context, amount) { //获取所有模块
        const that = this
        that.dispatch( 'ajax', api.getAboutModules).then(res => {
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
                context.commit(types.ABOUT_SET_MODULES, modules)
            }
        })
    },

    [types.ABOUT_GET_MODULE] (context, amount) { //获取单个模块
        const that = this
        that.dispatch( 'ajax', api.getAboutModule + amount).then(res => {
            if(res.status === 200) {
                res = res.data
                context.commit(types.ABOUT_SET_MODULES, {
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

    [types.ABOUT_GET_OPTIONS] (context, amount) { //获取选项列表
        const that = this
        that.dispatch( 'ajax', api.getAboutOptions).then(res => {
            if(res.status === 200) {
                res = res.data
                let options = [{label: '所有模块', value: ''}]
                if(res instanceof Array) {
                    res.forEach(item => {
                        options.push({label: item.moduleName, value: item.moduleId})
                    })
                }
                context.commit(types.ABOUT_SET_OPTIONS, options)

            }
        })
    },

    [types.ABOUT_GET_INFO] (context, amount) { //获取关于我们
        const that = this
        that.dispatch( 'ajax', {
            method: 'get',
            url: api.getAboutInfo,
            blankLoading: true
        }).then(res => {
            if(res.status === 200) {
                res = res.data
                let info = [
                    {type: 'input', name: 'titleA', default: res.titleA ? res.titleA : '', tip: '请输入一级标题', label: '一级标题'},
                    {type: 'input', name: 'titleB', default: res.titleB ? res.titleB : '', tip: '请输入二级标题', label: '二级标题'},
                    {type: 'textarea', name: 'detailA', default: res.detailA ? res.detailA : '', tip: '请输入左一级内容', label: '左一级内容'},
                    {type: 'textarea', name: 'detailB', default: res.detailB ? res.detailB : '', tip: '请输入右二级内容', label: '右二级内容'}
                ]
                context.commit(types.ABOUT_SET_INFO, info)
            }
        })
    },

    [types.ABOUT_GET_CULTURE] (context, amount) { //获取企业文化
        const that = this
        that.dispatch( 'ajax', {
            method: 'get',
            url: api.getAboutCulture,
            blankLoading: true
        }).then(res => {
            if(res.status === 200) {
                res = res.data
                let culture = [
                    {type: 'textarea', name: 'titleA', default: res.titleA ? res.titleA : '', tip: '请输入模块描述', label: '模块描述'},
                    {
                        type: 'table', 
                        name: 'cultrues', 
                        titles: ['企业文化名称', '企业文化描述'],
                        default: [['', '', 0, 1], ['', '', 0, 2], ['', '', 0, 3], ['', '', 0, 4], ['', '', 0, 5]], 
                        label: '企业文化'
                    }
                ]
                if(res.cultrues instanceof Array) {
                    res.cultrues.forEach((item, i) => {
                        culture.default[i][0] = item.cultureName
                        culture.default[i][1] = item.cultureDetail
                        culture.default[i][2] = item.cultureId
                    })
                }

                context.commit(types.ABOUT_SET_CULTURE, culture)
            }
        })
    },

    [types.ABOUT_GET_HONOR] (context, amount) { //获取裕丰荣誉
        const that = this
        that.dispatch( 'ajax', {
            method: 'get',
            url: api.getAboutHonor,
            blankLoading: true
        }).then(res => {
            if(res.status === 200) {
                res = res.data
                let honor = [{
                    type: 'table', 
                    name: 'honours', 
                    titles: ['裕丰荣誉'],
                    default: [], 
                    label: '裕丰荣誉',
                    delete: true,
                    add: true
                }]
                if(res instanceof Array) {
                    res.forEach(item => {
                        honor[0].default.push([item.honourDetail, item.honourId])
                    })
                }
                context.commit(types.ABOUT_SET_HONOR, honor)
            }
        })
    },

    [types.ABOUT_GET_TEAM] (context, amount) { //获取团队资质
        const that = this
        that.dispatch( 'ajax', {
            method: 'get',
            url: api.getAboutTeam,
            blankLoading: true
        }).then(res => {
            if(res.status === 200) {
                res = res.data
                let team = [
                    {type: 'textarea', name: 'detailA', default: res.detailA ? res.detailA : '', tip: '请输入模块描述', label: '模块描述'},
                    {
                        type: 'table', 
                        name: 'qualifications', 
                        titles: ['资质名称', '资质情况'],
                        default: [], 
                        label: '企业文化',
                        delete: true,
                        add: true
                    }
                ]
                if(res.qualifications instanceof Array) {
                    res.qualifications.forEach(item => {
                        team.default.push([item.qualName, item.qualDetail, item.qualId])
                    })
                }
                context.commit(types.ABOUT_SET_TEAM, team)
            }
        })
    },

    [types.ABOUT_UPDATE_INFO] (context, amount) { //更新关于我们
        const that = this
        return that.dispatch( 'ajax', {
            method: 'post',
            url: api.postUpdateInfo,
            data: amount
        })
    },

    [types.ABOUT_UPDATE_CULTURE] (context, amount) { //更新企业文化
        const that = this
        return that.dispatch( 'ajax', {
            method: 'json',
            url: api.postUpdateCulture,
            data: amount
        })
    },

    [types.ABOUT_UPDATE_HONOR] (context, amount) { //更新裕丰荣誉
        const that = this
        return that.dispatch( 'ajax', {
            method: 'json',
            url: api.postUpdateHonor,
            data: amount
        })
    },

    [types.ABOUT_UPDATE_TEAM] (context, amount) { //更新团队资质
        const that = this
        return that.dispatch( 'ajax', {
            method: 'json',
            url: api.postUpdateTeam,
            data: amount
        })
    },
}