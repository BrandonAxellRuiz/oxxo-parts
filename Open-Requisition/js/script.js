	const crud = new Firebase("https://adminoxxoparts.firebaseio.com/Oxxo/Requisitions/");
	const parts = new Firebase("https://adminoxxoparts.firebaseio.com/Oxxo/Parts/");
	const url_get = localStorage.getItem("open_requisition");
	

	const imgUser = localStorage.getItem("Image");
    const nameUser = localStorage.getItem("Name");
    const privUSer = localStorage.getItem("Priv");
	const emailUser = localStorage.getItem("Email"); 
	const Token = localStorage.getItem("TokenAccess");

	const date = new Date();
	const d = document;
	const c = console.log;
	const btn_car_send = d.getElementById('btn_car_send');

	const acept = d.getElementById("acept");
	const decline = d.getElementById("decline");
	

    window.onload = function() {
		
		if (privUSer == 1) {

			$(".user").hide();
			
		} else if (privUSer == 2) {

			$(".admin").hide();
			$("#decline").hide();
            $("#acept").hide();
		

		}else{
	
			window.localStorage.clear();
			location.href = "../";

        }


		$("#imgUser").attr("src",imgUser);
		$("#nameUser").html(nameUser);
		$("#emailUser").html(emailUser);

	}



crud.child(url_get).on("child_added", function(snap) {

	$('#tabla').append(carga(snap.key(), snap.val()));

});


crud.on('child_removed', function(snap){
	
	$("."+snap.key()).hide(2000);

});


crud.child(url_get).on("child_changed", function(snap) {
 // c(snap.val());
  if (localStorage.getItem("fin") === null || localStorage.getItem("fin") === undefined || localStorage.getItem("fin") === ""){

  } else {

	if ($("#statusFinal").val() == "1") {
		var statusFinals = 4;
	} else {
		var statusFinals = 1;
	}
	$.ajax({
			url: crud.child(url_get) + ".json",
			type: "PATCH",
			data: JSON.stringify({ Status: statusFinals }),
		success(data) {
			localStorage.removeItem("fin");
			swal({
				title: "Requisicion aceptada!",
				text: ".",
				type: "success",
				showCancelButton: false,
				showConfirmButton: false,
				timer: 4000,
				allowEscapeKey: false
			},
			function() {
				location.href = "../Requisitions";
			});
		}
	});
  }
  
 
 
});


function carga() {

	var datos = {};

	crud.child(url_get).on('value', function (data) {
    
    	datos = data.val();
		var html = '';
		var btn_status = "";
		var any_find;
		var html_modal = "";
		var fila = 0;
		var statusState = [];

          
        $.each(datos, function(id,values){

			if (values.namePart === undefined || values.namePart === null){

			}else{

				fila ++;
				html += '<input class="Have" value="' + id + ','+values.statusChange+','+values.Parts+','+values.Quantity+'" type="hidden" readonly/>';
				html += '<thead class="' + id + '">';
				html += '<tr>';
				html += '<th>Estatus</th>';
				html += '<th>Nombre & Modelo</th>';
				html += '<th style="padding-right:220px !important">CR</th>';
				html += "<th>Imagen</th>";
				html += '</tr>';
				html += '</thead>';
				
				html += '<tbody class="'+id+'">';
				html += '<tr>';

				if(values.statusChange === 1){
					
					status = '<span class="label bg-green">Activo</span> ';

				}else if(values.statusChange === 2){

					status = '<span class="label bg-orange">Sin existencia</span> ';

				}else if(values.statusChange === 3){

					status = '<span class="label bg-blue">Entregado</span>';

				}else if(values.statusChange === 4){

					status = '<span class="label bg-red">Pendiente</span>';

				
				}else if(values.statusChange === 5){

					status = '<span class="label bg-black">Declinada</span>';

				}else if(values.statusChange === 6){

					status = '<span class="label bg-red">Pendiente</span><br><span class="label bg-green">Activo</span> ';
				}
				
				html += '<td style="font-size:18px;">'+status+'</td>';
				html += '<td><p>'+values.namePart+'</p><p><b>' + values.modelPart + '</b></p></td>';
				
				html += '<td><div class="col-md-12 col-xs-12" ><div class="input-group" ><span class="input-group-addon" ><i class="material-icons" > store</i> </span> <div class="form-line" ><p>'+values.Shops+'</p></div> </div> </div></td>';
						
				if(values.imagePart == ""){
					html += '<td><h5>Articulo sin imagen</h5><br><div class="col-md-12 col-xs-12" ><div class="input-group" ><span class="input-group-addon" ><i class="material-icons" > format_list_numbered</i> </span> <div class="form-line" style="padding-top: 10px;">' + values.Quantity + "</div> </div> </div></td>";
				}else{
					html += '<td><img data-src=' + values.imagePart + ' class="lazy" width="160px" alt="' + values.modelPart + '"><br><label for="quantity'+id+'"><b>Cantidad:</b></label><div class="col-md-12 col-xs-12" ><div class="input-group" ><span class="input-group-addon" ><i class="material-icons" > format_list_numbered</i> </span> <div class="form-line" style="padding-top: 10px;">'+values.Quantity+'</div> </div> </div></td>';
				}
				html += '<td>'+btn_status+'</td>';
				html += '</tr>';
				html += '</tbody>';

			}						
			
		});

		$("#tabla").html(html);
		$(".c_noti").html(fila);
		$(".lazy").lazy();
	
	});
}

parts.on('value', snap =>{
	var datos = {};
	datos = snap.val();
	$.each(datos, function (key, values) {
		$(".Have").each(function(){

			var values_array = $(this).val();
			var new_values = values_array.split(',');

			if (values.Stock > 0 && key === new_values[2] && new_values[1] == 2 ) {
				if (new_values[1] == 1) {
				}else{
				
					$.ajax({
						url: crud.child(url_get) + "/" + new_values[0] + "/.json",
						type: "PATCH",
						data: JSON.stringify({
						statusChange: 1
						}),
					success(data) {
					//c(1);
					}
					});
				}

			}else if (values.Stock <= 0 && key === new_values[2] && new_values[1] == 1) {
              if (new_values[1] == 2) {
              } else {
                $.ajax({
                  url:
                    crud.child(url_get) +
                    "/" +
                    new_values[0] +
                    "/.json",
                  type: "PATCH",
                  data: JSON.stringify({
                    statusChange: 2
                  }),
                  success(data) {
                    //c(0);
                  }
                });
              }
            } else if (values.Stock > 0 && key === new_values[2] && new_values[1] == 4 ) {
				if (new_values[1] == 1) {
				}else{
				
					$.ajax({
						url: crud.child(url_get) + "/" + new_values[0] + "/.json",
						type: "PATCH",
						data: JSON.stringify({
						statusChange: 6
						}),
					success(data) {
					//c(1);
					}
					});
				}
			}

		});
		
	});
});


acept.addEventListener("click", () => {
	var fila = 0;
	$("#acept").hide();
	$("#decline").hide();
	$(".Have").each(function(){
		fila ++;
		var values_array = $(this).val();
		var new_values = values_array.split(',');

		if (new_values[1] == 2){
			var newStatus = 4;
			$("#statusFinal").val(1);
		} else if(new_values[1] == 3){
		}else{
			var newStatus = 3;
			$.ajax({
				url: parts+ "/"+new_values[2]+"/Stock/.json",
				type: "GET",
			success(data) {
				if (parseFloat(new_values[3]) > parseFloat(data)){
					//c(parseFloat(new_values[3]) - parseFloat(data));
					var newStatus = 4;
                    $("#statusFinal").val(1);	
					var restQuantity = ((new_values[3]) - parseFloat(data));
						$.ajax({
							url: crud.child(url_get) + "/" + new_values[0] + ".json",
							type: "PATCH",
							data: JSON.stringify({ Quantity: restQuantity, statusChange: 4 }),
						success(data) {
							//c(data);
							$("#statusFinal").val(1);	
						}
						});

					$.ajax({
						url: parts + "/" + new_values[2] + ".json",
						type: "PATCH",
						data: JSON.stringify({ Stock: 0}),
						success(data) {
						}
					});

				}else{
					var restQuantity = parseFloat(data) - new_values[3];
					$.ajax({
						url: parts + "/" + new_values[2] + ".json",
						type: "PATCH",
						data: JSON.stringify({ Stock: restQuantity }),
						success(data) {
						//c(data);
						}
					});
				}
			}
			});
		}
		if(new_values[1] == 3){

		}else{

			$.ajax({
				url: crud.child(url_get) + "/" + new_values[0] + ".json",
				type: "PATCH",
				data: JSON.stringify({statusChange: newStatus}),
			success(data) {
			}
			});

		}
		  

  });
 if(fila > 0){
   localStorage.setItem('fin', 1);
}
   
   


});


decline.addEventListener("click", () => {
	$("#acept").hide();
  $("#decline").hide();

	$(".Have").each(function() {
    var values_array = $(this).val();
    var new_values = values_array.split(",");

    $.ajax({
      url: crud.child(url_get) + "/" + new_values[0] + ".json",
      type: "PATCH",
      data: JSON.stringify({ statusChange: 5 }),
      success(data) {
        //c(data);
      }
    });
  });
  $.ajax({
    url: crud.child(url_get) + ".json",
    type: "PATCH",
    data: JSON.stringify({
      Status: 3
    }),
    success(data) {
		swal(
      {
        title: "Requisicion declinada!",
        text: ".",
        type: "warning",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 4000,
        allowEscapeKey: false
      },
      function() {
        location.href = "../Requisitions";
      }
    );
    }
  });
});
