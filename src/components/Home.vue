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
		<!-- shipments info -->
		<div class="card" v-for="item in packages">
			<div class="card-content">
				<div class="columns">
					<div class="column">
						<p class="title">
							<b>{{ item.nickname }}</b>
						</p>
						<p class="subtitle">
							{{ item.description }}
						</p>
						
					</div>
					<div class="column">
						<p class="title">R$00,00</p>
						<p class="subtitle">pago em BTC</p>
					</div>
					<div class="column">
						<span v-if="item.arrived == 'true'">
							<p class="title"><b class="has-text-success">Entregue</b></p>
							<p class="subtitle">{{ item.datearrived }}</p>
						</span>
						<span v-else-if="item.assigned == 'true'">
							<p class="title "><b class="has-text-warning">Despachado</b></p>
							<p class="subtitle">{{ item.dateassigned }}</p>
						</span>
						<span v-else>
							<p class="title"><b class="has-text-info">Solicitado</b></p>
							<p class="subtitle">{{ item.datecreate }}</p>
						</span>
					</div>
					<div class="column">
						<p class="title">Tamanho {{ item.size }}, peso {{ item.weight }}</p>
						<p class="subtitle">
							endereço a <br>
							endereço b
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
		/*border-bottom: 10px blue !important;*/
	}

	.packages-table tr:hover {
		background-color: rgb(243, 255, 243);
	}

	.packages-table th, td {
		padding-top: 16px;
	}

</style>