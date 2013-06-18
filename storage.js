// JavaScript Document
var dbStorageID = null;

var iniciarStorage = function(){
	dbStorageID = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
	dbStorageID.transaction(crearDB, errorHandler, readyDB);
}

var crearDB = function(tx){
	tx.executeSql("CREATE TABLE IF NOT EXISTS DEMO (id INTEGER PRIMARY KEY AUTOINCREMENT, data)");
}

var errorHandler = function(err) {
	navigator.notification.alert("Error DB: ["+err.code+"] "+err.message);
} 

var readyDB = function(){
	// Agregar Registro
	$("#insertarRegistro").on("click", function(event){
		dbStorageID.transaction(function(tx){
			tx.executeSql('INSERT INTO DEMO (data) VALUES ("Ivan Venor García")');
		}, errorHandler, function(){
			navigator.notification.alert("Registro agregado");
		});
	});
	
	// Eliminar Registros
	$("#eliminarRegistros").on("click", function(event){
		dbStorageID.transaction(function(tx){
			tx.executeSql('DELETE FROM DEMO');
		}, errorHandler, function(){
			navigator.notification.alert("Registros eliminados");
			$("#resultadoDB_aqui").html("Registros eliminados.");
		});
	});
	
	// Listar Registros
	$("#listarRegistros").on("click", function(event){
		dbStorageID.transaction(function(tx){
			tx.executeSql('SELECT * FROM DEMO ORDER BY id',[], listarResultados, errorHandler);
		}, errorHandler, function(){
			navigator.notification.alert("Registros listados");
		});
	});
}

var listarResultados = function(tx, results){
	if(results.rows.length==0){
		$("#resultadoDB_aqui").html("No hay registros.");
		return false;
	}
	
	// este if serpa verdadero mientras haya sido ejecutado un SELECT y rowsAffected sea 0
	/*if (!results.rowsAffected) {
		$("#resultadoDB_aqui").html("No hay registros afectados.");
		return false;
	}*/
	
	var s = "Registros devueltos: " + results.rows.length + "<br />";
	for(i=0;i<results.rows.length;i++)
		s += "["+i+"] id: "+results.rows.item(i).id+", data: "+results.rows.item(i).data+"<br />";
	
	
	//s += "lastInsertID: " + results.insertId + "<br />";
	
	$("#resultadoDB_aqui").html(s);
}