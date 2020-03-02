//La letra j es la tecla 106 y la k es la 107
var tiempos = [];


window.onload = function () {
  document.onkeypress = this.mostrarInformacionTecla;

  iniciarCronometroYPuntos();
  drawInitialCanvas();
};

//  Places a background image in a background canvas and draws the square over it
function drawInitialCanvas() {
  var canvasBg = document.getElementById("bg_canvas");
  var contextBg = canvasBg.getContext("2d");
  canvasBg.width = window.innerWidth;
  canvasBg.height = 300;
  var bgImg = new Image();

  function drawPattern() {
    //  Creates pattern to fill the entire canvas with the image
    contextBg.fillStyle = contextBg.createPattern(bgImg, "repeat-x");
    contextBg.fillRect(0, 0, canvasBg.width, canvasBg.height);

    //  Creates the square
    var gradient = contextBg.createLinearGradient(10, 50, 50, 10);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    contextBg.strokeStyle = gradient;
    contextBg.lineWidth = 5;
    contextBg.strokeRect(150, 117, 60, 60);
  }
  bgImg.src = "../img/gatos.jpg";
  bgImg.onload = drawPattern;

  //  Sets the width and height of the canvas in which the circles are going to be drawn
  var canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = 300;
}


$("#empezar").bind("click", function () {
  var x = document.getElementById("myAudio");
  x.play();
  cronometrar();

  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
});

$("#myAudio").bind("ended", function () {
  var x = document.getElementById("descarga");
  x.style.display = "block";
});

function download1(){
	var file = new Blob(tiempos, {type: 'text/plain'});
	var x = document.getElementById("descarga");
	x.download = "archivo.txt";
	console.log(tiempos);
}
function mostrarInformacionTecla(evObject) {
  var tecla = evObject.keyCode;
  //control.innerHTML = 'Tecla pulsada: ' + tecla + " " + typeof(tecla);
  //La tecla 32 es la barra espaciadora

  if (tecla === 106 || tecla === 107) {
    tiempos.push([mss,tecla]);
  }
}


function iniciarCronometroYPuntos() {
  h = 0;
  m = 0;
  s = 0;
  ms = 0;
  mss = 0;
}


function cronometrar() {  
  escribir();
  id = setInterval(escribir, 1);
  //id2 = setInterval(descartar, 30);
}