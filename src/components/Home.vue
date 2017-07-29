<!-- home page -->
<template lang="html">
	<div id="home">
		<!-- header -->
		<div class="hero is-bold is-success	">
			<div class="hero-body">
				<div class="container">
					<h1 class="title">
						Minhas entregas
					</h1>
					<h2 class="subtitle">
						Situação de todas as suas entregas
					</h2>
				</div>
			</div>
		</div>
		<!-- table -->
		<table class="table">
			<tbody >
				<tr v-for="i in packages">
					<th></th>
					<td>{{ i.nickname }}</td>
				</tr>
			</tbody>
		</table>
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
				axios.post('https://pakot-backend.herokuapp.com/public/package/getallpackages', {email: this.$store.getters.user.object.email})
					.then(response => {
						console.log(response.data)
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