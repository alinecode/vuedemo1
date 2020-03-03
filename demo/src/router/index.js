import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/pages/login/HelloWorld'
import login from '@/pages/login/Login'


Vue.use(Router)


export default new Router({
//	mode:'history',
  routes: [
  	{
			path: '/',
			redirect: '/login'
		}, 
    {
      path: '/index',
//    path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        title: '首页',
        type: 'login'  // 是否需要判断是否登录,这里是需要判断
      }
    },
    
    {
			path: '/login',
			name: 'login',
			component: login,
			meta: {
        title: 'login',
        type: '' // 不需要鉴权
      }
		}
    
  ]
})
