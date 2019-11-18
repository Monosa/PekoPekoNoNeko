var tiempos = [0,3416, 4897, 6378, 7119, 7860, 8601, 9341, 11564, 12304, 15267, 16749];
var tiempos2 = [0, 1000, 2000];
var array2 = [0,3416, 4897, 6378, 7119, 7860, 8601, 9341, 11564, 12304, 15267, 16749];
var particles = [];
var puntos = 0;
var aux = 0;
var posCirc = 0;
var elem = tiempos[0];
var startTime;
var actual = 0;
var playing;



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
}

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

  bgImg.src = "./img/gatos.jpg";
  bgImg.onload = drawPattern;

  //  Sets the width and height of the canvas in which the circles are going to be drawn
  var canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = 300;
}


$("#player").bind("ended", function () {
  var x = document.getElementById("myAudio");
  x.play();
  cronometrar();

  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  for (var i = 0; i < tiempos.length; i++) {
    //particles.push(new Particle(settings.startingX, settings.startingY, tiempos[i]));
    particles.push({ 
      x: settings.startingX,
      y: settings.startingY,
      timing: tiempos[i],
      size: settings.particleSize,
      vx: 20,
      moving:true
    });
  }

  window.requestAnimationFrame(animate);

  function animate(time) {
    // set startTime if it isn't already set
    if (!startTime) {
      startTime = time;
    }
    // calc elapsedTime
    var elapsedTime = time - startTime;

    context.clearRect(0, 0, canvas.width, canvas.height);
    

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
    if (continueAnimating) {
      window.requestAnimationFrame(animate);
    } else {
      // otherwise report the animation is complete
      alert('Animation is complete');
    }
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
        if(part.x <= 0){
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
    context.fillStyle = "cyan";
    context.arc(part.x, part.y, part.size, 0, Math.PI * 2);
    context.fill();
  }

});


function mostrarInformacionTecla(evObject) {
  var tecla = evObject.keyCode;
  control.innerHTML = 'Tecla pulsada: ' + tecla;
}



function comprobarPuntos(evObject) {
  var teclaPulsada = evObject.keyCode;
  //La tecla 32 es la barra espaciadora

  if (teclaPulsada == 32) {
    console.log(particles[0].x);
    if (playing.x > 100 && playing.x < 160 && playing.x != 130)
      puntos += 5000;
    else if (playing.x == 130)
      puntos += 10000;
        
    document.getElementById("puntos").innerHTML = "Puntos:" + puntos;
  }
}


function iniciarCronometroYPuntos() {
  h = 0;
  m = 0;
  s = 0;
  ms = 0;
  mss = 0;
  document.getElementById("hms").innerHTML = "00:00:00:000";
  document.getElementById("puntos").innerHTML = "Puntos:" + puntos;
}


function cronometrar() {  
  escribir();
  id = setInterval(escribir, 10);
  id2 = setInterval(descartar, 30);
  id3 = setInterval(comprueba,1);
}


function descartar() {
  if (tiempos.length > 0 && elem < mss * 10 + 300) {
    elem = tiempos.shift();
    tiempos.push(elem);
  }
}

function comprueba() {
    if (mss >= array2[0] + 1000){
        actual += 1;
        playing = particles[actual];
        array2.pop();
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

  document.getElementById("hms").innerHTML = hAux + ":" + mAux + ":" + sAux + ":" + msAux;
}