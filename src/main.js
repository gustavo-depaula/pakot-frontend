// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Navbar from './components/Navbar'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	template: `
	<div class="columns is-marginless">
		<div style="background-color: #363636;">
			<Navbar />
		</div>
		<div class="column is-10 is-paddingless">
			<router-view></router-view>
		</div>
	</div>
	`,
	router,
	components: {
		Navbar
	},
	
}).$mount('#app')