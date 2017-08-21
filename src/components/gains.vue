<!-- home page -->
<template lang="html">
	<div id="gains">
		<!-- header -->
		<div class="hero is-bold is-success	">
			<div class="hero-body">
				<div class="container">
					<h1 class="title">
						Ganhos de parceiro
					</h1>
					<h2 class="subtitle">
						Veja aqui seus ganhos e outros dados
					</h2>
				</div>
			</div>
		</div>
		<!-- shipments info -->
		<div class="columns">
			<div class="column is-12 admin-panel">
				<section class="hero is-small">
					<br>

					<!-- Hero footer: will stick at the bottom -->
					<div class="hero-foot">
						<nav class="level">
							<div class="level-item has-text-centered">
								<p class="heading">Total Ganho</p>
								<p class="title">{{totalWon}}</p>
							</div>
							<div class="level-item has-text-centered">
								<p class="heading">Média por entrega</p>
								<p class="title">{{average}}</p>
							</div>
							<div class="level-item has-text-centered">
								<p class="heading">Entregas feitas</p>
								<p class="title">{{arrived}}</p>
							</div>
						</nav>
					</div>
				</section>
				<section class="section">
					<div class="columns is-mobile is-multiline">
					<div class="column is-half-desktop is-full-mobile">
							<section class="panel">
								<p class="panel-heading">
									Ganho por entrega
								</p>
								<div class="panel-block">
									<div id="chart-gains" style="height: 250px;"></div>
								</div>
								<!-- <div class="panel-block">
									<button class="button is-default is-outlined is-fullwidth">
										View Data
									</button>
								</div> -->
							</section>
						</div>
						<div class="column is-half-desktop is-full-mobile">
							<section class="panel">
								<p class="panel-heading">
									Status da suas entregas
								</p>
								<div class="panel-block">
									<div id="chart-shipments" style="height: 280px;"></div>
								</div>
								<!-- <div class="panel-block">
									<button class="button is-default is-outlined is-fullwidth">
										View Data
									</button>
								</div> -->
							</section>
						</div>



					</div>
				</section>
			</div>
		</div>

	</div>
</template>
<script>
	import axios from 'axios';
	// import Morris from '../js/morris.js'
	export default {
		name: 'Gains',
		data() {
			return {
				info: null,
				totalWon: 0,
				average: 0,
				arrived: 0,
				gainsChartData: []
			}
		},
		methods: {
			loadInfo() {
				axios.post('https://pakot-backend.herokuapp.com/public/DeliveryMan/getGainData', {email: this.$store.getters.email})
					.then(response => {
						console.log('resposta')
						console.log(response)
						this.info = response.data

						this.totalWon = response.data.totalWon > 999 ? (response.data.totalWon/1000).toFixed(1) + 'k' : response.data.totalWon
						this.average = response.data.averagePerPackage > 999 ? (response.data.averagePerPackage/1000).toFixed(1) + 'k' : response.data.averagePerPackage
						this.arrived = response.data.qtPerStatus.arrived

						response.data.valuePerId.forEach((element, index, array) => {
							var data = new Object()
							data.id = (index+1).toString()
							data.value = element.priceWithCut
							this.gainsChartData.push(data)
						})
						this.createCharts()
					})
			},
			createCharts(){
				new Morris.Line({
					// ID of the element in which to draw the chart.
					element: 'chart-gains',
					// Chart data records -- each entry in this array corresponds to a point on
					// the chart.
					data: this.gainsChartData,
					// data: [

					// { id: '2006', value: 10394 },
					// { id: '2007', value: 50391 },
					// { id: '2008', value: 102025 },
					// { id: '2009', value: 198563 }
					// ],
					// The name of the data record attribute that contains x-values.
					xkey: 'id',
					// A list of names of data record attributes that contain y-values.
					ykeys: ['value'],
					// Labels for the ykeys -- will be displayed when you hover over the
					// chart.
					labels: ['Ganho']
				});

				Morris.Donut({
					element: 'chart-shipments',
					data: [
					{label: "Entregues", value: this.info.qtPerStatus.arrived},
					{label: "Despachados", value: this.info.qtPerStatus.dispatched},
					{label: "Atribuídos", value: this.info.qtPerStatus.assigned},
					{label: "Cancelados", value: this.info.qtPerStatus.canceled}
					]
				});
				
			}
		},
		mounted (){
			this.loadInfo()
			console.log(this.data)
		}
	}
</script>
<style scoped>


</style>