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
				<a href="#" class="navbar-link has-text-centered"><span class="icon"><i class="fa fa-truck"></i></span><span class="name">&nbsp;Minhas Entregas</span></a>
			</div>
		</nav>
		<!-- Side Menu -->
		<div class="">
			<aside class=" aside hero is-fullheight is-hidden-mobile">
				<div>
					<div class="main">

						<div class="title"><img src="../assets/logo.svg" alt=""></div>
						<hr />
						<a href="#" class="item active"><span class="icon"><i class="fa fa-truck"></i></span><span class="name">Minhas Entregas</span></a>
						<a href="#" class="item"><span class="icon"><i class="fa fa-th-list"></i></span><span class="name">TODO</span></a>
						<a href="#" class="item"><span class="icon"><i class="fa fa-folder-o"></i></span><span class="name">TODO</span></a>
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
		switch() {
			this.isMenuVisible = !this.isMenuVisible
		}
	}
}

</script>
<style scoped>
	@import url('../css/navbar.css');
</style>
