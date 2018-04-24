<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
<script type="text/javascript" src="../css y javascript/jquery-3.2.1.min.js"></script>
<html lang="en"> 
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<head>
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
/* The Modal (background) */
.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 0;
    border: 1px solid #888;
    width: 80%;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s
}

/* Add Animation */
@-webkit-keyframes animatetop {
    from {top:-300px; opacity:0} 
    to {top:0; opacity:1}
}

@keyframes animatetop {
    from {top:-300px; opacity:0}
    to {top:0; opacity:1}
}

/* The Close Button */
.close {
    color: white;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}

.modal-header {
    padding: 2px 16px;
    background-color: #000;
    color: white;
}

.modal-body {padding: 2px 16px;}

.modal-footer {
    padding: 2px 16px;
  
    color: black;
}
</style>
<style>
.search-form .form-group {
  float: right !important;
  transition: all 0.35s, border-radius 0s;
  width: 32px;
  height: 32px;
  background-color: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;
  border-radius: 25px;
  border: 1px solid #ccc;
}
.search-form .form-group input.form-control {
  padding-right: 20px;
  border: 0 none;
  background: transparent;
  box-shadow: none;
  display:block;
}
.search-form .form-group input.form-control::-webkit-input-placeholder {
  display: none;
}
.search-form .form-group input.form-control:-moz-placeholder {
  /* Firefox 18- */
  display: none;
}
.search-form .form-group input.form-control::-moz-placeholder {
  /* Firefox 19+ */
  display: none;
}
.search-form .form-group input.form-control:-ms-input-placeholder {
  display: none;
}
.search-form .form-group:hover,
.search-form .form-group.hover {
  width: 50%;
  border-radius: 5px 25px 25px 5px;
}
.search-form .form-group span.form-control-feedback {
  position: absolute;
  top: -1px;
  right: -2px;
  z-index: 2;
  display: block;
  width: 34px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  color: #3596e0;
  left: initial;
  font-size: 14px;
}

</style>
    <meta charset="UTF-8">
    <title>Alumnos</title>

    <!-- Bootstrap CSS File  -->
    <link rel="stylesheet" type="text/css" href="bootstrap-3.3.5-dist/css/bootstrap.css"/>
</head>
<body>

<!-- Content Section -->
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <h1>Alumnos</h1>
        </div>
    </div>
    
    <div class="row">
        <div class="col-md-12">
            <div class="pull-right">
                <button class="btn btn btn-info" onClick="$('#gc').hide(); $('#gg').show(); $('#myModalLabel').show();$('#myModalLabel2').hide(); limp();" data-toggle="modal" data-target="#add_new_record_modal"><span class="glyphicon glyphicon-plus"></span> NUEVO</button>
            </div>
        </div>
    </div>
     
    
    <div class="row">
        <div class="col-md-12">
            <h3>Registros:</h3>
            <!-- Bootstrap resultado 1 o 2 -->
<div ><strong id="res"></strong></div>
 <!-- Bootstrap resultado 1 o 2 -->
 
 
 
 
  <!-- Bootstrap busqueda -->
  <div id="resultad"></div>
<div class="col-md-4 col-md-offset-3" align="center">
            <form  class="search-form">
                <div class="form-group has-feedback" align="center">
            		<label for="search" class="sr-only">Buscar...</label>
            		<input type="text" class="form-control w3-btn w3-animate-zoom " title="serch" placeholder="Buscar..." id="valorCaja1">
              		<span class="glyphicon glyphicon-search form-control-feedback "></span>
            	</div>
                </form>
                 </div>
                   <!-- Bootstrap busqueda -->

        </div>
    </div>
</div>
<!-- /Content resultado -->
<div id="resultado"></div>
  <!-- Bootstrap resultado -->


<!-- Bootstrap Modals -->


<!-- Modal - nuevo -->
<div class="modal fade" id="add_new_record_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header" style=" background-color:#06C">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick="$('#gc').show(); $('#gg').hide(); limp(); " style="color:#FFF"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel" ><span class="glyphicon glyphicon-plus"></span> Nuevo Registro</h4>
                 <h4 class="modal-title" id="myModalLabel2" style="display:none"><span class="glyphicon glyphicon-edit"></span> Actualizar Registro</h4>

            </div><form id="my-form">
            <div class="modal-body">
<div class="form-group" >
                    <label for="matricula" id="resultados" style="display:none"></label>       <label for="matricula" id="resultador">Matricula</label>
                    <input type="text" id="matricula" name="matricula" placeholder="Matricula" required   class="form-control"/>
                    
                </div>
                
                <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <input type="text" id="nombre"  name="nombre" placeholder="Nombre" required onKeyPress="return soloLetras(event)"  class="form-control"/>
                </div>

                <div class="form-group">
                    <label for="last_name">Apellido Paterno</label>
                    <input type="text" id="ap" name="ap" placeholder="Apellido Paterno" required onKeyPress="return soloLetras(event)"  class="form-control"/>
                </div>

                <div class="form-group">
                    <label for="am">Apellido Materno</label>
                    <input type="text" id="am" name="am" placeholder="Apellido Materno" onKeyPress="return soloLetras(event)"  required class="form-control"/>
                </div>
                
                <div class="form-group">
                    <label for="fecha_naci">Fecha Nacimiento</label>
                    <input type="date" id="fecha_naci" name="fecha_naci" placeholder="2017/01/01"  required class="form-control"/>
                </div>
                
                <div class="form-group">
                    <label for="direccion">Direccion</label>
                    <input type="text" id="direccion" name="direccion" placeholder="Direccion #Numero"  required class="form-control"/>
                </div>
                
                <div class="form-group">
                    <label for="colonia">Colonia</label>
                    <input type="text" id="colonia" name="colonia" placeholder="Colonia"  required class="form-control"/>
                    </div>
                    
                    <div class="form-group">
                    <label for="cp">Codigo Postal</label>
                    <input type="tel" id="cp" name="cp" placeholder="Codigo Postal" maxlength="5" onKeyPress="return soloNumeros(event)" min="0"   required class="form-control"/>
                
                </div>

          <div class="form-group">
                    <label for="telefono">Telefono</label>
                    <input type="tel" id="telefono"  name="telefono"  placeholder="8781158451" onKeyPress="return soloNumeros(event)"   maxlength="10" required class="form-control"/>
                </div>
                
                 <div class="form-group">
                    <label for="celular">Celular</label>
                    <input type="tel" id="celular" name="celular" placeholder="8781158785" onKeyPress="return soloNumeros(event)"  maxlength="10" required class="form-control"/>
                </div>
                
                 <div class="form-group">
                    <label for="correo">Correo</label>
                    <input type="email" id="correo" name="correo" placeholder="ejemplo_correo@dominio.com"  required class="form-control" /></div>
                       <div class="form-group">
                
                    <input type="email" id="correo1" name="correo1" placeholder="Confirmar Correo"  required class="form-control"/>
                </div>
               

   
   <div class="form-group"> 
    <label for="nombre_emergencia">Contraseña</label> <button type="button" class="btn btn-default btn-sm" id="show-pass" >
          <span class=" glyphicon glyphicon-eye-open"></span></button> </div> 
          
            <div class="form-group"> 
            <input type="password" name="contrasena" id="contrasena"  placeholder="Contraseña"  required class="form-control"/></div>
                    
                  
        <div class="form-group">
                    <input type="password" id="contrasena1" name="contrasena1" placeholder="Confirmar Contraseña" required class="form-control"  />   </div>
                    
                        <div class="form-group">
                    <label for="nombre_emergencia">Nombre De Contacto De Emergencia</label>
                    <input type="text" id="nombre_emergencia" name="nombre_emergencia" placeholder="Nombre De Contacto De Emergencia" onKeyPress="return soloLetras(event)" required class="form-control"/>
                </div>
                  <div class="form-group">
                    <label for="telefono_emergencia">Telefono De Contacto De Emergencia</label>
                    <input type="tel" id="telefono_emergencia" name="telefono_emergencia" onKeyPress="return soloNumeros(event)" placeholder="Telefono De Contacto De Emergencia"  maxlength="10"  required class="form-control"/>
                </div>
                
                  <div class="form-group">
                    <label for="celular_emergencia">Celular De Contacto De Emergencia</label>
                    <input type="tel" id="celular_emergencia" name="celular_emergencia" placeholder="Celular De Contacto De Emergencia" onKeyPress="return soloNumeros(event)"  maxlength="10" required class="form-control"/>
                </div>
                    <input type="text" id="fecha_ingreso" name="fecha_ingreso" value="<?php echo date('Y/m/d');?>"  required class="form-control" readonly  style="display: none;"  />
                    
                     <input type="text" id="status" name="status" value="activo"  required class="form-control" readonly  style="display: none;"  /> 
                     
                     <input type="text" id="privilegio" name="privilegio" value="alumno"  required class="form-control" readonly  style="display: none;"  />
                    
                
                
                
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal" onClick="$('#gc').show(); $('#gg').hide(); limp(); "><span class="glyphicon glyphicon-remove"></span> Cancelar</button>
                                <button class="btn btn-primary" id="gg" type="submit" style="display: none;"  ><span class="glyphicon glyphicon-floppy-disk"></span> Guardar</span></button>
 <button type="button" class="btn btn-primary" onClick="Actualizar();"  id="gc"><span class="glyphicon glyphicon-floppy-disk"></span> Guardar </button>
                <input type="hidden" id="hidden_user_id" name="hidden_user_id" >
                  

              <!--  <button type="button" class="btn btn-primary" id="masn" disabled='true' onClick="Agregar();" style="display: none;">Guardar</button>--->

</div>
        </div>
    </div>
</div>
</form>
<!-- // Modal -->








<!-- Jquery JS file -->

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
         <script>                                                                  
        $(document).ready(function(){
                   			                
        var consulta;
                                                                          
         //hacemos focus al campo de búsqueda
        $("#valorCaja1").focus();
                                                                                                    
        //comprobamos si se pulsa una tecla
        $("#valorCaja1").keyup(function(e){
                                     
              //obtenemos el texto introducido en el campo de búsqueda
              consulta = $("#valorCaja1").val();
                                                                      
              //hace la búsqueda
                                                
              $.ajax({
                    type: "POST",
                    url: "bd/ra.php",
                    data: "valorCaja1="+consulta,
                    dataType: "html",
                    beforeSend: function(){
                          //imagen de carga
                          $("#resultado").html("<p align='center'><img src='bootstrap-3.3.5-dist/loading.gif' /></p>");
                },
                    error: function(){
                          alert("error al buscar");
                    },
                    success: function(data){                                                    
                          $("#resultado").empty();
                          $("#resultado").append(data);
                                                             
                    }
              });
                                                                                  
            });
                                                                   
});
$(document).ready(function () {
   $('#show-pass').click(function () {
    if ($('#contrasena').attr('type') === 'text') {
     $('#contrasena').attr('type', 'password');
	  $('#contrasena1').attr('type', 'password');
    } else {
     $('#contrasena').attr('type', 'text');
	 $('#contrasena1').attr('type', 'text');

    }
	
   });
  });
 function soloLetras(e){
       key = e.keyCode || e.which;
       tecla = String.fromCharCode(key).toLowerCase();
       letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
       especiales = "8-37-39-46";

       tecla_especial = false
       for(var i in especiales){
            if(key == especiales[i]){
                tecla_especial = true;
                break;
            }
        }

        if(letras.indexOf(tecla)==-1 && !tecla_especial){
            return false;
        }
    }
// Solo permite ingresar numeros.
function soloNumeros(e){
	var key = window.Event ? e.which : e.keyCode
	return (key >= 48 && key <= 57)
}

        $(document).ready(function(){
                   			                
        var consultas;
		
		 
                                                                          
         //hacemos focus al campo de búsqueda
        $("#matricula").focus();
                                                                                                    
        //comprobamos si se pulsa una tecla
        $("#matricula").keyup(function(e){
                                     
              //obtenemos el texto introducido en el campo de búsqueda
              consultas = $("#matricula").val();
			  if(consultas !=""){
			  
			  $("#resultados").show();
			    $("#resultador").hide();
			  }else{
				  
		   $("#resultados").hide();
			    $("#resultador").show();
$limp();
		    $("#matricula").val("");
			  }
                                                                           
              //hace la búsqueda
                                                
              $.ajax({
                    type: "POST",
                    url: "bd/vma.php",
                    data: "matricula="+consultas,
                    dataType: "html",
                    beforeSend: function(){
                          //imagen de carga
                          $("#resultados").html("<p align='center'><img src='bootstrap-3.3.5-dist/loading.gif' /></p>");
                },
                    error: function(){
                          alert("error al buscar");
                    },
                    success: function(data){                  												                          $("#resultados").empty();
                          $("#resultados").append(data);              
				
					}
              });
                                                                                  
            });
                                                                   
});
	


	
</script>

<!-- Bootstrap JS file -->
<script type="text/javascript" src="bootstrap-3.3.5-dist/js/bootstrap.min.js"></script>

<!-- Custom JS file -->
<script type="text/javascript" src="js/script.js"></script>
<link rel="stylesheet" type="text/css" href="../css y javascript/w3schoolcss.css">

<!---<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-75591362-1', 'auto');
    ga('send', 'pageview');

</script>--->
</body>
</html>
