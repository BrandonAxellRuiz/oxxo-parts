function btnc(){
$('#gc').show();
$('#gg').hide();
$('#myModalLabel').hide();
$('#myModalLabel2').show();

}




function limp(){
	     $("#matricula").val("");

$("#matricula").val("");
         $("#nombre").val("");
         $("#ap").val("");
         $("#am").val("");
		 $("#fecha_naci").val("");
		 $("#direccion").val("");
		 $("#colonia").val("");
		 $("#cp").val("");
		 $("#telefono").val("");
		 $("#celular").val("");
		 $("#correo").val("");
		 $("#correo1").val("");
		 $("#contrasena").val("");
		 $("#contrasena1").val("");
		 $("#nombre_emergencia").val("");
		 $("#telefono_emergencia").val("");
		 $("#celular_emergencia").val("");
			
}

function SendC(){
            if ($('#correo').val() != $('#correo1').val() ) {
			alert('No coinciden sus CORREOS.');
			$('#correo').focus();
			return false;
			
			}else if ($('#correo').val().length < 1) {
			alert('Debe introducir su CORREO.');
			$('#correo').focus();
			return false;
			
			}else if ($('#contrasena').val().length < 1) {
			alert('Debe introducir su CONTRASEÑA.');
			$('#contrasena').focus();
			return false;
			
			}else if ($('#contrasena').val() != $('#contrasena1').val() ) {
				alert('No coinciden sus CONTRASEÑAS.');
			$('#contrasena').focus();
			return false;
	
}
}
function Agregar() {
            var matricula = $("#matricula").val();
            var nombre = $("#nombre").val();
            var ap = $("#ap").val();
            var am = $("#am").val();
			var fecha_naci = $("#fecha_naci").val();
			var direccion = $("#direccion").val();
			var colonia = $("#colonia").val();
			var cp = $("#cp").val();
			var telefono = $("#telefono").val();
			var celular = $("#celular").val();
			var correo = $("#correo").val();
			var contrasena = $("#contrasena").val();
			var nombre_emergencia = $("#nombre_emergencia").val();
			var telefono_emergencia = $("#telefono_emergencia").val();
			var celular_emergencia = $("#celular_emergencia").val();
			var fecha_ingreso = $("#fecha_ingreso").val();
			var status = $("#status").val();
			var privilegio = $("#privilegio").val();  
 	
	//validacion vacios 
 $("#gg").show();
//alert($('#name').val().length);
		if ($('#matricula').val().length < 1) {
			alert('Debe introducir la MATRICULA.');
			$('#matricula').focus();
			return false;
		}else if ($('#nombre').val().length < 1) {
			alert('Debe introducir su NOMBRE.');
			$('#nombre').focus();
			return false;
			
		}else if ($('#ap').val().length < 1) {
			alert('Debe introducir su APELLIDO PATERNO.');
			$('#ap').focus();
			return false;
			
		
			}else if ($('#am').val().length < 1) {
			alert('Debe introducir su APELLIDO MATERNO.');
			$('#am').focus();
			return false;
			
			}else if ($('#fecha_naci').val().length < 1) {
			alert('Debe introducir su FECHA DE NACIMIENTO.');
			$('#fecha_naci').focus();
			return false;
			
			}else if ($('#direccion').val().length < 1) {
			alert('Debe introducir su DIRECCION Y NUMERO.');
			$('#direccion').focus();
			return false;
			
			}else if ($('#colonia').val().length < 1) {
			alert('Debe introducir su COLONIA.');
			$('#colonia').focus();
			return false;
			
			}else if ($('#cp').val().length < 1) {
			alert('Debe introducir su CODIGO POSTAL.');
			$('#cp').focus();
			return false;
			
			}else if ($('#telefono').val().length < 1) {
			alert('Debe introducir su telefono.');
			$('#telefono').focus();
			return false;
			
			}else if ($('#celular').val().length < 1) {
			alert('Debe introducir su CELULAR.');
			$('#celular').focus();
			return false;
			
			}else if ($('#correo').val()!= $('#correo1').val() ) {
				alert('No coinciden sus CORREOS.');
			$('#correo').focus();
			return false;
			
			}else if ($('#correo').val().length < 1) {
			alert('Debe introducir su CORREO.');
			$('#correo').focus();
			return false;
			
			
			}else if ($('#contrasena').val().length < 1) {
			alert('Debe introducir su CONTRASEÑA.');
			$('#contrasena').focus();
			$('#contrasena').css('color','red');
			return false;
			
			}else if ($('#contrasena').val() != $('#contrasena1').val() ) {
				alert('No coinciden sus CONTRASEÑAS.');
			$('#contrasena').focus();
			return false;
			
			}else if ($('#nombre_emergencia').val().length < 1) {
			alert('Debe introducir EL NOMBRE DEL CONTACTO DE EMERGENCIA.');
			$('#nombre_emergencia').focus();
			return false;
			
			}else if ($('#telefono_emergencia').val().length < 1) {
			alert('Debe introducir EL TELEFONO DEL CONTACTO DE EMERGENCIA.');
			$('#telefono_emergencia').focus();
			return false;
			
			}else if ($('#celular_emergencia').val().length < 1) {
			alert('Debe introducir EL CELULAR DEL CONTACTO DE EMERGENCIA.');
			$('#celular_emergencia').focus();
			return false;
			
					}else{
    // get valores
	
         
    // agrego 
    $.post("bd/na.php", {
		    matricula:matricula,
            nombre:nombre,
            ap:ap,
            am:am,
			fecha_naci:fecha_naci,
			direccion:direccion,
			colonia:colonia,
			cp:cp,
			telefono:telefono,
			celular:celular,
			correo:correo,
			contrasena:contrasena,
			nombre_emergencia:nombre_emergencia,
			telefono_emergencia:telefono_emergencia,
			celular_emergencia:celular_emergencia,
			fecha_ingreso:fecha_ingreso,
			status:status,
			privilegio:privilegio
    }, 
	 function (data, status) {
        // cierro modal
	
if(data == 1){
							$('#res').html("Datos insertados correctamente.");
							$('#res').css('color','green');
						}
						else if(data == 2){
							$('#res').html("Ha ocurrido un error.");
							$('#res').css('color','red');
						}
limp();
        $("#add_new_record_modal").modal("hide");
        // leo para los cambios en la bd
       DatosTabla();

        // limpio el formulario modal
         
    });
}
}
	
// leo tabla
function DatosTabla() {
 //var consulta;

 $.get("bd/ra.php", {}, function (data, status) {
        $("#resultado").html(data);
    });
	
    
}



function Eliminar(id) {
    var conf = confirm("Estas Seguro De Eliminar El Registro?");
    if (conf == true) {
        $.post("bd/eas.php", {
                id: id
            },
            function (data, status) {
                // leo la tabla
            
			  if(data == 1){
							$('#res').html("Eliminado Correctmente");
							$('#res').css('color','green');
						}
						
						else if(data == 2){
							$('#res').html("Ha ocurrido un error.");
							$('#res').css('color','red');
						}
  DatosTabla();
            }
        );
    }
}
function Reactivar(id) {
    var conf = confirm("Estas Seguro De Reactivar El Registro?");
    if (conf == true) {
        $.post("bd/reas.php", {
                id: id
            },
            function (data, status) {
                // leo la tabla
            
			  if(data == 1){
							$('#res').html("Reactivado Correctamente");
							$('#res').css('color','green');
						}
						
						else if(data == 2){
							$('#res').html("Ha ocurrido un error.");
							$('#res').css('color','red');
						}
  DatosTabla();
            }
        );
    }
}



function ObtenerId(id) {
    // input oculto con el id para guardar la informacion a ese id
    $("#hidden_user_id").val(id);
    $.post("bd/rda.php", {
            id:id	
        },
        function (data, status) {
            // PARSE json enocde
            var alumno = JSON.parse(data);
            // asigno los valores que corresponde al id
           // alert(JSON.parse(alumno));
		   $("#matricula").val(alumno.matricula);
			$("#nombre").val(alumno.nombre);
            $("#ap").val(alumno.ap);
            $("#am").val(alumno.am);
			$("#fecha_naci").val(alumno.fecha_naci);
			$("#direccion").val(alumno.direccion);
			$("#colonia").val(alumno.colonia);
			$("#cp").val(alumno.cp);
			$("#telefono").val(alumno.telefono);
			$("#celular").val(alumno.celular);
			$("#correo").val(alumno.correo);
			$("#correo1").val(alumno.correo);
			$("#contrasena").val(alumno.contrasena);
			$("#contrasena1").val(alumno.contrasena);
			$("#nombre_emergencia").val(alumno.nombre_emergencia);
			$("#telefono_emergencia").val(alumno.telefono_emergencia);
			$("#celular_emergencia").val(alumno.celular_emergencia);
			$("#fecha_ingreso").val(alumno.fecha_ingreso);
        }
    );
    // abro el modal con la informacion
  $("#add_new_record_modal").modal("show");
  }

function Actualizar() {
    
		//validacion vacios 

//alert($('#name').val().length);
       	if ($('#matricula').val().length < 1) {
			alert('Debe introducir la MATRICULA.');
			$('#matricula').focus();
			return false;
		}else if ($('#nombre').val().length < 1) {
			alert('Debe introducir su NOMBRE.');
			$('#nombre').focus();
			return false;
			
		}else if ($('#ap').val().length < 1) {
			alert('Debe introducir su APELLIDO PATERNO.');
			$('#ap').focus();
			return false;
			
		
			}else if ($('#am').val().length < 1) {
			alert('Debe introducir su APELLIDO MATERNO.');
			$('#am').focus();
			return false;
			
			}else if ($('#fecha_naci').val().length < 1) {
			alert('Debe introducir su FECHA DE NACIMIENTO.');
			$('#fecha_naci').focus();
			return false;
			
			}else if ($('#direccion').val().length < 1) {
			alert('Debe introducir su DIRECCION Y NUMERO.');
			$('#direccion').focus();
			return false;
			
			}else if ($('#colonia').val().length < 1) {
			alert('Debe introducir su COLONIA.');
			$('#colonia').focus();
			return false;
			
			}else if ($('#cp').val().length < 1) {
			alert('Debe introducir su CODIGO POSTAL.');
			$('#cp').focus();
			return false;
			
			}else if ($('#telefono').val().length < 1) {
			alert('Debe introducir su telefono.');
			$('#telefono').focus();
			return false;
			
			}else if ($('#celular').val().length < 1) {
			alert('Debe introducir su CELULAR.');
			$('#celular').focus();
			return false;
			
			}else if ($('#correo').val() != $('#correo1').val() ) {
				alert('No coinciden sus CORREOS.');
			$('#correo').focus();
			return false;
			
			}else if ($('#correo').val().length < 1) {
			alert('Debe introducir su CORREO.');
			$('#correo').focus();
			return false;
			
			}else if ($('#contrasena').val().length < 1) {
			alert('Debe introducir su CONTRASEÑA.');
			$('#contrasena').focus();
			return false;
			
			}else if ($('#contrasena').val() != $('#contrasena1').val() ) {
				alert('No coinciden sus CONTRASEÑAS.');
			$('#contrasena').focus();
			return false;
			
			}else if ($('#nombre_emergencia').val().length < 1) {
			alert('Debe introducir EL NOMBRE DEL CONTACTO DE EMERGENCIA.');
			$('#nombre_emergencia').focus();
			return false;
			
			}else if ($('#telefono_emergencia').val().length < 1) {
			alert('Debe introducir EL TELEFONO DEL CONTACTO DE EMERGENCIA.');
			$('#telefono_emergencia').focus();
			return false;
			
			}else if ($('#celular_emergencia').val().length < 1) {
			alert('Debe introducir EL CELULAR DEL CONTACTO DE EMERGENCIA.');
			$('#celular_emergencia').focus();
			return false;
			
					}else{

	// get values
	        var matricula = $("#matricula").val();
            var nombre = $("#nombre").val();
            var ap = $("#ap").val();
            var am = $("#am").val();
			var fecha_naci = $("#fecha_naci").val();
			var direccion = $("#direccion").val();
			var colonia = $("#colonia").val();
			var cp = $("#cp").val();
			var telefono = $("#telefono").val();
			var celular = $("#celular").val();
			var correo = $("#correo").val();
			var contrasena = $("#contrasena").val();
			var nombre_emergencia = $("#nombre_emergencia").val();
			var telefono_emergencia = $("#telefono_emergencia").val();
			var celular_emergencia = $("#celular_emergencia").val();
			var fecha_ingreso = $("#fecha_ingreso").val();


    // oculto el id
    var id = $("#hidden_user_id").val();

    // informacin a enviar con var
    $.post("bd/ada.php", {
            id:id,
			matricula:matricula,
            nombre:nombre,
            ap:ap,
            am:am,
			fecha_naci:fecha_naci,
			direccion:direccion,
			colonia:colonia,
			cp:cp,
			telefono:telefono,
			celular:celular,
			correo:correo,
			contrasena:contrasena,
			nombre_emergencia:nombre_emergencia,
			telefono_emergencia:telefono_emergencia,
			celular_emergencia:celular_emergencia,
			fecha_ingreso:fecha_ingreso
        },
					
        function (data, status) {
            // oculto modal despues de actualizar
            $("#update_user_modal").modal("hide");
			if(data == 1){
							$('#res').html("Datos Actualizados Correctamente.");
							$('#res').css('color','green');
						}
						else{
							$('#res').html("Ha ocurrido un error.");
							$('#res').css('color','red');
 						}
                        limp();
            // reload Users by using readRecords();
			        $("#add_new_record_modal").modal("hide");

        DatosTabla();
		
        }
 
					);
					//FIN VALIDACIONES
					}
}

$(document).ready(function () {
    // leo los datos siempre
    DatosTabla(); 
	// funcion leer
	
                                                           

});