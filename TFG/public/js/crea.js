var tiempos = [];


window.onload = function () {
    document.onkeypress = this.mostrarInformacionTecla;

    iniciarCronometroYPuntos();
    drawInitialCanvas();
};

//  Places a background image in a background canvas and draws the square over it
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
    alrededor.onload = function(){
      contextBg.drawImage(alrededor,30,60);
    }
  
    //  Sets the width and height of the canvas in which the circles are going to be drawn
    canvas = document.getElementById("canvas-1");
    canvas.width = window.innerWidth;
    canvas.height = 300;
  
    if (multiplayer) {
      var canvasBg2 = document.getElementById("bg_canvas_2");
      var contextBg2 = canvasBg2.getContext("2d");
      canvasBg2.width = window.innerWidth;
      canvasBg2.height = 300;
      var bgImg2 = new Image();
  
      bgImg2.src = "../img/image.png";
      bgImg2.onload = function () {
        drawPattern(contextBg2, canvasBg2, bgImg2);
      }
  
      canvas = document.getElementById("canvas-2");
      canvas.width = window.innerWidth;
      canvas.height = 300;
    }

function drawPattern(context, canvas, bgImg) {
    //  Creates pattern to fill the entire canvas with the image
    context.fillStyle = context.createPattern(bgImg, "repeat-x");
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    var plato = new Image();
    plato.src = '../img/plato.png';
    plato.onload = function(){
        context.drawImage(plato,30,60);
    }
    var gifCanvas = document.getElementById("gifCanvas");
    
    gifler('../img/Gatete.gif').animate(gifCanvas);
    }
    bgImg.src = "../img/FondoCrea.png";
    bgImg.onload = drawPattern;

    //  Sets the width and height of the canvas in which the circles are going to be drawn
    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = 300;



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

function mostrarInformacionTecla(evObject) {
    var tecla = evObject.keyCode;
    //control.innerHTML = 'Tecla pulsada: ' + tecla + " " + typeof(tecla);
    //La tecla 32 es la barra espaciadora

    if (tecla === 106 || tecla === 107) {
        tiempos.push([mss, tecla]);
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

function escribir() {
    var hAux, mAux, sAux, msAux;
    ms++;
    mss++;
    if (ms > 100) {
        s++;
        ms = 0;
    }
    if (s > 59) {
        m++;
        s = 0;
    }
    if (m > 59) {
        h++;
        m = 0;
    }
    if (h > 24) {
        h = 0;
    }

    if (ms < 10) {
        msAux = "0" + ms;
    } else {
        msAux = ms;
    }
    if (s < 10) {
        sAux = "0" + s;
    } else {
        sAux = s;
    }
    if (m < 10) {
        mAux = "0" + m;
    } else {
        mAux = m;
    }
    if (h < 10) {
        hAux = "0" + h;
    } else {
        hAux = h;
    }
}
}