<template>
    <el-card>
        <SearchBar 
            :data="searchData" 
            :buttons="[{name: '添加产品', type: 'primary', event: 'add'}]" 
            @search="getModules" 
            @add="submitEvent = 'add'; dialogFormData = addProductForm; showDialogForm = true;" 
        />
        <AppTable 
            :data="modules" 
            @info="getInfo" 
            @detail="getDetail" 
            @einfo="infoView"
            @edetail="detailView"
            @delete="deleteProduct"
        />
        <AppDialogForm 
            v-if="showDialogForm"
            :title="dialogFormTitle"
            :visible="showDialogForm" 
            :submitEvent="submitEvent"
            :data="dialogFormData" 
            @add="addProduct"
            @addDetail="addProductDetail"
            @info="updateInfo"
            @detail="updateDetail"
            @einfo="infoView"
            @edetail="detailView"
            @eadd="infoView"
            @eaddDetail="detailView"
            @cancel="showDialogForm = false" 
        />
    </el-card>
</template>

<script>
import SearchBar from '@/components/SearchBar'
import AppTable from '@/components/AppTable'
import AppDialogForm from '@/components/AppDialogForm'
import ns from '@/store/constants/ns'
import types from '@/store/constants/types'
import { mapState } from 'vuex'
const nameSpaced = ns.PRODUCT + '/'
export default {
    name: 'Product',
    components: { SearchBar, AppTable, AppDialogForm },
    computed: {
        ...mapState(nameSpaced, {
            modules: state => state.modules,
            options: state => state.options,
            info: state => state.info,
            detail: state => state.detail,
        })
    },
    watch: {
        'options' (options) {
            this.searchData[0].options = options
        },
        'info' (info) {
            this.dialogFormData = info
        },
        'detail' (detail) {
            this.dialogFormData = detail
        },
    },
    data () {
        return {
            showDialogForm: false, //是否显示表单对话框
            dialogFormTitle: '', //表单对话框的标题
            submitEvent: '', //表单对话框提交数据按钮的事件名称
            dialogFormData: [], //表单对话框模块的数据
            searchData: [{type: 'select', name: 'modules', default: '', label: '筛选模块', tip: '模块筛选', options: []}], //搜索模块数据
            addProductForm: [ //添加产品信息表单结构
                {type: 'input', name: 'productName', default: '', tip: '请输入一级标题', label: '产品名称'},
                {type: 'input', name: 'productTitleA', default: '', tip: '请输入产品标题一', label: '产品标题一'},
                {type: 'input', name: 'productTitleB', default: '', tip: '请输入产品标题二', label: '产品标题二'},
                {type: 'input', name: 'productTitleC', default: '', tip: '请输入产品标题三', label: '产品标题三'},
                {type: 'image', name: 'productPictureA', default: {url: ''}, label: '产品图片一'},
                {type: 'image', name: 'productPictureB', default: {url: ''}, label: '产品图片二'},
                {type: 'image', name: 'productThumbnail', default: {url: ''}, label: '产品缩略图'},
            ],
        }
    },
    mounted () {
        const that = this
        that.getModules()
        if(that.options.length) that.searchData[0].options = that.options
        else that.$store.dispatch(nameSpaced + types.PRODUCT_GET_OPTIONS)
    },
    methods: {
        getModules(id) { //获取模块列表
            if(id) this.$store.dispatch(nameSpaced + types.PRODUCT_GET_MODULE, id) 
            else this.$store.dispatch(nameSpaced + types.PRODUCT_GET_MODULES)
        },
        getInfo(id) { //查询产品信息
            const that = this
            that.dialogFormData = []
            that.dialogFormTitle = '产品信息编辑'
            that.showDialogForm = true
            that.submitEvent = 'info'
            that.$store.dispatch(nameSpaced + types.PRODUCT_GET_INFO, id)
        },
        getDetail(id) { //查询产品详情
            const that = this
            that.dialogFormData = []
            that.dialogFormTitle = '产品详情编辑'
            that.showDialogForm = true
            that.submitEvent = 'detail'
            that.$store.dispatch(nameSpaced + types.PRODUCT_GET_DETAIL, id)
        },
        updateInfo(formData) { //更新产品信息
            const that = this
            const sendData = new FormData()
            sendData.append('productId', formData.productId)
            sendData.append('productName', formData.productName)
            sendData.append('productTitleA', formData.productTitleA)
            sendData.append('productTitleB', formData.productTitleB)
            sendData.append('productTitleC', formData.productTitleC)
            sendData.append('productPictureA', formData.productPictureA.file)
            sendData.append('productPictureB', formData.productPictureB.file)
            sendData.append('productThumbnail', formData.productThumbnail.file)
            that.$store.dispatch(nameSpaced + types.PRODUCT_UPDATE_INFO, sendData).then(res => {
                if(res.status === 200) that.$message.success('产品信息保存成功！')
            })
        },
        updateDetail(formData) { //更新产品详情
            const that = this
            const sendData = new FormData()
            function send() {
                that.$store.dispatch(nameSpaced + types.PRODUCT_UPDATE_DETAIL, sendData).then(res => {
                    if(res.status === 200) that.$message.success('产品详情保存成功！')
                })
            }
            sendData.append('id', that.detail[0].default)
            sendData.append('productId', that.detail[4].default)
            sendData.append('moduleaTitleA', formData.moduleaTitleA)
            sendData.append('moduleaTitleB', formData.moduleaTitleB)
            sendData.append('moduleaPictureA', formData.moduleaPictureA.file ? formData.moduleaPictureA.file : '')
            sendData.append('modulebTitleA', formData.modulebTitleA)
            sendData.append('modulebTitleB', formData.modulebTitleB)
            sendData.append('modulebTitleC', formData.modulebTitleC)
            sendData.append('modulebPictureA', formData.modulebPictureA.file ? formData.modulebPictureA.file : '')
            sendData.append('modulecTitleA', formData.modulecTitleA)
            sendData.append('modulecTitleB', formData.modulecTitleB)
            let count = formData.traitList.length
            if(!count) return send()
            formData.traitList.forEach((item, i) => {
                let name = '['+ i +']'
                sendData.append('ptraitTitle' + name, item[0])
                sendData.append('ptraitDescribe' + name, item[1])
                if(item[2].file) {
                    let file = new FileReader()
                    file.onloadend = function(e) {
                        sendData.append('ptraitIcon' + name, e.target.result)
                        count--
                        if(!count){
                            send()
                        } 
                    }
                    file.readAsDataURL(item[2].file)
                }else {
                    sendData.append('ptraitIcon' + name, '')
                    count--
                }
            })
        },
        addProduct(formData) { //添加产品
            const that = this
            const sendData = new FormData()
            sendData.append('productName', formData.productName)
            sendData.append('productTitleA', formData.productTitleA)
            sendData.append('productTitleB', formData.productTitleB)
            sendData.append('productTitleC', formData.productTitleC)
            sendData.append('productPictureA', formData.productPictureA.file)
            sendData.append('productPictureB', formData.productPictureB.file)
            sendData.append('productThumbnail', formData.productThumbnail.file)
            that.$store.dispatch(nameSpaced + types.PRODUCT_POST_ADD, sendData).then(res => {
                if(res.status === 200) that.$message.success('产品添加成功！')
            })
        },
        addProductDetail(formData) { //添加产品详情
            const that = this
            if(formData.productName) return that.$message.warning('请输入产品名称！')
            that.$store.dispatch(nameSpaced + types.PRODUCT_POST_DETAIL, formData).then(res => {
                if(res.status === 200) that.$message.success('产品详情保存成功！')
            })
        },
        deleteProduct(id) { //删除产品
            const that = this
            this.$confirm('此操作将永久删除该产品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.$store.dispatch(nameSpaced + types.PRODUCT_DELETE_MODULE, id).then(res => {
                    if(res.status === 200) {
                        that.getModules()
                        that.$message.success('产品已删除！')
                    }
                })
            }).catch(() => {
                this.$message.info('已取消删除')       
            })
        },
        infoView() { //产品信息效果图
            this.$message.warning('产品信息效果图暂未完成制作！')
        },
        detailView() { //产品详情效果图
            this.$message.warning('产品详情效果图暂未完成制作！')
        }
    }
}
</script>