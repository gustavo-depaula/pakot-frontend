<!-- package creation page -->
<!--
 private $nickname;
 private $description;
 private $priority;
 private $size;
 private $weight;
-->
<template lang="html">
	<div>
		<!-- header -->
		<div class="hero is-bold is-light">
			<div class="hero-body">
				<div class="container">
					<h1 class="title">
						Solicitar uma entrega
					</h1>
					<h2 class="subtitle">
						Envie de cartas a encomendas grandes
					</h2>
				</div>
			</div>
		</div>
		<!-- form -->
		<div id="form-container" class="columns is-clearfix">
			<!-- mobile tile --> 
			<div class="tile is-ancestor column is-hidden-tablet">
				<div class="tile is-vertical">
					<article class="tile is-child notification is-info">
						<p class="title">Middle tsile</p>
						<p class="subtitle">With an image</p>
					</article>
				</div>
			</div>
			<div class="column is-half">
				<div class="field">
					<label class="label">Apelido da encomenda</label>
					<div class="control">
						<input class="input" type="text" placeholder="e.g. Presente para mamãe">
					</div>
				</div>
				<div class="field">
					<label class="label">Descrição</label>
					<div class="control">
						<textarea class="textarea" placeholder="e.g Ursinho de pelúcia para o dia das mães"></textarea>
					</div>
				</div>
				<div class="field">
					<label class="label">Prioridade</label>
					<div class="control">
						<div class="select">
							<select>
								<option>Entregue hoje ainda</option>
								<option>Entregue até às 12h de amanhã</option>
								<option>Entregue nos próximos 5 dias úteis</option>
							</select>
						</div>
					</div>
				</div>
				<div class="field">
					<label class="label">Tamanho</label>
					<div class="control">
						<div class="select">
							<select>
								<option>C</option>
								<option>PP</option>
								<option>P</option>
								<option>M</option>
								<option>G</option>
								<option>GG</option>
							</select>
						</div>
					</div>
				</div>
				<div class="field">
					<label class="label">Tamanho</label>
					<div class="control">
						<div class="select">
							<select>
								<option>C</option>
								<option>XL</option>
								<option>L</option>
								<option>M</option>
								<option>G</option>
								<option>GG</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<!-- info tile -->
			<div id="info-tile" class="tile is-ancestor is-pulled-right column is-5 is-hidden-mobile">
				<div class="tile is-vertical">
					<article class="tile is-child notification is-info">
						<p class="title">Middle tsile</p>
						<p class="subtitle">With an image</p>
						<figure class="image is-4by3">
							<img src="http://bulma.io/images/placeholders/640x480.png">
						</figure>
					</article>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios';

	export default {
		name: 'create-package',
		data() {
			return {
				packages: []
			}
		},
		methods: {

		},
		mounted (){
		}
	}
</script>
<style scoped>
	#form-container {
		margin: 10px !important;
	}
	#info-tile {
		margin-left: 8% !important;
	}
</style>

