<!-- home page -->
<template lang="html">
	<div id="home">
		<!-- header -->
		<div class="hero is-bold is-danger	">
			<div class="hero-body">
				<div class="container">
					<h1 class="title">
						Oportunidades de entrega
					</h1>
					<h2 class="subtitle">
						As mais recentes oportunidades em sua área
					</h2>
				</div>
			</div>
		</div>
		<!-- opportunities info -->
		<div>
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
	</div>
</template>
<script>
	import axios from 'axios';

	export default {
		name: 'Opportunities',
		data() {
			return {
				packages: []
			}
		},
		methods: {
			loadPackages() {
				axios.get('https://pakot-backend.herokuapp.com/public/package/getopen')
					.then(response => {
						console.log('resposta')
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


</style>