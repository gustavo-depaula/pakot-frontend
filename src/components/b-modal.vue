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
				<p class="title is-3">Deve ser entregue <b>{{priority}}</b><br>
					Tamanho <b>{{size}}</b><br>
					Peso <b>{{weight}}</b>
				</p>
				<button id="acceptBtn" class="button is-warning is-medium"><span class="icon"><i class="fa fa-check"></i></span>&nbsp;&nbsp;Aceito esta oportunidade.</button>
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

		}
	}
</script>
<style scoped>
#acceptBtn {
	width: 100%;
}
</style>