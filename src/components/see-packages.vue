<!-- packages visualization page -->
<template lang="html">
	<div id="packages">
		<!-- header -->
		<div class="hero is-bold is-primary	">
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
		<div v-if="packages.length == 0">
			<div class="hero is-bold is-info">
				<div class="hero-body">
					<div class="container">
						<h1 class="title">
							Você ainda não possui nenhuma entrega :(
						</h1>
						<h2 class="subtitle">
							Você pode solicitar uma nova entrega clicando em "Nova Entrega" no menu ao lado
						</h2>
					</div>
				</div>
			</div>
		</div>
		<div id="shipments" class="card" v-for="item in packages" @click="showModal(item)">
			<div class="card-content">
				<div class="columns">
					<div class="column">
						<p class="title">
							<b>{{ item.nickname }}</b>
						</p>
<!-- 						<p class="subtitle">
							{{ item.description }}
						</p> -->
						
					</div>
					<div class="column">
						<p class="title">R${{item.price}},00</p>
						<p class="subtitle">pago em PCT</p>
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
						<span v-else-if="item.canceled == 'true'">
							<p class="title "><b class="has-text-danger">Cancelado</b></p>
							<p class="subtitle">{{ item.dateassigned }}</p>
						</span>
						<span v-else>
							<p class="title"><b class="has-text-info">Solicitado</b></p>
							<p class="subtitle">{{ item.datecreate }}</p>
						</span>
					</div>
					<div class="column">
						<p class="title">Tamanho <b>{{ item.size }}</b><br> Peso <b>{{ item.weight }}</b></p>
					</div>
				</div>
				<p class="subtitle">
					<b>Origem:</b>  {{item.origin}} <br>
					<b>Destino:</b> {{item.destination}}
				</p>
			</div>
		</div>
		<transition
		enter-active-class="animated fadeIn"
		leave-active-class="animated fadeOut"
		>
			<b-modal v-if="isModalVisible" @close="isModalVisible = !isModalVisible" @cancel="cancelShipment" :nickname="shipmentModal.nickname" :priority="shipmentModal.priority" :price="shipmentModal.price" :description="shipmentModal.description" :size="shipmentModal.size" :weight="shipmentModal.weight" :origin="shipmentModal.origin" :destination="shipmentModal.destination" :dispatched="shipmentModal.dispatched" user="user"/>
		</transition>
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
					distance:"",
					dispatched: true,
				}
			}
		},
		methods: {
			loadPackages() {
				axios.post('https://pakot-backend.herokuapp.com/public/package/getallpackages', {email: this.$store.getters.email, unhackable: "true"})
					.then(response => {
						console.log('resposta')
						console.log(response)
						this.packages = response.data
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

				this.shipmentModal.dispatched = item.dispatched == 'true' || item.assigned == 'true' ||  item.arrived == 'true' || item.canceled == 'true'
				console.log(this.shipmentModal.dispatched)

				this.isModalVisible = true
			},
			hideModal: function() {
				this.isModalVisible = false
			},
			cancelShipment (){
				console.log(this.shipmentModal.id)
				axios.post('https://pakot-backend.herokuapp.com/public/package/update', {
					status: 'canceled',
					value: 'true',
					id: this.shipmentModal.id, 
					unhackable: "true"
				})
					.then(response => {
						this.hideModal()
						this.loadPackages()
						this.$forceUpdate()
						console.log(response)
					})
			}
		},
		mounted (){
			this.loadPackages()
			// console.log(this.$store.state.user)
		}
	}
</script>
<style scoped src="../css/see-packages.css"/>