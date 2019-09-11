<template>
    <el-aside class="side-menu" width="210px">
        <el-menu
            class="el-menu-vertical"
            background-color="#fff"
            text-color="#283643"
            active-text-color="#0F85FE"
            :default-active="index"
            :collapse="isCollapse"
            :router="true"
        >
            <li class="user-info">
                <div>
                    <el-avatar :size="50" :src="$store.state.userInfo.photo"></el-avatar>
                </div>
                <div>
                    <span>{{$store.state.userInfo.name}}（管理员）</span><br />
                    <span :title="'上次登录时间 ' + $store.state.userInfo.date">
                        <i class="el-icon-time"></i> {{$store.state.userInfo.date}}
                    </span>
                </div>
            </li>
            <el-menu-item index="/panel">
                <i class="el-icon-s-promotion"></i>
                <span slot="title">主面板</span>
            </el-menu-item>
            <el-menu-item index="/home">
                <i class="el-icon-s-home"></i>
                <span slot="title">官网首页</span>
            </el-menu-item>
            <el-menu-item index="/about">
                <i class="el-icon-s-flag"></i>
                <span slot="title">走进裕丰</span>
            </el-menu-item>
            <el-menu-item index="/product">
                <i class="el-icon-s-goods"></i>
                <span slot="title">产品管理</span>
            </el-menu-item>
            <el-menu-item index="/platform">
                <i class="el-icon-s-platform"></i>
                <span slot="title">平台管理</span>
            </el-menu-item>
            <el-menu-item index="/system">
                <i class="el-icon-s-tools"></i>
                <span slot="title">系统模块管理</span>
            </el-menu-item>
            <el-menu-item index="/news">
                <i class="el-icon-s-order"></i>
                <span slot="title">新闻中心</span>
            </el-menu-item>
            <el-menu-item index="/message">
                <i class="el-icon-s-comment"></i>
                <span slot="title">留言管理</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script>
    import types from '@/store/constants/types'
    export default {
        name: 'SideMenu',
        data() {
            return {
                isCollapse: false,
                index: '/panel'
            }
        },
        watch: {
            '$store.state.router' (router) {
                this.setActionIndex(router.to)
            }
        },
        mounted () {
            this.setActionIndex()
        },
        methods: {
            setActionIndex(to = document.URL) {
                const that = this
                let breadcrumb = []
                if(/panel/.test(to)) {
                    that.index = '/panel'
                    breadcrumb = ['裕丰科技官网后台', '主面板']
                }else if(/home/.test(to)) {
                    that.index = '/home'
                    breadcrumb = ['裕丰科技官网后台', '官网首页']
                }else if(/about/.test(to)) {
                    that.index = '/about'
                    breadcrumb = ['裕丰科技官网后台', '走进裕丰']
                }else if(/product/.test(to)) {
                    that.index = '/product'
                    breadcrumb = ['裕丰科技官网后台', '产品管理']
                }else if(/platform/.test(to)) {
                    that.index = '/platform'
                    breadcrumb = ['裕丰科技官网后台', '平台管理']
                }else if(/system/.test(to)) {
                    that.index = '/system'
                    breadcrumb = ['裕丰科技官网后台', '系统模块管理']
                }else if(/news/.test(to)) {
                    that.index = '/news'
                    breadcrumb = ['裕丰科技官网后台', '新闻中心']
                }else if(/message/.test(to)) {
                    that.index = '/message'
                    breadcrumb = ['裕丰科技官网后台', '留言管理']
                }
                that.$store.commit(types.APP_SET_BREADCRUMB, breadcrumb)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .side-menu {
        overflow: hidden;
        box-shadow: 0 10px 6px 1px rgba(0, 0, 0, 0.1);
    }
    .el-menu-vertical:not(.el-menu--collapse) {
        width: 210px;
        height: 100%;
        min-height: 400px;
    }
    .is-active::after {
        content: '';
        position: absolute;
        top: 50%;
        right: 2px;
        margin-top: -15px;
        height: 30px;
        border: 1px solid #0F85FE;
    }
    .el-submenu::before {
        display: none;
    }
    .user-info {
        display: flex;
        padding: 10px;
        line-height: 25px;
        color: #283643;
        text-align: left;
        div {
            margin: 5px;
        }
    }
</style>
