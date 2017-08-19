<template>
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
	<div v-else>
		<div v-if="this.$store.getters.wantToLogIn">
			<Login />
		</div>
		<div v-else>
			<Landing />
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
	components: {
		Navbar, Login, SignUp, Landing
	},
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
