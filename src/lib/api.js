const api = {
    postLogin: '/api/user/v1/login', //登录
    getLogout: '/api/user/v1/loginOut', //退出登录

    getPanelData: '', //获取主面板数据

    getHomeModules: '/api/home/v1/getAll', //获取全部模块
    getHomeModule: '/api/home/v1/get/', //获取单个模块
    getHomeOptions: '/api/home/v1/modules', //获取选项
    getHomeCompanyProfile: '/api/home/v1/getCompanyProfile', //获取公司简介
    putHomeCompanyProfile: '/api/home/v1/saveCompanyProfile', //更新公司简介
    getHomePartner: '/api/home/v1/partner/list', //获取全部合作伙伴
    postHomePartner: '/api/home/v1/partner/edit', //更新合作伙伴
    deleteHomePartner: '/api/home/v1/partner/delete/', //删除合作伙伴

    getAboutModules: '/api/walk/v1/getAll', //获取全部模块
    getAboutModule: '/api/walk/v1/get/', //获取单个模块
    getAboutOptions: '/api/walk/v1/modules', //获取选项
    getAboutInfo: '/api/walk/v1/aboutUs/get', //获取关于我们
    postUpdateInfo: '/api/walk/v1/aboutUs/update', //更新关于我们
    getAboutCulture: '/api/walk/v1/cultrue/get', //获取企业文化
    postUpdateCulture: '/api/walk/v1/cultrue/save', //更新企业文化
    getAboutHonor: '/api/walk/v1/honour/getAll', //获取裕丰荣誉
    postUpdateHonor: '/api/walk/v1/honour/save', //更新裕丰荣誉
    getAboutTeam: '/api/walk/v1/qualification/getAll', //获取团队资质
    postUpdateTeam: '/api/walk/v1/qualification/save', //更新团队资质

    getProductModules: '/api/product/v1/listVo', //获取所有模块
    getProductModule: '/api/product/v1/listVo/', //获取单个模块
    getProductOptions: '/api/product/v1/sampleVos', //获取选项列表
    getProductInfo: '/api/product/v1/view/', //查询产品信息
    getProductDetail: '/api/product/v1/detail/', //查询产品详情
    postProductAdd: '/api/product/v1/save', //添加产品
    postProductAddDetail: '/api/product/v1/detail/save', //添加产品详情
    postProductUpdateInfo: '/api/product/v1/update', //更新产品信息
    postProductUpdateDetail: '/api/product/v1/detail/update', //更新产品详情
    deleteProductDelete: '/api/product/v1/delete/', //更新产品详情

    getPlatformModules: '/api/platform/v1/listVo', //获取所有模块
    getPlatformModule: '/api/platform/v1/listVo/', //获取单个模块
    getPlatformOptions: '/api/platform/v1/sampleVos', //获取选项列表
    getPlatformDetail: '/api/platform/v1/view/', //查询平台详情
    postPlatformUpdateDetail: '/api/platform/v1/update', //更新平台详情
    postPlatformAdd: '/api/platform/v1/save', //添加平台
    deletePlatformDelete: '/api/platform/v1/delete/', //删除平台

    getSystemModules: '/api/apply/v1/listVo', //获取所有模块
    getSystemModule: '/api/apply/v1/listVo/', //获取单个模块
    getSystemOptions: '/api/apply/v1/sampleVos', //获取选项列表
    getSystemDetail: '/api/platform/v1/view/', //查询系统模块详情
    postSystemUpdateDetail: '/api/apply/v1/update', //更新系统模块详情
    postSystemAdd: '/api/apply/v1/save', //添加系统模块
    deleteSystemDelete: '/api/apply/v1/delete/', //删除系统模块

    getNewsList: '', //获取新闻列表
    getNewsSearchList: '', //搜索新闻列表
    getNewsTimes: '', //获取新闻时间段
    getNewsDetail: '', //获取新闻详情
    postNewsUpdateDetail: '', //更新新闻详情
    postNewsAdd: '', //添加新闻
    deleteNews: '', //删除新闻

    getMessageList: '', //获取留言列表
    getMessageSearchList: '', //搜索留言列表
    getMessageDetail: '', //获取留言详情
    postMessageReply: '', //回复留言
}

export default api