import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '@/components/home'
import CreatePackage from '@/components/create-package'
import Login from '@/components/login'

const routes = [
	{ path: '/login', component: Login },
	{ path: '/packages', component: Home },
	{ path: '/create-package', component: CreatePackage }
]

export default new Router({
	mode: 'history',
	routes,
	linkActiveClass: 'active'
})
