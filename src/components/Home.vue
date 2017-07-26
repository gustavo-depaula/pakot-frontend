<!-- home page -->
<template lang="html">
	<div id="home">
		<ul v-for="i in packages">
			<li>{{i}}</li>
		</ul>
	</div>
</template>
<script>
import axios from 'axios';

export default {
	name: 'Home',
	data() {
		return {
			packages: []
		}
	},
	methods: {
		loadPackages() {
			axios.get('https://pakot-backend.herokuapp.com/public/package/getopen')
				.then(response => {
					this.packages = response.data
				})
		}
	},
	mounted (){
		this.loadPackages()
		console.log(this.$store.state.user)
	}
}
</script>