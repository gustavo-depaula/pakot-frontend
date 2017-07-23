import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '@/components/Home'

const routes = [
	{ path: '/', component: Home }
]

export default new Router({
	mode: 'history',
	routes,
	linkActiveClass: 'is-active'
})
