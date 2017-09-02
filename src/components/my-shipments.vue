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
							Você ainda não possui nenhuma entrega no seu histórico :(
						</h1>
						<h2 class="subtitle">
							Você pode aceitar uma oportunidade clicando em "Oportunidades de Entregas" no menu ao lado
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
						<p class="subtitle">
							{{ item.description }}
						</p>
						
					</div>
					<div class="column">
						<p class="title">R${{item.deliveryCut}},00</p>
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
					<strong>Origem:</strong>  {{item.origin}} <br>
					<strong>Destino:</strong> {{item.destination}}
				</p>
			</div>
		</div>
		<transition
		enter-active-class="animated fadeIn"
		leave-active-class="animated fadeOut"
		>
			<b-modal v-if="isModalVisible" @close="isModalVisible = !isModalVisible" @cancel="cancelShipment" @dispatch="dispatchShipment" @arrived="shipmentArrived" :nickname="shipmentModal.nickname" :priority="shipmentModal.priority" :price="shipmentModal.price" :description="shipmentModal.description" :size="shipmentModal.size" :weight="shipmentModal.weight" :origin="shipmentModal.origin" :destination="shipmentModal.destination" user="deliveryMan" :btnMessage="modalBtnMessage" :state="shipmentState"/>
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
					arrived: "",
					dispatched: "",
					assigned: "",
				},

			}
		},
		methods: {
			loadPackages() {
				axios.post('https://pakot-backend.herokuapp.com/public/DeliveryMan/getAll', {email: this.$store.getters.email, unhackable: "true"})
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

				this.shipmentModal.arrived = item.arrived
				this.shipmentModal.dispatched = item.dispatched
				this.shipmentModal.assigned = item.assigned

				this.isModalVisible = true
			},
			hideModal: function() {
				this.isModalVisible = false
			},
			dispatchShipment (){
				axios.post('https://pakot-backend.herokuapp.com/public/package/update', {
					status: 'dispatched',
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
			},
			shipmentArrived (){
				axios.post('https://pakot-backend.herokuapp.com/public/DeliveryMan/done', {
					email: this.$store.getters.user.object.email,
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
		computed: {
			modalBtnMessage (){
				if (this.shipmentModal.arrived == 'true'){
					return 'Entrega feita'
				} else if (this.shipmentModal.dispatched == 'true'){
					return 'Entrega feita'
				} else if (this.shipmentModal.assigned == 'true'){
					return 'Item despachado'
				} else {
					return 'Aceito esta oportunidade.'
				}
			},
			shipmentState (){
				if (this.shipmentModal.arrived == 'true'){
					return 0
				} else if (this.shipmentModal.dispatched == 'true'){
					return 1
				} else if (this.shipmentModal.assigned == 'true'){
					return 2
				} else {
					return 3
				}	
			}
		},
		mounted (){
			this.loadPackages()
			// console.log(this.$store.state.user)
		}
	}
</script>
<style scoped src="../css/my-shipments.css"/>