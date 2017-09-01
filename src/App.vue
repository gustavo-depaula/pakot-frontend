<template>
	<div>
		<div v-if="this.$store.getters.userLogged">
			<div v-if="this.$store.getters.userSigned == false">
				<SignUp />
			</div>
			<div v-else class="columns is-marginless">
				<div style="background-color: #151515;">
					<Navbar />
				</div>
				<div class="column is-10 is-paddingless">
					<router-view></router-view>
				</div>
			</div>
		</div>
		<!-- <div v-if="wantToLogIn || this.$store.getters.wantToLogIn">
			<Landing @toLogin="wantToLogIn = true"/>	
		</div> -->
		<div v-else>
			<Login />
		</div>

	</div>
</template>

<script>
import Navbar from './components/Navbar'
import Login from './components/login'
import SignUp from './components/signup'
import Landing from './components/landing'

export default {
	name: 'app',
	data (){
		return {
			wantToLogIn: false
		}
	},
	components: {
		Navbar, Login, SignUp, Landing
	},
	created() {

		// for production
		window.onerror = function(message, url, lineNumber) {  
		// code to execute on an error  
			return true; // prevents browser error messages  
		};
		console.log = function() {}
		console.error = function() {}

		console.log(this.$store.getters.wantToLogIn)
		
	}
}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
