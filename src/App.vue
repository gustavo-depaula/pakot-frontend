<template>
	<div v-if="this.$store.getters.userLogged">
		<div class="columns is-marginless">
			<div style="background-color: #363636;">
				<Navbar />
			</div>
			<div class="column is-10 is-paddingless">
				<router-view></router-view>
			</div>
		</div>
	</div>
	<div v-else>
		<Login></Login>
	</div>
</template>

<script>
import Navbar from './components/navbar'
import Login from './components/login'

export default {
	name: 'app',
	components: {
		Navbar, Login
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
