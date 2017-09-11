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
		<section v-if="warningMessage != ''" class="hero is-danger">
			<div class="hero-body">
				<div class="container">
					<h1 class="title">
						{{warningMessage}}
					</h1>
					<h2 class="subtitle">
						Reveja a solicitação e tente novamente.
					</h2>
				</div>
			</div>
		</section>
		<!-- confirmation tile -->
		<transition
		enter-active-class="animated fadeIn"
		leave-active-class="animated slideOutRight"
		>
		<div v-if="confirmation" id="confirmation-container" >
			<div id="confirmation-tile" class="tile is-vertical">
				<article class="tile is-child notification is-info">
					<p class="title"><b>{{shipment.nickname}}</b></p>
					<p class="subtitle">
						<b>{{shipment.description}}</b> <br>
						<span v-if="shipment.priority == 0">Entregue nos <b>próximos 5 dias úteis</b></span>
						<span v-if="shipment.priority == 1">Entregue até <b>às 12h de amanhã</b></span>
						<span v-if="shipment.priority == 2">Entregue <b>hoje ainda</b></span>
						<br>
						Tamanho: <b>{{shipment.size}}</b>, Peso <b>{{shipment.weight}}</b> <br>
						R$<b>{{shipmentPrice}},00</b>
					</p>
					<button @click="createPackage" class="width-max button is-success is-large">
						<span class="icon is-medium">
							<i class="fa fa-check"></i>
						</span>
						<span>Confirmar solicitação.</span>
					</button>
					<button @click="confirmation = !confirmation; requestBtnLoading = false" class="width-max button is-danger is-large">
						<span class="icon is-medium">
							<i class="fa fa-times"></i>
						</span>
						<span>Oops! Ainda não.</span>
					</button>
				</article>
			</div>
		</div>

	</transition>

	<!-- form space -->
	<transition
	enter-active-class="animated fadeIn"
	>
	<div id="form-container" class="columns is-clearfix" :class="{ 'is-hidden': confirmation }">

		<div class="column is-11">
			<div class="field">
				<label class="label">Apelido da encomenda <!--{{shipment}}--></label>
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
							<option value="" disabled selected>Prioridade</option>
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
							<option value="" disabled selected>Tamanho</option>
							<option value="P">P - Cartas e Envelopes</option>
							<option value="SS">SS - Até 10cm x 10cm x 10cm</option>
							<option value="S">S - Até 20cm x 20cm x 20cm</option>
							<option value="M">M - Até 35cm x 35cm x 35cm</option>
							<option value="L">L - Até 50cm x 50cm x 50cm</option>
							<option value="LL">LL - Até 80cm x 80cm x 80cm</option>
							<option value="XL">XL - Até 200cm x 200cm x 200cm</option>
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
							<option value="" disabled selected>Peso</option>
							<option value="P">P - Cartas e Envelopes</option>
							<option value="LL">LL - Até 600g</option>
							<option value="L">L - Até 1kg</option>
							<option value="M">M - Até 2kg</option>
							<option value="H">H - Até 5kg</option>
							<option value="HH">HH - Até 15kg</option>
							<option value="XH">XH - Até 50kg</option>
						</select>
					</span>
					<span class="icon is-small is-left">
						<i class="fa fa-balance-scale"></i>
					</span>
				</p>
			</div>

<!-- 			<div class="">
				<p>Origem: {{addresses.origin}}</p>
				<p>Destino: {{addresses.destination}}</p>
				<p>Distância: {{addresses.distance}} (metros)</p>				
				
			</div> -->
			<label class="label">Origem</label>
			<div class="field has-addons">
				<div class="control is-expanded">
					<input id="originInput" class="input" type="text" placeholder="e.g Las Vegas Strip">
				</div>
				<div class="control">
					<a class="button is-danger" @click="removeOrigin">
						<span class="icon"><i class="fa fa-times"></i></span>
					</a>
				</div>
			</div>
			<label class="label">Destino</label>
			<div class="field has-addons">
				<div class="control is-expanded">
					<input id="destinationInput" class="input" type="text" placeholder="e.g Hollywood Boulevard" :disabled="!isOriginFilled">
				</div>
				<div class="control">
					<a class="button is-danger" @click="removeDestiny" :disabled="!isOriginFilled">
						<span class="icon"><i class="fa fa-times"></i></span>
					</a>
				</div>
			</div>
<!-- 			<button @click="resetMap()" class="button is-success is-large">
				<span>Clean map</span>
			</button> -->
			<div id="myMap"></div>

			<hr>
			<button @click="toConfirmation" :disabled="!requestBtnEnabled" class="width-max button is-large" :class="{ 'is-loading': requestBtnLoading, 'is-outlined': !requestBtnLoading, 'is-success': requestBtnEnabled, 'is-danger': (!requestBtnEnabled || insufficientFunds) }">
				<span class="icon is-medium">
					<i class="fa fa-truck"></i>
				</span>
				<span>{{requestBtnMessage}}</span>
			</button>
			
		</div>
	</div>
	</transition>

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
				email: this.$store.getters.user.object.email,
				distance: 0,
				unhackable: "true"
			},
			shipmentPrice: null,
			blankShipment: {
				nickname: "",
				description: "",
				priority: "",
				size: "",
				weight: "",
				email: this.$store.getters.user.object.email,
				unhackable: "true"
			},
			confirmation: false,
			warningMessage: "",
			insufficientFunds: false,
			insufficientPrice: null,
			requestBtnLoading: false

		}
	},
	methods: {
		toConfirmation (){
			this.requestBtnLoading = true
			if (this.shipment.nickname == "" || this.shipment.description == "" || this.shipment.priority == "" || this.shipment.size == "" || this.shipment.weight == "" || this.addresses.origin == "" || this.addresses.destination == "") {
				this.warningMessage = "Você precisa preencher todos os campos para solicitar uma entrega"
				this.requestBtnLoading = false
			} else {
				this.warningMessage = ''
				this.shipment.distance = this.addresses.distance

				console.log(this.shipment)
				axios.post('https://pakot-backend.herokuapp.com/public/package/price', this.shipment)
					.then(response => {
						console.log(response)
						if (response.data.price == "insufficient") {
							this.insufficientFunds = true
							this.insufficientPrice = response.data.p
							this.requestBtnLoading = false
						} else {
							this.shipmentPrice = response.data.price
							this.confirmation = !this.confirmation
						}
					}).catch(e => {
						console.log(e)
					})

			}
		},
		createPackage (){
			this.shipment.origin = this.addresses.origin
			this.shipment.destination = this.addresses.destination
			this.shipment.distance = this.addresses.distance

			axios.post('https://pakot-backend.herokuapp.com/public/package/create', this.shipment)
				.then(response => {
					console.log(response)
					this.confirmation = !this.confirmation
					this.requestBtnLoading = false
					this.shipment = this.blankShipment
				})
				.catch(e => {
					console.log(e)
				})
		},
		//------------------------GOOGLE MAPS FUNCTIONS------------------------
		removeOrigin (){
			this.resetMap()
			document.getElementById('originInput').value = ""
			document.getElementById('destinationInput').value = ""
		},
		removeDestiny (){
			document.getElementById('destinationInput').value = ""

			this.itemsMap.markers[1].setMap(null);
			this.addresses.destination = ""
			this.itemsMap.markers.pop()
			this.itemsMap.directionsDisplay.setMap(null);
			if(typeof this.itemsMap.line !== 'undefined')
				this.itemsMap.line.setMap(null)
			this.itemsMap.directionsDisplay.setMap(null);

		},
		resetMap(){
			for (var i=0;i<this.itemsMap.markers.length;i++)
				this.itemsMap.markers[i].setMap(null);
			this.addresses.origin=''
			this.addresses.destination=''	
			this.addresses.distance=''	
			this.itemsMap.markers = []
			if(typeof this.itemsMap.line !== 'undefined')
				this.itemsMap.line.setMap(null)
			this.itemsMap.directionsDisplay.setMap(null);
		},	
		addMarker(itemsMap, location, infowindow){
			var marker = new google.maps.Marker({
				position: location,
				map: itemsMap.map
			});
			itemsMap.markers.push(marker)
			marker.addListener('click', function() {
				infowindow.open(itemsMap.map, marker)
			});
			return marker
		},
		latLngToAddress(itemsMap, infowindow, latlng, addMarker, distanceLatLng, routeCalc, addr, flag){
			itemsMap.geocoder.geocode({'location': latlng}, function(results, status){
				if(status === 'OK'){
					if(results[1]){
						var marker = addMarker(itemsMap, latlng, infowindow)
						infowindow.setContent(results[1].formatted_address)
						infowindow.open(itemsMap.map, marker)
						
						if(!flag) addr.origin = results[1].formatted_address
							else{
								addr.destination = results[1].formatted_address
								addr.distance = distanceLatLng(itemsMap.markers)
								routeCalc(itemsMap.directionsService,itemsMap.directionsDisplay,addr);
								itemsMap.directionsDisplay.setMap(itemsMap.map);
							}	
							
						} 
						else
							console.log('No results found')
					} 
					else
						console.log('Geocoder failed due to: ' + status)
				});
		},
		distanceLatLng(markers){
			var A = markers[0].position
			var B = markers[1].position
			return google.maps.geometry.spherical.computeDistanceBetween(A,B)
		},
		calculateAndDisplayRoute(directionsService, directionsDisplay, addr){
			directionsService.route({
				origin: addr.origin,
				destination: addr.destination,
				travelMode: 'DRIVING'
			}, function(response, status) {
				if (status === 'OK') {
					directionsDisplay.setDirections(response);
				} else {
					console.log('Directions request failed due to ' + status);
				}
			})
		}
	},
	computed: {
		isOriginFilled (){
			return this.addresses.origin == "" ? false : true 
		},
		requestBtnEnabled: function(){
			if (this.shipment.nickname == "" || this.shipment.description == "" || this.shipment.priority == "" || this.shipment.size == "" || this.shipment.weight == "" || this.addresses.origin == "" || this.addresses.destination == "") {
				return false
			} else {
				return true
			}
		},
		requestBtnMessage: function(){
			if (this.shipment.nickname == "" || this.shipment.description == "" || this.shipment.priority == "" || this.shipment.size == "" || this.shipment.weight == "" || this.addresses.origin == "" || this.addresses.destination == "") {
				return "Preencha todos os campos"
			} else {
				if (this.insufficientFunds) {
					return "Fundos insuficientes (R$" + this.insufficientPrice + ",00). Tente Novamente"
				} else {
					return "Solicitar entrega"
				}
			}
		}
	},
	mounted: function() {
		this.itemsMap.geocoder = new google.maps.Geocoder
		this.itemsMap.originWin = new google.maps.InfoWindow
		this.itemsMap.destinationWin = new google.maps.InfoWindow
		this.itemsMap.directionsService = new google.maps.DirectionsService;
		this.itemsMap.directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});

		this.itemsMap.map = new google.maps.Map(document.getElementById('myMap'), {
			zoom: 11,
			center: {lat: -19.918667, lng: -43.936729},
			mapTypeId: 'terrain'	
		});

		// case of map click
		// this.itemsMap.map.addListener('click', mapClickEvent.bind(this), false)
		// function mapClickEvent(event){
		// 	if(this.itemsMap.markers.length<2){
		// 		if(this.itemsMap.markers.length == 0)
		// 			this.latLngToAddress(this.itemsMap, this.itemsMap.originWin, event.latLng, this.addMarker, this.distanceLatLng, this.calculateAndDisplayRoute, this.addresses, false);
		// 		else if(this.itemsMap.markers.length == 1){
		// 			this.latLngToAddress(this.itemsMap, this.itemsMap.destinationWin, event.latLng, this.addMarker, this.distanceLatLng, this.calculateAndDisplayRoute, this.addresses, true);
		// 		}
		// 	}
		// }

		// case of texts inputs
		var inputOrigin = document.getElementById('originInput')
		var inputDestination = document.getElementById('destinationInput')

		var autocompleteOrigin = new google.maps.places.Autocomplete(inputOrigin)
		autocompleteOrigin.bindTo('bounds',this.itemsMap.map)

		var autocompleteDestination = new google.maps.places.Autocomplete(inputDestination)
		autocompleteDestination.bindTo('bounds',this.itemsMap.map)

		autocompleteOrigin.addListener('place_changed', mapCompleteEventOrigin.bind(this),false)
		autocompleteDestination.addListener('place_changed', mapCompleteEventDestination.bind(this),false)

		function mapCompleteEventOrigin() {
			var place = autocompleteOrigin.getPlace()
			if (!place.geometry || this.itemsMap.markers.length>1) 
				return null

			if (place.geometry.viewport) 
				this.itemsMap.map.fitBounds(place.geometry.viewport)
			else 
				this.itemsMap.map.setCenter(place.geometry.location)

			var marker = this.addMarker(this.itemsMap, place.geometry.location, this.itemsMap.originWin)

			this.itemsMap.originWin.setContent(place.formatted_address)
			this.addresses.origin = place.formatted_address
			this.itemsMap.originWin.open(this.itemsMap.map, marker)
			if(this.itemsMap.markers.length==2){
				this.addresses.distance = this.distanceLatLng(this.itemsMap.markers)
				this.calculateAndDisplayRoute(this.itemsMap.directionsService,this.itemsMap.directionsDisplay, this.addresses);
				this.itemsMap.directionsDisplay.setMap(this.itemsMap.map)
			}				
		}
		function mapCompleteEventDestination() {
			var place = autocompleteDestination.getPlace()
			if (!place.geometry || this.itemsMap.markers.length>1) 
				return null

			if (place.geometry.viewport) 
				this.itemsMap.map.fitBounds(place.geometry.viewport)
			else 
				this.itemsMap.map.setCenter(place.geometry.location)

			var marker = this.addMarker(this.itemsMap, place.geometry.location, this.itemsMap.destinationWin)

			this.itemsMap.destinationWin.setContent(place.formatted_address)
			this.addresses.destination = place.formatted_address
			this.itemsMap.destinationWin.open(this.itemsMap.map, marker)
			if(this.itemsMap.markers.length==2){
				this.addresses.distance = this.distanceLatLng(this.itemsMap.markers)
				this.calculateAndDisplayRoute(this.itemsMap.directionsService,this.itemsMap.directionsDisplay, this.addresses);
				this.itemsMap.directionsDisplay.setMap(this.itemsMap.map)
			}				
		}
	}
}
</script>
<style scoped src="../css/create-package.css"/>

