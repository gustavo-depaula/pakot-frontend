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
				<router-link :to="'/packages'" class="navbar-link has-text-centered"><span class="icon"><i class="fa fa-truck"></i></span><span class="name">&nbsp;Minhas Entregas</span></router-link>
				<router-link :to="'/create-package'" class="navbar-link has-text-centered"><span class="icon"><i class="fa fa-plus"></i></span><span class="name">&nbsp;Nova Entrega</span></router-link>
				<router-link :to="'/another'" class="navbar-link has-text-centered"><span class="icon"><i class="fa fa-folder-o"></i></span><span class="name">&nbsp;TODO</span></router-link>
			</div>
		</nav>
		<!-- Side Menu -->
		<div class="">
			<aside class=" aside hero is-fullheight is-hidden-mobile">
				<div>
					<div class="main">

						<div class="title"><img src="../assets/logo.svg" alt=""></div>
						<hr />
						<router-link :to="'/packages'" class="item"><span class="icon"><i class="fa fa-truck"></i></span><span class="name">Minhas Entregas</span></router-link>
						<router-link :to="'/create-package'" class="item"><span class="icon"><i class="fa fa-plus"></i></span><span class="name">Nova Entrega</span></router-link>
						<router-link :to="'/another'" class="item"><span class="icon"><i class="fa fa-folder-o"></i></span><span class="name">TODO</span></router-link>
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

	}
}

</script>
<style scoped>
	@import url('../css/navbar.css');
</style>
