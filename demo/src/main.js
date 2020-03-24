// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css' // 使用 CSS
//import axios from 'axios'
import store from './store'

import '../static/layui/css/layui.css'
import '../static/layui/layui.js'
//import '../static/js/jsonUtils.js'

//import 'https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js'

import AL from './api/AL'
Vue.use(AL)
 


// 已登陆允许访问页面，未登录跳转到login
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  const type = to.meta.type
 
  if (type === 'login') {
    if (window.localStorage.getItem('login')) {
//  	console.log('66666');
      next()
    } else {
      next('/login')
    }
  } else {
    next() 
  }
})


//// 添加request/请求拦截器
//axios.interceptors.request.use(function (config) {   // 或者使用表达式 .use(config => {
//  // 在发送请求之前添加请求头
//  config.headers['Authorization'] = window.localStorage.tokenType + " " + window.localStorage.token;
//  return config;
//}, function (error) {
//  // 对请求错误做些什么
//  return Promise.reject(error);
//});



Vue.use(iView)
Vue.config.productionTip = false
//Vue.prototype.$axios = axios

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
