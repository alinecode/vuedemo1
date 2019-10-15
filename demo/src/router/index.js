import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/Login'


Vue.use(Router)


export default new Router({
//	mode:'history',
  routes: [
    {
      path: '/index',
      name: 'HelloWorld',
      component: HelloWorld
    },
    
    {
			path: '/',
			name: 'login',
			component: login,
		}
    
  ]
})
