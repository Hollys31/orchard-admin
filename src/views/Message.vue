<template>
    <el-card>
        Message
    </el-card>
</template>

<script>
import SearchBar from '@/components/SearchBar'
import AppTable from '@/components/AppTable'
import AppDialogForm from '@/components/AppDialogForm'
import ns from '@/store/constants/ns'
import types from '@/store/constants/types'
import { mapState } from 'vuex'
const nameSpaced = ns.MESSAGE + '/'
export default {
    name: 'Message',
    components: { SearchBar, AppTable, AppDialogForm },
}
</script>