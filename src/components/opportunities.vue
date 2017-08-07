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
		<div>
			<div class="card shipments" v-for="item in packages" @click="showModal(item)">
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
		<b-modal v-if="isModalVisible" @close="isModalVisible = !isModalVisible" :nickname="shipmentModal.nickname" :description="shipmentModal.description" :size="shipmentModal.size" :weight="shipmentModal.weight"/>
		<!-- <div v-if="isModalVisible" class="modal is-active">
			<div class="modal-background"></div>
			<div class="modal-content">
				<div class="box">
					<div class="columns">
						<div class="column">
							<h1 class="title is-2"><b>Pacote</b></h1>
							<h2 class="subtitle is-4">Descrição</h2>
						</div>
						<div class="column">
							<p class="title is-2 is-pulled-right">R$<b>00,00</b></p>
						</div>
					</div>
					<hr>
					<p class="title is-3">Deve ser entregue <b>hoje ainda</b><br>
						Tamanho <b>P</b><br>
						Peso <b>M</b>
					</p>

				</div>
			</div>
			<button class="modal-close is-large" @click="hideModal"></button>
		</div> -->
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
				weight: ""
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

			this.isModalVisible = true
		},
		hideModal: function() {
			this.isModalVisible = false
		}
	},
	mounted (){
		this.loadPackages()
		console.log(this.$store.state.user)
	}
}
</script>
<style scoped>
.shipments {
	cursor: pointer;
}

</style>