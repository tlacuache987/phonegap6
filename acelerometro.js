// JavaScript Document
var acelerometroWatchID = null;

var iniciarAcelerometro = function(){
	var opc = { frequency: 500 };
	
	acelerometroWatchID = navigator.accelerometer.watchAcceleration(function(aceleracion){
		var element = document.getElementById('acelerometro');
		element.innerHTML = 'X: ' + aceleracion.x + '<br />' +
                            'Y: ' + aceleracion.y + '<br />' +
                            'Z: ' + aceleracion.z + '<br />' +
                            'Timestamp: ' + aceleracion.timestamp + '<br />';
	}, function(){
		navigator.notification.alert("Error al acceder al acelerómetro", "Error !");
	}, opc);
}

var detenerAcelerometro = function(){
	if (acelerometroWatchID){
		navigator.accelerometer.clearWatch(acelerometroWatchID);
		acelerometroWatchID = null;
	}
}

$(document).ready(function(){
	$("#obtenerAcelerometro").on("click", function(){
		navigator.accelerometer.getCurrentAcceleration(
			function(aceleracion){
				$("#obtenerAcelerometro_aqui").html(
					'x: ' + aceleracion.x + '<br />' +
					'y: ' + aceleracion.y + '<br />' +
					'z: ' + aceleracion.z + '<br />' +
					'timestamp: ' + aceleracion.timestamp + '<br />');
			}, function(){
				navigator.notification.alert("Error al acceder al acelerómetro", "Error !");
		});
	});
});