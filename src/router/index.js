import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '@/components/home'
import CreatePackage from '@/components/create-package'
import Login from '@/components/login'
import SignUp from '@/components/signup'
import Profile from '@/components/profile'
import Packages from '@/components/see-packages'

const routes = [
	{ path: '/login', component: Login },
	{ path: '/signup', component: SignUp },
	{ path: '/packages', component: Packages },
	{ path: '/create-package', component: CreatePackage },
	{ path: '/profile', component: Profile }
]

export default new Router({
	mode: 'history',
	routes,
	linkActiveClass: 'active'
})
