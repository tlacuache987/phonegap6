// JavaScript Document
var geolocalizacionWatchID = null;

var iniciarGeolocalizacion = function(){
	var opc = { maximumAge: 1000, timeout: 5000, enableHighAccuracy: true };
	
	geolocalizacionWatchID = navigator.geolocation.watchPosition(function(posicion){
		var element = document.getElementById('geolocalizacion');
		element.innerHTML = 'Latitud: ' + posicion.coords.latitude + '<br />' +
							'Longitude: ' + posicion.coords.longitude + '<br />' +
							'Altitude: ' + posicion.coords.altitude + '<br />' +
							'Accuracy: ' + posicion.coords.accuracy + '<br />' +
							'Altitude Accuracy: ' + posicion.coords.altitudeAccuracy + '<br />' +
							'Heading: ' + posicion.coords.heading + '<br />' +
							'Speed: ' + posicion.coords.speed + '<br />' +
							'Timestamp: ' + posicion.timestamp + '<br />';
	}, function(){
		navigator.notification.alert("Error al acceder a la geolocalización", "Error !");
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
				navigator.notification.alert("Error al acceder a la geolocalización", "Error !");
		});
	});
});