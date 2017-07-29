// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import { store } from './store'
import axios from 'axios';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	template: `<App/>`,
	router,
	store,
	created() {
		firebase.initializeApp(config);
		firebase.auth().onAuthStateChanged((user) => {
			if(user) {
				axios.post('https://pakot-backend.herokuapp.com/public/login/User', {email: user.email})
					.then(response => {
						console.log(response)
					})
					.catch(e => {
						console.log(e)
					})
				this.$store.commit('userLogIn', user)
				this.$router.push('/packages')
			}
		});
	},
	components: {
		App
	},
	
}).$mount('#app')