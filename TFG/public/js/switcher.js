
function cambiaModo(){
    if(request.session.multijugador)
      request.session.multijugador = false;
    else request.session.multijugador = true;
    console.log(request.session.multijugador);
  }