	const crud = new Firebase("https://adminoxxoparts.firebaseio.com/Oxxo/");

	const imgUser = localStorage.getItem("Image");
    const nameUser = localStorage.getItem("Name");
    const privUSer = localStorage.getItem("Priv");
	const emailUser = localStorage.getItem("Email"); 
	const Token = localStorage.getItem("TokenAccess");

	const date = new Date();
	const d = document;
	const c = console.log;
	const btn_car_send = d.getElementById('btn_car_send');

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

		if(localStorage.getItem("headerRequisition") === null || localStorage.getItem("headerRequisition") === undefined || localStorage.getItem("headerRequisition") === ""){
			
			$.ajax({
			url: crud.child('Requisitions')+".json",
			type: "POST",
			data: JSON.stringify({
				"Date_S": date.toJSON().slice(0, 10).replace(/-/g, '/'),
				"Users" : Token,
				"nameUser" : nameUser,
				"Status" : 2
			}),
			beforeSend: function(){

			}, error: function () {
				
			}, success: function(data){

				localStorage.setItem("headerRequisition", data.name);
				
				$("#headerRequisition").val(localStorage.getItem("headerRequisition"));	
	
			}
			});


		}else{

			$("#headerRequisition").val(localStorage.getItem("headerRequisition"));

		}
		

	}

	
const RequisitionsGenerate = new Firebase("https://adminoxxoparts.firebaseio.com/Oxxo/Requisitions/");

/* ================================================= Load to new child to Shops ================================================= */

	
crud.child('Shops').on("child_added", function(snap) {
	
	$('#tabla_moda').append(carga_shops(snap.key(), snap.val()));

});


crud.child('Shops').on('child_removed', function(snap){
	
	$("."+snap.key()).hide(2000);


});


crud.child('Shops').on("child_changed", function(snap) {
  
	var changedPost = snap;
  
});

function carga_shops() {
	
	var datos={};

	crud.child('Shops').on('value', function(data){

		datos = data.val();

		var Select = '<option value="">Seleccione CR</option>';
          
        $.each(datos, function(id,values){
			
			Select += '<option value="'+values.CR+'">'+values.Name+'</option>';	

		});
		
		return $(".Shops").html(Select);

    });

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
	
	if ($("#buscar").val() === ""){
		var buscar;
	}else{
		var buscar = $("#buscar").val();
		buscar = buscar.toLowerCase();
	} 
	
	var datos = {};

	crud.child("Parts").on('value', function (data) {
    
    	datos = data.val();
		var html = '';
		var btn_status = "";
		var any_find;
		var html_modal = "";
		var status_change = 1;
          
        $.each(datos, function(id,values){

			if(values.Status == 1){
				if (buscar === null || buscar === undefined || buscar === "") {
					
					html += '<thead class="'+id+'">';
					html += '<tr>';
					html += '<th>Estatus</th>';
					html += '<th>Nombre & Modelo</th>';
					html += '<th>Stock</th>';
					html += '<th style="padding-right:220px !important">CR</th>';
					html += "<th>Imagen</th>";
					html += '<th>Añadir al carrito</th>';
					html += '</tr>';
					html += '</thead>';
					
					html += '<tbody class="'+id+'">';
					html += '<tr>';
					
					var image = '\'' + values.Image +'\'';
					var name = "'" + values.Name + "'";
					var model = "'" + values.Model + "'";
					var description = "'" + values.Description + "'";
					var idData =  "'" + id + "'";

					status = '<span class="label bg-green">Activo</span>';
					if (values.Stock == 0 || values.Stock == null || values.Stock == undefined) {
						status = '<span class="label bg-orange">Sin existencia</span>';
						status_change = 2;
					}	
					
					btn_status = '<button class="btn btn-info" onclick="add_car(' + idData + "," + image + "," + name + "," + model + ', '+status_change+')" id="btn_' + id + '" style="cursor:pointer !important;"><i class="material-icons">add_shopping_cart</i></b>';

					html += '<td style="font-size:18px;">'+status+'</td>';
					html += '<td><p>'+values.Name+'</p><p><b>' + values.Model + '</b></p></td>';

					html += '<td><b>' + values.Stock + '</b></td>';
					
					html += '<td><div class="col-md-12 col-xs-12" ><div class="input-group" ><span class="input-group-addon" ><i class="material-icons" > store</i> </span> <div class="form-line" ><select class="form-control Shops" id="Shops' + id + '" style="width:100% !important;"></select></div> </div> </div></td>';
							
					if(values.Image == ""){
						html += '<td><h5>Articulo sin imagen</h5><br><div class="col-md-12 col-xs-12" ><div class="input-group" ><span class="input-group-addon" ><i class="material-icons" > format_list_numbered</i> </span> <div class="form-line" ><input type="number" min="1" value="1" id="quantity' + id + '" class="form-control validate" required placeholder="Cantidad "></div> </div> </div></td>';
					}else{
						html += '<td><a onclick="modal_ver(' + image + "," + name + "," + model + ', ' + description + ')" data-toggle="modal" data-target="#modal-ver" title="Ver imagen"><img data-src=' + values.Image + ' class="lazy" width="160px" alt="' + values.Model + '"><br></a><label for="quantity'+id+'"><b>Cantidad:</b></label><div class="col-md-12 col-xs-12" ><div class="input-group" ><span class="input-group-addon" ><i class="material-icons" > format_list_numbered</i> </span> <div class="form-line" ><input type="number" min="1" value="1" id="quantity' + id + '" class="form-control validate" required placeholder="Cantidad "></div> </div> </div></td>';
					}
					html += '<td>'+btn_status+'</td>';
					html += '</tr>';
					html += '</tbody>';
					
					//if (buscar === null || buscar === undefined || buscar === "") {

				} else {
				
					if (values.Name.toLowerCase().match(buscar)) {

						html += '<thead class="' + id + '">';
						html += '<tr>';
						html += '<th>Estatus</th>';
						html += '<th>Nombre & Modelo</th>';
						html += '<th>Stock</th>';
						html += '<th style="padding-right:220px !important">CR</th>';
						html += "<th>Imagen</th>";
						html += '<th>Añadir al carrito</th>';
						html += '</tr>';
						html += '</thead>';

						html += '<tbody class="' + id + '">';
						html += '<tr>';

						var image = '\'' + values.Image + '\'';
						var name = "'" + values.Name + "'";
						var model = "'" + values.Model + "'";
						var description = "'" + values.Description + "'";
						var idData = "'" + id + "'";

						if (values.Stock == 0 || values.Stock == null || values.Stock == undefined) {

							status = '<span class="label bg-orange">Sin existencia</span>';
							status_change = 2;

						}

						status = '<span class="label bg-green">Activo</span>';
						btn_status = '<button class="btn btn-info" onclick="add_car(' + idData + "," + image + "," + name + "," + model + ", " + status_change + ')" id="btn_' + id + '" style="cursor:pointer !important;"><i class="material-icons">add_shopping_cart</i></b>';

		

						html += '<td style="font-size:18px;">' + status + '</td>';
						html += '<td><p>' + values.Name + '</p><p><b>' + values.Model + '</b></p></td>';

						html += '<td><b>' + values.Stock + '</b></td>';

						html += '<td><div class="col-md-12 col-xs-12" ><div class="input-group" ><span class="input-group-addon" ><i class="material-icons" > store</i> </span> <div class="form-line" ><select class="form-control Shops" id="Shops' + id + '" style="width:100% !important;"></select></div> </div> </div></td>';

						if (values.Image == "") {
							html += '<td><h5>Articulo sin imagen</h5><br><div class="col-md-12 col-xs-12" ><div class="input-group" ><span class="input-group-addon" ><i class="material-icons" > format_list_numbered</i> </span> <div class="form-line" ><input type="number" min="1" value="1" id="quantity' + id + '" class="form-control validate" required placeholder="Cantidad "></div> </div> </div></td>';
						} else {
							html += '<td><a onclick="modal_ver(' + image + "," + name + "," + model + ', ' + description + ')" data-toggle="modal" data-target="#modal-ver" title="Ver imagen"><img data-src=' + values.Image + ' class="lazy" width="160px" alt="' + values.Model + '"><br></a><label for="quantity' + id + '"><b>Cantidad:</b></label><div class="col-md-12 col-xs-12" ><div class="input-group" ><span class="input-group-addon" ><i class="material-icons" > format_list_numbered</i> </span> <div class="form-line" ><input type="number" min="1" value="1" id="quantity' + id + '" class="form-control validate" required placeholder="Cantidad "></div> </div> </div></td>';
						}
						html += '<td>' + btn_status + '</td>';
						html += '</tr>';
						html += '</tbody>';

					}else{
						any_find = 0;
					}
				}
			}
			
		});

		if (any_find === null || any_find === undefined || any_find === "") {
			
		} else {
			html += '<h2 style="text-align:center !important;">No se encontraron coincidencias para <strong>"'+ buscar +'"</strong></h2>';
			
		}

		$("#tabla").html(html);
		//$('#modal_res_data').html(html_modal);

		$(".lazy").lazy();
		carga_shops();

    });

}



/* =================================== Load to new child Requisitions  ================================================= */

		
RequisitionsGenerate.on("child_added", function(snap) {
	
	$('#tabla_moda').html(carga_nuevo(snap.key(), snap.val()));

});


RequisitionsGenerate.child(localStorage.getItem("headerRequisition")).on('child_removed', function(snap){
	
	$("."+snap.key()).hide(2000);
	$.toast({
		    heading: 'Eliminado de la requisicion',
		    showHideTransition: 'slide',
		    icon: 'success'
	});

});


RequisitionsGenerate.on("child_changed", function(snap) {
  var changedPost = snap;
  
});



function carga_nuevo() {
	
	var datos={};

	RequisitionsGenerate.child(localStorage.getItem("headerRequisition")).on('value', function(data){
		
		
		datos = data.val();

		var html = 1;
		var fila = 0;

        $.each(datos, function(id,values){

			if(values.Quantity == undefined || values.Quantity == null || values.Quantity == ""){

			}else{
				
				html += "";
				var dataId = "'"+id+"'";
				var valId = "'"+values.Parts+"'";

				fila ++;
				html += '<thead class="cart_body'+id+'">';
				html += '<tr>';
		
				html += '<th>#</th>';
				html += "<th>Nombre</th>";
				html += '<th>Modelo</th>';
				html += '<th>CR</th>';
				html += "<th style='padding-right:60px !important'>Cantidad</th>";
				html += '<th>Eliminar</th>';
				html += '</tr>';
				html += '</thead>';
				
				html += '<td><p>'+fila+'</p></td>';
				html += '<td><p>'+values.namePart+'</p></td>';
				html += '<td><p>'+values.modelPart+'</p></td>';
				html += '<td><p>'+values.Shops+'</p></td>';
				html += '<td><div class="col-md-12 col-xs-12" ><div class="input-group" ><span class="input-group-addon" ><i class="material-icons" > format_list_numbered</i> </span> <div class="form-line" ><input type="number" class="form-control" id="i_change' + id + '" min="0" value="' + values.Quantity + '" onchange="rw_q(' + dataId + ')" placeholder="Cantidad" ></div> </div> </div></td>';
				html += '<td><button class="btn btn-danger" onclick="d_car('+dataId+', '+valId+')" title="Eliminar '+values.namePart+'"><i class="material-icons">remove_shopping_cart</i></button></td>';
				html += '</tr>';
				html += '</tbody>';
			
			}

		});
		if(html === 1){
			
			$("#loader_modal").show();
			$("#loader_modal").html('<h2 style="text-align:center !important;"><strong>Carrito vacio</strong></h2>');
			$("#tabla_modal").hide();
			$("#btn_car_send").hide();

		}else{

			$("#loader_modal").hide();
			$("#btn_car_send").show();
			$("#tabla_modal").show();
			$("#tabla_modal").html(html);

		}
		
		$(".c_noti").html(fila);
    });

}

function add_car(id, imagePart, namePart, modelPart, statusChange) {
  if (
    $("#Shops" + id).val() == "" ||
    d.getElementById("quantity" + id).value == "" ||
    d.getElementById("quantity" + id).value <= 0
  ) {
    swal(
      "Datos requeridos",
      "Favor de verificar que todos los campos esten llenos.",
      "warning"
    );
  } else {
    $("#btn_" + id).attr("disabled", "disabled");

    $.ajax({
      url: RequisitionsGenerate + "/" + $("#headerRequisition").val() + ".json",
      type: "POST",
      data: JSON.stringify({
        Parts: id,
        Date_S: date
          .toJSON()
          .slice(0, 10)
          .replace(/-/g, "/"),
        Users: Token,
        namePart: namePart,
        modelPart: modelPart,
        imagePart: imagePart,
        nameUser: nameUser,
        Quantity: d.getElementById("quantity" + id).value,
        Shops: $("#Shops" + id).val(),
        statusChange: statusChange
      }),
      beforeSend: function() {},
      error: function() {},
      success: function(data) {
        if (data === undefined || data === null || data === "") {
        } else {
          $("#Shops" + id).val("");
          d.getElementById("quantity" + id).value = "1";
          $("#btn_" + id).removeAttr("disabled");

          $.toast({
            heading: "Agregado a la requisicion",
            showHideTransition: "slide",
            icon: "success"
          });
        }
      }
    });
  }
}

function d_car(key, id){

    $("#btn_"+key).removeAttr("onclick");
	$.ajax({
		url: RequisitionsGenerate.child(localStorage.getItem("headerRequisition")) + "/" + key + ".json",
		type: "DELETE",
	error: function(){

	}, success: function(){

		$("."+id).show();
	    
	}
	});

   
}

function rw_q(id){

	if($("#i_change"+id).val() <= 0 || $("#i_change"+id).val() == undefined || $("#i_change"+id).val() == null || $("#i_change"+id).val() == 0 || $("#i_change"+id).val() == "" ){
	}else{

		$.ajax({
			url: RequisitionsGenerate.child(localStorage.getItem("headerRequisition")) +'/'+id+'.json',
			type: 'PATCH',
			data: JSON.stringify({
				"Quantity" : $("#i_change"+id).val()
			}),
		
		error: function(){

		},success: function(data){
			
			if( data === undefined ||  data === null ||  data === "" ){

			}else{

				$.toast({
					heading: 'Cantidad actualizada.',
					showHideTransition: 'slide',
					icon: 'success'
				});

			}
			
		}
		});
	}

}


function modal_ver(image, name, model, description) {

	$("#imagen_ver_modal").attr('src', image);
	//$("#name_ver_modal").html("<a href='https://www.google.com.mx/search?q="+name+"' target='_blank'><b style='font-size:25px;'>" + name + "</b></a>");
	//$("#model_ver_modal").html("<a href='https://www.google.com.mx/search?q=" + model + "' target='_blank'><b style='font-size:18px;'>" + model + "</b></a>");
	$("#modal_ver_description").html('<div style="text-align:center !important;  word-wrap: break-word !important;"><p style="font-size:15px;">' + description + "</p><br>");
	
}


/* =================================== end data =================================== */




btn_car_send.addEventListener('click', () =>{
	
	swal({
		title: 'Enviando requisicion...',
		text: 'En breve sera revisada y respondida la autorizacion de las piezas...',
		type: 'success',
		timer: 3000, 
		showCancelButton: false,
		showConfirmButton: false,
		closeOnConfirm: false,
		closeOnCancel: false,
		allowEscapeKey: false
		}, function () {

		localStorage.removeItem("headerRequisition");
		
		if(localStorage.getItem("headerRequisition") === undefined || localStorage.getItem("headerRequisition") === null || localStorage.getItem("headerRequisition") === ""){
			location.href = "../Requisitions/";
		}

	});

	

});
