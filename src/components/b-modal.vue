<!-- bulma modal -->
<template>
	<div class="modal is-active">
		<div class="modal-background"></div>
		<div class="modal-content">
			<div class="box">
				<div class="columns">
					<div class="column">
						<h1 class="title is-2"><b>{{nickname}}</b></h1>
						<h2 class="subtitle is-4">{{description}}</h2>
					</div>
					<div class="column">
						<p class="title is-2 is-pulled-right">R$<b>00,00</b></p>
					</div>
				</div>
				<hr>
				<p class="title is-3">
					Deve ser entregue
					<span v-if="priority == 1">
						<b class="has-text-danger">hoje ainda.</b>
					</span>
					<span v-else-if="priority == 2">
						<b class="has-text-warning">até amanhã às 12h.</b>
					</span>
					<span v-else>
						<b class="has-text-info">em cinco dias.</b>
					</span>
					<br>
					Tamanho <b>{{size}}</b><br>
					Peso <b>{{weight}}</b>
				</p>
				<button id="acceptBtn" @click="$emit('accept')" class="button is-warning is-medium"><span class="icon"><i class="fa fa-check"></i></span>&nbsp;&nbsp;Aceito esta oportunidade.</button>
			</div>
		</div>
		<button class="modal-close is-large" @click="$emit('close')"></button>
	</div>
</template>
<script>
	export default {
		name: 'b-modal',
		props: ['nickname', 'description', 'priority', 'size', 'weight'],
		data() {
			return {

			}
		},
		methods: {

		},
		mounted (){
			console.log(this.priority)
		}
	}
</script>
<style scoped>
#acceptBtn {
	width: 100%;
}
</style>