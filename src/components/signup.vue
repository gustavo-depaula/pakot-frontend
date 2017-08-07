<!-- login page -->
<template lang="html">
	<div id="login">
		<div class="login-wrapper columns">
			<div class="column is-8 is-hidden-mobile hero-banner">
				<section class="hero is-fullheight is-dark">
					<div class="hero-body">
						<div class="container section">
							<div class="has-text-right">
								<h1 class="title is-1">Login</h1> <br>
								<p class="title is-3">Seja livre e eficiente. Use Pakot.</p>
							</div>
						</div>
					</div>
				</section>  
			</div>
			<div class="column is-4">
				<section class="hero is-fullheight">
					<div class="hero-heading">
						<div class="section has-text-centered">
							<img src="../assets/package.png" alt="Bulma logo" width="150px">
						</div>
					</div>
					<div class="hero-body">
						<div class="container">
							<div class="columns">
								<div class="column is-10 is-offset-1">
									<div class="login-form">
										<h3 class="title">Primeira vez aqui? Seja bem vindo.</h3>
										<h2 class="subtitle">Precisamos de algumas infromações suas.</h2>
										<p class="field">
											<div class="control"><input type="text" class="input is-large" :placeholder="this.$store.getters.user.object.displayName" disabled></div>
										</p>
										<p class="field">
											<div class="control"><input type="text" class="input is-large" :placeholder="this.$store.getters.user.object.email" disabled></div>
										</p>
										<p class="field">
											<div class="control"><input v-model="user.cpf" type="number" class="input is-large" :class="{ 'is-danger': danger }" placeholder="Seu CPF"></div>
										</p>
										<p class="field">
											<div class="control"><input v-model="user.phone" type="tel" class="input is-large" :class="{ 'is-danger': danger }" placeholder="Seu telefone"></div>
										</p>
										<p class="control login">
											<button @click="signUp" class="button is-success is-large is-fullwidth" :class="{ 'is-loading': btnLoading, 'is-outlined': !btnLoading }"><span class="icon"><i class="fa fa-sign-in"></i></span></button>
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
				</section>  
			</div>
		</div>

	</div>
</template>
<script>
	import axios from 'axios'

	export default {
		name: 'SignUp',
		data (){
			return {
				btnLoading: false,
				user: {
					name: this.$store.getters.user.object.displayName,
					email: this.$store.getters.user.object.email,
					cpf: '',
					phone: '',
					payment: 'BTC'
				},
				danger: false
			}
		},
		methods: {
			signUp (){
				this.btnLoading = true
				if (this.$store.getters.isUser) {
					axios.post('https://pakot-backend.herokuapp.com/public/login/SignUp', this.user)
						.then(response => {
							if (response.data == 'SignUpSuccess') {
								axios.post('https://pakot-backend.herokuapp.com/public/User/getData', {email: this.$store.getters.user.object.email})
								.then(response => {
									this.$store.commit('cpf', response.data.cpf) 
									this.$store.commit('phone', response.data.phone)
								})
								this.$store.commit('userDontRequireSignUp')							
							} else {
								this.danger = true		
							}
						})
						// .catch(e => {
						// 	console.log(e)
						// })
				} else {
					axios.post('https://pakot-backend.herokuapp.com/public/login/SignUpDeliveryMan', this.user)
						.then(response => {
							if (response.data == 'SignUpSuccess') {
								axios.post('https://pakot-backend.herokuapp.com/public/DeliveryMan/getData', {email: this.$store.getters.user.object.email})
									.then(response => {
										this.$store.commit('cpf', response.data.cpf) 
										this.$store.commit('phone', response.data.phone)
									})
								this.$store.commit('userDontRequireSignUp')							
							} else {
								this.danger = true		
							}
						})
						// .catch(e => {
						// 	console.log(e)
						// })
				}
			}
		},
		mounted (){
		// auth.signIn()
		// this.$store.state.user.logged = true
	}
}
</script>

<style scoped src="../css/signup.css"/>