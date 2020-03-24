/* En el modo multijugador van a cambiar las teclas, ya qu elo que proponemos con el modo multijugador es 
   que dos jugadores utilicen el mismo teclado para jugar. Las teclas elegidas han sido asdf para el jugador 1
   y jklñ para el jugador 2 (hay que valorar que pasa con otro tipo de teclados??) */

/* ¡¡¡Es necesario debido al modo multijugador crear un conversor de datos de un jugador a multijugador!!!*/

var songid;
var difid;
var tiempos;
var particles = [],
  particles2 = [];
var puntos = 0,
  puntos2 = 0;
var startTime = null;
var actual = 0,
  actual2 = 0;
var playing, playing2;
var settings;
var multiplayer;
var contadorBien = 0,
  contadorBien2 = 0;
var contadorMal = 0,
  contadorMal2 = 0;
var racha = 0,
  racha2 = 0;
var contadorCirculos = 0;
var canvas;
var keys = [];
var contextBg;

window.onload = function () {
  document.onkeydown = this.clic;
  document.onkeyup = this.keysReleased;

  if (JSON.parse(sessionStorage.getItem("multijugador")) === null) {
    multiplayer = false;
  } else {
    multiplayer = JSON.parse(sessionStorage.getItem("multijugador"));
  }

  console.log("Valor de multijugador: " + multiplayer);
  iniciarPuntosyRacha();
  drawInitialCanvas();

  settings = {
    density: 1,
    startingX: canvas.width + 25
  };

  var tiempo = document.getElementById("tiempos").innerHTML;
  tiempos = JSON.parse(tiempo);

  cargarJuego();

  sessionStorage.clear();
};

//  Places a background image in a background canvas and draws the square over it
function drawInitialCanvas() {
  var canvasBg = document.getElementById("bg_canvas_1");
  contextBg = canvasBg.getContext("2d");
  canvasBg.width = window.innerWidth;
  canvasBg.height = 300;
  var bgImg = new Image();

  bgImg.src = "../img/image.png";
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

    bgImg2.src = "../img/image.png";
    bgImg2.onload = function () {
      drawPattern(contextBg2, canvasBg2, bgImg2);
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

  var plato = new Image();
  plato.src = '../img/Plato.png';
  plato.onload = function () {
    context.drawImage(plato, 30, 60);
  }

  var gifCanvas1 = document.getElementById("gifCanvas1");
  gifler('../img/Gatete.gif').animate(gifCanvas1);

  if (multiplayer) {
    var gifCanvas2 = document.getElementById("gifCanvas2");
    gifler('../img/Gatete.gif').animate(gifCanvas2);
  }
}

function loadDorayakis(canvas, context, aCtx, rCtx) {
  // a ghost canvas that will keep our original image
  //Canvas rojo
  //img c es por chiquito r es por rojo, g es por grande, a es por azul
  var imgcr = new Image();
  var imgca = new Image();

  imgcr.onload = function () {
    context.drawImage(imgcr, 0, 0, canvas.width, canvas.height);
    rCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
    //requestAnimationFrame(animate);
  }

  imgcr.src = "../img/RojoChiquito2.png";

  imgca.onload = function () {
    context.drawImage(imgca, 0, 0, canvas.width, canvas.height);
    aCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
    //requestAnimationFrame(animate);
  }
  imgca.src = "../img/AzulEscalado.png";
}

function animate(time, context, canvas, particles, rCanvas, aCanvas) {
  // set startTime if it isn't already set
  if (startTime === null) {
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
    drawParticle(part, context, rCanvas, aCanvas);
  }

  // if update() reported that it moved something
  // then request another animation loop
  if (continueAnimating) {
    window.requestAnimationFrame(function (time) {
      animate(time, context, canvas, particles, rCanvas, aCanvas)
    });
  }
}

function update(part, elapsedTime) {

  if (elapsedTime >= part.timing) {
    // is this arc still visible on the canvas
    if (part.x > -part.size / 2) {
      // if yes+yes, move this arc by the specified moveX
      part.x -= part.vx;
      if (part.x <= -part.size / 2) {
        part.moving = false;
      }
      // report that we moved this arc
      return (true);
    } else return (true);
  }
  return (false);
}


function drawParticle(part, context, rCanvas, aCanvas) {
  //74 y 70 son sushis, 75 68 son dorayakis
  context.beginPath();
  var tam = [0, 0];
  var y = 0;
  if (!multiplayer) {
    //Si el primer elemento de tecla es 68 o 70 se dibijan las cosas en pequeño
    if (part.tecla[0] === 68 || part.tecla[0] === 70) {
      tam = [100, 100];
      y = 100;
    }
    //Si el primer elemento de tecla es 74 o 75 se dibujan en grande
    else {
      if (part.tecla[0] === 74 || part.tecla[0] === 75)
        tam = [170, 170];
      y = 60;
    }
    //En este caso se dibujan sushis
    if (part.tecla[0] === 75 || part.tecla[0] === 68) {
      context.drawImage(rCanvas, part.x, y, tam[0], tam[1]);

    }
    //En este caso se dibujan dorayakis
    else if (part.tecla[0] === 70 || part.tecla[0] === 74) {
      context.drawImage(aCanvas, part.x, y, tam[0], tam[1]);
    }
  }
  //Caso para el multijugador
  else {
    //Si el primer elemento de tecla es 83 o 68 en el caso del jugador que usa las teclas de la izquierda, 
    //o 75 o 76 en el caso del jugador de la derecha se dibujan las cosas en pequeño
    if (part.tecla[0] === 83 || part.tecla[0] === 68 || part.tecla[0] === 75 || part.tecla[0] === 76) {
      tam = [100, 100];
      y = 100;
    }
    //Si el primer elemento de tecla es 74 o 75 se dibujan en grande
    else {
      if (part.tecla[0] === 65 || part.tecla[0] === 70 || part.tecla[0] === 74 || part.tecla[0] === 192)
        tam = [170, 170];
      y = 60;
    }
    //En este caso se dibujan sushis
    if (part.tecla[0] === 70 || part.tecla[0] === 68 || part.tecla[0] === 76 || part.tecla[0] === 192) {
      context.drawImage(rCanvas, part.x, y, tam[0], tam[1]);
    }
    //En este caso se dibujan dorayakis
    else if (part.tecla[0] === 75 || part.tecla[0] === 74 || part.tecla[0] === 65 || part.tecla[0] === 83) {
      context.drawImage(aCanvas, part.x, y, tam[0], tam[1]);
    }
  }
}

function cargarJuego() {
  var canvas2, context2;
  var canvas = document.getElementById("canvas-1");
  var context = canvas.getContext("2d");
  var rCanvas = document.createElement('canvas');
  var rCtx = rCanvas.getContext('2d');
  rCanvas.width = canvas.width;
  rCanvas.height = canvas.height;
  //Canvas azul
  var aCanvas = document.createElement('canvas');
  var aCtx = aCanvas.getContext('2d');
  aCanvas.width = canvas.width;
  aCanvas.height = canvas.height;


  if (multiplayer) {
    document.getElementById("bg-player1").style.top = "10%";
    document.getElementById("bg-player2").style.visibility = "visible";
    document.getElementById("bg-player2").style.top = "60%";
    canvas2 = document.getElementById("canvas-2");
    context2 = canvas2.getContext("2d");
    var rCanvas2 = document.createElement('canvas');
    var rCtx2 = rCanvas2.getContext('2d');
    rCanvas2.width = canvas2.width;
    rCanvas2.height = canvas2.height;
    //Canvas azul
    var aCanvas2 = document.createElement('canvas');
    var aCtx2 = aCanvas2.getContext('2d');
    aCanvas2.width = canvas.width;
    aCanvas2.height = canvas.height;

  }

  $("#player").bind("ended", function () {
    var x = document.getElementById("myAudio");
    x.play();
    comprobar();

    loadDorayakis(canvas, context, aCtx, rCtx);

    if (multiplayer) {
      loadDorayakis(canvas2, context2, aCtx2, rCtx2);

      for (var i = 0; i < tiempos.length; i++) {
        particles2.push({
          x: settings.startingX,
          timing: tiempos[i].tiempo,
          size: tiempos[i].tipo,
          vx: 15,
          moving: true,
          clicked: false,
          tecla: tiempos[i].tecla2,
        });
      }

      playing2 = particles2[0];
    }

    for (var i = 0; i < tiempos.length; i++) {
      particles.push({
        x: settings.startingX,
        timing: tiempos[i].tiempo,
        size: tiempos[i].tipo,
        vx: 15,
        moving: true,
        clicked: false,
        tecla: tiempos[i].tecla,
      });
    }

    playing = particles[0];

    window.requestAnimationFrame(function (time) {
      animate(time, context, canvas, particles, rCanvas, aCanvas)
    });

    if (multiplayer) {
      window.requestAnimationFrame(function (time) {
        animate(time, context2, canvas2, particles2, rCanvas2, aCanvas2)
      });
    }
  });

  $("#myAudio").bind("ended", function () {
    document.getElementById("usePoints").value = puntos;
    document.forms["submitScore"].submit();
  });
}


function clic(evt) {
  //Se supone que se dibujan las cosas en pequeño si son las teclas 68 y 70 la primera tecla (o sea, la de un jugador. En el caso de multijugador eso cambia).
  if (!multiplayer) {
    playing.clicked = true;
    keys[evt.keyCode] = true;
    //Si se requiere pequeño
    if (playing.tecla[0] === 68 || playing.tecla[0] === 70) {
      //Si se pulsa alguna de las teclas (solo 68 o 70 porque ) y es pequeño, acertamos
      if (keys[playing.tecla[0]] || keys[playing.tecla[1]]) {
        compruebaAcierto(playing);
        ponAFalse(keys);
      }
    }
    //Si se requiere grande
    else if (playing.tecla[0] === 74 || playing.tecla[0] === 75) {
      //Si se pulsan las dos teclas requeridas para grande y es grande acertamos
      if (keys[playing.tecla[0]] && keys[playing.tecla[1]]) {
        compruebaAcierto(playing);
        ponAFalse(keys);
      }
    }
  } else {
    var keysPlayer1 = [];
    var keysPlayer2 = [];
    keys[evt.keyCode] = true;
    //Comprobamos si ambos jugadores han hecho click:
    if (keys[65] || keys[83] || keys[68] || keys[70]) {
      //El jugador 1 ha pulsado una tecla por lo que:
      playing.clicked = true;
      keysPlayer1 = cambiaTeclas(keys);
    }
    if (keys[74] || keys[75] || keys[76] || keys[192]) {
      //El jugador 2 ha pulsado una tecla por lo que:
      playing2.clicked = true;
      keysPlayer2 = cambiaTeclas(keys);
    }

    //Pasamos a comprobar de manera individual cada jugador: 
    if (playing.tecla[0] === 65 || playing.tecla[0] === 83) {
      //Si se pulsa alguna de las teclas y es pequeño, acertamos
      if (keysPlayer1[playing.tecla[0]] || keysPlayer1[playing.tecla[1]]) {
        compruebaAcierto(playing, 1);
        //ponAFalse(keys);
      }
    } else if (playing.tecla[0] === 68 || playing.tecla[0] === 70) {
      if (keysPlayer1[playing.tecla[0]] && keysPlayer1[playing.tecla[1]]) {
        compruebaAcierto(playing, 1);
      }
    }
    if (playing2.tecla[0] === 74 || playing2.tecla[0] === 75) {
      //Si se pulsa alguna de las teclas y es pequeño, acertamos
      if (keysPlayer2[playing2.tecla[0]] || keysPlayer2[playing2.tecla[1]]) {
        compruebaAcierto(playing2, 2);
        //ponAFalse(keys);
      }
    } else if (playing2.tecla[0] === 76 || playing2.tecla[0] === 192) {
      if (keysPlayer2[playing2.tecla[0]] && keysPlayer2[playing2.tecla[1]]) {
        compruebaAcierto(playing2, 2);
      }
    }
    ponAFalse(keys);
  }

}

function cambiaTeclas(keys) {
  var keysReturn = [];
  if (keys[65] || keys[83] || keys[68] || keys[70]) {
    //Las teclas del jugador 1 estan activas por lo que movemos esas teclas a un array propio
    if (keys[65])
      keysReturn[65] = true;
    if (keys[83])
      keysReturn[83] = true;
    if (keys[68])
      keysReturn[68] = true;
    if (keys[70])
      keysReturn[70] = true;
    return keysReturn;
  } else {
    if (keys[74] || keys[75] || keys[76] || keys[192]) {
      if (keys[74])
        keysReturn[74] = true;
      if (keys[75])
        keysReturn[75] = true;
      if (keys[76])
        keysReturn[76] = true;
      if (keys[192])
        keysReturn[192] = true;
      return keysReturn;
    }
  }
}

function ponAFalse(keys) {
  keys[68] = false;
  keys[70] = false;
  keys[74] = false;
  keys[75] = false;
  keys[65] = false;
  keys[83] = false;
  keys[76] = false;
  keys[192] = false;
}

function compruebaAcierto(playing, player) {
  var plato2 = new Image();
  plato2.src = '../img/plato2.png';

  if (!multiplayer) {
    if ((playing.x >= 20 && playing.x <= 69) || (playing.x >= 91 && playing.x <= 140)) {
      contadorBien++;
      res = rachas(50, contadorBien);
      racha = res[0];
      if(racha != 0)
        puntos += res[1];
      
      plato2.onload = function(){
        contextBg.drawImage(plato2,30,60);
      }
    } else if (playing.x >= 70 && playing.x <= 90) {
      contadorBien++;
      res = rachas(100, contadorBien);
      racha = res[0];
      if(racha != 0)
        puntos += res[1];

      plato2.onload = function(){
        contextBg.drawImage(plato2,30,60);
      }
    } else {
      plato3.onload = function(){
      contextBg.drawImage(plato3,30,60);
    }
      contadorMal++;
      contadorBien = 0;
      racha = 0;
      if(racha != 0)
        if (contadorMal >= 5)
          puntos -= 25;
    }
  } else {
    if (player === 1) {
      if ((playing.x >= 20 && playing.x <= 69) || (playing.x >= 91 && playing.x <= 140)) {
        contadorBien++;
        res = rachas(50, contadorBien);
        racha = res[0];
        puntos += res[1];
      } else if (playing.x >= 70 && playing.x <= 90) {
        contadorBien++;
        res = rachas(100, contadorBien);
        racha = res[0];
        puntos += res[1];
      } else {
        contadorMal++;
        contadorBien = 0;
        racha = 0;
        if (contadorMal >= 5)
          puntos -= 25;
      }
    } else if (player === 2) {
      if ((playing.x >= 20 && playing.x <= 69) || (playing.x >= 91 && playing.x <= 140)) {
        contadorBien2++;
        res = rachas(50, contadorBien2);
        racha2 = res[0];
        puntos2 += res[1];
      } else if (playing.x >= 70 && playing.x <= 90) {
        contadorBien2++;
        res = rachas(100, contadorBien2);
        racha2 = res[0];
        puntos2 += res[1];
      } else {
        contadorMal2++;
        contadorBien2 = 0;
        racha2 = 0;
        if (contadorMal2 >= 5)
          puntos2 -= 25;
      }
    }
  }
  document.getElementById("puntos-p1").innerHTML = "Puntos: " + puntos;
  document.getElementById("racha-p1").innerHTML = "Racha: " + racha;

  if (multiplayer) {
    document.getElementById("puntos-p2").innerHTML = "Puntos: " + puntos2;
    document.getElementById("racha-p2").innerHTML = "Racha: " + racha2;
  }
}

//Devuelve el computo de puntos y la racha
function rachas(puntos, contadorBien) {
  if (contadorBien >= 2 && contadorBien < 6)
    return [2, puntos * 2];
  else if (contadorBien >= 6 && contadorBien < 10)
    return [3, puntos * 3];
  else if (contadorBien >= 10 && contadorBien < 15)
    return [4, puntos * 4];
  else if (contadorBien >= 15 && contadorBien < 20)
    return [5, puntos * 5];
  else if (contadorBien >= 20)
    return [10, puntos * 10];
  else return [1, puntos];
}

function iniciarPuntosyRacha() {
  document.getElementById("puntos-p1").innerHTML = "Puntos: " + puntos;
  document.getElementById("racha-p1").innerHTML = "Racha: " + racha;

  if (multiplayer) {
    //document.getElementById("puntos-p2").style.visibility = "visible";
    document.getElementById("puntos-p2").innerHTML = "Puntos: " + puntos2;
    document.getElementById("racha-p2").innerHTML = "Racha: " + racha2;
  }
}


function comprobar() {
  setInterval(comprueba, 1);
  setInterval(animracha,1);
}

function animracha(racha){
}

function comprueba() {
  if (playing !== -1 && playing.x <= 0) {
    actual += 1;
    contadorCirculos += 1;
    document.getElementById("Contador").innerHTML = "Circulos: " + contadorCirculos;
    if(!playing.clicked){
      var platoNormal = new Image();
      platoNormal.src = '../img/Plato.png';
      platoNormal.onload = function(){
        contextBg.drawImage(platoNormal,30,60);
      }
      racha = 0;
      contadorBien = 0;
      document.getElementById("racha-p1").innerHTML = "Racha: " + racha;
    }
    if (actual < particles.length) {
      playing = particles[actual];
      
    } else playing = -1;
  }

  if(racha === 2)
    document.getElementById("one").style.display = "inline";
  else if(racha === 3)
    document.getElementById("three").style.display = "inline";
  else if(racha === 4)
    document.getElementById("five").style.display = "inline";
  else if(racha === 0){
     document.getElementById("one").style.display = "none";
     document.getElementById("three").style.display = "none";
     document.getElementById("five").style.display = "none";
  }

  if (multiplayer) {
    if (playing2 !== -1 && playing2.x <= 0) {
      actual2 += 1;
      if (!playing2.clicked) {
        racha2 = 0;
        contadorBien2 = 0;
        document.getElementById("racha-p1").innerHTML = "Racha: " + racha2;
      }
      if (actual2 < particles2.length) {
        playing2 = particles2[actual2];
      } else playing2 = -1;
    }
  }
}