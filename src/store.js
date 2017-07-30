import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		user: {
			logged: false,
			signed: false,
			object: null
		},
		pageloader: false,
		requireSignUp: false,
	},
	getters: {
		userLogged: state => {
			return state.user.logged
		},
		user: state => {
			return state.user
		},
		pageloader: state => {
			return state.pageloader
		},
		requireSignUp: state => {
			return state.requireSignUp
		},
	},
	mutations: {
		userLogIn: (state, user) => {
			state.user.logged = true
			state.user.object = user
		},
		pageloader: (state, condition) => {
			state.pageloader = condition
		},
		requireSignUp: (state, condition) => {
			state.requireSignUp = condition
		}
	}

})