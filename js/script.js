const crud = new Firebase("https://adminoxxoparts.firebaseio.com/Oxxo/Users/");


  var person = { userID: "", name: "", accessToken: "", picture: "", email: "" };
                                                                        
  $("#btn_LogFb").click(function() {
    FB.login(function(response) {
      if (response.status == "connected") {
        person.userID = response.authResponse.userID;
        person.accessToken = response.authResponse.accessToken;

        FB.api("/me?fields=id,name,email,picture.type(large)", function(
          userData
        ) {
          person.name = userData.name;
          person.email = userData.email;
          person.picture = userData.picture.data.url;

          $.ajax({
            url: crud+ ".json",
            type: "GET",
            beforeSed: function(){
              swal({
                title: "Cargando...",
                text:
                  "Porfavor espere mientras se realiza la petición, favor de no cerrar la pagina.",
                showCancelButton: false,
                showConfirmButton: false,
                allowEscapeKey: false,
                imageUrl:
                  "../views/bootstrap-3.3.5-dist/loading.gif"
              });
            },
            success: function(serverResponse) {
              var datos = {};
              datos = serverResponse;

              if(serverResponse == null){
                $.ajax({
                  url: crud + ".json",
                  type: "POST",
                  data: JSON.stringify({
                    UserID: person.userID,
                    Name: person.name,
                    AccessToken: person.accessToken,
                    Image: person.picture,
                    Email: person.email,
                    Privilege:0,
                    Status: 0
                  }),
                  success: function(serverResponse) {
                   
                    swal("Registro exitoso " + person.name + ".", "Su usuario por el momento se encuentra inhabilitado, favor de comunicarse con el Ing. Alexis Luna o a la brevedad se comunicara con usted.", "success");

                  
                  }
                });
              }else{

               let complete;
                $.each(datos, function(id, values) {
                  if (values.UserID === person.userID) {
                    complete = 1;
                    if(values.Status === 1){
                    
                      localStorage.setItem('Name', person.name); 
                      localStorage.setItem("Priv", values.Privilege); 
                      localStorage.setItem("Image", person.picture); 
                      localStorage.setItem("Email", person.email); 
                      localStorage.setItem("TokenAccess", id);

                      if (values.Privilege == 1) {
                        location.href = "Parts/";
                      } else if (values.Privilege == 2) {
                        location.href = "Generate-Requisitions/";
                      }

                    }else{

                      swal("Usuario inhabilitado " + person.name + "", "Su usuario no ha sido autorizado, favor de comunicarse con el Ing. Alexis Luna.", "warning");

                    }
                  }
                });

                if(complete === null || complete === undefined || complete === ""){
                    //console.log("fallo");
                    $.ajax({
                      url: crud + ".json",
                      type: "POST",
                      data: JSON.stringify({
                        UserID: person.userID,
                        Name: person.name,
                        AccessToken: person.accessToken,
                        Image: person.picture,
                        Email: person.email,
                        Privilege: 0,
                        Status: 0
                      }),
                      success: function(serverResponse) {
                        
                        swal("Registro exitoso " + person.name + ".", "Su usuario por el momento se encuentra inhabilitado, favor de comunicarse con el Ing. Alexis Luna o a la brevedad se comunicara con usted.", "success");

                        
                      }
                    });
                  }
                } 
            }
          });
        });
      }
    }, { scope: "public_profile, email" });
  });
window.fbAsyncInit = function() {
        FB.init({
            appId            : '471693236538475',
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v2.12'
        });
    };
        
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v2.12&appId=255513111610034&autoLogAppEvents=1';
        fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));





  function onSignIn(googleUser) {
     var profile = googleUser.getBasicProfile();
    
     $.ajax({
            url: crud+ ".json",
            type: "GET",
            beforeSed: function(){
              swal({
                title: "Cargando...",
                text:
                  "Porfavor espere mientras se realiza la petición, favor de no cerrar la pagina.",
                showCancelButton: false,
                showConfirmButton: false,
                allowEscapeKey: false,
                imageUrl:
                  "../views/bootstrap-3.3.5-dist/loading.gif"
              });
            },
            success: function(serverResponse) {
              
              //console.log(serverResponse);
              var datos = {};
              datos = serverResponse;

              if(serverResponse == null){
                $.ajax({
                  url: crud + ".json",
                  type: "POST",
                  data: JSON.stringify({
                    UserID: profile.getId(),
                    Name: profile.getName(),
                    AccessToken: googleUser.getAuthResponse().id_token,
                    Image: profile.getImageUrl(),
                    Email: profile.getEmail(),
                    Privilege: 0,
                    Status: 0
                  }),
                  success: function(serverResponse) {
                   
                    swal("Registro exitoso " + profile.getName() + ".", "Su usuario por el momento se encuentra inhabilitado, favor de comunicarse con el Ing. Alexis Luna o a la brevedad se comunicara con usted.", "success");
                    
                  }
                });
              }else{
                 
                let complete;
                $.each(datos, function(id, values) {
                   
                  if (values.UserID === profile.getId()) {

                    complete = 1;
                   
                    if (values.Status === 1) {
                      localStorage.setItem("Name", profile.getName());
                      localStorage.setItem("Priv", values.Privilege);
                      localStorage.setItem("Image", profile.getImageUrl());
                      localStorage.setItem("Email", profile.getEmail());
                      localStorage.setItem("TokenAccess", id);

                      if (values.Privilege == 1) {
                        
                        location.href = "Parts/";

                      } else if (values.Privilege == 2) {
                        
                        location.href = "Generate-Requisitions/";

                      }
                      
                    } else {
                      swal("Usuario inhabilitado " + profile.getName() + "", "Su usuario no ha sido autorizado, favor de comunicarse con el Ing. Alexis Luna.", "warning");
                    }
                  } 
                
                });

                if(complete === null || complete === undefined || complete === ""){
                  //console.log("no existe");
                   $.ajax({
                     url: crud + ".json",
                     type: "POST",
                     data: JSON.stringify({
                       UserID: profile.getId(),
                       Name: profile.getName(),
                       AccessToken: googleUser.getAuthResponse().id_token,
                       Image: profile.getImageUrl(),
                       Email: profile.getEmail(),
                       Privilege: 0,
                       Status: 0
                     }),
                     success: function(serverResponse) {
                      
                      swal("Registro exitoso " + profile.getName() + ".", "Su usuario por el momento se encuentra inhabilitado, favor de comunicarse con el Ing. Alexis Luna o a la brevedad se comunicara con usted.", "success");
                    
                     }
                   });

                }else{
                  //console.log("existe");
                }
              }

              } 
            });
    
  };

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
      //console.log("User signed out.");
      $(".g-signin2").show();
    });
  }