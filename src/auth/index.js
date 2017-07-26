import { store } from '../store'

export default {
	user: {
		logged: false,
		signed: false,
		object: null
	},
	provider: new firebase.auth.FacebookAuthProvider(),

	signIn() {
			this.$store.state.user.logged = true
		firebase.auth().signInWithPopup(this.provider).then(function(result) {
			// This gives you a Facebook Access Token. You can use it to access the Facebook API.
			var token = result.credential.accessToken;
			// The signed-in user info.
			console.log('acerto')

			// var user = result.user;
			console.log()
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
		});
		
	},
}
