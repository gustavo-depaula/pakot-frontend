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
				<div class="container is-clearfix">
					<img id="profile-pic" class="is-pulled-left" :src="this.photoURL" style="border-radius: 50%; ">
					<div id="user-info" class="is-pulled-left">
						<h1 class="title is-1">{{ this.user.object.displayName }}</h1>
						<h2 class="subtitle is-3"><em>{{ this.user.object.email }}</em></h2>
					</div>
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
				user: {}
				
			}
		},
		computed: {
			photoURL: function (){
				return 'http://graph.facebook.com/' + this.$store.getters.user.object.providerData[0].uid + '/picture?height=19000'
			}
		},
		methods: {

		},
		mounted (){
			this.user = this.$store.getters.user
			console.log(this.user)
		}
	}
</script>
<style scoped>
#profile-space {
	margin-top: 2%;
}
#user-info {
	margin-left: 25px;
}
#profile-pic {
	height: 200px;
	width: 200px;
/*	display: block;
	margin-left: auto;
	margin-right: auto;*/
}
</style>

