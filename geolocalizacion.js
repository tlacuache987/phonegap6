// JavaScript Document
var geolocalizacionWatchID = null;

var iniciarGeolocalizacion = function(){
	var opc = { timeout: 10000, enableHighAccuracy: true };
	
	geolocalizacionWatchID = navigator.geolocation.watchPosition(function(posicion){
		/*navigator.notification.alert('Latitude: '  + posicion.coords.latitude   + '\n' +
          'Longitude: ' + posicion.coords.longitude  + '\n');*/
		
		var myLat = posicion.coords.latitude;
    	var myLong = posicion.coords.longitude;

		//MAP
		var mapOptions = {
			center: new google.maps.LatLng(myLat, myLong),
			zoom: 14,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
	
		var map = new google.maps.Map(document.getElementById("map_canvas"),
									  mapOptions);
									  
		var element = document.getElementById('geolocalizacion');
		element.innerHTML = 'Latitud: ' + posicion.coords.latitude + '<br />' +
							'Longitude: ' + posicion.coords.longitude + '<br />' +
							'Altitude: ' + posicion.coords.altitude + '<br />' +
							'Accuracy: ' + posicion.coords.accuracy + '<br />' +
							'Altitude Accuracy: ' + posicion.coords.altitudeAccuracy + '<br />' +
							'Heading: ' + posicion.coords.heading + '<br />' +
							'Speed: ' + posicion.coords.speed + '<br />' +
							'Timestamp: ' + posicion.timestamp + '<br />';
	}, function(error){
		navigator.notification.alert("Error al acceder a la geolocalización: ["+error.code+"]: "+error.message, "Error !");
	}, opc);
}

var detenerGeolocalizacion = function(){
	if (geolocalizacionWatchID){
		navigator.geolocation.clearWatch(geolocalizacionWatchID);
		geolocalizacionWatchID = null;
	}
}

$(document).ready(function(){
	$("#obtenerGeolocalizacion").on("click", function(){
		navigator.geolocation.getCurrentPosition(
			function(posicion){
				$("#obtenerGeolocalizacion_aqui").html(
					'Latitud: ' + posicion.coords.latitude + '<br />' +
					'Longitude: ' + posicion.coords.longitude + '<br />' +
					'Altitude: ' + posicion.coords.altitude + '<br />' +
					'Accuracy: ' + posicion.coords.accuracy + '<br />' +
					'Altitude Accuracy: ' + posicion.coords.altitudeAccuracy + '<br />' +
					'Heading: ' + posicion.coords.heading + '<br />' +
					'Speed: ' + posicion.coords.speed + '<br />' +
					'Timestamp: ' + posicion.timestamp + '<br />');
			}, function(){
				navigator.notification.alert("Error al acceder a la geolocalización: ["+error.code+"]: "+error.message, "Error !");
		});
	});
});