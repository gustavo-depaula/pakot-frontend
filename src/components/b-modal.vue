<!-- bulma modal -->
<template>
	<div class="modal is-active">
		<div class="modal-background" @click="$emit('close')"></div>
		<div class="modal-content">
			<div class="box">
				<div class="columns is-hidden-touch">
					<div class="column">
						<h1 class="title is-2"><b>{{nickname}}</b></h1>
						<h2 class="subtitle is-4">{{description}}</h2>
					</div>
					<div class="column">
						<p class="title is-2 is-pulled-right">R$<b>{{price}},00</b></p>
					</div>
				</div>
				<div class="is-hidden-desktop has-text-centered">
					<h1 class="title is-2"><b>{{nickname}}</b></h1>
					<h2 class="subtitle is-4">{{description}}</h2>
					<p class="title is-2">R$<b>{{price}},00</b></p>
				</div>
				<hr>
				<p class="title is-3">
					Deve ser entregue
					<span v-if="priority == 2">
						<b class="has-text-danger">hoje ainda.</b>
					</span>
					<span v-else-if="priority == 1">
						<b class="has-text-warning">até amanhã às 12h.</b>
					</span>
					<span v-else>
						<b class="has-text-info">em cinco dias.</b>
					</span>
					<br>
					Tamanho <b>{{size}}</b><br>
					Peso <b>{{weight}}</b>
				</p>
				<div id="mapModal"></div>
				<div v-if="isDeliveryMan">
					<button v-if="state == 0" disabled class="actionBtn button is-success is-medium"><span class="icon"><i class="fa fa-check"></i></span>&nbsp;&nbsp;{{btnMessage}}</button>
					<button v-if="state == 1" @click="$emit('arrived')" class="actionBtn button is-primary is-medium"><span class="icon"><i class="fa fa-check"></i></span>&nbsp;&nbsp;{{btnMessage}}</button>
					<button v-if="state == 2" @click="$emit('dispatch')" class="actionBtn button is-info is-medium"><span class="icon"><i class="fa fa-truck"></i></span>&nbsp;&nbsp;{{btnMessage}}sdads</button>
					<button v-if="state == 3" @click="$emit('accept')" class="actionBtn button is-warning is-medium"><span class="icon"><i class="fa fa-check"></i></span>&nbsp;&nbsp;{{btnMessage}}</button>
					
				</div>
				<button v-if="!isDeliveryMan" @click="$emit('cancel')" class="actionBtn button is-danger is-medium"><span class="icon"><i class="fa fa-times"></i></span>&nbsp;&nbsp;Cancelar esta entrega.</button>
			</div>
		</div>
		<button class="modal-close is-large" @click="$emit('close')"></button>
	</div>
</template>
<script>
	export default {
		name: 'b-modal',
		props: ['nickname', 'description', 'price', 'priority', 'size', 'weight','origin','destination', 'user', 'state', 'btnMessage'],
		data() {
			return {
				itemsMap: {
					markers:[]
				}
			}
		},
		methods: {
			//------------------------GOOGLE MAPS FUNCTIONS------------------------
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
									routeCalc(itemsMap.directionsService,itemsMap.directionsDisplay,addr)
									itemsMap.directionsDisplay.setMap(itemsMap.map)
								}	
								
							} 
							else
								console.log('No results found')
						} 
						else
							console.log('Geocoder failed due to: ' + status)
					})
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
			isDeliveryMan (){
				if (this.user == 'deliveryMan') {
					return true
				}
			},
			modalBtnMessage (){

			}
		},
		mounted: function() {
			this.itemsMap.geocoder = new google.maps.Geocoder
			this.itemsMap.originWin = new google.maps.InfoWindow
			this.itemsMap.destinationWin = new google.maps.InfoWindow
			this.itemsMap.directionsService = new google.maps.DirectionsService;
			this.itemsMap.directionsDisplay = new google.maps.DirectionsRenderer();
			this.itemsMap.map = new google.maps.Map(document.getElementById('mapModal'), {
				zoom: 11,
				center: {lat: -19.918667, lng: -43.936729},
				mapTypeId: 'terrain'	
			})
			this.itemsMap.directionsDisplay.setMap(this.itemsMap.map)
			this.calculateAndDisplayRoute(this.itemsMap.directionsService, this.itemsMap.directionsDisplay, {origin:this.origin,destination:this.destination})
		}	
	}
</script>
<style scoped>
	.actionBtn {
		width: 100%;
	}
	#mapModal {
		height:300px;
		width: 100%;
		margin-bottom:1%;
	}

</style>