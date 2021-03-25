import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/pages/login/HelloWorld'
import login from '@/pages/login/Login'
import tes from '@/pages/login/tes'
import bgshow from '@/pages/login/bgshow'


Vue.use(Router)


export default new Router({
//	mode:'history',
  routes: [
  	{
			path: '/',
			redirect: '/index'
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
		},
    
    {
			path: '/bgshow',
			name: 'bgshow',
			component: bgshow,
			meta: {
        title: 'bgshow',
        type: '' // 不需要鉴权
      }
		},
    {
			path: '/tes',
			name: 'tes',
			component: tes,
			meta: {
        title: 'login',
        type: '' // 不需要鉴权
      }
		},
    
  ]
})
