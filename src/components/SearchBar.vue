<template>
    <div class="search">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item v-for="(item, index) in searchList" :key="index" :label="item.label">
                <el-select 
                    v-if="item.type === 'select'" 
                    v-model="searchData[item.name]" 
                    size="small"
                    :placeholder="item.tip" 
                    @change="$emit('search', arguments[0])"
                >
                    <el-option v-for="(option, i) in item.options" :key="i" :label="option.label" :value="option.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button 
                    v-for="button in buttons" 
                    size="small"
                    :key="button.name" 
                    :type="button.type" 
                    @click="$emit(button.event)" 
                >{{button.name}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'SearchBar',
        props: {
            data: { type: Array, default: () => { return [] } },
            buttons: { type: Array, default: () => { return [] } }
        },
        data () {
            return {
                searchData: {},
                searchList: []
            }
        },
        mounted () {
            const that = this
            let searchData = {}
            that.data.forEach(item => {
                searchData[item.name] = item.default ? item.default : ''
            })
            that.searchList = that.data
            that.searchData = searchData
        }
    }
</script>