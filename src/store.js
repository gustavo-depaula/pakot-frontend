import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		user: {
			logged: false,
			signed: false,
			object: null,
			phoneObject: null,
			cpf: null,
			phone: null
		},
		pageloader: false,
		requireSignUp: false,
		isUser: false,
		isDeliveryMan: false,
		wantToLogIn: false
	},
	getters: {
		userLogged: state => state.user.logged,
		user: state => state.user,
		email: state => state.user.object.email,
		pageloader: state => state.pageloader,
		userSigned: state => state.user.signed,
		cpf: state => state.user.cpf,
		phone: state => state.user.phone,
		isUser: state => state.isUser,
		isDeliveryMan: state => state.isDeliveryMan,
		isAny: state => !(state.isUser && isDeliveryMan),
		wantToLogIn: state => state.wantToLogIn,
	},
	mutations: {
		user: (state, user) => {
			state.user.object = user
		},
		phoneObject: (state, user) => {
			state.user.phoneObject = user
		},
		userLogIn: (state, user, signed) => {
			state.user.object = user
			state.user.logged = true
		},
		logIn: (state) => {
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
			state.user.phoneObject = null
			state.user.logged = false
			state.user.signed = false	
			state.wantToLogIn = false	
		},
		cpf: (state, cpf) => {
			state.user.cpf = cpf
		},
		phone: (state, phone) => {
			state.user.phone = phone
		},
		isUser: (state) => {
			state.isUser = true
			state.isDeliveryMan = false
		},
		isDeliveryMan: (state) => {
			state.isUser = false
			state.isDeliveryMan = true
		},
		wantToLogIn: (state) => {
			state.wantToLogIn = true
		},
		toLanding: (state) => {
			state.wantToLogIn = false
		}
	}

})