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
		pageloader: false
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
		}
	},
	mutations: {
		userLogIn: (state, user) => {
			state.user.logged = true
			state.user.object = user
		},
		pageloader: (state, condition) => {
			state.pageloader = condition
		}
	}
})