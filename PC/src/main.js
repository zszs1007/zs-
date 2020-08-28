// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
//公共样式
import './assets/css/public.css'
//引入全局的Element ui
import 'element-ui/lib/theme-chalk/index.css'
import ElementUi from 'element-ui';
Vue.use(ElementUi)

Vue.prototype.uploadHttp = 'http://localhost:3000'

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
