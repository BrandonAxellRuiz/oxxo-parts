  <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
<script type="text/javascript" src="../alertm/js/bootstrap.min.js"></script>

    <!-- Custom functions file -->
<script type="text/javascript" src="../alertm/js/functions.js"></script>
    <!-- Sweet Alert Script -->
<script type="text/javascript" src="../alertm/js/sweetalert.min.js"></script>
<script type="text/javascript" src="../alertm/js/bootstrap.js"></script>
    <!-- Custom CSS -->
    <!-- Scroll Menu -->
    <link href="../alertm/css/sweetalert.css" rel="stylesheet">
<script >

jQuery(".msg-cond").click(function() {
	swal({   
		title: "¿Deseas unirte al lado oscuro?",   
		text: "Este paso marcará el resto de tu vida...",   
		type: "warning",   
		showCancelButton: true,   
		confirmButtonColor: "#DD6B55",   
		confirmButtonText: "¡Claro!",   
		cancelButtonText: "No, jamás",   
		closeOnConfirm: false,   
		closeOnCancel: false }, 

		function(isConfirm){   
			if (isConfirm) {     
				swal("¡Hecho!", 
					"Ahora eres uno de los nuestros", 
					"success");   
			} else {     
				swal("¡Gallina!", 
					"Tu te lo pierdes...", 
				"error");   
			} 
		});
});
</script>

 <div class="row demo">
            <div class="boton-test col-xs-12 col-sm-12 col-md-3 col-lg-3">
              <button type="button" class="msg-cond btn btn-info">Mensaje según condición</button>
            </div>