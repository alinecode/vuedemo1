// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css' // 使用 CSS
import axios from 'axios'
import store from './store'

import '../static/layui/css/layui.css'
import '../static/layui/layui.js'
//import '../static/js/jsonUtils.js'

//import 'https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js'

Vue.use(iView)
Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
