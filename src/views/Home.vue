<template>
    <el-card>
        <SearchBar :data="searchData" @search="getModules" />
        <AppTable 
            :data="modules" 
            @cp="getCompanyProfile" 
            @pr="getPartner" 
            @ecp="CompanyProfileView"
            @epr="PartnerView"
        />
        <AppDialogForm 
            v-if="showDialogForm"
            :title="dialogFormTitle"
            :visible="showDialogForm" 
            :submitEvent="submitEvent"
            :data="dialogFormData" 
            @cp="updateCompanyProfile"
            @pr="updatePartner"
            @ecp="CompanyProfileView"
            @epr="PartnerView"
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
const nameSpaced = ns.HOME + '/'
export default {
    name: 'Home',
    components: { SearchBar, AppTable, AppDialogForm },
    computed: {
        ...mapState(nameSpaced, {
            modules: state => state.modules,
            options: state => state.options,
            companyProfile: state => state.companyProfile,
            partner: state => state.partner,
        })
    },
    watch: {
        'options' (options) {
            this.searchData[0].options = options
        },
        'companyProfile' (cp) {
            this.dialogFormData = cp
        },
        'partner' (pr) {
            this.dialogFormData = pr
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
        else that.$store.dispatch(nameSpaced + types.HOME_GET_OPTIONS)
    },
    methods: {
        getModules(id) { //获取模块列表
            if(id) this.$store.dispatch(nameSpaced + types.HOME_GET_MODULE, id) 
            else this.$store.dispatch(nameSpaced + types.HOME_GET_MODULES)
        },
        getCompanyProfile() { //获取公司简介
            const that = this
            that.dialogFormData = []
            that.dialogFormTitle = '公司简介编辑'
            that.showDialogForm = true
            that.submitEvent = 'cp'
            that.$store.dispatch(nameSpaced + types.HOME_GET_COMPANY_PROFILE)
        },
        getPartner() { //获取合作伙伴
            const that = this
            that.dialogFormData = []
            that.dialogFormTitle = '合作伙伴编辑'
            that.showDialogForm = true
            that.submitEvent = 'pr'
            that.$store.dispatch(nameSpaced + types.HOME_GET_PARTNER)
        },
        updateCompanyProfile(formData) { //更新公司简介
            const that = this
            that.$store.dispatch(nameSpaced + types.HOME_UPDATE_COMPANY_PROFILE, formData).then(res => {
                if(res.status === 200) that.$message.success('公司简介保存成功！')
            })
        },
        updatePartner(formData) { //更新合作伙伴
            const that = this
            const sendData = new FormData()
            let oldData = that.partner[0].default
            let index = 0
            formData.images.forEach((image, i) => {
                index++
                const name = 'partners['+ i +'].'
                const partners = {
                    partnerId: image.partnerId ? image.partnerId : 0,
                    partnerNum: i + 1,
                    partnerName: image.partnerName ? image.partnerName : '',
                    partnerWebsite: image.partnerWebsite ? image.partnerWebsite : '',
                    file: image.file ? image.file : ''
                }
                oldData.forEach((item, j) => {
                    if(item.partnerId === partners.partnerId) return oldData.splice(i, 1)
                })
                sendData.append(name + 'partnerId', partners.partnerId)
                sendData.append(name + 'partnerNum', partners.partnerNum)
                sendData.append(name + 'partnerName', partners.partnerName)
                sendData.append(name + 'partnerWebsite', partners.partnerWebsite)
                sendData.append(name + 'file', partners.file)
            })
            oldData.forEach(item => {
                sendData.append('partners['+ index +'].' + 'partnerId', item.partnerId)
                sendData.append('partners['+ index +'].' + 'partnerNum', -1)
                sendData.append('partners['+ index +'].' + 'partnerName', '')
                sendData.append('partners['+ index +'].' + 'partnerWebsite', '')
                sendData.append('partners['+ index +'].' + 'file', '')
                index++
            })
            that.$store.dispatch(nameSpaced + types.HOME_UPDATE_PARTNER, sendData).then(res => {
                if(res.status === 200) that.$message.success('合作伙伴保存成功！')
            })
        },
        CompanyProfileView() { //公司简介效果图
            this.$message.warning('公司简介效果图暂未完成制作！')
        },
        PartnerView() { //合作伙伴效果图
            this.$message.warning('合作伙伴效果图暂未完成制作！')
        }
    }
}
</script>