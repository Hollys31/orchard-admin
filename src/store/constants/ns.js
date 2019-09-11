//模块命名空间
const ns = [
    'LOGIN', //登录
    'PANEL', //主面板
    'HOME', //官网首页管理
    'ABOUT', //走进裕丰管理
    'PRODUCT', //产品管理
    'PLATFORM', //平台管理
    'SYSTEM', //系统模块管理
    'NEWS', //新闻管理
    'MESSAGE' //留言信息管理
]
const nsObj = {}
ns.forEach(name => {nsObj[name] = name})

export default nsObj