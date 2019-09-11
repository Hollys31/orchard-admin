import api from '@/lib/api'
import types from '@/store/constants/types'
export default {
    [types.PRODUCT_GET_MODULES] (context, amount) { //获取所有模块
        const that = this
        that.dispatch( 'ajax', api.getProductModules).then(res => {
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
                                {text: '编辑详情', class: 'success', event: 'detail', value: item.productId, disabled: false},
                                {text: '删除', class: 'danger', event: 'delete', value: item.productId, disabled: false}
                            ]}
                        ])
                    })
                }
                context.commit(types.PRODUCT_SET_MODULES, modules)
            }
        })
    },

    [types.PRODUCT_GET_MODULE] (context, amount) { //获取单个模块
        const that = this
        that.dispatch( 'ajax', api.getProductModule + amount).then(res => {
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
                                {text: '编辑详情', class: 'success', event: 'detail', value: item.productId, disabled: false},
                                {text: '删除', class: 'danger', event: 'delete', value: item.productId, disabled: false}
                            ]}
                        ])
                    })
                }
                context.commit(types.PRODUCT_SET_MODULES, modules)
            }
        })
    },

    [types.PRODUCT_GET_OPTIONS] (context, amount) { //获取选项列表
        const that = this
        that.dispatch( 'ajax', api.getProductOptions).then(res => {
            if(res.status === 200) {
                res = res.data
                let options = [{label: '所有模块', value: ''}]
                if(res instanceof Array) {
                    res.forEach(item => {
                        options.push({label: item.productName, value: item.productId})
                    })
                }
                context.commit(types.PRODUCT_SET_OPTIONS, options)

            }
        })
    },

    [types.PRODUCT_GET_INFO] (context, amount) { //获取产品信息
        const that = this
        that.dispatch( 'ajax', {
            method: 'get',
            url: api.getProductInfo + amount,
            blankLoading: true
        }).then(res => {
            if(res.status === 200) {
                res = res.data
                let info = [
                    {name: 'productId', default: res.productId},
                    {type: 'input', name: 'productName', default: res.productName, tip: '请输入一级标题', label: '产品名称'},
                    {type: 'input', name: 'productTitleA', default: res.productTitleA, tip: '请输入产品标题一', label: '产品标题一'},
                    {type: 'input', name: 'productTitleB', default: res.productTitleB, tip: '请输入产品标题二', label: '产品标题二'},
                    {type: 'input', name: 'productTitleC', default: res.productTitleC, tip: '请输入产品标题三', label: '产品标题三'},
                    {type: 'image', name: 'productPictureA', default: {url: res.productPictureA}, label: '产品图片一'},
                    {type: 'image', name: 'productPictureB', default: {url: res.productPictureB}, label: '产品图片二'},
                    {type: 'image', name: 'productThumbnail', default: {url: res.productThumbnail}, label: '产品缩略图'},
                ]
                context.commit(types.PRODUCT_SET_INFO, info)
            }
        })
    },

    [types.PRODUCT_GET_DETAIL] (context, amount) { //获取产品详情
        const that = this
        that.dispatch( 'ajax', {
            method: 'get',
            url: api.getProductDetail + amount,
            blankLoading: true
        }).then(res => {
            if(res.status === 200) {
                res = res.data
                let detail = [
                    {name: 'module1', default: res.id, label: '模块一'},
                    {type: 'input', name: 'moduleaTitleA', default: res.moduleaTitleA, tip: '请输入标题一', label: '标题一'},
                    {type: 'input', name: 'moduleaTitleB', default: res.moduleaTitleB, tip: '请输入标题二', label: '标题二'},
                    {type: 'image', name: 'moduleaPictureA', default: {url: res.moduleaPictureA}, label: '图片'},
                    {name: 'module2', default: res.productId, label: '模块二'},
                    {type: 'input', name: 'modulebTitleA', default: res.modulebTitleA, tip: '请输入标题一', label: '标题一'},
                    {type: 'input', name: 'modulebTitleB', default: res.modulebTitleB, tip: '请输入标题二', label: '标题二'},
                    {type: 'input', name: 'modulebTitleC', default: res.modulebTitleC, tip: '请输入标题二', label: '标题二'},
                    {type: 'image', name: 'modulebPictureA', default: {url: res.modulebPictureA}, label: '图片'},
                    {name: 'module3', default: '', label: '模块三'},
                    {type: 'input', name: 'modulecTitleA', default: res.modulecTitleA, tip: '请输入标题一', label: '标题一'},
                    {type: 'input', name: 'modulecTitleB', default: res.modulecTitleB, tip: '请输入标题二', label: '标题二'},
                    {
                        type: 'table', 
                        name: 'traitList', 
                        titles: ['特点名称', '特点描述', '图标'],
                        default: [], 
                        label: '特点',
                        delete: true,
                        template: ['', '', {type: 'image', url: ''}],
                        add: true
                    }
                ]
                if(res.traitList instanceof Array) {
                    res.traitList.forEach(item => {
                        detail[12].default.push([item.ptraitTitle, item.ptraitDescribe, {type: 'image', url: item.ptraitIcon}])
                    })
                }
                context.commit(types.PRODUCT_SET_DETAIL, detail)
            }
        })
    },

    [types.PRODUCT_UPDATE_INFO] (context, amount) { //更新产品信息
        const that = this
        return that.dispatch( 'ajax', {
            method: 'form',
            url: api.postProductUpdateInfo,
            data: amount
        })
    },

    [types.PRODUCT_UPDATE_DETAIL] (context, amount) { //更新产品详情
        const that = this
        return that.dispatch( 'ajax', {
            method: 'form',
            url: api.postProductUpdateDetail,
            data: amount
        })
    },

    [types.PRODUCT_POST_ADD] (context, amount) { //添加产品
        const that = this
        return that.dispatch( 'ajax', {
            method: 'form',
            url: api.postProductAdd,
            data: amount
        })
    },

    [types.PRODUCT_POST_DETAIL] (context, amount) { //添加产品详情
        const that = this
        return that.dispatch( 'ajax', {
            method: 'form',
            url: api.postProductAddDetail,
            data: amount
        })
    },

    [types.PRODUCT_DELETE_MODULE] (context, amount) { //删除产品
        const that = this
        return that.dispatch( 'ajax', {
            method: 'delete',
            url: api.deleteProductDelete + amount
        })
    },
}