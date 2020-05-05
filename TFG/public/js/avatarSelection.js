
function cambiarClases(id) {
    var elems = document.getElementsByClassName("seleccionado");
    if (elems.length != 0) {
        elems[0].classList.remove("seleccionado");
    }
    document.getElementById(id).classList.add("seleccionado");
    document.getElementById("avatar").value = id;
}

