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
								<div class="column is-8 is-offset-2">
									<div class="login-form">
										<h3 class="title">Primeira vez aqui? Seja bem vindo.</h3>
										<h2 class="subtitle">Precisamos de algumas infromações suas.</h2>
										<p class="control login">
											<button @click="signIn" class="button is-info is-large is-fullwidth" :class="{ 'is-loading': btnLoading, 'is-outlined': !btnLoading }"><span class="icon"><i class="fa fa-facebook"></i></span></button>
										</p>

										<p class="control login">
											<button class="button is-info is-outlined is-large is-fullwidth"><span class="icon"><i class="fa fa-facebook"></i></span></button>
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
import router from '../router'

export default {
	name: 'Login',
	data (){
		return {
			btnLoading: false
			
		}
	},
	methods: {
		signIn (){
			this.btnLoading = true
			var user
			firebase.auth().signInWithRedirect(new firebase.auth.FacebookAuthProvider()).then(function(result) {
				// This gives you a Facebook Access Token. You can use it to access the Facebook API.
				var token = result.credential.accessToken;
				// The signed-in user info.
				// console.log('acerto')
				user = result.user;
				// console.log()
				// ...
				// localStorage.setItem('user', 's')
			}).catch(function(error) {
				// Handle Errors here.
				console.log(error)
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;
				// ...
			})
		},

	toTrue (){
		this.$store.commit('userLogIn', {})
	}
},
mounted (){
		// auth.signIn()
		// this.$store.state.user.logged = true
	}
}
</script>

<style scoped src="../css/login.css"/>