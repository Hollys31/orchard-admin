<template>
    <el-card>
        <SearchBar :data="searchData" @search="getModules" />
        <AppTable 
            :data="modules" 
            @info="getInfo" 
            @culture="getCulture" 
            @honor="getHonor" 
            @team="getTeam" 
            @einfo="infoView"
            @eculture="cultureView"
            @ehonor="honorView"
            @eteam="teamView"
        />
        <AppDialogForm 
            v-if="showDialogForm"
            :title="dialogFormTitle"
            :visible="showDialogForm" 
            :submitEvent="submitEvent"
            :data="dialogFormData" 
            @info="updateInfo"
            @culture="updateCulture"
            @honor="updateHonor"
            @team="updateTeam"
            @einfo="infoView"
            @eculture="cultureView"
            @ehonor="honorView"
            @eteam="teamView"
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
const nameSpaced = ns.ABOUT + '/'
export default {
    name: 'About',
    components: { SearchBar, AppTable, AppDialogForm },
    computed: {
        ...mapState(nameSpaced, {
            modules: state => state.modules,
            options: state => state.options,
            info: state => state.info,
            culture: state => state.culture,
            honor: state => state.honor,
            team: state => state.team,
        })
    },
    watch: {
        'options' (options) {
            this.searchData[0].options = options
        },
        'info' (info) {
            this.dialogFormData = info
        },
        'culture' (culture) {
            this.dialogFormData = culture
        },
        'honor' (honor) {
            this.dialogFormData = honor
        },
        'team' (team) {
            this.dialogFormData = team
        }
    },
    data () {
        return {
            showDialogForm: false, //是否显示表单对话框
            dialogFormTitle: '', //表单对话框的标题
            submitEvent: '', //表单对话框提交数据按钮的事件名称
            dialogFormData: [], //表单对话框模块的数据
            searchData: [{type: 'select', name: 'modules', default: '', label: '筛选模块', tip: '模块筛选', options: []}], //搜索模块数据
        }
    },
    mounted () {
        const that = this
        that.getModules()
        if(that.options.length) that.searchData[0].options = that.options
        else that.$store.dispatch(nameSpaced + types.ABOUT_GET_OPTIONS)
    },
    methods: {
        getModules(id) { //获取模块列表
            if(id) this.$store.dispatch(nameSpaced + types.ABOUT_GET_MODULE, id) 
            else this.$store.dispatch(nameSpaced + types.ABOUT_GET_MODULES)
        },
        getInfo() { //获取关于我们
            const that = this
            that.dialogFormData = []
            that.dialogFormTitle = '关于我们编辑'
            that.showDialogForm = true
            that.submitEvent = 'info'
            that.$store.dispatch(nameSpaced + types.ABOUT_GET_INFO)
        },
        getCulture() { //获取企业文化
            const that = this
            that.dialogFormData = []
            that.dialogFormTitle = '企业文化编辑'
            that.showDialogForm = true
            that.submitEvent = 'culture'
            that.$store.dispatch(nameSpaced + types.ABOUT_GET_CULTURE)
        },
        getHonor() { //获取裕丰荣誉
            const that = this
            that.dialogFormData = []
            that.dialogFormTitle = '裕丰荣誉编辑'
            that.showDialogForm = true
            that.submitEvent = 'honor'
            that.$store.dispatch(nameSpaced + types.ABOUT_GET_HONOR)
        },
        getTeam() { //获取团队资源
            const that = this
            that.dialogFormData = []
            that.dialogFormTitle = '团队资源编辑'
            that.showDialogForm = true
            that.submitEvent = 'team'
            that.$store.dispatch(nameSpaced + types.ABOUT_GET_TEAM)
        },
        updateInfo(formData) { //更新关于我们
            const that = this
            that.$store.dispatch(nameSpaced + types.ABOUT_UPDATE_INFO, formData).then(res => {
                if(res.status === 200) that.$message.success('关于我们保存成功！')
            })
        },
        updateCulture(formData) { //更新企业文化
            const that = this
            let data = {titleA: formData.titleA, cultrues: []}
            formData.cultrues.forEach(item => {
                data.cultrues.push({
                    cultureName: item[0],
                    cultureDetail: item[1],
                    cultureId: item[2],
                    cultrueNum: item[3]
                })
            })
            that.$store.dispatch(nameSpaced + types.ABOUT_UPDATE_CULTURE, data).then(res => {
                if(res.status === 200) that.$message.success('团队资质保存成功！')
            })
        },
        updateHonor(formData) { //更新裕丰荣誉
            const that = this
            let data = []
            let oldData = that.honor[0].default
            formData.honours.forEach((item, i) => {
                data.push({
                    honourDetail: item[0],
                    honourId: item[1] ? item[1] : 0,
                    honourNum: i + 1
                })
                oldData.forEach((value, j) => {
                    if(value[1] === item[1]) return oldData.splice(j, 1)
                })
            })
            oldData.forEach(value => {
                data.push({
                    honourDetail: '',
                    honourId: value[1],
                    honourNum: -1
                })
            })
            that.$store.dispatch(nameSpaced + types.ABOUT_UPDATE_HONOR, data).then(res => {
                if(res.status === 200) that.$message.success('裕丰荣誉保存成功！')
            })
        },
        updateTeam(formData) { //更新团队资源
            const that = this
            let data = {detailA: formData.detailA, qualifications: []}
            let oldData = that.team[1].default
            formData.qualifications.forEach((item, i) => {
                data.qualifications.push({
                    qualName: item[0],
                    qualDetail: item[1],
                    qualId: item[2] ? item[2] : 0,
                    qualNum: i + 1
                })
                oldData.forEach((value, j) => {
                    if(value[2] === item[2]) return oldData.splice(j, 1)
                })
            })
            oldData.forEach(value => {
                data.qualifications.push({
                    qualName: '',
                    qualDetail: '',
                    qualId: value[2],
                    qualNum: -1
                })
            })
            that.$store.dispatch(nameSpaced + types.ABOUT_UPDATE_CULTURE, data).then(res => {
                if(res.status === 200) that.$message.success('企业文化保存成功！')
            })
        },
        infoView() { //关于我们效果图
            this.$message.warning('关于我们效果图暂未完成制作！')
        },
        cultureView() { //企业文化效果图
            this.$message.warning('企业文化效果图暂未完成制作！')
        },
        honorView() { //裕丰荣誉效果图
            this.$message.warning('裕丰荣誉效果图暂未完成制作！')
        },
        teamView() { //团队资源效果图
            this.$message.warning('团队资源效果图暂未完成制作！')
        },
    }
}
</script>