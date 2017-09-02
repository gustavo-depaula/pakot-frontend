<template lang="html">
	<div>
		<!-- Navbar for mobile -->
		<nav class="navbar is-hidden-tablet">
			<div class="navbar-brand">
				<a href="" class="navbar-item">
					<img src="../assets/logo.svg" alt="">
				</a>
				<div class="navbar-burger" v-bind:class=" {'is-active': isMenuVisible }" @click="isMenuVisible = !isMenuVisible"  data-target="navMenu">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
			<div v-bind:class="{ 'is-active': isMenuVisible }" class="navbar-menu" id="navMenu">
				<div v-if="this.$store.getters.isUser">
					<router-link :to="'/packages'" class="navbar-link has-text-centered"><span class="icon"><i class="fa fa-truck"></i></span><span class="name">&nbsp;Minhas Entregas</span></router-link>
					<router-link :to="'/create-package'" class="navbar-link has-text-centered"><span class="icon"><i class="fa fa-plus"></i></span><span class="name">&nbsp;Nova Entrega</span></router-link>
					<router-link :to="'/profile'" class="navbar-link has-text-centered"><span class="icon"><i class="fa fa-user"></i></span><span class="name">&nbsp;Perfil</span></router-link>
					<!-- <router-link :to="'/another'" class="navbar-link has-text-centered"><span class="icon"><i class="fa fa-folder-o"></i></span><span class="name">&nbsp;TODO</span></router-link> -->
				</div>
				<div v-else>
					<router-link :to="'/packages'" class="navbar-link has-text-centered"><span class="icon"><i class="fa fa-tasks"></i></span><span class="name">&nbsp;Minhas entregas</span></router-link>
					<router-link :to="'/opportunities'" class="navbar-link has-text-centered"><span class="icon"><i class="fa fa-road"></i></span><span class="name">&nbsp;Oportunidades de entregas</span></router-link>
					<router-link :to="'/gains'" class="navbar-link has-text-centered"><span class="icon"><i class="fa fa-usd"></i></span><span class="name">&nbsp;Ganhos de parceiro</span></router-link>
					<router-link :to="'/profile'" class="navbar-link has-text-centered"><span class="icon"><i class="fa fa-user"></i></span><span class="name">&nbsp;Perfil</span></router-link>
				</div>
				<hr>
				<a @click="signOut" class="navbar-link has-text-centered"><span class="icon"><i class="fa fa-sign-out"></i></span><span class="name">&nbsp;Sair</span></a>
			</div>
		</nav>
		<!-- Side Menu -->
		<div class="">
			<aside class=" aside hero is-fullheight is-hidden-mobile">
				<div>
					<div class="main">

						<div class="title"><img src="../assets/logo.svg" alt=""></div>
						<hr />
						<div v-if="this.$store.getters.isUser">
							<router-link :to="'/packages'" class="item"><span class="icon"><i class="fa fa-truck"></i></span><span class="name">Minhas Entregas</span></router-link>
							<router-link :to="'/create-package'" class="item"><span class="icon"><i class="fa fa-plus"></i></span><span class="name">Nova Entrega</span></router-link>
							<router-link :to="'/profile'" class="item"><span class="icon"><i class="fa fa-user"></i></span><span class="name">Perfil</span></router-link>
							<!-- <router-link :to="'/another'" class="item"><span class="icon"><i class="fa fa-folder-o"></i></span><span class="name">TODO</span></router-link> -->
						</div>
						<div v-else>
							<router-link :to="'/shipments'" class="item"><span class="icon"><i class="fa fa-tasks"></i></span><span class="name">Minhas entregas</span></router-link>
							<router-link :to="'/opportunities'" class="item"><span class="icon"><i class="fa fa-road"></i></span><span class="name">Oportunidades de entregas</span></router-link>
							<router-link :to="'/gains'" class="item"><span class="icon"><i class="fa fa-usd"></i></span><span class="name">Ganhos de parceiro</span></router-link>
							<router-link :to="'/profile'" class="item"><span class="icon"><i class="fa fa-user"></i></span><span class="name">Perfil</span></router-link>
						</div>
						<hr>
						<a @click="signOut" class="item"><span class="icon"><i class="fa fa-sign-out"></i></span><span class="name">Sair</span></a>
					</div>
				</div>
			</aside>
		</div>

	</div>
</template>		
<script>
export default {
	name: 'navbar',
	data (){
		return {
			isMenuVisible: false
		}
	},
	methods: {
		signOut (){
			firebase.auth().signOut().then(() => {
				location.reload()
			})
			this.$store.commit('userSignOut')
			this.$store.commit('toLanding')
		}
	}
}

</script>
<style scoped src="../css/navbar.css"/>
