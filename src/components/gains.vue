<!-- home page -->
<template lang="html">
	<div id="gains">
		<!-- header -->
		<div class="hero is-bold is-success	">
			<div class="hero-body">
				<div class="container">
					<h1 class="title">
						Ganhos de parceiro
					</h1>
					<h2 class="subtitle">
						Veja aqui seus ganhos e outros dados
					</h2>
				</div>
			</div>
		</div>
		<!-- shipments info -->
		<div class="columns">
			<div class="column is-12 admin-panel">
				<section class="hero is-small">
					<br>

					<!-- Hero footer: will stick at the bottom -->
					<div class="hero-foot">
						<nav class="level">
							<div class="level-item has-text-centered">
								<p class="heading">Tweets</p>
								<p class="title">3,456</p>
							</div>
							<div class="level-item has-text-centered">
								<p class="heading">Following</p>
								<p class="title">123</p>
							</div>
							<div class="level-item has-text-centered">
								<p class="heading">Followers</p>
								<p class="title">456K</p>
							</div>
							<div class="level-item has-text-centered">
								<p class="heading">Likes</p>
								<p class="title">789</p>
							</div>
						</nav>
					</div>
				</section>
				<section class="section">
					<div class="columns is-mobile is-multiline">
					<div class="column is-half-desktop is-full-mobile">
							<section class="panel">
								<p class="panel-heading">
									Ganho por entrega
								</p>
								<div class="panel-block">
									<div id="chart-gains" style="height: 250px;"></div>
								</div>
								<div class="panel-block">
									<button class="button is-default is-outlined is-fullwidth">
										View Data
									</button>
								</div>
							</section>
						</div>
						<div class="column is-half-desktop is-full-mobile">
							<section class="panel">
								<p class="panel-heading">
									Status da suas entregas
								</p>
								<div class="panel-block">
									<div id="chart-shipments" style="height: 280px;"></div>
								</div>
								<div class="panel-block">
									<button class="button is-default is-outlined is-fullwidth">
										View Data
									</button>
								</div>
							</section>
						</div>



					</div>
				</section>
			</div>
		</div>

	</div>
</template>
<script>
	import axios from 'axios';
	// import Morris from '../js/morris.js'
	export default {
		name: 'Gains',
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		mounted (){
			new Morris.Line({
				// ID of the element in which to draw the chart.
				element: 'chart-gains',
				// Chart data records -- each entry in this array corresponds to a point on
				// the chart.
				data: [
				{ year: '2006', value: 10394 },
				{ year: '2007', value: 50391 },
				{ year: '2008', value: 102025 },
				{ year: '2009', value: 198563 },
				{ year: '2010', value: 985641 },
				{ year: '2011', value: 1253256 },
				{ year: '2012', value: 4563215 },
				{ year: '2013', value: 10563215 },
				{ year: '2014', value: 50125009 },
				{ year: '2015', value: 129300581 },
				{ year: '2016', value: 256251253 }
				],
				// The name of the data record attribute that contains x-values.
				xkey: 'year',
				// A list of names of data record attributes that contain y-values.
				ykeys: ['value'],
				// Labels for the ykeys -- will be displayed when you hover over the
				// chart.
				labels: ['Total Users']
			});

			Morris.Donut({
				element: 'chart-shipments',
				data: [
				{label: "Download Sales", value: 12},
				{label: "In-Store Sales", value: 30},
				{label: "Mail-Order Sales", value: 20}
				]
			});
		}
	}
</script>
<style scoped>


</style>