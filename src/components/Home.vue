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
		<div v-for="i in packages">
			<table class="packages-table table">
				<tbody  >
					<tr @click="i.flag = !i.flag">
						<th><span class="icon is-small"><i class="fa" :class="{ 'fa-chevron-right': !i.flag, 'fa-chevron-down': i.flag, 'blue': i.flag }"></i></span></th>
						<td>{{ i.datecreate }}</td>
						<td><b>{{ i.nickname }}</b></td>
						<td>PRE,ÇO</td>
					</tr>

					<p></p>
				</tbody>
			</table>
			<div v-if="i.flag == true">
				<div class="card">
					<div class="card-content">
						<p class="title">
							{{ i.description }}
						</p>
						<p class="subtitle">
							{{ i.destination }}
						</p>
					</div>

				</div>
				
			</div>
		</div>
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
<style scoped>
	.blue {
		color: #1fbad6;
	}
	
	.packages-table {
		margin-bottom: 0px;
	}

	.packages-table tr {
		height: 57px;
		border-bottom: 10px blue !important;
	}

	.packages-table tr:hover {
		background-color: rgb(243, 255, 243);
	}

	.packages-table th, td {
		padding-top: 16px;
	}

</style>