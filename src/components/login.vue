<!-- login page -->
<template lang="html">
	<div id="login">
		<div v-if="landing && user.object == null">
			<Landing @toLogin="landing = false"/>
		</div>
		<div v-else="">
			<div class="login-wrapper columns">
				<div class="column is-8 is-hidden-mobile hero-banner">
					<section class="hero is-fullheight is-dark">
						<div class="hero-body">
							<div class="container section">
								<div class="has-text-right">
									<h1 class="title is-1">Login</h1> <br>
									<p v-if="this.$store.getters.user.object != null" class="title is-3">Seja bem-vindo, <em>{{this.$store.getters.user.object.displayName.split(' ')[0]}}</em>!</p>
									<p v-else class="title is-3">Seja livre e eficiente. Use Pakot.</p>
								</div>
							</div>
						</div>
					</section>  
				</div>
				<div class="column is-4">
					<section class="hero is-fullheight">
						<div class="hero-heading">
							<div class="section has-text-centered">
								<img src="../assets/package.png" alt="Pakot logo" width="150px">
							</div>
						</div>
						<div v-if="user.object != null" class="hero-body">
							<div class="container">
								<div class="columns">
									<div class="column is-12">
										<div class="login-form">
											<h3 class="title">Cliente</h3>
											<h2 class="subtitle">Seja independente.</h2>
											<p class="control login">
												<button @click="signUser" class="button is-success is-large is-fullwidth" :class="{ 'is-loading': userBtnLoading, 'is-outlined': !userBtnLoading }"><span class="icon"><i class="fa fa-arrow-right"></i></span></button>
											</p>
											<hr>
											<h3 class="title">Entregador</h3>
											<h2 class="subtitle">Ajude a carregar a disrupção.</h2>
											<p class="control login">
												<button @click="signDeliveryMan" class="button is-success is-large is-fullwidth" :class="{ 'is-loading': deliveryBtnLoading, 'is-outlined': !deliveryBtnLoading }"><span class="icon"><i class="fa fa-arrow-right"></i></span></button>
											</p>
											<hr>
											<h3 class="title">Sair</h3>
											<h2 class="subtitle">Deslogar do Pakot.</h2>
											<p class="control login">
												<button @click="signOut" class="button is-danger is-large is-fullwidth" :class="{ 'is-loading': byeBtnLoading, 'is-outlined': !byeBtnLoading }"><span class="icon"><i class="fa fa-hand-spock-o"></i></span></button>
											</p>
										</div>
										<div class="section copyheart">
											<p class="has-text-centered">
												<span>&hearts;&nbsp;2017 Pakot Technologies Inc.</span>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div v-else class="hero-body">
							<div class="container">
								<div class="columns">
									<div class="column is-12">
										<div class="login-form">
											<h3 class="title">Entre agora</h3>
											<h2 class="subtitle">Faça parte dessa mudança.</h2>
											<p class="control login">
												<button @click="signIn" class="button is-info is-large is-fullwidth" :class="{ 'is-loading': authBtnLoading, 'is-outlined': !authBtnLoading }"><span class="icon"><i class="fa fa-facebook"></i></span></button>
											</p>
											<hr>
										</div>
										<div class="section copyheart">
											<p class="has-text-centered">
												<span>&hearts;&nbsp;2017 Pakot Technologies Inc.</span>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>  
				</div>
			</div>
		</div>

	</div>
</template>
<script>
	import Landing from './landing'
	import router from '../router'
	import axios from 'axios'

	export default {
		name: 'Login',
		data (){
			return {
				authBtnLoading: false,		
				userBtnLoading: false,
				deliveryBtnLoading: false,
				byeBtnLoading: false,
				user: this.$store.getters.user,
				landing: true
			}
		},
		components: {Landing: Landing},
		methods: {
			signUserButtonHandling (){
				// signUser()
			},
			signOut (){
				this.deliveryBtnLoading = true
				firebase.auth().signOut().then(() => {
					location.reload()
				})
				this.$store.commit('userSignOut')
				this.$store.commit('toLanding')
				this.deliveryBtnLoading = false
			},
			signUser (){
				this.userBtnLoading = true
				this.$store.commit('isUser')
				var user = this.$store.getters.user
				axios.post('https://pakot-backend.herokuapp.com/public/login/User', {email: user.object.email, unhackable: "true"})
					.then(response => {
						console.log(response.data)
						if (response.data == 'requireSignUp') {
							this.$store.commit('userLogIn', user.object)
							this.$store.commit('userRequireSignUp')
						} else {
							this.$store.commit('userLogIn', user.object)
							this.$store.commit('userDontRequireSignUp')
							axios.post('https://pakot-backend.herokuapp.com/public/DeliveryMan/getData', {email: this.$store.getters.user.object.email, unhackable: "true"})
							.then(response => {
								console.log(response)
								this.$store.commit('cpf', response.data.cpf) 
								this.$store.commit('phone', response.data.phone)
							})
							this.$router.push('/packages')
						}
					})
					// .catch(e => {
					// 	console.log(e)
					// })
			},
			signDeliveryMan (){
				this.deliveryBtnLoading = true
				this.$store.commit('isDeliveryMan')
				var user = this.$store.getters.user
				axios.post('https://pakot-backend.herokuapp.com/public/login/DeliveryMan', {email: user.object.email, unhackable: "true"})
					.then(response => {
						console.log(response.data)
						if (response.data == 'requireSignUp') {
							this.$store.commit('userLogIn', user.object)
							this.$store.commit('userRequireSignUp')
						} else {
							this.$store.commit('userLogIn', user.object)
							this.$store.commit('userDontRequireSignUp')
							axios.post('https://pakot-backend.herokuapp.com/public/User/getData', {email: this.$store.getters.user.object.email, unhackable: "true"})
							.then(response => {
								console.log(response)
								this.$store.commit('cpf', response.data.cpf) 
								this.$store.commit('phone', response.data.phone)
							})
							this.$router.push('/shipments')
						}
					})
					// .catch(e => {
					// 	console.log(e)
					// })
			},
			signIn (){
				this.authBtnLoading = true
				this.landing = false
				firebase.auth().signInWithRedirect(new firebase.auth.FacebookAuthProvider())
			}
		},
		computed: {
		},
		mounted (){
			this.$store.commit('userSignOut')
		// auth.signIn()
		// this.$store.state.user.logged = true

		}
	}
</script>

<style scoped src="../css/login.css"/>