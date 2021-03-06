

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

      document.getElementById("campoarchivo").addEventListener("change", function(evento) {
		  evento.preventDefault();
		$("#btn_car").hide();
      	$("#Image_text").show();
          var archivo = evento.target.files[0];
          subirArchivo(archivo);
		});
		
    }

   
    function subirArchivo(archivo) {
     
      var refStorage = storageService.ref('oxxo-parts').child(archivo.name);
      // Comienzo la tarea de upload
      var uploadTask = refStorage.put(archivo);

      
      uploadTask.on('state_changed', null,
        function(error){
          
        },
        function(){
         
          mensajeFinalizado(uploadTask.snapshot.downloadURL, uploadTask.snapshot.totalBytes);
         
        }
      );
    }

    
    function mensajeFinalizado(url, bytes) {

	  $("#Image").val(url);
	  if($("#Image").val() != ""){
		$("#btn_car").show();
		$("#Image_text").hide();
	  }
	  
     /* var elMensaje = document.getElementById('mensaje');
      var textoMensaje = '<p>Subido el archivo!';
      textoMensaje += '<br>Bytes subidos: ' + bytes;
      textoMensaje += '<br><a href="' + url + '">Ver el fichero</a></p>';
      elMensaje.innerHTML = textoMensaje;*/
	}
	


//const crud = new Firebase('https://backhome-16b56.firebaseio.com/car_status/'+$("#userID").val()+'');
const crud = new Firebase("https://adminoxxoparts.firebaseio.com/Oxxo/Parts/");

crud.on("child_added", function(snap) {
	
	$('#tabla').append(carga(snap.key(), snap.val()));

});



function carga() {
	
	var datos={};

    crud.orderByChild("model").on('value',function(data){
    	
    	datos = data.val();
		var html = '';
		var btn_status = "";
          
        $.each(datos, function(id,values){

        	
			html += '<thead class="'+id+'">';
			html += '<tr>';
			html += '<th>Estatus</th>';
			html += '<th>Nombre</th>';
			html += '<th>Modelo</th>';
			html += '<th>Descripcion</th>';
			html += '<th>Proveedor</th>';
			html += '<th>Stock</th>';
			html += "<th>Imagen</th>";
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
			

			if(values.Stock == 0){
				status = '<span class="label bg-orange">Sin Existencia</span>';
			}


			var image = '\'' + values.Image +'\'';
			var name = "'" + values.Name + "'";
			var model = "'" + values.Model + "'";
			
			html += '<td>'+status+'</td>';
			html += '<td><a href="https://www.google.com.mx/search?q=' + values.Name + '" target="_blank">'+values.Name+'</a></td>';
			html += "<td><a href='https://www.google.com.mx/search?q=" + values.Model + "' target='_blank'>" + values.Model + "</a></td>";
			html += '<td>'+values.Description+'</td>';
			html += '<td>'+values.Provider+'</td>';
			html += "<td><b>" + values.Stock + "</b></td>";
			if(values.Image == ""){
				html += '<td><h5>Articulo sin imagen</h5></td>';
			}else{
				html += '<td><a onclick="modal_ver(' + image + "," + name + "," + model + ')" data-toggle="modal" data-target="#modal-ver" title="Ver imagen"><img data-src=' + values.Image + ' class="lazy" width="160px" alt="' + values.Model + '"></td>';
			}
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
	
    if ($("#Name").val() != "" && $("#Model").val() != "" && $("#Description").val() != "" && $("#Provider").val() != "" && $("#Stock").val() != "") {
	  $("#btn_car").attr("disabled", "disabled");

      $("#btn_car").removeAttr("onclick");

      $.ajax({
        url: crud + ".json",
        type: "POST",
        data: JSON.stringify({
          Name: $("#Name").val(),
          Model: $("#Model").val(),
          Description: $("#Description").val(),
          Provider: $("#Provider").val(),
          Stock: $("#Stock").val(),
          Image: $("#Image").val(),
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
		$("#Model").val(data.Model);
		$("#Description").val(data.Description);
		$("#Provider").val(data.Provider);
		$("#Image").val(data.Image);
		$("#Stock").val(data.Stock);
		$("#title_name").html('Editar pieza');

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
			Model: $('#Model').val(),
			Description: $('#Description').val(),
			Provider: $("#Provider").val(),
			Image: $("#Image").val(),
			Stock: $("#Stock").val()}),
	
	error: function(){


	},success: function(snap){

		$("#car")[0].reset();
		$("#btn_car").attr("onclick","n_car()");
		$("#btn_car").removeAttr("disabled");
		$("#title_name").html('Nueva pieza');

		
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


function modal_ver(image, name, model) {

	
	$("#imagen_ver_modal").attr('src', image);
	$("#name_ver_modal").html("<a href='https://www.google.com.mx/search?q="+name+"' target='_blank'>" + name + "</a>");
	$("#model_ver_modal").html("<a href='https://www.google.com.mx/search?q=" + model + "' target='_blank'>" + model + "</a>");

	
}