import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import ElementUI from 'element-ui'
import VueScroll from 'vuescroll/dist/vuescroll-native.min.js'
import 'element-ui/lib/theme-chalk/index.css'
import 'vuescroll/dist/vuescroll.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueScroll)

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
