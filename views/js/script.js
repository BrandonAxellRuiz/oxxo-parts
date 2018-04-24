/* =================================== lectura de notificacion ======================================== */

function l_noficacion(id){

    $.post('../views/bd/l_notificaciones.php',{

        id:id

    }, function(data, status){

        //console.log(data);
        if(data == 1){

            notificaciones();

        }else{

            swal('Error Interno','Lo sentimos no pudimo marcar como leida la cotizacion','error');

        }
    
    });

}

/* =================================== lectura de cotizacion ======================================== */

function l_cotizacion(id){

    $.post('../views/bd/l_cotizacion.php',{

        id:id

    }, function(data, status){

        //console.log(data);
        if(data == 1){

            cotizacion();

        }else{

            swal('Error Interno','Lo sentimos no pudimo marcar como leida la cotizacion','error');

        }
    
    });

}
/* ====================================== notificaciones ============================================== */


    function notificaciones(){
        
        $.ajax({

            url: '../views/bd/notificaciones.php',
            type: 'POST',

        beforeSend: function(){

        var loader = "";

            loader += '<div style="text-align:center">';
            loader += '<p align="center"><img src="../views/bootstrap-3.3.5-dist/req_con.gif"/></p>';
            loader += '<p class="red"><strong>Cargando Extintores del Norte...</strong></p>';
            loader += '</div>';

        
        $("#noti").html(loader);
        

        }, error : function(){

            swal('Error interno','Lo sentimos no pudimos cargar la informacion.','error');
           
            $("#noti").empty();

        }, success: function (data){
                
            //console.log(data);
            $("#noti").empty();

            var c_notifica = "";
            var notifica = "";
            var vendedor_n = "";
            var agenda = "";
            var tabla = "";
            var fila = 0;

            var datos = JSON.parse(data);

            for(i in datos){
            		
        		$("#c_noti").html(datos[i].c_tareas);

        		agenda = datos[i].vendedor;

        		//console.log(datos[i].c_tareas);
            	if( datos[i].c_tareas == null || datos[i].c_tareas == 0 || datos[i].c_tareas == '0'){


 			

            	}else{
            		
            	
            		
            		notifica += 'Tienes '+datos[i].c_tareas+' notificaciones sin revisar.';
            		
            		c_notifica += datos[i].c_tareas;

            	}

            	if(datos[i].vendedor_n == undefined || datos[i].vendedor_n == null){


            	}else{

            		vendedor_n += datos[i].vendedor_n;

            	}
            	



            	if(datos[i].vendedor == undefined || datos[i].clientes == undefined){


            	}else{


//console.log(datos[i].t_s);
            		if(datos[i].t_s == 1){

            			//console.log(1);

		                tabla += '<li class="active">';
		                tabla += '<a onclick="l_noficacion('+datos[i].tareas+')" href="../revisar_agenda/?b='+datos[i].vendedor+'&&t='+datos[i].tareas+'">';
		                tabla += '<div class="menu-info" >';
		                tabla += '<h4>'+datos[i].clientes+'</h4>';
		                tabla += '<p>'+datos[i].asunto+'</p>';
		                tabla += '<p>';
		                tabla += '<strong style="color:green"><i class="material-icons" style="color:green; font-weight:bold">access_time</i> '+datos[i].tiempo+'  | '+datos[i].fecha_min+' |  '+datos[i].fecha+'</strong>';
		                tabla += '</p>';
		                tabla += '</div>';
		                tabla += '</a>';
		                tabla += '</li><br>';
		                $("#noti_fo").html('<a lass=" waves-effect waves-block" href="../revisar_agenda/?b='+datos[i].vendedor+'">Ver todas</a>');
	            	
            		}else if(datos[i].t_s == 2){
            			

		                tabla += '<li class="active">';
		                tabla += '<a onclick="l_noficacion('+datos[i].tareas+')" href="../revisar_agenda/?b='+datos[i].vendedor+'&&t='+datos[i].tareas+'">';
		                tabla += '<div class="menu-info" >';
		                tabla += '<h4>'+datos[i].clientes+'</h4>';
		                tabla += '<p>'+datos[i].asunto+'</p>';
		                tabla += '<p>';
		                tabla += '<strong style="color:red"><i class="material-icons" style="color:red; font-weight:bold">access_time</i> '+datos[i].tiempo+'  | '+datos[i].fecha_min+' |  '+datos[i].fecha+'</strong>';
		                tabla += '</p>';
		                tabla += '</div>';
		                tabla += '</a>';
		                tabla += '</li><br>';
		                $("#noti_fo").html('<a lass=" waves-effect waves-block" href="../revisar_agenda/?b='+datos[i].vendedor+'">Ver todas</a>');
	            	
	            	}else if(datos[i].t_s == 3){

		                tabla += '<li>';
		                tabla += '<a onclick="l_noficacion('+datos[i].tareas+')" href="../revisar_agenda/?b='+datos[i].vendedor+'&&t='+datos[i].tareas+'">';
		                tabla += '<div class="menu-info">';
		                tabla += '<h4>'+datos[i].clientes+'</h4>';
		                tabla += '<p>'+datos[i].asunto+'</p>';
		                tabla += '<p>';
		                tabla += '<i class="material-icons">access_time</i> '+datos[i].tiempo+'  | '+datos[i].fecha_min+' |  '+datos[i].fecha+'';
		                tabla += '</p>';
		                tabla += '</div>';
		                tabla += '</a>';
		                tabla += '</li><br>';
		                $("#noti_fo").html('<a lass=" waves-effect waves-block" href="../revisar_agenda/?b='+datos[i].vendedor+'">Ver todas</a>');
	          
	            	}
	            }
	                
            }

                    	
			

			//console.log(c_notifica);

			if(c_notifica == null || c_notifica == undefined || c_notifica == "" || c_notifica == 0 || c_notifica == '0'){

				var tablas ='';
                tablas += '<li class="active">';
                tablas += '<a>';
                tablas += '<div class="icon-circle bg-light-green">';
                tablas += '<h4><strong>0</strong></h4>';
                tablas += '</div>';
                tablas += '<div class="menu-info" >';
                tablas += '<h2 style="font-weight:bold; align:center;width:100%; hight:auto"><strong>Sin notificaciones</strong></h2>';
                tablas += '</div>';
                tablas += '</a>';
                tablas += '</li><br>';
                $("#noti_fo").html('<a lass=" waves-effect waves-block">Ver agenda</a>');
        		$("#noti").html('<br>'+tablas);

			}else{

				$("#noti").html('<br>'+tabla);

				Push.Permission.request();

				Push.create(vendedor_n, {
			    body: notifica,
			    icon: '../views/images/extin_logo.jpg',
			    timeout: 15000,               // Timeout before notification closes automatically.
			    vibrate: [100, 100, 100],    // An array of vibration pulses for mobile devices.
			    onClick: function() {
			        // Callback for when the notification is clicked. 
			        //console.log(this);
			        location.href="../revisar_agenda/?b="+agenda+"";
			    }  
				});

			}

           	
            $(".btn.dropdown-toggle.btn-default").hide();
            $(".bootstrap-select").removeClass("btn-group form-control focused bootstrap-select");
           

        }

        });

    }

/* ======================================= cotizador ===================================================*/

    
function cotizacion(){
        
    $.ajax({

        url: '../views/bd/cotizador.php',
        type: 'POST',

    beforeSend: function(){

    var loader = "";

        loader += '<div style="text-align:center">';
        loader += '<p align="center"><img src="../views/bootstrap-3.3.5-dist/req_con.gif"/></p>';
        loader += '<p class="red"><strong>Cargando Extintores del Norte...</strong></p>';
        loader += '</div>';

    
    $("#cot").html(loader);
    

    }, error : function(){

        swal('Error interno','Lo sentimos no pudimos cargar la informacion.','error');
       
        $("#cot").empty();

    }, success: function (data){
            
        //console.log(data);
        $("#cot").empty();

        var c_notifica = "";
        var notifica = "";
        var agenda = "";
        var tabla = "";

        var datos = JSON.parse(data);

        for(i in datos){
                
            $("#c_cot").html(datos[i].c_cotizar);

            //console.log(datos[i].c_tareas);
            if(datos[i].c_cotizar == null || datos[i].c_cotizar == 0 || datos[i].c_cotizar == '0'){


        

            }else{
                
            
                
                notifica += 'Tienes '+datos[i].c_cotizar+' cotizaciones sin revisar.';
                
                c_notifica += datos[i].c_cotizar;

            }                


            if(datos[i].nombre == null || datos[i].nombre == undefined || datos[i].email == null || datos[i].email == undefined){

            }else{



                tabla += '<li class="active">';
                tabla += '<a onclick="l_cotizacion('+datos[i].id_cotizar+')" href="../revisar_cotizador/?b='+datos[i].id_cotizar+'" class="waves-effect waves-block">';
                tabla += '<div class="icon-circle bg-cyan">';
                tabla += '<i class="material-icons">add_shopping_cart</i>';
                tabla += '</div>';
                tabla += '<div class="menu-info">';
                tabla += '<h4 style="font-weight:bold;"><strong> &nbsp;&nbsp;&nbsp;'+datos[i].nombre+'</strong></h4>';
                tabla += '<p>';
                tabla += '&nbsp;&nbsp;&nbsp;<i class="material-icons">access_time</i> '+datos[i].fecha;
                tabla += '</p>';
                tabla += '</div>';
                tabla += '</a>';
                tabla += '</li>';
                $("#cot_fo").html('<a lass=" waves-effect waves-block" href="../cotizador/">Ver todas</a>');
            


            }
                
                
           
        }

                    
    

        if(c_notifica == null || c_notifica == undefined || c_notifica == "" || c_notifica == 0 || c_notifica == '0'){

            var tablas ='';
            tablas += '<li class="active">';
            tablas += '<a>';
            tablas += '<div class="icon-circle bg-light-green">';
            tablas += '<h4><strong>0</strong></h4>';
            tablas += '</div>';
            tablas += '<div class="menu-info" >';
            tablas += '<h2 style="font-weight:bold; align:center;width:100%; hight:auto"><strong>Sin notificaciones</strong></h2>';
            tablas += '</div>';
            tablas += '</a>';
            tablas += '</li><br>';
            $("#cot_fo").html('<a lass=" waves-effect waves-block">Ver cotizaciones</a>');
            $("#cot").html('<br>'+tablas);

        }else{

            $("#cot").html('<br>'+tabla);

            Push.Permission.request();

            Push.create('Cotizaciones', {
            body: notifica,
            icon: '../views/images/extin_logo.jpg',
            timeout: 15000,               // Timeout before notification closes automatically.
            vibrate: [100, 100, 100],    // An array of vibration pulses for mobile devices.
            onClick: function() {
                // Callback for when the notification is clicked. 
                //console.log(this);
                location.href="../cotizador/";

            }  
            });
        }  

    }
    });




}


 /* ================================================ entorno de carga =================================== */   
    $(document).ready(function(){
   		var refreshId = setInterval(notificaciones, 150000);
   	$.ajaxSetup({ cache: false });
 	});


    $( window ).on( "load", function() {
       notificaciones();
       cotizacion();
    });


    function cerra_s(){

        swal({
            title: "Estas a punto de finalizar sesión",
            text: "Se recomienda cerrar sesión para evitar que otros usuarios tengan acceso a sus datos, para poder volver a ver sus módulos, será necesario volver a iniciar sesión!",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Cerrar sesión!",
            cancelButtonText: "Cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
          },
          function(isConfirm) {
            
            if (isConfirm) {

                location.href='../../inc/logout.php';

            }else{
                        
                swal("Cancelado", "Tranquilo aun estas activo en el sistema.", "info");

            }
        });

    }