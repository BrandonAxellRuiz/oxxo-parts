

	const imgUser = localStorage.getItem("Image");
    const nameUser = localStorage.getItem("Name");
    const privUSer = localStorage.getItem("Priv");
    const emailUser = localStorage.getItem("Email"); 

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

   
//const crud = new Firebase('https://backhome-16b56.firebaseio.com/car_status/'+$("#userID").val()+'');
const crud = new Firebase("https://adminoxxoparts.firebaseio.com/Oxxo/Shops/");

crud.on("child_added", function(snap) {
	
	$('#tabla').append(carga(snap.key(), snap.val()));

});



function carga() {
	
	var datos={};

    crud.orderByChild("CR").on('value',function(data){
    	
    	datos = data.val();
		var html = '';
		var btn_status = "";
          
        $.each(datos, function(id,values){

        	
				html += '<thead class="'+id+'">';
			    html += '<tr>';
			    html += '<th>Estatus</th>';
				html += '<th>Nombre</th>';
				html += '<th>CR</th>';
			    html += '<th>Cambiar estatus</th>';
			    html += '<th>Editar</th>';
			    html += '<th>Eliminar</th>';
			    html += '</tr>';
			    html += '</thead>';
			    
			    html += '<tbody class="'+id+'">';
			    html += '<tr>';

				if(values.Status == 1){

					status = '<span class="label bg-green">Activo</span>';
					btn_status = '<a onclick="s_car('+"'"+id+"'"+',2)" id="btn_'+id+'" style="cursor:pointer !important;"><i class="material-icons">block</i><br>Baja</a>';

				}else if(values.Status == 2){

					status = '<span class="label bg-red">Eliminado</span>';
					btn_status = '<a onclick="s_car('+"'"+id+"'"+',1)" id="btn_'+id+'" style="cursor:pointer !important;"><i class="material-icons">check_circle</i><br>Reactivar</a>';

				}

			    html += '<td>'+status+'</td>';
				html += '<td>'+values.Name+'</td>';
			    html += "<td>" + values.CR + "</td>";

				html += '<td>'+btn_status+'</td>';
			    html += '<td><a onclick="rd_car('+"'"+id+"'"+')" id="btn_'+id+'" data-toggle="modal" data-target="#myModal_n" style="cursor:pointer !important;"><i class="material-icons">create</i><br>Editar</a></td>';
			    html += '<td><a onclick="d_car('+"'"+id+"'"+')" id="btn_'+id+'" style="cursor:pointer !important;"><i class="material-icons">delete</i><br>Eliminar</a></td>';
			    html += '</tr>';
			    html += '</tbody>';

		});

		$("#tabla").html(html);
		$(".lazy").lazy();
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

function n_car(){
	
    if ($("#Name").val() != "" && $("#CR").val() != "" ) {
	  $("#btn_car").attr("disabled", "disabled");

      $("#btn_car").removeAttr("onclick");

      $.ajax({
        url: crud + ".json",
        type: "POST",
        data: JSON.stringify({
          Name: $("#Name").val(),
          CR: $("#CR").val(),
          Status: 1
        }),

        error: function() {},
        success: function() {
          $.toast({
            heading: "Registrado correctamente",
            showHideTransition: "slide",
            icon: "success"
          });

          $("#btn_car").removeAttr("disabled");
          $("#btn_car").attr("onclick", "n_car()");
          $("#car")[0].reset();
        }
      });
    } else {
      swal("Datos requeridos", "Favor de llenar el campo del mensaje", "error");
    }
}


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



function rd_car(id){

	$.ajax({
		url: crud +'/'+id+'.json',
		type: 'GET',
	
	error: function(){


	},success: function(data){
		
		$("#btn_car").attr("onclick",'rw('+"'"+id+"'"+')');
		$("#Name").val(data.Name);
		$("#CR").val(data.CR);
		$("#title_name").html('Editar tienda');

	}
	});

}

function rw(id){

	$("#btn_car").attr("disabled","disabled");

	$.ajax({
		url: crud +'/'+id+'.json',
		type: 'PATCH',
		data: JSON.stringify({
			Name: $('#Name').val(),
			CR: $('#CR').val()}),
	
	error: function(){


	},success: function(snap){

		$("#car")[0].reset();
		$("#btn_car").attr("onclick","n_car()");
		$("#btn_car").removeAttr("disabled");
		$("#title_name").html('Nueva tienda');

		
	}
	});

}

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

