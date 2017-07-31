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
					<label class="label">Apelido da encomenda {{shipment}}</label>
					<p class="control has-icons-left">
						<input v-model="shipment.nickname" class="input" type="text" placeholder="e.g Presente para mamãe">
						<span class="icon is-small is-left">
							<i class="fa fa-bookmark"></i>
						</span>
					</p>
				</div>
				<div class="field">
					<label class="label">Descrição</label>
					<p class="control has-icons-left">
						<textarea v-model="shipment.description" class="textarea" type="text" placeholder="e.g Ursinho de pelúcia para o dia das mães"></textarea>
					</p>
				</div>
				<div class="field">
					<label class="label">Prioridade</label>
					<p class="control has-icons-left">
						<span class="select">
							<select v-model="shipment.priority">
								<option value="2">Entregue hoje ainda</option>
								<option value="1">Entregue até às 12h de amanhã</option>
								<option value="0">Entregue nos próximos 5 dias úteis</option>
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
							<select v-model="shipment.size">
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
							<select v-model="shipment.weight">
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

				<p>Origem: {{addresses.origin}}</p>
				<p>Destino: {{addresses.destination}}</p>
				<p>Distância: {{addresses.distance}} (metros)</p>				

				<button @click="resetMap()" class="button is-success is-large">
					<span>Clean map</span>
				</button>
				<button @click="markPoints()" class="button is-success is-large">
					<span>Marcar pontos</span>
				</button>
				<div id="myMap"></div>

				<hr>
				<button @click="createPackage()" class="button is-success is-large">
					<span class="icon is-medium">
						<i class="fa fa-truck"></i>
					</span>
					<span>Solicitar entrega</span>
				</button>
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
				itemsMap: {
					markers:[]
				},
				itemsPag: {
					markerCount : 0
				},
				addresses: {
					origin: '',
					destination: '',
					distance:''
				},
				shipment: {
					nickname: "",
					description: "",
					priority: "",
					size: "",
					weight: "",
					email: this.$store.getters.user.object.email
				}

			}
		},
		methods: {
			createPackage() {
				axios.post('https://pakot-backend.herokuapp.com/public/package/create', this.shipment)
				.then(response => {
					console.log(response)
				})
				.catch(e => {
					console.log(e)
				})
			},
			//------------------------GOOGLE MAPS FUNCTIONS------------------------
			resetMap(){
				this.itemsPag.markerCount = 0;
				for (var i=0;i<this.itemsMap.markers.length;i++)
					this.itemsMap.markers[i].setMap(null);
				this.addresses.origin='';
				this.addresses.destination='';	
				this.addresses.distance='';	
				this.itemsMap.markers = [];
				if(typeof this.itemsMap.line !== 'undefined')
	        		this.itemsMap.line.setMap(null);
			},	
			markPoints(){
			},
			addMarker(itemsMap, location, infowindow){
				var marker = new google.maps.Marker({
					position: location,
					map: itemsMap.map
				});
				itemsMap.markers.push(marker);
				marker.addListener('click', function() {
					infowindow.open(itemsMap.map, marker);
				});
				return marker;
			},
			latLngToAddress(itemsMap, infowindow, latlng, addMarker, distanceLatLng, addr, flag){
				itemsMap.geocoder.geocode({'location': latlng}, function(results, status){
					if(status === 'OK'){
						if(results[1]){
							var marker = addMarker(itemsMap, latlng, infowindow);
							infowindow.setContent(results[1].formatted_address);
							infowindow.open(itemsMap.map, marker);
							
							if(!flag) addr.origin = results[1].formatted_address;
							else{
								addr.destination = results[1].formatted_address;
								addr.distance = distanceLatLng(itemsMap.markers);

								itemsMap.line = new google.maps.Polyline({
									path: [itemsMap.markers[0].position,itemsMap.markers[1].position],
									geodesic: true,
									strokeColor: '#FF0000',
									strokeOpacity: 1.0,
									strokeWeight: 2
								});
								itemsMap.line.setMap(itemsMap.map);
							}	
								
						} 
						else
							console.log('No results found');
					} 
					else
						console.log('Geocoder failed due to: ' + status);
				});
			},
			distanceLatLng(markers){
				var A = markers[0].position;
				var B = markers[1].position;
				return google.maps.geometry.spherical.computeDistanceBetween(A,B);
			}
		},
		mounted: function() {
			this.itemsMap.geocoder = new google.maps.Geocoder;
			this.itemsMap.originWin = new google.maps.InfoWindow;
			this.itemsMap.destinationWin = new google.maps.InfoWindow;
			this.itemsMap.map = new google.maps.Map(document.getElementById('myMap'), {
				zoom: 11,
				center: {lat: -19.918667, lng: -43.936729},
				mapTypeId: 'terrain'	
			});

			// case of map click
			this.itemsMap.map.addListener('click', mapClickEvent.bind(this), false);
			function mapClickEvent(event){
				if(this.itemsPag.markerCount<2){
					if(this.itemsPag.markerCount == 0)
						this.latLngToAddress(this.itemsMap, this.itemsMap.originWin, event.latLng, this.addMarker, this.distanceLatLng, this.addresses, false);
					else if(this.itemsPag.markerCount == 1){
						this.latLngToAddress(this.itemsMap, this.itemsMap.destinationWin, event.latLng, this.addMarker, this.distanceLatLng, this.addresses, true);
					}
					this.itemsPag.markerCount++;
				}
			}

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
	#myMap {
		height:300px;
		width: 100%;
	}
</style>

