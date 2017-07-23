import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '@/components/Home'
import CreatePackage from '@/components/create-package'

const routes = [
	{ path: '/packages', component: Home },
	{ path: '/create-package', component: CreatePackage }
]

export default new Router({
	mode: 'history',
	routes,
	linkActiveClass: 'active'
})
