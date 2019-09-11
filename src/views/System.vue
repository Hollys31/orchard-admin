<template>
    <el-card>
        <SearchBar 
            :data="searchData" 
            :buttons="[{name: '添加系统模块', type: 'primary', event: 'add'}]" 
            @search="getModules" 
            @add="submitEvent = 'add'; dialogFormData = addSystemForm; showDialogForm = true;" 
        />
        <AppTable 
            :data="modules" 
            @detail="getDetail" 
            @edetail="detailView"
            @delete="deleteSystem"
        />
        <AppDialogForm 
            v-if="showDialogForm"
            :title="dialogFormTitle"
            :visible="showDialogForm" 
            :submitEvent="submitEvent"
            :data="dialogFormData" 
            @add="addSystem"
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
const nameSpaced = ns.SYSTEM + '/'
export default {
    name: 'System',
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
            addSystemForm: [ //添加系统模块信息表单结构
                {type: 'input', name: 'systemName', default: '', tip: '请输入一级标题', label: '系统模块名称'},
            ],
        }
    },
    mounted () {
        const that = this
        that.getModules()
        if(that.options.length) that.searchData[0].options = that.options
        else that.$store.dispatch(nameSpaced + types.SYSTEM_GET_OPTIONS)
    },
    methods: {
        getModules(id) { //获取模块列表
            if(id) this.$store.dispatch(nameSpaced + types.SYSTEM_GET_MODULE, id) 
            else this.$store.dispatch(nameSpaced + types.SYSTEM_GET_MODULES)
        },
        getDetail(id) { //查询系统模块详情
            const that = this
            that.dialogFormData = []
            that.dialogFormTitle = '系统模块详情编辑'
            that.showDialogForm = true
            that.submitEvent = 'detail'
            that.$store.dispatch(nameSpaced + types.SYSTEM_GET_DETAIL, id)
        },
        updateDetail(formData) { //更新系统模块详情
            const that = this
            that.$store.dispatch(nameSpaced + types.SYSTEM_UPDATE_DETAIL, formData).then(res => {
                if(res.status === 200) that.$message.success('系统模块详情保存成功！')
            })
        },
        addSystem(formData) { //添加系统模块
            const that = this
            that.$store.dispatch(nameSpaced + types.SYSTEM_POST_ADD, formData).then(res => {
                if(res.status === 200) that.$message.success('系统模块添加成功！')
            })
        },
        deleteSystem(id) { //删除系统模块
            const that = this
            this.$confirm('此操作将永久删除该系统模块, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.$store.dispatch(nameSpaced + types.SYSTEM_DELETE_MODULE, id).then(res => {
                    if(res.status === 200) {
                        that.getModules()
                        that.$message.success('系统模块已删除！')
                    }
                })
            }).catch(() => {
                this.$message.info('已取消删除')       
            })
        },
        detailView() { //系统模块详情效果图
            this.$message.warning('系统模块详情效果图暂未完成制作！')
        }
    }
}
</script>