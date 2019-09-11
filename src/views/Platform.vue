<template>
    <el-card>
        <SearchBar 
            :data="searchData" 
            :buttons="[{name: '添加平台', type: 'primary', event: 'add'}]" 
            @search="getModules" 
            @add="submitEvent = 'add'; dialogFormData = addPlatformForm; showDialogForm = true;" 
        />
        <AppTable 
            :data="modules" 
            @detail="getDetail" 
            @edetail="detailView"
            @delete="deletePlatform"
        />
        <AppDialogForm 
            v-if="showDialogForm"
            :title="dialogFormTitle"
            :visible="showDialogForm" 
            :submitEvent="submitEvent"
            :data="dialogFormData" 
            @add="addPlatform"
            @detail="updateDetail"
            @edetail="detailView"
            @eadd="detailView"
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
const nameSpaced = ns.PLATFORM + '/'
export default {
    name: 'Platform',
    components: { SearchBar, AppTable, AppDialogForm },
    computed: {
        ...mapState(nameSpaced, {
            modules: state => state.modules,
            options: state => state.options,
            detail: state => state.detail,
        })
    },
    watch: {
        'options' (options) {
            this.searchData[0].options = options
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
            addPlatformForm: [ //添加平台信息表单结构
                {type: 'input', name: 'platformName1', default: '', tip: '请输入平台名称', label: '平台名称'},
                {type: 'input', name: 'platformIntroduce', default: '', tip: '请输入平台描述', label: '平台描述'},
                {type: 'textarea', name: 'platformName', default: '', tip: '请输入平台简介', label: '平台简介'},
                {type: 'image', name: 'platformPicture1', default: '', label: '背景大图'},
                {
                    type: 'table', 
                    name: 'traitList', 
                    titles: ['模块名称', '模块描述一', '模块描述二', '图片一', '图片二'],
                    default: [], 
                    label: '模块系统',
                    delete: true,
                    template: [{type: 'select', default: '', list: ['选项一', '选项二']}, '', '', {type: 'image', url: ''}, {type: 'image', url: ''}],
                    add: true
                }
            ],
        }
    },
    mounted () {
        const that = this
        that.getModules()
        if(that.options.length) that.searchData[0].options = that.options
        else that.$store.dispatch(nameSpaced + types.PLATFORM_GET_OPTIONS)
    },
    methods: {
        getModules(id) { //获取模块列表
            if(id) this.$store.dispatch(nameSpaced + types.PLATFORM_GET_MODULE, id) 
            else this.$store.dispatch(nameSpaced + types.PLATFORM_GET_MODULES)
        },
        getDetail(id) { //查询平台详情
            const that = this
            that.dialogFormData = []
            that.dialogFormTitle = '平台详情编辑'
            that.showDialogForm = true
            that.submitEvent = 'detail'
            that.$store.dispatch(nameSpaced + types.PLATFORM_GET_DETAIL, id)
        },
        updateDetail(formData) { //更新平台详情
            const that = this
            that.$store.dispatch(nameSpaced + types.PLATFORM_UPDATE_DETAIL, formData).then(res => {
                if(res.status === 200) that.$message.success('平台详情保存成功！')
            })
        },
        addPlatform(formData) { //添加平台
            const that = this
            that.$store.dispatch(nameSpaced + types.PLATFORM_POST_ADD, formData).then(res => {
                if(res.status === 200) that.$message.success('平台添加成功！')
            })
        },
        deletePlatform(id) { //删除平台
            const that = this
            this.$confirm('此操作将永久删除该平台, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.$store.dispatch(nameSpaced + types.PLATFORM_DELETE_MODULE, id).then(res => {
                    if(res.status === 200) {
                        that.getModules()
                        that.$message.success('平台已删除！')
                    }
                })
            }).catch(() => {
                this.$message.info('已取消删除')       
            })
        },
        detailView() { //平台详情效果图
            this.$message.warning('平台详情效果图暂未完成制作！')
        }
    }
}
</script>