<!-- profile page -->
<template lang="html">
	<div>
		<!-- header -->
		<div class="hero is-bold is-info">
			<div class="hero-body">
				<div class="container">
					<h1 class="title">
						Perfil
					</h1>
					<h2 class="subtitle">
						Informações sobre sua conta Pakot.
					</h2>
				</div>
			</div>
		</div>
		<!-- profile space -->
		<div id="profile-space">
			<section class="section">
				<img id="profile-pic" class="center" :src="this.photoURL" style="border-radius: 50%; ">
				<div id="info" class="has-text-centered">
					<h1 class="title is-1">{{ this.user.object.displayName }}</h1>
					<h2 class="subtitle is-3">
						<em>{{ this.user.object.email }}</em><br>
						<span class="icon"><i class="fa fa-address-card"></i></span>&nbsp;{{this.user.cpf}}<br>
						<span class="icon"><i class="fa fa-phone"></i></span>&nbsp;{{this.user.phone}}<br>
						<span class="icon"><i class="fa fa-money"></i></span>&nbsp;{{this.pct}}
					</h2>
				</div>
			</section>
		</div>
	
	</div>
</template>
<script>
import axios from 'axios';

export default {
	name: 'profile',
	data() {
		return {
			pct: 0
		}
	},
	computed: {
		photoURL: function (){
			return 'http://graph.facebook.com/' + this.$store.getters.user.object.providerData[0].uid + '/picture?height=19000'
		},
		user: function(){
			return this.$store.getters.user
		}
	},
	methods: {
	},
	mounted (){
		if (this.$store.getters.isUser) {
			axios.post('https://pakot-backend.herokuapp.com/public/User/getWallet', {email: this.user.object.email, unhackable: "true"})
				.then(response => {
					console.log(response.data.wallet)
					this.pct = response.data.wallet
				})
				.catch(e => {
					console.log(e)
				})
		} else {
			axios.post('https://pakot-backend.herokuapp.com/public/DeliveryMan/getWallet', {email: this.user.object.email, unhackable: "true"})
				.then(response => {
					console.log(response.data.wallet)
					this.pct = response.data.wallet
				})
				.catch(e => {
					console.log(e)
				})
		}
		console.log(this.user)
		console.log(this.$store.getters.isUser)
		console.log(this.$store.getters.isDeliveryMan)
	}
}
</script>
<style scoped>
#profile-pic {
	display: block;
	margin: auto !important;
	height: 200px;
	width: 200px;
}
#info {
	margin-top: 20px !important;
}
</style>

