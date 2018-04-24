

	const imgUser = localStorage.getItem("Image");
    const nameUser = localStorage.getItem("Name");
    const privUSer = localStorage.getItem("Priv");
    const emailUser = localStorage.getItem("Email"); 

    var storageService = firebase.storage();

    window.onload = function() {
		
		if (privUSer == 1) {
			
		} else {
			
			window.localStorage.clear();
			location.href="../";
			
		}

		$("#imgUser").attr("src",imgUser);
		$("#nameUser").html(nameUser);
		$("#emailUser").html(emailUser);

		
    }


const crud = new Firebase('https://adminoxxoparts.firebaseio.com/Oxxo/Users/');

crud.on("child_added", function(snap) {
	
	$('#tabla').append(carga(snap.key(), snap.val()));

});



function carga() {
	
	var datos={};

    crud.orderByChild("model").on('value',function(data){
    	
    	datos = data.val();
    	var html = '';
          
        $.each(datos, function(id,values){

        	
				html += '<thead class="'+id+'">';
			    html += '<tr>';
			    html += '<th>Estatus</th>';
				html += '<th>Nombre</th>';
				html += '<th>Email</th>';
			    html += '<th>Privilegio</th>';
			    html += "<th>Imagen</th>";
			    html += '<th>Cambiar estatus</th>';
			    html += '<th>Cambiar Privilegio</th>';
			    html += '<th>Eliminar</th>';
			    html += '</tr>';
			    html += '</thead>';
			    
			    html += '<tbody class="'+id+'">';
			    html += '<tr>';

				if(values.Status == 1){

					status = '<span class="label bg-green">Activo</span>';
					btn_status = '<a onclick="s_car('+"'"+id+"'"+',2)" id="btn_'+id+'" style="cursor:pointer !important;"><i class="material-icons">block</i><br>Baja</a>';

				}else if(values.Status == 2){

					status = '<span class="label bg-red">Baja</span>';
					btn_status = '<a onclick="s_car('+"'"+id+"'"+',1)" id="btn_'+id+'" style="cursor:pointer !important;"><i class="material-icons">new_releases</i><br>Reactivar</a>';
				
				}else if (values.Privilege == 0) {
				 
					status = '<span class="label bg-orange">Nuevo</span>';
					btn_status = '<br><a onclick="s_car(' + "'" + id + "'" + ',1)" id="btn_p_' + id + '" style="cursor:pointer !important;"><i class="material-icons">fiber_new</i><br>Activar</a><br><br><br>';
				}


				if (values.Privilege == 0) {
				 
					privilege = '<span class="label bg-orange">Nuevo</span>';
					btn_privilege = '<br><a onclick="p_car(' + "'" + id + "'" + ',1)" id="btn_p_' + id + '" style="cursor:pointer !important;"><i class="material-icons">verified_user</i><br>Administrador</a><br><br><br>';
					btn_privilege += '<a onclick="p_car(' + "'" + id + "'" + ',2)" id="btn_p_' + id + '" style="cursor:pointer !important;"><i class="material-icons">check_circle</i><br>Usuario</a>';
				

				} else if (values.Privilege == 1) {
				  
					privilege = '<span class="label bg-green">Administrador</span>';
                  	btn_privilege = '<a onclick="p_car(' + "'" + id + "'" + ',2)" id="btn_p_' + id + '" style="cursor:pointer !important;"><i class="material-icons">check_circle</i><br>Usuario</a>';
				
				} else if (values.Privilege == 2) {
				  
					privilege = '<span class="label bg-blue">Usuario</span>';
                  	btn_privilege = '<a onclick="p_car(' + "'" + id + "'" + ',1)" id="btn_p_' + id + '" style="cursor:pointer !important;"><i class="material-icons">verified_user</i><br>Administrador</a>';
				
				}
				
			    html += '<td>'+status+'</td>';
				html += "<td><strong>" + values.Name + "</strong></td>";
			    html += "<td><a href='mailto:" + values.Email + "' title='Enviar correo'><b>" + values.Email + "</b></a></td>";
			    html += '<td>'+privilege+'</td>';
				if(values.Image == ""){
					html += '<td><h5>Usuario sin imagen</h5></td>';
				}else{
					html += '<td><img src=' + values.Image + ' width="160px" alt="' + values.Name + '" title="'+values.Name+'"></td>';
				}
				html += '<td>'+btn_status+'</td>';
				html += "<td>" + btn_privilege + "</td>";
			    html += '<td><a onclick="d_car('+"'"+id+"'"+')" id="btn_'+id+'" style="cursor:pointer !important;"><i class="material-icons">delete</i><br>Eliminar</a></td>';
			    html += '</tr>';
			    html += '</tbody>';

        });
        $("#tabla").html(html);
    });

}




crud.on("child_changed", function(snap) {
  var changedPost = snap.val();
  $.toast({
        heading: 'Modificado correctamente',
        showHideTransition: 'slide',
        icon: 'success'
    });
});

function d_car(key){

    $("#btn_"+key).removeAttr("onclick");
	$.ajax({
		url: crud + "/" + key + ".json",
		type: "DELETE",
	error: function(){

	}, success: function(){
	    
	
	}
	});

   
}

crud.on('child_removed', function(snap){
	
	$("."+snap.key()).hide(2000);
	$.toast({
		    heading: 'Eliminado correctamente',
		    showHideTransition: 'slide',
		    icon: 'success'
		});

});



function s_car(id, Status){

	$.ajax({
		url: crud +'/'+id+'.json',
		type: 'PATCH',
		data: JSON.stringify({Status: Status}),
	
	error: function(){


	},success: function(snap){

		
	}
	});

}


function p_car(id, Privilege) {
  $.ajax({
    url: crud + "/" + id + ".json",
    type: "PATCH",
    data: JSON.stringify({ Privilege: Privilege }),

    error: function() {},
    success: function(snap) {}
  });
}
