import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		user: {
			logged: false,
			signed: false,
			object: null,
			cpf: null,
			phone: null
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
		userSigned: state => {
			return state.user.signed
		},
		cpf: state => {
			return state.user.cpf
		},
		phone: state => {
			return state.user.phone
		}
	},
	mutations: {
		userLogIn: (state, user, signed) => {
			state.user.object = user
			state.user.logged = true
		},
		userRequireSignUp: (state) => {
			state.user.signed = false
		},
		userDontRequireSignUp: (state) => {
			state.user.signed = true
		},
		pageloader: (state, condition) => {
			state.pageloader = condition
		},
		userSignOut: (state) => {
			state.user.object = null
			state.user.logged = false
			state.user.signed = false	
		},
		cpf: (state, cpf) => {
			state.user.cpf = cpf
		},
		phone: (state, phone) => {
			state.user.phone = phone
		}
	}

})