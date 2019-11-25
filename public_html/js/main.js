/* global control, canvas */

//La letra j es la tecla 106 y la k es la 107
var tiempos = [[247,106],[2927,107],[4229,107],[6835,107],[9941,107],[11480,107],[13234,106],[14231,106],[17650,106],[19998,106],[21080,107],[23908,107],[25470,107],[27884,107],[28705,107],[31216,106],[32089,106],[35419,106],[37874,107],[39029,107],[40261,107],[43474,106],[45406,106],[46335,107],[48706,106],[50227,107],[52664,107],[54691,106],[57299,107],[59109,107],[61953,106],[62141,106],[65887,107],[66246,107],[69733,107],[71545,107],[72339,106],[74962,106],[76141,107],[79639,107],[80297,107],[83908,106],[85413,106],[87706,106],[88157,106],[90286,106],[92552,106],[94244,107],[97311,107],[98055,107],[101555,107],[102565,106],[105419,107],[106129,107],[108025,106],[111680,106],[112493,107],[114481,107],[117394,107],[119060,106],[120745,106],[122632,106],[124454,107],[127124,107],[128600,107],[130444,106],[133151,106],[135648,106],[137679,106],[139136,107],[140653,107],[143611,106],[145206,106],[147937,106],[149475,106],[150380,106],[153385,107],[154077,107],[156288,107],[158902,107],[161339,106],[163612,106],[164910,106],[166469,107],[168950,107],[170131,106],[172913,107],[174148,107],[176407,106],[178393,106],[181370,106],[183438,107],[185072,106],[187300,106],[188852,106],[191155,106],[193991,107],[194608,106],[196829,107],[198451,107]];
var particles = [];
var puntos = 0;
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
      timing: tiempos[i][0],
      size: settings.particleSize,
      vx: 20,
      moving:true,
      tecla:tiempos[i][1]
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
    if(part.tecla === 107)
        context.fillStyle = "cyan";
    else if(part.tecla === 106)
        context.fillStyle = "red";
    context.arc(part.x, part.y, part.size, 0, Math.PI * 2);
    context.fill();
  }

});


function mostrarInformacionTecla(evObject) {
  var tecla = evObject.keyCode;
  //control.innerHTML = 'Tecla pulsada: ' + tecla + " " + typeof(tecla);
  //La tecla 32 es la barra espaciadora

  if (tecla === playing.tecla) {
      //De 135 a 165 es pleno
    if ((playing.x > 101 && playing.x < 135) || (playing.x > 165 && playing.x < 199))
      puntos += 5000;
    else if (playing.x >= 135 && playing.x <= 165)
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
  //document.getElementById("hms").innerHTML = "00:00:00:000";
  document.getElementById("puntos").innerHTML = "Puntos:" + puntos;
}


function cronometrar() {  
  escribir();
  id = setInterval(escribir, 1);
  //id2 = setInterval(descartar, 30);
  id3 = setInterval(comprueba,1);
}




function comprueba() {
    if (playing !== -1 && playing.x <= 100){
        actual += 1;
        if(actual < particles.length){
            playing = particles[actual];
        }
        else playing = -1;
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