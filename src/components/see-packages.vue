<!-- packages visualization page -->
<template lang="html">
	<div id="packages">
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
		<div id="shipments" class="card" v-for="item in packages" @click="showModal(item)">
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
						<p class="title">R${{item.price}},00</p>
						<p class="subtitle">pago em BTC</p>
					</div>
					<div class="column">
						<span v-if="item.arrived == 'true'">
							<p class="title"><b class="has-text-success">Entregue</b></p>
							<p class="subtitle">{{ item.datearrived }}</p>
						</span>
						<span v-else-if="item.dispatched == 'true'">
							<p class="title "><b class="has-text-primary">Despachado</b></p>
							<p class="subtitle">{{ item.datedispatched }}</p>
						</span>
						<span v-else-if="item.assigned == 'true'">
							<p class="title "><b class="has-text-warning">Atribuído</b></p>
							<p class="subtitle">{{ item.dateassigned }}</p>
						</span>
						<span v-else>
							<p class="title"><b class="has-text-info">Solicitado</b></p>
							<p class="subtitle">{{ item.datecreate }}</p>
						</span>
					</div>
					<div class="column">
						<p class="title">Tamanho {{ item.size }}, peso {{ item.weight }}</p>
					</div>
				</div>
				<p class="subtitle">
					<strong>Origem:</strong>  {{item.origin}}
					<strong>Destino:</strong> {{item.destination}}
				</p>
			</div>
		</div>
		<b-modal v-if="isModalVisible" @close="isModalVisible = !isModalVisible" @cancel="cancelShipment" :nickname="shipmentModal.nickname" :priority="shipmentModal.priority" :price="shipmentModal.price" :description="shipmentModal.description" :size="shipmentModal.size" :weight="shipmentModal.weight" :origin="shipmentModal.origin" :destination="shipmentModal.destination" user="user"/>
	</div>
</template>
<script>
	import axios from 'axios';

	export default {
		name: 'Home',
		data() {
			return {
				packages: [],
				isModalVisible: false,
				shipmentModal: {
					nickname: "",
					description: "",
					size: "",
					weight: "",
					id: "",
					price: "",
					priority: null,
					origin:"",
					destination:"",
					distance:""
				}
			}
		},
		methods: {
			getPrices (){
				this.packages.forEach((item) => {
					axios.post('https://pakot-backend.herokuapp.com/public/package/price', {"id": item.id})
						.then(response => {
							// console.log('oi')
							// console.log(response.data.price)
							item.price = response.data.price
						})
				})	
			},
			loadPackages() {
				axios.get('https://pakot-backend.herokuapp.com/public/package/getopen')
					.then(response => {
						console.log('resposta')
						console.log(response)
						this.packages = response.data
						this.getPrices()
					})
			},
			showModal: function(item) {
				this.shipmentModal.nickname = item.nickname
				this.shipmentModal.description = item.description
				this.shipmentModal.size = item.size
				this.shipmentModal.weight = item.weight
				this.shipmentModal.priority = item.priority
				this.shipmentModal.id = item.id
				this.shipmentModal.origin = item.origin;
				this.shipmentModal.destination = item.destination;
				this.shipmentModal.price = item.price

				this.isModalVisible = true
			},
			hideModal: function() {
				this.isModalVisible = false
			},
			cancelShipment (){
				// console.log(this.shipmentModal.id)
				// axios.post('https://pakot-backend.herokuapp.com/public/DeliveryMan/assignPackage', {
				// 	email: this.$store.getters.user.object.email,
				// 	id: this.shipmentModal.id
				// })
				// 	.then(response => {
				// 		this.loadPackages()
				// 		this.hideModal()
				// 		console.log(response)
				// 	})
			}
		},
		mounted (){
			this.loadPackages()
			// console.log(this.$store.state.user)
		}
	}
</script>
<style scoped>
#shipments {
	cursor: pointer;
}
</style>