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
		<!-- form space -->
		<div id="form-container" class="columns is-clearfix">
			<!-- mobile tile --> 
			<div class="tile is-ancestor column is-hidden-tablet">
				<div class="tile is-vertical">
					<article class="tile is-child notification is-info">
						<p class="title">Informações</p>
						<p class="subtitle">Sobre peso e tamanho</p>
					</article>
				</div>
			</div>
			<div class="column is-half">
				<div class="field">
					<label class="label">Apelido da encomenda</label>
					<p class="control has-icons-left">
						<input class="input" type="text" placeholder="e.g Presente para mamãe">
						<span class="icon is-small is-left">
							<i class="fa fa-bookmark"></i>
						</span>
					</p>
				</div>
				<div class="field">
					<label class="label">Descrição</label>
					<p class="control has-icons-left">
						<textarea class="textarea" type="text" placeholder="e.g Ursinho de pelúcia para o dia das mães"></textarea>
					</p>
				</div>
				<div class="field">
					<label class="label">Prioridade</label>
					<p class="control has-icons-left">
						<span class="select">
							<select>
								<option>Entregue hoje ainda</option>
								<option>Entregue até às 12h de amanhã</option>
								<option>Entregue nos próximos 5 dias úteis</option>
							</select>
						</span>
						<span class="icon is-small is-left">
							<i class="fa fa-calendar-o"></i>
						</span>
					</p>
				</div>
				<div class="field">
					<label class="label">Tamanho</label>
					<p class="control has-icons-left">
						<span class="select">
							<select>
								<option>C</option>
								<option>PP</option>
								<option>P</option>
								<option>M</option>
								<option>G</option>
								<option>GG</option>
							</select>
						</span>
						<span class="icon is-small is-left">
							<i class="fa fa-archive"></i>
						</span>
					</p>
				</div>
				<div class="field">
					<label class="label">Peso</label>
					<p class="control has-icons-left">
						<span class="select">
							<select>
								<option>C</option>
								<option>XL</option>
								<option>L</option>
								<option>M</option>
								<option>G</option>
								<option>GG</option>
							</select>
						</span>
						<span class="icon is-small is-left">
							<i class="fa fa-balance-scale"></i>
						</span>
					</p>
				</div>
				<hr>
				<btn class="button is-success is-large">
					<span class="icon is-medium">
						<i class="fa fa-truck"></i>
					</span>
					<span>Solicitar entrega</span>
					</btn>
			</div>
			<!-- info tile -->
			<div id="info-tile" class="tile is-ancestor is-pulled-right column is-5 is-hidden-mobile">
				<div class="tile is-vertical">
					<article class="tile is-child notification is-info">
						<p class="title">Informações</p>
						<p class="subtitle">Sobre peso e tamanho</p>
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

