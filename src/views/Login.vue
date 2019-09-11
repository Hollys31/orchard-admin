<template>
    <div class="login">
        <div class="login-warp">
            <div class="web-name">江西裕丰科技官网后台管理</div>
            <div class="login-form">
                <div class="login-title"></div>
                <label class="user-name">
                    <span class="iconfont">&#xe68a;</span>
                    <input
                        v-model="account"
                        type="text"
                        placeholder="用户名"
                        autofocus="autofocus"
                        autocomplete="off"
                        maxlength="50"
                        tabindex="1"
                    >
                </label>
                <label class="user-password">
                    <span class="iconfont">&#xe6ff;</span>
                    <input
                        v-model="password"
                        type="password"
                        placeholder="密码"
                        autocomplete="new-password"
                    >
                </label>
                <div class="other">
                    <div class="auto-login" @click="remember = !remember">
                        <span class="iconfont"><i v-show="remember" class="el-icon-check"></i></span>自动登录
                    </div>
                </div>
                <div
                    class="login-button"
                    @click="login()"
                >登录</div>
            </div>
        </div>
    </div>
</template>

<script>
    import ns from '@/store/constants/ns'
    import types from '@/store/constants/types'
    import { mapState } from 'vuex'
    import { ttof, ftot } from '@/lib/util'
    const local = localStorage
    const nameSpaced = ns.LOGIN + '/'
    export default {
        name: 'Login',
        data() {
            return {
                account: '',
                password: '',
                remember: false, //记住密码
            }
        },
        mounted() {
            const that = this
            const account = ftot(local.getItem('oun'))
            const password = ftot(local.getItem('oup'))

            if (account != null) that.account = account
            if (password != null) that.password = password
            if (localStorage.getItem('auto_login')) that.login()

            document.addEventListener('keydown', that.login)
        },
        methods: {
            login(e) {
                const that = this
                if(e && e.keyCode != 13) return
                if (!that.verify()) return

                const data = {
                    account: that.account,
                    password: that.password
                }
                if (that.remember) {
                    local.setItem('oun', ttof(that.account))
                    local.setItem('oup', ttof(that.password))
                    local.setItem('auto_login', true)
                } else {
                    local.removeItem('oun')
                    local.removeItem('oup')
                    local.removeItem('auto_login')
                }
                that.$store.dispatch(nameSpaced + types.LOGIN_POST_IN, data).then(res => {
                    that.loginedCallBack(res)
                })
            },
            loginedCallBack(data) {
                const that = this
                if (data.status === 200) {
                    data = data.data
                    let name = ''
                    const userInfo = {
                        id: data.user.userNo, //用户id
                        photo: data.user.headUrl ? data.user.headUrl : 'http://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', //头像
                        name: data.user.realName, //用户真实姓名
                        account: data.user.account, //账号
                        nickName: data.user.nickName, //昵称
                        mobile: data.user.mobile, //手机号码
                        date: '2019-09-01'
                    }
                    that.$store.commit(types.APP_SET_USER_INFO, userInfo)
                    local.setItem('user_info', JSON.stringify(userInfo))
                    local.setItem('yf_token', data.tokenKey)
                    name = userInfo.nickName ? userInfo.nickName : userInfo.name
                    that.$message.success(name + '，欢迎您登录系统！')
                    that.$router.push('panel')
                }
            },
            verify() {
                const that = this
                if (!that.account) {
                    that.$message.warning('请填写用户名！')
                    return false
                }

                if (!that.password) {
                    that.$message.warning('请输入密码！')
                    return false
                }

                return true
            },
        },
        beforeDestroy () {
            document.removeEventListener('keydown', this.login)
        }
    }
</script>

<style lang="scss" scoped>
    .login {
        position: fixed !important;
        top: 0;
        left: 0;
        width: 100% !important;
        height: 100% !important;
        min-width: 555px;
        min-height: 700px;
        background-color: #fff;
        background-position: top right;
        background-size: 100% 100%;
        background-image: url("../assets/images/login_bg.jpg");
        font-size: 16px;
        user-select: none;
        z-index: 1;
        .login-warp {
            position: absolute;
            top: 50%;
            right: 10%;
            width: 500px;
            margin-top: -300px;
            .web-name {
                padding-bottom: 50px;
                text-align: center;
                font-size: 32px;
                color: #fff;
            }
            .login-form {
                padding: 30px 60px 50px 60px;
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 0 1px 1px rgba(111, 111, 111, 0.2);
                color: #0F85FE;
                .login-title {
                    height: 60px;
                    background-image: url("../assets/images/login_logo.png");
                    background-size: 169.88px 50px;
                    background-repeat: no-repeat;
                    background-position: center center;
                }
                .other {
                    display: flex;
                    .auto-login {
                        position: relative;
                        line-height: 20px;
                        padding: 10px 0 10px 36px;
                        margin-right: 180px;
                        cursor: pointer;
                        > span {
                            position: absolute;
                            left: 10px;
                            top: 13px;
                            height: 14px;
                            width: 14px;
                            font-size: 14px;
                            line-height: 14px;
                            text-align: center;
                            border: 1px solid #0F85FE;
                        }
                    }
                }
                .login-button {
                    color: #fff;
                    margin-top: 20px;
                    line-height: 50px;
                    text-align: center;
                    font-size: 20px;
                    border-radius: 4px;
                    background: linear-gradient(90deg,rgba(10,137,255,1),rgba(61,92,250,1));
                    cursor: pointer;
                }
                .user-name,
                .user-password {
                    position: relative;
                    display: block;
                    height: 80px;
                    line-height: 80px;
                    .iconfont {
                        position: absolute;
                        left: 10px;
                    }
                    > input {
                        width: 332px;
                        height: 38px;
                        padding: 5px 10px 5px 36px;
                        margin: 10px 0;
                        border: 1px solid #d7d7d7;
                        border-radius: 4px;
                        font-size: 16px;
                        color: #777777;
                    }
                }
            }
        }
    }
</style>
