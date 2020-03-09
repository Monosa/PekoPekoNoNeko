//La letra j es la tecla 106 y la k es la 107
var tiempos = [];
var multiplayer = false;


window.onload = function () {
  document.onkeypress = this.mostrarInformacionTecla;
  this.iniciarCronometro();
  drawInitialCanvas();

  document.getElementById("empezar").onclick = function () {
    console.log("Leída la pulsación del botón 'Empezar'");
    var x = document.getElementById("myAudio");
    x.play();

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
  }

  document.getElementById("myAudio").onended = function () {
    var x = document.getElementById("descarga");
    x.style.display = "block";
  }
};

//  Places a background image in a background canvas and draws the square over it
function drawInitialCanvas() {
  var canvasBg = document.getElementById("bg_canvas_1");
  var contextBg = canvasBg.getContext("2d");
  canvasBg.width = window.innerWidth;
  canvasBg.height = 300;
  var bgImg = new Image();

  bgImg.src = "../img/image.png";
  bgImg.onload = function () {
    //contextBg.drawImage(bgImg, 0, 0);
    drawPattern(contextBg, canvasBg, bgImg);
  }
  var alrededor = new Image();
  alrededor.src = "../img/alrededor.png";
  alrededor.onload = function () {
    contextBg.drawImage(alrededor, 30, 60);
  }

  //  Sets the width and height of the canvas in which the circles are going to be drawn
  canvas = document.getElementById("canvas-1");
  canvas.width = window.innerWidth;
  canvas.height = 300;

  if (multiplayer) {
    console.log("Entrada en la opción multiplayer");
    var player2 = document.getElementById("bg-player2");
    player2.setAttribute("visibility", "visible");

    var canvasBg2 = document.getElementById("bg_canvas_2");
    var contextBg2 = canvasBg.getContext("2d");
    canvasBg2.width = window.innerWidth;
    canvasBg2.height = 300;
    var bgImg2 = new Image();

    bgImg2.src = "../img/image.png";
    bgImg2.onload = function () {
      //contextBg.drawImage(bgImg, 0, 0);
      drawPattern(contextBg2, canvasBg2, bgImg2);
    }
    var alrededor2 = new Image();
    alrededor2.src = "../img/alrededor.png";
    alrededor2.onload = function () {
      contextBg2.drawImage(alrededor2, 30, 60);
    }

    //  Sets the width and height of the canvas in which the circles are going to be drawn
    canvas2 = document.getElementById("canvas-2");
    canvas2.width = window.innerWidth;
    canvas2.height = 300;
  }
}

function drawPattern(context, canvas, bgImg) {
  //  Creates pattern to fill the entire canvas with the image
  context.fillStyle = context.createPattern(bgImg, "repeat-x");
  context.fillRect(0, 0, canvas.width, canvas.height);

  //  Creates the square
  /*var gradient = context.createLinearGradient(10, 50, 50, 10);
  gradient.addColorStop("0", "magenta");
  gradient.addColorStop("0.5", "blue");
  gradient.addColorStop("1.0", "red");
  context.strokeStyle = gradient;
  context.lineWidth = 5;
  context.strokeRect(30, 100, 100, 100);
  */
  var plato = new Image();
  plato.src = '../img/plato.png';
  plato.onload = function () {
    context.drawImage(plato, 30, 60);
  }
  var gifCanvas = document.getElementById("gifCanvas");

  gifler('../img/Gatete.gif').animate(gifCanvas);
}

function download_song() {
  var file = new Blob(tiempos, {
    type: 'text/plain'
  });
  var x = document.getElementById("descarga");
  x.download = "archivo.txt";
  console.log(tiempos);
}

function iniciarCronometro() {
  mss = 0;
}

function mostrarInformacionTecla(evObject) {
  var tecla = evObject.keyCode;

  if (tecla === 106 || tecla === 107) {
    tiempos.push([mss, tecla]);
  }
}

function cronometrar() {
  escribir();
  id = setInterval(escribir, 1);
  //id2 = setInterval(descartar, 30);
}