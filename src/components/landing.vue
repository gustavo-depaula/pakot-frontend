<!-- landing page -->
<template lang="html">
	<div id="landing">
		<section class="hero is-fullheight is-dark">
			<div class="hero-head">
				<div class="container">
					<nav class="nav">
						<div class="container">
							<div class="nav-left">
								<a @click="view = 0" class="nav-item">
									<img src="../assets/landing-page/pakot-white.png" alt="Description">
								</a>
							</div>
							<span class="nav-toggle">
								<span></span>
								<span></span>
								<span></span>
							</span>
							<div class="nav-right nav-menu">
								<span @click="view = 2" class="nav-item">
									<a class="link">
										Sobre
									</a>
								</span>
								<span @click="view = 1" class="nav-item">
									<a class="link">
										Contato
									</a>
								</span>
								<span class="nav-item" @click="toLogin">
									<a class="button is-default">
										Fazer login
									</a>
								</span>
							</div>
						</div>
					</nav>
				</div>
			</div>

			<div class="hero-body">
				<div v-if="view == 0" class="container has-text-centered">
					<div class="columns is-vcentered">
						<div class="column is-5">
							<figure class="image is-4by3">
								<img src="../assets/landing-page/foto_inicio.png" class="promo-img" alt="Description">
							</figure>
						</div>
						<div class="column is-6 is-offset-1">
							<h1 class="title is-2">
								Bem-vindo ao Pakot!
							</h1>
							<h2 class="subtitle is-4">
								Insira seu e-mail abaixo para receber atualizações sobre a plataforma
							</h2>
							<br>
							<p class="control has-addons has-text-centered">
								<a class="button is-large is-danger is-outlined">
									Registrar
								</a>
								<div class="textbox">
									<input class="input is-expanded is-large" type="text" placeholder="Seu e-mail">
								</div>
							</p>
						</div>
					</div>
				</div>
				<div v-if="view == 1" class="container has-text-centered">
					<div class="columns is-vcentered">
						<div class="column is-5">
							<h1 class="title is-2">
								Contato
							</h1>
							<h2 class="subtitle is-4">
								Telefones e e-mails da equipe para negócios
							</h2>
						</div>
						<div class="column is-6 is-offset-1">
							<table class="is-fullwidth">
								<tr>
									<td><p class="name-in-table">Sr.&nbsp;Gustavo&nbsp;<b>de&nbsp;Paula</b></p></td>
									<td><p class="contact-in-table">+55&nbsp;31&nbsp;984.567.553</p></td>
								</tr>
								<tr>
									<td><p class="name-in-table">Sr.&nbsp;Raul&nbsp;<b>Mansur</b></p></td>
									<td><p class="contact-in-table">+55&nbsp;31&nbsp;982.361.299</p></td>
								</tr>
								<tr>
									<td><p class="name-in-table">Sr.&nbsp;Paulo&nbsp;<b>Henrique</b></p></td>
									<td><p class="contact-in-table">+55&nbsp;31&nbsp;999.528.549</p></td>
								</tr>
								<tr></tr>
								<tr>
									<td><p class="name-in-table"><b>gustavo</b></p></td>
									<td><p class="contact-in-table">@usepakot.com</p></td>
								</tr>
								<tr>
									<td><p class="name-in-table"><b>raul</b></p></td>
									<td><p class="contact-in-table">@usepakot.com</p></td>
								</tr>
								<tr>
									<td><p class="name-in-table"><b>paulo</b></p></td>
									<td><p class="contact-in-table">@usepakot.com</p></td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<div v-if="view == 2" class="container has-text-centered">
					<div class="columns is-vcentered">
						<div class="column is-5">
							<h1 class="title is-2">
								Sobre
							</h1>
							<h2 class="subtitle is-4">
								Saiba mais sobre os mantenedores do Pakot
							</h2>
						</div>
						<div class="column is-6 is-offset-1">
							<div class="box">
								<article class="media">
									<div class="media-left">
										<figure class="image is-64x64">
											<img src="../assets/landing-page/gu.jpg" alt="Image">
										</figure>
									</div>
									<div class="media-content">
										<div class="content">
											<p><strong>Gustavo de Paula</strong> <small class="sobre_alguem">Front-end developer</small><br></p>
											<p class="sobre_alguem">
												Desenvolvedor Frontend de Ouro Preto. Atualmente trabalhando como desenvolvedor frontend e líder de projeto para Pakot em BH. Estudante de Informática. Escritor e fotógrafo nos tempos livres. Amante da Liberdade.
											</p>

										</div>
										<nav class="level is-mobile">
											<div class="level-left">
												<a class="level-item">
													<a href="https://www.facebook.com/gustavodepaula.real?ref=br_rs" class="icon-block">
														<i style="font-size:24px" class="fa">&#xf082;</i>
													</a>
												</a>
												<a class="level-item">
													<a href="https://github.com/gustavo-depaula" class="icon-block">
														<i style="font-size:24px" class="fa">&#xf092;</i>
													</a>
												</a>
												<a class="level-item">
													<a href="https://www.instagram.com/itsgustavodepaula/" class="icon-block">
														<i style="font-size:24px" class="fa">&#xf16d;</i>
													</a>
												</a>
											</div>
										</nav>
									</div>
								</article>
							</div>

							<div class="box">
								<article class="media">
									<div class="media-left">
										<figure class="image is-64x64">
											<img src="../assets/landing-page/raul.jpg" alt="Image">
										</figure>
									</div>
									<div class="media-content">
										<div class="content">
											<p><strong>Raul Mansur</strong> <small class="sobre_alguem">Back-end developer</small><br></p>
											<p class="sobre_alguem">
												Programador, violonista acústico autodidata, desenvolvedor web, lutador novato de muay thai, gerente e organizador de projetos, aspirante a cozinheiro e entusiasta à engenharia elétrica.
											</p>
										</div>
										<nav class="level is-mobile">
											<div class="level-left">
												<a class="level-item">
													<a href="https://www.facebook.com/raul.mansur.77" class="icon-block">
														<i style="font-size:24px" class="fa">&#xf082;</i>
													</a>
												</a>
												<a class="level-item">
													<a href="https://github.com/raul4247" class="icon-block">
														<i style="font-size:24px" class="fa">&#xf092;</i>
													</a>
												</a>
												<a class="level-item">
													<a href="/" class="icon-block">
														<i style="font-size:24px" class="fa">&#xf16d;</i>
													</a>
												</a>
											</div>
										</nav>
									</div>
								</article>
							</div>

							<div class="box">
								<article class="media">
									<div class="media-left">
										<figure class="image is-64x64">
											<img src="../assets/landing-page/paulo.jpg" alt="Image">
										</figure>
									</div>
									<div class="media-content">
										<div class="content">
											<p><strong>Paulo Henrique</strong> <small class="sobre_alguem">Only-under-slavery developer</small><br></p>
											<p class="sobre_alguem">
												Mais perdido que Adão no dia das mães. Apaixonado por música e pelo aprendizado extra-classe.
											</p>
										</div>
										<nav class="level is-mobile">
											<div class="level-left">
												<a class="level-item">
													<a href="https://www.facebook.com/theSilvaPaulo" class="icon-block">
														<i style="font-size:24px" class="fa">&#xf082;</i>
													</a>
												</a>
												<a class="level-item">
													<a href="https://github.com/paulo99hsilva" class="icon-block">
														<i style="font-size:24px" class="fa">&#xf092;</i>
													</a>
												</a>
												<a class="level-item">
													<a href="https://www.instagram.com/thesilvapaulo/" class="icon-block">
														<i style="font-size:24px" class="fa">&#xf16d;</i>
													</a>
												</a>
											</div>
										</nav>
									</div>
								</article>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="hero-foot">
				<div class="container">
					<div class="tabs is-centered">
						<ul>
							<li><a>♥ 2017 Pakot Technologies Inc.</a></li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
<script>
	import router from '../router';

	export default {
		name: 'Landing',
		data() {
			return {
				view: 0,
				isMenuVisible: false
			}
		},
		methods: {
			toLogin(){
				this.$store.commit('wantToLogIn')
			}
		},
		mounted (){
			var burger = document.querySelector('.nav-toggle');
			var menu = document.querySelector('.nav-menu');
			burger.addEventListener('click', function() {
				burger.classList.toggle('is-active');
				menu.classList.toggle('is-active');
			});
		}
	}
</script>
<style scoped>
	@import url('../css/landing.css');
	/*@import url('../css/landing/font-awesome.min.css');*/
</style>