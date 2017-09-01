<!-- home page -->
<template lang="html">
	<div id="home">
		<!-- header -->
		<div class="hero is-bold is-primary	">
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
		<div v-if="packages.length == 0">
			<div class="hero is-bold is-warning">
				<div class="hero-body">
					<div class="container">
						<h1 class="title">
							Nenhum usuário está precisando de entregador no momento
						</h1>
						<h2 class="subtitle">
							Fique atento! :)
						</h2>
					</div>
				</div>
			</div>
		</div>
		<div>
			<div class="card shipments" v-for="item in packages" @click="showModal(item)">
				<div class="card-content">
					<div class="columns">
						<div class="column">
							<p class="title">
								<b>{{ item.nickname }}</b>
							</p>
<!-- 							<p class="subtitle">
								{{ item.description }}
							</p>
							 -->
						</div>
						<div class="column">
							<p class="title">R${{item.price}},00</p>
							<p class="subtitle">pago em BTC</p>
						</div>
						<div class="column">
							<span v-if="item.priority == 2">
								<p class="title"><b class="has-text-danger">Hoje ainda.</b></p>
							</span>
							<span v-else-if="item.priority == 1">
								<p class="title "><b class="has-text-warning">Até amanhã às 12h.</b></p>
							</span>
							<span v-else>
								<p class="title"><b class="has-text-info">Em cinco dias.</b></p>
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
		</div>
		<transition
		enter-active-class="animated fadeIn"
		leave-active-class="animated fadeOut"
		>
			<b-modal v-if="isModalVisible" @close="isModalVisible = !isModalVisible" @accept="acceptOpportunity" :nickname="shipmentModal.nickname" :priority="shipmentModal.priority" :price="shipmentModal.price" :description="shipmentModal.description" :size="shipmentModal.size" :weight="shipmentModal.weight" :origin="shipmentModal.origin" :destination="shipmentModal.destination" user="deliveryMan" :btnMessage="modalBtnMessage" :state="shipmentState"/>
		</transition>
	</div>
</template>
<script>
import axios from 'axios';

export default {
	name: 'Opportunities',
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
		loadPackages() {
			axios.get('https://pakot-backend.herokuapp.com/public/package/getopen')
				.then(response => {
					console.log('resposta')
					console.log(response.data)
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

			// console.log(this.shipmentState)
			this.isModalVisible = true
		},
		hideModal: function() {
			this.isModalVisible = false
		},
		acceptOpportunity (){
			// console.log(this.shipmentModal.id)
			axios.post('https://pakot-backend.herokuapp.com/public/DeliveryMan/assignPackage', {
				email: this.$store.getters.user.object.email,
				id: this.shipmentModal.id, 
				unhackable: "true"
			})
				.then(response => {
					this.loadPackages()
					this.hideModal()
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
<style scoped>
.shipments {
	cursor: pointer;
}
.fadeIn {
	-webkit-animation: fadeIn .3s; /* Safari 4+ */
	-moz-animation:    fadeIn .3s; /* Fx 5+ */
	-o-animation:      fadeIn .3s; /* Opera 12+ */
	animation:         fadeIn .3s; /* IE 10+, Fx 29+ */
}
.fadeOut {
	-webkit-animation: fadeOut .3s; /* Safari 4+ */
	-moz-animation:    fadeOut .3s; /* Fx 5+ */
	-o-animation:      fadeOut .3s; /* Opera 12+ */
	animation:         fadeOut .3s; /* IE 10+, Fx 29+ */
}
</style>