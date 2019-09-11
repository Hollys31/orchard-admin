<template>
    <el-dialog center :close-on-click-modal="false" :title="title" :visible.sync="isShow" :width="width" @close="$emit('cancel')">
        <el-form :label-width="labelWidth">
            <el-form-item v-for="(item, index) in formList" :key="index" :label="item.label">
                <el-input 
                    v-if="item.type === 'input'" 
                    v-model="formData[item.name]" 
                    size="small" 
                    :placeholder="item.tip" 
                    @change="formData[item.name] = arguments[0]"
                ></el-input>
                <el-input 
                    v-else-if="item.type === 'password'"
                    v-model="formData[item.name]"  
                    type="password" 
                    size="small"
                    :placeholder="item.tip" 
                    @change="formData[item.name] = arguments[0]" 
                ></el-input>
                <el-input 
                    v-else-if="item.type === 'textarea'" 
                    v-model="formData[item.name]" 
                    type="textarea" 
                    size="small" 
                    :autosize="{ minRows: 2, maxRows: 100}"
                    :placeholder="item.tip" 
                    @change="formData[item.name] = arguments[0]"
                ></el-input>
                <el-select 
                    v-else-if="item.type === 'select'" 
                    v-model="formData[item.name]"  
                    size="small"
                    :multiple="item.multiple ? true : false"
                    :placeholder="item.tip"
                    @change="formData[item.name] = arguments[0]" 
                >
                    <el-option v-for="(option, i) in item.options" :key="i" :label="option.label" :value="option.value"></el-option>
                </el-select>
                <el-date-picker 
                    v-else-if="item.type === 'time'" 
                    v-model="formData[item.name]" 
                    type="datetime" 
                    align="left" 
                    size="small"
                    :clearable="false" 
                    :picker-options="item.data" 
                    @change="formData[item.name] = arguments[0]" 
                ></el-date-picker>
                <div v-else-if="item.type === 'image'" class="image">
                    <AppDialogImage line-height="80px" :src="formData[item.name].url" />
                    <label>
                        <i v-if="formData[item.name].url" class="el-icon-edit-outline"></i>
                        <i v-if="!formData[item.name].url" class="el-icon-plus"></i>
                        <input type="file" accept=".jpg, .png" @change="getImage(item.name, arguments[0].target.files[0])">
                    </label>
                </div>
                <div v-else-if="item.type === 'images'" class="images">
                    <div v-for="(image, index) in formData[item.name]" class="image-list" :key="index">
                        <AppDialogImage line-height="98px" :src="image.url" />
                        <div class="shade" @mousedown="sortImages(index, $event, formData[item.name])"></div>
                    </div>
                    <div v-show="showAddImage" ref="last" class="add-image"><label>
                        <i class="el-icon-plus"></i>
                        <input type="file" multiple accept=".jpg, .png" @change="getImages(item.name, arguments[0].target.files)">
                    </label></div>
                    <div v-show="!showAddImage" ref="delete">
                        <i class="el-icon-delete"></i>
                    </div>
                </div>
                <div v-else-if="item.type === 'table'" class="form-table">
                    <table>
                        <tr>
                            <td>序号</td>
                            <td v-for="title in item.titles" :key="title">{{title}}</td>
                            <td v-if="item.delete">操作</td>
                        </tr>
                        <tr v-for="(value, i) in formData[item.name]" :key="i">
                            <td>{{i + 1}}</td>
                            <td v-for="j in item.titles.length" :key="j">
                                <input 
                                    v-if="!value[j - 1] || typeof value[j - 1] === 'string'" 
                                    type="text"
                                    :value="value[j - 1]" 
                                    @change="formData[item.name][i][j - 1] = arguments[0].target.value"
                                >
                                <div v-else-if="value[j - 1].type === 'image'" class="table-image">
                                    <AppDialogImage line-height="46px" class="table-el-image" :src="value[j - 1].url" />
                                    <label>上传图片
                                        <input type="file" accept=".jpg, .png" @change="getTableImage(item.name, i, (j - 1), arguments[0].target.files[0])">
                                    </label>
                                </div>
                            </td>
                            <td v-if="item.delete" class="table-delete" @click="formData[item.name].splice(i, 1)"><i class="el-icon-delete"></i></td>
                        </tr>
                        <tr v-if="!formData[item.name].length"><td :colspan="item.titles.length + (item.delete ? 2 : 1)">暂无数据</td></tr>
                        <tr v-if="item.add">
                            <td class="table-add" :colspan="item.titles.length + 2" @click="formData[item.name].push(item.template ? item.template : [])"><i class="el-icon-plus"></i></td>
                        </tr>
                    </table>

                </div>
            </el-form-item>
        </el-form>
        <div class="loading" v-if="!data.length"><i class="el-icon-loading"></i></div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="reset" size="small">重 置</el-button>
            <el-button @click="$emit('e' + submitEvent)" size="small">查看效果图</el-button>
            <el-button type="primary" @click="$emit(submitEvent, formData)" size="small">保存修改</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import AppDialogImage from '@/components/AppDialogImage'
import { setTimeout } from 'timers';
    export default {
        name: 'AppDialogForm',
        components: { AppDialogImage },
        props: {
            data: { type: Array, default: () => { return [] } },
            visible: {type: Boolean, default: false},
            title: {type: String, default: ''},
            width: {type: String, default: '50%'},
            labelWidth: {type: String, default: '100px'},
            submitEvent: {type: String, default: 'submit'}
        },
        watch: {
            'visible' (v) {
                this.isShow = v
            },
            'data' () {
                this.init()
            }
        },
        data () {
            return {
                isShow: false,
                formData: {},
                oldFormData: {},
                formList: [],
                showAddImage: true,
            }
        },
        mounted () {
            this.init()
        },
        methods: {
            init() {
                const that = this
                let formData = {}
                that.data.forEach(item => {
                    formData[item.name] = that.deepCopy(item.default)
                    that.oldFormData[item.name] = that.deepCopy(item.default)
                })
                that.formData = formData
                that.formList = that.data
                that.isShow = that.visible
            },
            deepCopy(value) {
                if(!value && value !== 0) return ''
                if(typeof value === 'string' || typeof value === 'number') return value
                if(value instanceof File) return value
                if(value instanceof Array) {
                    let arr = []
                    value.forEach(item => { arr.push(this.deepCopy(item)) })
                    return arr
                }
                if(value instanceof Object) {
                    let obj = {}
                    for(let key in value) { obj[key] = this.deepCopy(value[key]) }
                    return obj
                }
            },
            reset() {
                const that = this
                let data = {}
                for(let key in that.oldFormData) {
                    data[key] = that.deepCopy(that.oldFormData[key])
                }
                that.formData = data
            },
            getImages(name, images) {
                const that = this
                for(let i = 0; i < images.length; i++) {
                    if(images[i].type === 'image/jpeg' || images[i].type === 'image/png') {
                        that.formData[name].push({url: URL.createObjectURL(images[i]), file: images[i]})
                    }else {
                        that.$message.warning('请选择.jpg/.png图片文件！')
                    }
                }
            },
            getImage(name, image) {
                const that = this
                if(image.type === 'image/jpeg' || image.type === 'image/png') {
                    that.formData[name] = {url: URL.createObjectURL(image), file: image}
                }else {
                    that.$message.warning('请选择.jpg/.png图片文件！')
                }
            },
            getTableImage(name, i, j, image) {
                const that = this
                if(image.type === 'image/jpeg' || image.type === 'image/png') {
                    let arr = that.deepCopy(that.formData[name])
                    arr[i][j] = {type: 'image', url: URL.createObjectURL(image), file: image}
                    that.formData[name] = arr
                }else {
                    that.$message.warning('请选择.jpg/.png图片文件！')
                }
            },
            sortImages(index, event, data) { //给合作伙伴 LOGO排序
                const that = this
                that.showAddImage = false
                let sort = index
                const el = event.target.parentNode.parentNode
                let imageList = el.getElementsByClassName('image-list')
                const div = document.createElement('div')
                div.setAttribute('style', 'display: inline-block; width: 98px; height: 98px; margin: 10px; \
                border: 1px dashed #E5E5E5; border-radius: 3px;')
                const parentPosition = el.getBoundingClientRect()
                const ps = []
                for(let i = 0; i < imageList.length; i++) {
                    const position = imageList[i].getBoundingClientRect()
                    ps.push({x: position.left, y: position.top, maxX: position.left + 100, maxY: position.top + 100})
                }
                const lp = that.$refs.last[0].getBoundingClientRect()
                ps.push({x: lp.left, y: lp.top, maxX: lp.left + 100, maxY: lp.top + 100})
                let left = ps[index].x - parentPosition.left
                let top = ps[index].y - parentPosition.top
                el.insertBefore(div, imageList[index])
                imageList[index].setAttribute('style', 'position: absolute; top: ' + top + 'px; left: ' + left + 'px; z-index: 2;')
                let x = event.clientX
                let y = event.clientY
                let p = {x: left, y: top}
                document.addEventListener('mousemove', move)
                document.addEventListener('mouseup', mouseup)
                const len = ps.length
                function mouseup() {
                    div.remove()
                    imageList[index].style = ''
                    const temp = data.splice(index, 1)
                    if(sort != -1) data.splice(sort, 0, temp[0])
                    that.showAddImage = true
                    document.removeEventListener('mousemove', move)
                    document.removeEventListener('mouseup', mouseup)
                }
                function move(e) {
                    const movementX = e.clientX - x
                    const movementY = e.clientY - y
                    x = e.clientX
                    y = e.clientY
                    const offsetX = movementX + p.x
                    const offsetY = movementY + p.y
                    p = {x: offsetX, y: offsetY}
                    imageList[index].style.left = offsetX + 'px'
                    imageList[index].style.top = offsetY + 'px'
                    for(let i = 0; i < len; i++) {
                        if(x > ps[i].x && x < ps[i].maxX && y > ps[i].y && y < ps[i].maxY) {
                            if(i === len - 2) {
                                el.insertBefore(div, that.$refs.last[0])
                            }else if((i === 0 || i === 1 || i < index) && len > 2) {
                                el.insertBefore(div, imageList[i])
                            }else if(i === len - 1) {
                                sort = -1
                                that.$refs.delete[0].setAttribute('style', 'border-color: #f00; color: #f00; \
                                box-shadow: 0 0 6px 3px rgba(200, 0, 0, .2);')
                                return
                            }else {
                                el.insertBefore(div, imageList[i + 1])
                            }
                            sort = i
                            that.$refs.delete[0].setAttribute('style', '')
                        }
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.el-col {
    line-height: 30px;
}
.el-button {
    margin: 0 20px;
}
.row-name {
    text-align: right;
    color: #233333;
    font-weight: bold;
}
.col-value {
    display: flex;
}
.image {
    position: relative;
    width: 80px;
    height: 80px;
    border: 1px solid #E5E5E5;
    text-align: center;
    border-radius: 4px;
    label {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        &:hover {
            i {
                display: block;
            }
        }
        i {
            display: none;
            line-height: 80px;
            font-size: 30px;
            color: #ababab;
            background-color: rgba(255, 255, 255, .8);
        }
        input {
            position: absolute;
            left: 0;
            width: 0;
            height: 0;
            border: none;
            opacity: 0;
        }
    }
    img {
        display: block;
        height: 100%;
        width: 100%;
    }
}
.images {
    position: relative;
    margin: 10px;
    user-select: none;
    >div {
        position: relative;
        display: inline-block;
        margin: 10px;
        width: 98px;
        height: 98px;
        border: 1px solid #E5E5E5;
        border-radius: 3px;
        font-size: 50px;
        line-height: 98px;
        text-align: center;
        color: #E5E5E5;
        overflow: hidden;
        cursor: move;
        .shade {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        }
        label {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
            input {
                position: absolute;
                left: 0;
                width: 0;
                height: 0;
                border: none;
                opacity: 0;
            }
        }
        >img {
            display: block;
            height: 100%;
            width: 100%;
        }
    }
    .add-image {
        border: 1px dashed #E5E5E5;
        cursor: pointer;
        &:hover {
            color: #66b1ff;
            border-color: #66b1ff;
        }
        &:active {
            color: #3a8ee6;
            border-color: #3a8ee6;
        }
    }
}
.form-table {
    table {
        width: 100%;
        max-width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        >tr {
            >td {
                height: 47px;
                border: 1px solid #DCDFE6;
                text-align: center;
                &:first-child {
                    width: 60px;
                }
                input {
                    width: calc(100% - 20px);
                    height: calc(100% - 10px);
                    border: none;
                    text-align: center;
                    font-size: 14px;
                }
                .table-image {
                    display: flex;
                    i {
                        line-height: 46px;
                    }
                    .table-el-image {
                        width: 46px;
                        height: 46px;
                        margin: 0 10px;
                    }
                    label {
                        cursor: pointer;
                        color: #3a8ee6;
                        input {
                            position: absolute;
                            left: 0;
                            width: 0;
                            height: 0;
                            border: none;
                            opacity: 0;
                        }
                    }
                }
            }
            .table-delete {
                width: 60px;
            }
            .table-delete, .table-add {
                font-size: 20px;
                color: #a5a5a5;
                cursor: pointer;
                &:hover {
                    color: #66b1ff;
                }
                &:active {
                    color: #3a8ee6;
                }
            }      
        }
    }
}
.loading {
    font-size: 30px;
    text-align: center;
}
</style>
