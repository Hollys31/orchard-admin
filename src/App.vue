<template>
    <el-container id="app">
        <SideMenu />
        <el-container>
            <el-header>
                <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item v-for="(item, index) in $store.state.breadcrumb" :key="index">{{item}}</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="app-tools">
                    <i class="el-icon-refresh" title="刷新页面" @click="refresh()"></i>
                    <i class="el-icon-full-screen" title="切换全屏" @click="changeScreen()"></i>
                    <i class="el-icon-switch-button" title="退出登录" @click="logout()"></i>
                </div>
            </el-header>
            <div class="main" :style="'height: ' + ($store.state.windowSize.height - 70) + 'px; width: ' + ($store.state.windowSize.width - 220) + 'px'">
                <vue-scroll class="scroll" :ops="scrollOptions">
                    <div class="coutent">
                        <router-view />
                    </div>
                </vue-scroll>
            </div>
        </el-container>
        <Spinner v-show="$store.state.loading" />
    </el-container>
</template>

<script>
    import SideMenu from '@/views/SideMenu'
    import Spinner from '@/components/Spinner'
    import { fullScreen, exitFullScreen } from '@/lib/util'
    import ns from '@/store/constants/ns'
    import types from '@/store/constants/types'
    const nameSpace = ns.LOGIN + '/'
    export default {
        name: 'app',
        components: { SideMenu, Spinner },
        watch: {
            '$store.state.message' (msg) { //监听app错误消息
                this.$message.error(msg)
            }
        },
        data() {
            return {
                isFull: false, //是否全屏
                scrollOptions: {
                    scrollPanel: {
                        right: -10,
                        scrollingX: true,
                    },
                    vuescroll: {
                        mode: 'native',
                        zooming: false,
                    },
                    bar: {
                        keepShow: true,
                        size: '4px',
                        background: '#00BBDC'
                    }
                },
            }
        },
        created () {
            const that = this
            that.handleResize()
            window.addEventListener('resize', that.handleResize) //监听窗口大小变化
        },
        methods: {
            refresh() { //设置刷新状态
                this.$store.commit(types.APP_SET_REFRESH_STATUS)
            },
            handleResize() { //监听窗口大小变化
                this.$store.commit(types.APP_GET_WINDOWS_SIZE)
            },
            changeScreen() { //全屏切换
                const that = this
                that.isFull = !that.isFull
                that.isFull ? fullScreen() : exitFullScreen()
            },
            logout() { //退出登录
                const that = this
                that.$store.dispatch(nameSpace + types.LOGIN_GET_OUT).then(res => {
                    if (res.status === 200) {
                        localStorage.removeItem('auto_login')
                        that.$message.success('已退出登录！')
                        that.$router.push('login')
                    }
                })
            }
        },
        beforeDestroy () {
            window.removeEventListener('resize', this.handleResize)
        }
    }
</script>

<style lang="scss">
    html, body {
        margin: 0;
        width: 100%;
        height: 100%;
        font-size: 14px;
        background-color: #F6F6F6;
    }
    p, ul {
        margin: 0;
    }
    ul {
        list-style: none;
        padding: 0;
    }
    @font-face {
        font-family: 'iconfont';  /* project id 1362036 */
        src: url('//at.alicdn.com/t/font_1362036_yhvyxrm7v8.eot');
        src: url('//at.alicdn.com/t/font_1362036_yhvyxrm7v8.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_1362036_yhvyxrm7v8.woff2') format('woff2'),
        url('//at.alicdn.com/t/font_1362036_yhvyxrm7v8.woff') format('woff'),
        url('//at.alicdn.com/t/font_1362036_yhvyxrm7v8.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_1362036_yhvyxrm7v8.svg#iconfont') format('svg');
    }
    .iconfont {
        font-family: 'iconfont';
        user-select: none;
    }
    #app {
        height: 100%;
        font-size: 14px;
        .el-header {
            display: flex;
            padding: 0;
            background-color: #fff;
            box-shadow: 0 1px 6px 1px rgba(0, 0, 0, 0.1);
            text-align: right;
            .app-breadcrumb {
                margin-left: 10px;
                line-height: 60px;
                color: #283643;
            }
            .app-tools {
                margin: 0 0 0 auto;
                i {
                    width: 40px;
                    height: 40px;
                    margin: 10px 20px 10px 0;
                    border-radius: 4px;
                    line-height: 40px;
                    text-align: center;
                    font-size: 26px;
                    color: #283643;
                    cursor: pointer;
                    &:hover {
                        color: #0F85FE;
                        text-shadow: 0px 0px 4px rgba(0, 187, 220, 0.5);
                        background-color: #eaecf2;
                    }
                }
            }
        }
        .main {
            width: 100%;
            margin: 10px 0 0 10px;
            .coutent {
                margin: 0 10px 0 0;
            }
            .page-title {
                position: relative;
                padding: 0 40px;
                font-size: 16px;
                line-height: 50px;
                font-weight: 600;
                letter-spacing: 3px;
                background-color: #fff;
                color: rgb(40, 54, 67);
                &::before {
                    content: '';
                    position: absolute;
                    top: 12px;
                    left: 31px;
                    height: 24px;
                    border: 1px solid #0F85FE;
                }
            }
            .search {
                position: relative;
                line-height: 40px;
                padding: 0 10px;
                background-color: #fff;
                &::after {
                    content: '';
                    left: 10px;
                    bottom: 0;
                    position: absolute;
                    width: calc(100% - 20px);
                    border-bottom: 1px solid #0F85FE;
                }
            }
        }
    }

    //element-ui
    .el-pagination {
        display: flex;
        justify-content: flex-end;
        padding: 0 30px 30px 30px !important;
        background-color: #fff;
    }
    .el-menu {
        >.el-menu-item {
            padding-left: 30px !important;
        }
    }
    .el-submenu {
        .el-menu-item {
            padding-left: 60px !important;
        }
    }
    .el-submenu__title {
        padding-left: 30px !important;
    }
</style>