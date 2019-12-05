/* global control, canvas */

// La letra j es la tecla 106 y la k es la 107
// La letra s tiene el código 115 y la d el 100
var tiempos = [
  [247, [106, 115]],
  [2927, [107, 100]],
  [4229, [107, 100]],
  [6835, [107, 100]],
  [9941, [107, 100]],
  [11480, [107, 100]],
  [13234, [106, 115]],
  [14231, [106, 115]],
  [17650, [106, 115]],
  [19998, [106, 115]],
  [21080, [107, 100]],
  [23908, [107, 100]],
  [25470, [107, 100]],
  [27884, [107, 100]],
  [28705, [107, 100]],
  [31216, [106, 115]],
  [32089, [106, 115]],
  [35419, [106, 115]],
  [37874, [107, 100]],
  [39029, [107, 100]],
  [40261, [107, 100]],
  [43474, [106, 115]],
  [45406, [106, 115]],
  [46335, [107, 100]],
  [48706, [106, 115]],
  [50227, [107, 100]],
  [52664, [107, 100]],
  [54691, [106, 115]],
  [57299, [107, 100]],
  [59109, [107, 100]],
  [61953, [106, 115]],
  [62141, [106, 115]],
  [65887, [107, 100]],
  [66246, [107, 100]],
  [69733, [107, 100]],
  [71545, [107, 100]],
  [72339, [106, 115]],
  [74962, [106, 115]],
  [76141, [107, 100]],
  [79639, [107, 100]],
  [80297, [107, 100]],
  [83908, [106, 115]],
  [85413, [106, 115]],
  [87706, [106, 115]],
  [88157, [106, 115]],
  [90286, [106, 115]],
  [92552, [106, 115]],
  [94244, [107, 100]],
  [97311, [107, 100]],
  [98055, [107, 100]],
  [101555, [107, 100]],
  [102565, [106, 115]],
  [105419, [107, 100]],
  [106129, [107, 100]],
  [108025, [106, 115]],
  [111680, [106, 115]],
  [112493, [107, 100]],
  [114481, [107, 100]],
  [117394, [107, 100]],
  [119060, [106, 115]],
  [120745, [106, 115]],
  [122632, [106, 115]],
  [124454, [107, 100]],
  [127124, [107, 100]],
  [128600, [107, 100]],
  [130444, [106, 115]],
  [133151, [106, 115]],
  [135648, [106, 115]],
  [137679, [106, 115]],
  [139136, [107, 100]],
  [140653, [107, 100]],
  [143611, [106, 115]],
  [145206, [106, 115]],
  [147937, [106, 115]],
  [149475, [106, 115]],
  [150380, [106, 115]],
  [153385, [107, 100]],
  [154077, [107, 100]],
  [156288, [107, 100]],
  [158902, [107, 100]],
  [161339, [106, 115]],
  [163612, [106, 115]],
  [164910, [106, 115]],
  [166469, [107, 100]],
  [168950, [107, 100]],
  [170131, [106, 115]],
  [172913, [107, 100]],
  [174148, [107, 100]],
  [176407, [106, 115]],
  [178393, [106, 115]],
  [181370, [106, 115]],
  [183438, [107, 100]],
  [185072, [106, 115]],
  [187300, [106, 115]],
  [188852, [106, 115]],
  [191155, [106, 115]],
  [193991, [107, 100]],
  [194608, [106, 115]],
  [196829, [107, 100]],
  [198451, [107, 100]]
];
var particles = [];
var puntos = 0,
  puntos2 = 0;
var startTime;
var actual = 0;
var playing;
var multiplayer = true;


window.onload = function () {
  document.onkeypress = this.mostrarInformacionTecla;
  document.onkeyup = this.comprobarPuntos;

  iniciarCronometroYPuntos();
  drawInitialCanvas();

  particleIndex = 0,
    settings = {
      density: 1,
      particleSize: 25,
      startingX: canvas.width + 25,
      startingY: 150
    };
};

//  Places a background image in a background canvas and draws the square over it
function drawInitialCanvas() {
  var canvasBg = document.getElementById("bg_canvas_1");
  var contextBg = canvasBg.getContext("2d");
  canvasBg.width = window.innerWidth;
  canvasBg.height = 300;
  var bgImg = new Image();

  bgImg.src = "/static/img/gatos.jpg";
  bgImg.onload = function () {
    drawPattern(contextBg, canvasBg, bgImg);
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

    bgImg2.src = "/static/img/gatos.jpg";
    bgImg2.onload = function () {
      drawPattern(contextBg2, canvasBg2, bgImg2);
    }

    canvas = document.getElementById("canvas-2");
    canvas.width = window.innerWidth;
    canvas.height = 300;
  }

}


function drawPattern(context, canvas, bgImg) {
  //  Creates pattern to fill the entire canvas with the image
  context.fillStyle = context.createPattern(bgImg, "repeat-x");
  context.fillRect(0, 0, canvas.width, canvas.height);

  //  Creates the square
  var gradient = context.createLinearGradient(10, 50, 50, 10);
  gradient.addColorStop("0", "magenta");
  gradient.addColorStop("0.5", "blue");
  gradient.addColorStop("1.0", "red");
  context.strokeStyle = gradient;
  context.lineWidth = 5;
  context.strokeRect(150, 117, 60, 60);
}


$("#player").bind("ended", function () {
  var x = document.getElementById("myAudio");
  x.play();
  cronometrar();

  var canvas2, context2;
  var canvas = document.getElementById("canvas-1");
  var context = canvas.getContext("2d");

  if (multiplayer) {
    canvas2 = document.getElementById("canvas-2");
    context2 = canvas2.getContext("2d");
  }

  for (var i = 0; i < tiempos.length; i++) {
    particles.push({
      x: settings.startingX,
      y: settings.startingY,
      timing: tiempos[i][0],
      size: settings.particleSize,
      vx: 20,
      moving: true,
      tecla: tiempos[i][1]
    });
  }
  playing = particles[0];

  window.requestAnimationFrame(animate);

  function animate(time) {
    // set startTime if it isn't already set
    if (!startTime) {
      startTime = time;
    }
    // calc elapsedTime
    var elapsedTime = time - startTime;

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (multiplayer)
      context2.clearRect(0, 0, canvas2.width, canvas2.height);

    // assume no further animating is necessary
    // The for-loop may change the assumption 
    var continueAnimating = false;
    for (var i = 0; i < particles.length; i++) {
      var part = particles[i];

      // update this circle & report if it wasMoved
      var wasMoved = update(part, elapsedTime);
      // if it wasMoved, then change assumption to continueAnimating
      if (wasMoved || part.moving) {
        continueAnimating = true;
      }
      // draw this arc at its current position
      drawParticle(part);
    }

    // if update() reported that it moved something
    // then request another animation loop
    if (continueAnimating)
      window.requestAnimationFrame(animate);
  }

  function update(part, elapsedTime) {
    // has this arc's animation delay been reached by elapsedTime
    console.log("tiempo de particula: " + part.timing);
    console.log("Elapsed time: " + elapsedTime);
    if (elapsedTime >= part.timing) {
      // is this arc still visible on the canvas
      if (part.x > -part.size) {
        // if yes+yes, move this arc by the specified moveX
        part.x -= part.vx;
        if (part.x <= 0) {
          part.moving = false;
        }
        // report that we moved this arc
        return (true);
      }
    }
    console.log("fin bucle con " + elapsedTime + " - " + part.timing);
    // report that we didn't move this arc
    return (false);
  }

  function drawParticle(part) {
    context.beginPath();
    if (part.tecla[0] === 107)
      context.fillStyle = "cyan";
    else if (part.tecla[0] === 106)
      context.fillStyle = "red";
    context.arc(part.x, part.y, part.size, 0, Math.PI * 2);
    context.fill();

    if (multiplayer) {
      context2.beginPath();
      if (part.tecla[0] === 107)
        context2.fillStyle = "cyan";
      else if (part.tecla[0] === 106)
        context2.fillStyle = "red";
      context2.arc(part.x, part.y, part.size, 0, Math.PI * 2);
      context2.fill();
    }
  }

});


function mostrarInformacionTecla(evObject) {
  var tecla = evObject.keyCode;
  //control.innerHTML = 'Tecla pulsada: ' + tecla + " " + typeof(tecla);
  //La tecla 32 es la barra espaciadora

  if (tecla === playing.tecla[0]) {
    //De 135 a 165 es pleno
    if ((playing.x >= 96 && playing.x =< 139) || (playing.x >= 161 && playing.x <= 204)){
      contadorBien++;
	  if(contadorBien >= 10)
		puntos += 50*2;
	  else puntos += 50;
	}
    else if (playing.x >= 140 && playing.x <= 160){
	  contadorBien++;
	  if(contadorBien >= 10)
		puntos += 100*2.5;
	  else puntos += 100;
	  
	}
    else{
		contadorMal++;
		contadorBien = 0;
		if(contadorMal >= 5)
			puntos -= 25;
	}

    document.getElementById("puntos-p1").innerHTML = "Puntos: " + puntos;

    if (multiplayer)
      document.getElementById("puntos-p1").innerHTML = "Puntos jugador 1: " + puntos;
  }

  if (multiplayer) {
    if (tecla === playing.tecla[1]) {
      //De 135 a 165 es pleno
      if ((playing.x > 101 && playing.x < 135) || (playing.x > 165 && playing.x < 199))
        puntos2 += 5000;
      else if (playing.x >= 135 && playing.x <= 165)
        puntos2 += 10000;

      document.getElementById("puntos-p2").innerHTML = "Puntos jugador 2: " + puntos2;
    }
  }
}


function iniciarCronometroYPuntos() {
  h = 0;
  m = 0;
  s = 0;
  ms = 0;
  mss = 0;
  //document.getElementById("hms").innerHTML = "00:00:00:000";
  document.getElementById("puntos-p1").innerHTML = "Puntos: " + puntos;

  if (multiplayer) {
    document.getElementById("puntos-p1").innerHTML = "Puntos jugador 1: " + puntos;
    var p2 = document.getElementById("puntos-p2");
    p2.style.visibility = "visible";
    p2.innerHTML = "Puntos jugador 2: " + puntos2;
  }
}


function cronometrar() {
  escribir();
  id = setInterval(escribir, 1);
  //id2 = setInterval(descartar, 30);
  id3 = setInterval(comprueba, 1);
}


function comprueba() {
  if (playing !== -1 && playing.x <= 100) {
    actual += 1;
    if (actual < particles.length) {
      playing = particles[actual];
    } else playing = -1;
  }
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