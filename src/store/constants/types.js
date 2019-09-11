const types = [
    /******************全局状态*********************/
    'APP_SET_LOADING_STATUS',           //设置app数据加载状态
    'APP_SET_LOADING_TIPS',             //设置app加载中的提示信息
    'APP_SET_MESSAGE',                  //设置app通知消息
    'APP_SET_REFRESH_STATUS',           //设置app页面刷新状态
    'APP_GET_WINDOWS_SIZE',             //获取当前窗口大小
    'APP_CHANGE_MENU_INOUT',            //打开关闭菜单
    'APP_SET_BREADCRUMB',               //设置面包屑导航
    'APP_SET_ROUTER',                   //设置路由
    'APP_SET_USER_INFO',                //设置当前登录用户的信息

    /*********************登录页*******************/
    'LOGIN_POST_IN',                    //登录
    'LOGIN_GET_OUT',                    //退出登录

    /*********************主面板页面*******************/
    'PANEL_GET_DATA',                    //获取主面板数据
    'PANEL_SET_DATA',                    //设置主面板数据
    
    /*********************官网首页管理页面*******************/
    'HOME_GET_MODULES',                 //获取官网首页管理页面全部模块
    'HOME_GET_MODULE',                  //获取官网首页管理页面单个模块
    'HOME_SET_MODULES',                 //设置官网首页管理页面模块列表
    'HOME_GET_OPTIONS',                 //获取选项列表
    'HOME_SET_OPTIONS',                 //设置选项列表
    'HOME_GET_COMPANY_PROFILE',         //获取公司简介
    'HOME_SET_COMPANY_PROFILE',         //设置公司简介
    'HOME_UPDATE_COMPANY_PROFILE',      //更新公司简介
    'HOME_GET_PARTNER',                 //获取全部合作伙伴
    'HOME_SET_PARTNER',                 //设置全部合作伙伴
    'HOME_UPDATE_PARTNER',              //更新合作伙伴
    'HOME_DELETE_PARTNER',              //删除合作伙伴

    /*************************走进裕丰管理页面************************/
    'ABOUT_GET_MODULES',                //获取所有模块
    'ABOUT_GET_MODULE',                 //获取单个模块
    'ABOUT_SET_MODULES',                //设置模块列表
    'ABOUT_GET_OPTIONS',                //获取选项列表
    'ABOUT_SET_OPTIONS',                //设置选项列表
    'ABOUT_GET_INFO',                   //获取关于我们
    'ABOUT_SET_INFO',                   //设置关于我们
    'ABOUT_UPDATE_INFO',                //更新关于我们
    'ABOUT_GET_CULTURE',                //获取企业文化
    'ABOUT_SET_CULTURE',                //设置企业文化
    'ABOUT_UPDATE_CULTURE',             //更新企业文化
    'ABOUT_GET_HONOR',                  //获取裕丰荣誉
    'ABOUT_SET_HONOR',                  //设置裕丰荣誉
    'ABOUT_UPDATE_HONOR',               //更新裕丰荣誉
    'ABOUT_GET_TEAM',                   //获取团队资质
    'ABOUT_SET_TEAM',                   //设置团队资质
    'ABOUT_UPDATE_TEAM',                //更新团队资质
    
    /*************************产品管理页面************************/
    'PRODUCT_GET_MODULES',                //获取所有模块
    'PRODUCT_GET_MODULE',                 //获取单个模块
    'PRODUCT_SET_MODULES',                //设置模块列表
    'PRODUCT_GET_OPTIONS',                //获取选项列表
    'PRODUCT_SET_OPTIONS',                //设置选项列表
    'PRODUCT_GET_INFO',                   //查询产品信息
    'PRODUCT_SET_INFO',                   //设置产品信息
    'PRODUCT_UPDATE_INFO',                //更新产品信息
    'PRODUCT_GET_DETAIL',                 //查询产品详情
    'PRODUCT_SET_DETAIL',                 //设置产品详情
    'PRODUCT_UPDATE_DETAIL',              //更新产品详情
    'PRODUCT_POST_ADD',                   //添加产品
    'PRODUCT_POST_DETAIL',                //添加产品详情
    'PRODUCT_DELETE_MODULE',              //删除产品
    
    /*************************平台管理页面************************/
    'PLATFORM_GET_MODULES',                //获取所有模块
    'PLATFORM_GET_MODULE',                 //获取单个模块
    'PLATFORM_SET_MODULES',                //设置模块列表
    'PLATFORM_GET_OPTIONS',                //获取选项列表
    'PLATFORM_SET_OPTIONS',                //设置选项列表
    'PLATFORM_GET_DETAIL',                 //查询平台详情
    'PLATFORM_SET_DETAIL',                 //设置平台详情
    'PLATFORM_UPDATE_DETAIL',              //更新平台详情
    'PLATFORM_POST_ADD',                   //添加平台
    'PLATFORM_DELETE_MODULES',             //删除平台
    
    /*************************系统模块管理页面************************/
    'SYSTEM_GET_MODULES',                //获取所有模块
    'SYSTEM_GET_MODULE',                 //获取单个模块
    'SYSTEM_SET_MODULES',                //设置模块列表
    'SYSTEM_GET_OPTIONS',                //获取选项列表
    'SYSTEM_SET_OPTIONS',                //设置选项列表
    'SYSTEM_GET_DETAIL',                 //查询系统模块详情
    'SYSTEM_SET_DETAIL',                 //设置系统模块详情
    'SYSTEM_UPDATE_DETAIL',              //更新系统模块详情
    'SYSTEM_POST_ADD',                   //添加系统模块
    'SYSTEM_DELETE_MODULES',             //删除系统模块
    
    /*************************新闻中心管理页面************************/
    'NEWS_GET_LIST',                    //获取新闻列表
    'NEWS_SEARCH_LIST',                 //搜索新闻列表
    'NEWS_SET_LIST',                    //设置新闻列表
    'NEWS_GET_TIMES',                   //获取时间段
    'NEWS_SET_TIMES',                   //设置时间段
    'NEWS_GET_DETAIL',                  //获取新闻详情
    'NEWS_SET_DETAIL',                  //设置新闻详情
    'NEWS_UPDATE_DETAIL',               //更新新闻详情
    'NEWS_POST_ADD',                    //添加新闻
    'NEWS_DELETE_NEWS',                 //删除新闻
    
    /*************************留言管理页面************************/
    'MESSAGE_GET_LIST',                  //获取留言列表
    'MESSAGE_SEARCH_LIST',               //搜索留言列表
    'MESSAGE_SET_LIST',                  //设置留言列表
    'MESSAGE_GET_DETAIL',                //获取留言详情
    'MESSAGE_SET_DETAIL',                //设置留言详情
    'MESSAGE_POST_REPLY',                //回复留言


]

const typesObj = {}
types.forEach(type => {typesObj[type] = type})
export default typesObj