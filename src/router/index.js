import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '@/components/Home'
import CreatePackage from '@/components/create-package'
import Login from '@/components/login'
import SignUp from '@/components/signup'
import Profile from '@/components/profile'
import Packages from '@/components/see-packages'
import Opportunities from '@/components/opportunities'
import Landing from '@/components/landing'
import Shipments from '@/components/my-shipments'
import Gains from '@/components/gains'

const routes = [
	{ path: '/login', component: Login },
	{ path: '/signup', component: SignUp },
	{ path: '/packages', component: Packages },
	{ path: '/create-package', component: CreatePackage },
	{ path: '/profile', component: Profile },
	{ path: '/opportunities', component: Opportunities },
	{ path: '/landing', component: Landing },
	{ path: '/shipments', component: Shipments },
	{ path: '/gains', component: Gains }
]

export default new Router({
	mode: 'history',
	routes,
	linkActiveClass: 'active'
})
