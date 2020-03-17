function cambiaModo() {
  $(document).ready(function () {
    var cambio = document.getElementById("multijugador").checked;

    //  Envía los datos al servidor para que se cambie el valor de 'request.session.multijugador'
    $.ajax({
      method: "POST",
      url: "/canciones/cambiaModo",
      contentType: "application/json",
      data: JSON.stringify({
        multi: cambio
      }),
      success: function () {
        console.log("Multijugador = " + cambio);
      }
    });

    // Guardar el valor de multijugador en una variable del cliente
    sessionStorage.setItem("multijugador", JSON.stringify(cambio));
  });
}