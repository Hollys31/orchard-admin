<template>
    <div class="app-table">
        <div class="table-wrap">
            <table>
                <tr>
                    <td v-for="(title, index) in data.titles" :key="index">{{title}}</td>
                </tr>
                <tr v-for="(row, i) in data.values" :key="i">
                    <td 
                        v-for="j in data.titles.length" 
                        :key="j" 
                        :class="{'steps-td': row[j-1] && row[j-1].type === 'steps'}" 
                        :style="(row[j-1] && row[j-1].type === 'buttons') ? ('width: ' + (row[j-1].list.length * 74 + 20) + 'px') : ''"
                    >
                        <span v-if="(typeof row[j-1] === 'string' || typeof row[j-1] === 'number')">{{row[j-1]}}</span>

                        <div v-else-if="row[j-1] && row[j-1].type === 'status'" class="status">
                            <el-tag v-for="(tag, index) in row[j-1].list" :key="index" :type="tag.class">{{tag.text}}</el-tag>
                        </div>

                        <div 
                            v-else-if="row[j-1] && row[j-1].type === 'clickText'" 
                            class="clickText" 
                            :class="{disabled: row[j-1].disabled}"
                            @click="$emit(row[j-1].event)"
                        >
                            {{row[j-1].text}}
                        </div>

                        <div v-else-if="row[j-1] && row[j-1].type === 'steps'" class="steps">
                            <el-tag type="success">{{row[j-1].before}}</el-tag><span class="iconfont">&#xe600;</span>
                            <el-tag>{{row[j-1].now}}</el-tag><span class="iconfont">&#xe600;</span>
                            <el-tag type="info">{{row[j-1].after}}</el-tag>
                        </div>

                        <div v-else-if="row[j-1] && row[j-1].type === 'buttons'" class="buttons">
                            <el-button 
                                v-for="(button, index) in row[j-1].list"  
                                size="small"
                                :key="index" 
                                :type="button.class"
                                :disabled="button.disabled"
                                @click="$emit(button.event, button.value ? button.value : i)" 
                            >{{button.text}}</el-button>
                        </div>
                    </td>
                </tr>
                <tr v-if="!data.values.length">
                    <td :colspan="data.titles.length">
                        <div class="no-data iconfont">
                            <p>{{$store.state.loadTips === '数据加载中' ? '&#xe603;' : '&#xe6aa;'}}</p>
                            <p>{{$store.state.loadTips}}</p>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
/**
 *  data: {
 *      titles: 列名数组
 *      values: 列值
 *  }
 */
export default {
    name: 'AppTable',
    props: {
        data: { type: Object, default: () => { return { titles: [], values: [] } } }
    },
}
</script>

<style lang="scss" scoped>
.app-table {
    width: 100%;
    display: block;
    color: #333;
    background-color: #fff;
    overflow: hidden;
    .table-wrap{
        padding: 30px 10px;
        table {
            width: 100%;
            max-width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            >tr {
                >td {
                    height: 47px;
                    max-width: 200px;
                    border: 1px solid #DCDFE6;
                    text-align: center;
                    &:first-child {
                        min-width: 70px;
                    }
                    .clickText {
                        color: #409EFF;
                        cursor: pointer;
                        user-select: none;
                        &:hover {
                            color: #66b1ff
                        }
                        &:active {
                            color: #3a8ee6;
                        }
                    }
                    .disabled {
                        color: #a0cfff;
                        cursor: not-allowed;
                        &:hover {
                            color: #a0cfff
                        }
                        &:active {
                            color: #a0cfff;
                        }
                    }
                    .steps {
                        position: relative;
                        display: flex;
                        justify-content: center;
                        min-width: 264px;
                        .iconfont {
                            font-size: 20px;
                            margin: 0 10px;
                            line-height: 32px;
                            color: #0F85FE;
                        }
                        &::before {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: linear-gradient(90deg,rgba(255,255,255,1),rgba(255,255,255,0),rgba(255,255,255,1)); 
                        }
                    }
                }
                .steps-td {
                    min-width: 264px;
                }
                &:first-child {
                    font-weight: bold;
                    background-color: #FAFAFA;
                    color: #383839;
                    user-select: none;
                }
            }
        }
        .no-data {
            margin: 30px;
            text-align: center;
            font-size: 26px;
            color: #ddd;
            >p {
                &:first-child {
                    font-size: 100px;
                }
            }
        }
    }
}
</style>
