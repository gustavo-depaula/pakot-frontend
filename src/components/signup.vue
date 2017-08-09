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
									<div v-if="!phoneConfirmation" class="login-form">
										<h3 class="title">Primeira vez aqui? Seja bem vindo.</h3>
										<h2 class="subtitle">Precisamos de algumas infromações suas.</h2>
										<p class="field">
											<div class="control"><input type="text" class="input is-large" :placeholder="this.$store.getters.user.object.displayName" disabled></div>
										</p>
										<p class="field">
											<div class="control"><input type="text" class="input is-large" :placeholder="this.$store.getters.user.object.email" disabled></div>
										</p>
										<p class="field">
											<div class="control"><input v-model="user.cpf" type="number" class="input is-large" :class="{ 'is-danger': cpfDanger }" placeholder="Seu CPF"></div>
										</p>
										<p class="field">
											<div class="control"><input v-model="user.phone" type="tel" class="input is-large" placeholder="Seu telefone"></div>
										</p>
										<p>
											<div id="recaptchacontainer"></div>
											
										</p>
										<p class="control login">
											<button id="signupbutton" @click="sendSMSCode" class="button is-success is-large is-fullwidth" :disabled="btnDisable" :class="{ 'is-loading': btnLoading, 'is-outlined': !btnLoading }"><span class="icon"><i class="fa fa-arrow-right"></i></span></button>
										</p>
									</div>
									<div v-else class="login-form">
										<h3 class="title">Só mais uma coisa.</h3>
										<h2 class="subtitle">Confirme o código que foi enviado para seu telefone.</h2>
										<p class="field">
											<div class="control"><input v-model="user.phone" type="tel" class="input is-large" placeholder="Seu telefone" disabled></div>
										</p>
										<p class="field">
											<div class="control"><input v-model="user.smscode" type="number" class="input is-large" :class="{ 'is-danger': phoneDanger }" placeholder="Código de Confirmação"></div>
										</p>
										<p class="control login">
											<button @click="confirmCode" class="button is-success is-large is-fullwidth" :disabled="btnDisable" :class="{ 'is-loading': btnLoading, 'is-outlined': !btnLoading }"><span class="icon"><i class="fa fa-sign-in"></i></span></button>
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
					smscode: '',
					payment: 'BTC'
				},
				danger: false,
				cpfDanger: false,
				phoneDanger: false,
				btnDisable: false,
				phoneConfirmation: false,
				captchaResponse: null
			}
		},
		methods: {
			cpfValidation(strCPF) {
				var Sum
				var Rest
				var i
				Sum = 0
				if (strCPF == "00000000000") return false

				for (i=1; i<=9; i++) Sum = Sum + parseInt(strCPF.substring(i-1, i)) * (11 - i)
				Rest = (Sum * 10) % 11

				if ((Rest == 10) || (Rest == 11))  Rest = 0
				if (Rest != parseInt(strCPF.substring(9, 10)) ) return false

				Sum = 0
				for (i = 1; i <= 10; i++) Sum = Sum + parseInt(strCPF.substring(i-1, i)) * (12 - i)
				Rest = (Sum * 10) % 11;

				if ((Rest == 10) || (Rest == 11))  Rest = 0
				if (Rest != parseInt(strCPF.substring(10, 11) ) ) return false
				return true
			},
			sendSMSCode (){
				if (this.cpfValidation(this.user.cpf)) {
					firebase.auth().signInWithPhoneNumber(this.user.phone, window.recaptchaVerifier)
						.then((confirmationResult) => {
							this.phoneConfirmation = true
							console.log(confirmationResult)
							// SMS sent. Prompt user to type the code from the message, then sign the
							// user in with confirmationResult.confirm(code).
							window.confirmationResult = confirmationResult;
						})
				} else {
					this.cpfDanger = true
				}
			},
			confirmCode (){
				confirmationResult.confirm(this.user.smscode).then( (result) => {
					// User signed in successfully.
					console.log('result')
					console.log(result)
					this.signUp()
					// ...
				}).catch( (error) => {
					// User couldn't sign in (bad verification code?)
					// ...
					this.phoneDanger = true
				});
			},
			signUp (){
				this.btnLoading = true

				if (this.$store.getters.isUser) {
					axios.post('https://pakot-backend.herokuapp.com/public/login/SignUp', this.user)
						.then(response => {
							console.log(response.data)
							if (response.data == 'SignUpSuccess') {
								axios.post('https://pakot-backend.herokuapp.com/public/User/getData', {email: this.$store.getters.user.object.email})
								.then(response => {
									this.$store.commit('cpf', response.data.cpf) 
									this.$store.commit('phone', response.data.phone)
								})
								this.$store.commit('userDontRequireSignUp')							
							} else {
								this.btnLoading = false
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
								this.btnLoading = false
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

			/* ReCaptcha API */
			window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('signupbutton', {
				'hl': 'pt-BR',
				'size': 'invisible',
				'callback': (response) => {
					this.captchaResponse = response
					this.btnDisable = false
				}
			})
			console.log(recaptchaVerifier)
			recaptchaVerifier.render().then(function(widgetId) {
				window.recaptchaWidgetId = widgetId
			});
			// var recaptchaResponse = grecaptcha.getResponse(window.recaptchaWidgetId);
			// console.log(recaptchaResponse)
		}
}
</script>

<style scoped src="../css/signup.css"/>