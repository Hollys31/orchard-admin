<template>
    <el-image :src="src">
        <div slot="placeholder" class="image-slot">
            <i class="el-icon-loading" :style="'line-height: ' + lineHeight"></i>
        </div> 
        <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline" :style="'line-height: ' + lineHeight"></i>
        </div>
    </el-image>
</template>

<script>
export default {
    name: 'AppDialogImage',
    props: {
        src: { type: String, default: '' },
        lineHeight: { type: String, default: '80px'}
    }
}
</script>

<style lang="scss" scoped>
.el-image {
    width: 100%;
    height: 100%;
    border-radius: 3px;
    overflow: hidden;
}
.image-slot {
    height: 100%;
    text-align: center;
    >i {
        font-size: 32px;
        text-align: center;
        color: #E5E5E5;
    }
}
</style>