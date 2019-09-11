<template>
    <el-card>
        Panel
    </el-card>
</template>

<script>
import ns from '@/store/constants/ns'
import types from '@/store/constants/types'
import { mapState } from 'vuex'
const nameSpaced = ns.PANEL + '/'
export default {
    name: 'Panel'
}
</script>