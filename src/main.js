import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/assets/css/global.css'
import request from "@/utils/request";
Vue.use(ElementUI)

Vue.config.productionTip = false

// 全局绑定
Vue.prototype.$request = request

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
