	const crud = new Firebase("https://adminoxxoparts.firebaseio.com/Oxxo/Requisitions/");

	const imgUser = localStorage.getItem("Image");
    const nameUser = localStorage.getItem("Name");
    const privUSer = localStorage.getItem("Priv");
	const emailUser = localStorage.getItem("Email"); 
	const Token = localStorage.getItem("TokenAccess");

	const date = new Date();
	const d = document;
	const c = console.log;
	const btn_car_send = d.getElementById('btn_car_send');

    var storageService = firebase.storage();

    window.onload = function() {
		
		if (privUSer == 1) {
			
			$(".user").hide();
			
		} else if (privUSer == 2) {

			$(".admin").hide();
		
		}else{
	
			window.localStorage.clear();
			location.href = "../";

        }


		$("#imgUser").attr("src",imgUser);
		$("#nameUser").html(nameUser);
		$("#emailUser").html(emailUser);
		
	}


/* ================================== load child parts =================================== */

crud.on("child_added", function(snap) {
	
	$('#tabla').append(carga(snap.key(), snap.val()));

});


crud.on('child_removed', function(snap){
	
	$("."+snap.key()).hide(2000);

});


crud.on("child_changed", function(snap) {
  var changedPost = snap.val();
 
});


function carga() {
	
	var datos = {};
	
	crud.on('value', function (data) {
		
		var html = "";
    	datos = data.val();
		var btn_status = "";
		var any_find;
		var html_modal = "";
		
          
        $.each(datos, function(id,values){
/*
			$.ajax({
				url: crud.child(id)+".json",
				type:'GET',
				success(data){
					var dato = {};
					dato = data;
					$.each(dato, function (index, value) {
						if(value.Parts == null || value.Parts == undefined || value.Parts == ""){
							$.ajax({
								url: crud.child(id)+".json",
								type:'DELETE',
							success(data){}
						});
						}
					});
					
				}
			});*/
		
		
			
			mydate = new Date(values.Date_S);
			let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

				if(privUSer == 1){
					let fila = 0;
					fila++;
					html += '<thead class="' + id + '">';
					html += '<tr>';
					html += '<th>Estatus</th>';
					html += '<th>Nombre de Usuario</th>';
					html += '<th>Fecha</th>';
					html += '<th>Abrir Requisicion</th>';
					html += '</tr>';
					html += '</thead>';

					html += '<tbody class="' + id + '">';
					html += '<tr>';

					var idData = "'" + id + "'";

					if(values.Status === 1){
						
						status = '<span class="label bg-green">Aprobada</span>';

					}else if(values.Status === 2){

						status = '<span class="label bg-orange">Nuevo</span>';

					}else if(values.Status === 3){

						status = '<span class="label bg-black">Rechazada</span>';

					}else if(values.Status === 4){
						
						status = '<span class="label bg-red">Incompleta</span>';

					}

					btn_status = '<a class="btn btn-info" onclick="open_requisition(' + idData + ')" id="btn_' + id + '" style="cursor:pointer !important;"><i class="material-icons">open_in_new</i></b>';

					html += '<td style="font-size:18px;">' + status + '</td>';
					html += '<td><p id="Users' + values.Users + '">' + values.nameUser + "</p></td>";

					html += '<td><b>' + mydate.toLocaleDateString('es-MX', options) + '</b></td>';

					html += '<td>' + btn_status + '</td>';
					html += '</tr>';
					html += '</tbody>';
		
				} else {
				
					if(Token === values.Users){
						let fila = 0;
						fila++;
						html += '<thead class="' + id + '">';
						html += '<tr>';
						html += '<th>Estatus</th>';
						html += '<th>Nombre de Usuario</th>';
						html += '<th>Fecha</th>';
						html += '<th>Abrir Requisicion</th>';
						html += '</tr>';
						html += '</thead>';

						html += '<tbody class="' + id + '">';
						html += '<tr>';

						var idData = "'" + id + "'";

						if(values.Status === 1){
							
							status = '<span class="label bg-green">Aprobada</span>';

						}else if(values.Status === 2){

							status = '<span class="label bg-orange">Nuevo</span>';

						}else if(values.Status === 3){

							status = '<span class="label bg-black">Rechazada</span>';

						}else if(values.Status === 4){
							
							status = '<span class="label bg-red">Incompleta</span>';

						}

						btn_status = '<a class="btn btn-info" onclick="open_requisition(' + idData + ')" id="btn_' + id + '" style="cursor:pointer !important;"><i class="material-icons">open_in_new</i></b>';

						html += '<td style="font-size:18px;">' + status + '</td>';
						html += '<td><p id="Users' + values.Users + '">' + values.nameUser + "</p></td>";

						html += '<td><b>' + mydate.toLocaleDateString('es-MX', options) + '</b></td>';

						html += '<td>' + btn_status + '</td>';
						html += '</tr>';
						html += '</tbody>';

					}
				}
			
		});
		
		$("#tabla").html(html);
		$(".lazy").lazy();
		$(".c_noti").html(fila);
		

    });

}


function open_requisition(val) {
	
	localStorage.setItem("open_requisition", val);

	location.href = "../Open-Requisition/";
	
}


