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
					console.log(response.data)
					if (response.data == 'requireSignUp') {
						this.$store.commit('userLogIn', user)
						this.$store.commit('userRequireSignUp')
					} else {
						this.$store.commit('userLogIn', user)
						this.$store.commit('userDontRequireSignUp')
						axios.post('https://pakot-backend.herokuapp.com/public/User/getData', {email: this.$store.getters.user.object.email})
						.then(response => {
							console.log(response)
							this.$store.commit('cpf', response.data.cpf) 
							this.$store.commit('phone', response.data.phone)
						})
					}
				})
				.catch(e => {
					console.log(e)
				})
			}
		});
	},
	components: {
		App
	},
	
}).$mount('#app')