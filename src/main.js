// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import { store } from './store'
import axios from 'axios';
import VueTheMask from 'vue-the-mask'

Vue.config.productionTip = false
Vue.component('b-modal', require('./components/b-modal.vue'))
Vue.use(VueTheMask)
/* eslint-disable no-new */
new Vue({
	template: `<App/>`,
	router,
	store,
	created() {
		
		firebase.initializeApp(config)

		firebase.auth().onAuthStateChanged((user) => {
			if (this.$store.getters.user.object == null) {
				this.$store.commit('user', user)
			} else {
				this.$store.commit('phoneObject', user)
			}
		});
	},
	components: {
		App
	},
	
}).$mount('#app')