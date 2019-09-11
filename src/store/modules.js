import ns from '@/store/constants/ns'
import login from '@/store/modules/login'
import panel from '@/store/modules/panel'
import home from '@/store/modules/home'
import about from '@/store/modules/about'
import product from '@/store/modules/product'
import platform from '@/store/modules/platform'
import system from '@/store/modules/system'
import news from '@/store/modules/news'
import message from '@/store/modules/message'
export default {
    [ns.LOGIN]: login,
    [ns.PANEL]: panel,
    [ns.HOME]: home,
    [ns.ABOUT]: about,
    [ns.PRODUCT]: product,
    [ns.PLATFORM]: platform,
    [ns.SYSTEM]: system,
    [ns.NEWS]: news,
    [ns.MESSAGE]: message,
}