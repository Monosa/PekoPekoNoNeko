/* En el modo multijugador van a cambiar las teclas, ya qu elo que proponemos con el modo multijugador es 
   que dos jugadores utilicen el mismo teclado para jugar. Las teclas elegidas han sido asdf para el jugador 1
   y jklñ para el jugador 2 (hay que valorar que pasa con otro tipo de teclados??) */

/* ¡¡¡Es necesario debido al modo multijugador crear un conversor de datos de un jugador a multijugador!!!*/

let songid;
let difid;
let tiempos;
let particles = [],
  particles2 = [];
let puntos = 0,
  puntos2 = 0;
let startTime = null;
let actual = 0,
  actual2 = 0;
let playing, playing2;
let settings;
let multiplayer;
let contadorBien = 0,
  contadorBien2 = 0;
let contadorMal = 0,
  contadorMal2 = 0;
let racha = 0,
  racha2 = 0;
let contadorCirculos = 0;
let canvas;
let keys = [], keysPlayer1 = [], keysPlayer2 = [];
let pulsacionesDango1 = 0, pulsacionesDango2 = 0;
let buffUsado = false, buffUsado2 = false;
let contextBg, contextBg2;
let suma, suma2;
//La siguiente variable es el buff que tiene elegido el usuario
/*
Chesire es sumador
Blue es Multiplicador
Pelusa es Salva racha
Logan es Rango acierto mas grande
Perla es sin penalizacion por fallo
Mery es multiplicador dango X3
*/
let buff, buffMulti;

window.onload = function () {
  document.onkeydown = this.clic;
  document.onkeyup = this.keysReleased;

  if (JSON.parse(sessionStorage.getItem("multijugador")) === null) {
    multiplayer = false;
  } else {
    multiplayer = JSON.parse(sessionStorage.getItem("multijugador"));
  }

  buffMulti = document.getElementById("imgMulti").value;
  buff = document.getElementById("img").value;

  drawInitialCanvas();

  settings = {
    density: 1,
    startingX: canvas.width + 25
  };

  let tiempo = document.getElementById("tiempos").innerHTML;
  tiempos = JSON.parse(tiempo);

  cargarJuego();

  sessionStorage.clear();
};

//  Places a background image in a background canvas and draws the square over it
function drawInitialCanvas() {
  let canvasBg = document.getElementById("bg_canvas_1");
  contextBg = canvasBg.getContext("2d");
  canvasBg.width = window.innerWidth;
  canvasBg.height = 300;
  let bgImg = new Image();

  bgImg.src = "../img/image.png";
  bgImg.onload = function () {
    drawPattern(contextBg, canvasBg, bgImg);
  }

  //  Sets the width and height of the canvas in which the circles are going to be drawn
  canvas = document.getElementById("canvas-1");
  canvas.width = window.innerWidth;
  canvas.height = 300;

  if (multiplayer) {
    let canvasBg2 = document.getElementById("bg_canvas_2");
    contextBg2 = canvasBg2.getContext("2d");
    canvasBg2.width = window.innerWidth;
    canvasBg2.height = 300;
    let bgImg2 = new Image();

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

  let plato = new Image();
  plato.src = '../img/Plato.png';
  plato.onload = function () {
    context.drawImage(plato, 30, 60);
  }

  let gifCanvas1 = document.getElementById("gifCanvas1");
  let gifCanvas2 = document.getElementById("gifCanvas2");
  
  if (multiplayer)
    seleccionaGif(buffMulti, gifCanvas2);
  seleccionaGif(buff, gifCanvas1);
  
}

function loadDorayakis(canvas, context) {
  // a ghost canvas that will keep our original image
  //Canvas rojo
  //img c es por chiquito r es por rojo, g es por grande, a es por azul
  let imgcr = new Image();
  let imgca = new Image();
  let imgcd = new Image();
  imgcr.src = "../img/RojoChiquito2.png";
  imgca.src = "../img/AzulEscalado.png";
  imgcd.src = "../img/dango2.png";
  return [imgcr, imgca, imgcd];
}

function animate(time, context, canvas, particles, imgs) {
  // set startTime if it isn't already set
  if (startTime === null) {
    startTime = time;
  }
  // calc elapsedTime
  let elapsedTime = time - startTime;

  context.clearRect(0, 0, canvas.width, canvas.height);

  // assume no further animating is necessary
  // The for-loop may change the assumption 
  let continueAnimating = false;

  for (let i = 0; i < particles.length; i++) {
    let part = particles[i];

    // update this circle & report if it wasMoved
    let wasMoved = update(part, elapsedTime);
    // if it wasMoved, then change assumption to continueAnimating
    if (wasMoved || part.moving) {
      continueAnimating = true;

    }

    // draw this arc at its current position
    drawParticle(part, context, imgs);
  }

  // if update() reported that it moved something
  // then request another animation loop
  if (continueAnimating) {
    window.requestAnimationFrame(function (time) {
      animate(time, context, canvas, particles, imgs)
    });
  }
}

function update(part, elapsedTime) {

  if (elapsedTime >= part.timing) {
    // is this arc still visible on the canvas
    if(part.size !== 1000){
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
    else{
      if (part.x > -728) {
        // if yes+yes, move this arc by the specified moveX
        part.x -= part.vx;
        if (part.x <= -728 / 2) {
          part.moving = false;
        }
        // report that we moved this arc
        return (true);
      } else return (true);
    }
  }
  return (false);
}


function drawParticle(part, context, imgs) {
  //74 y 70 son sushis, 75 68 son dorayakis
  context.beginPath();
  let tam = [0, 0];
  let y = 0;
  if (!multiplayer) {
    //Si el tipo es 1000 es el indicador de que dibujamos el dango
    if(part.size !== 1000){
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
      //En este caso se dibujan dorayakis
      if (part.tecla[0] === 75 || part.tecla[0] === 68) {
        context.drawImage(imgs[0], part.x, y, tam[0], tam[1]);

      }
      //En este caso se dibujan sushis
      else if (part.tecla[0] === 70 || part.tecla[0] === 74) {
        context.drawImage(imgs[1], part.x, y, tam[0], tam[1]);
      }
    }
    //Dibujamos el dango
    else{
      context.drawImage(imgs[2], part.x, 60,728,170);
    }
  }
  //Caso para el multijugador
  else {
    if(part.size !== 1000){
      //Si el primer elemento de tecla es 83 o 68 en el caso del jugador que usa las teclas de la izquierda, 
      //o 75 o 76 en el caso del jugador de la derecha se dibujan las cosas en pequeño
      if (part.tecla[0] === 83 || part.tecla[0] === 65 || part.tecla[0] === 75 || part.tecla[0] === 74) {
        tam = [100, 100];
        y = 100;
      }
      //Si el primer elemento de tecla es 74 o 75 se dibujan en grande
      else if (part.tecla[0] === 68 || part.tecla[0] === 70 || part.tecla[0] === 76 || part.tecla[0] === 192){
          tam = [170, 170];
        y = 60;
      }
      //En este caso se dibujan sushis
      if (part.tecla[0] === 83 || part.tecla[0] === 68 || part.tecla[0] === 76 || part.tecla[0] === 75) {
        context.drawImage(imgs[1], part.x, y, tam[0], tam[1]);
      }
      //En este caso se dibujan dorayakis
      else if (part.tecla[0] === 70 || part.tecla[0] === 74 || part.tecla[0] === 65 || part.tecla[0] === 192) {
        context.drawImage(imgs[0], part.x, y, tam[0], tam[1]);
      }
    }
    else{
      context.drawImage(imgs[2], part.x, 60, 728, 170);
    }
  }
}

function cargarJuego() {
  let canvas2, context2;
  let canvas = document.getElementById("canvas-1");
  let context = canvas.getContext("2d");
  


  if (multiplayer) {
    document.getElementById("bg-player1").style.top = "10%";
    document.getElementById("bg-player2").style.visibility = "visible";
    document.getElementById("cenefa1").style.top = "0%";
    document.getElementById("showrachas1").style.top = "5%";
    document.getElementById("bg-player2").style.top = "60%";
    document.getElementById("rachasMulti").style.visibility = "visible";
    document.getElementById("cenefa2").style.display = "inline";
    canvas2 = document.getElementById("canvas-2");
    context2 = canvas2.getContext("2d");
  }

  $("#player").bind("ended", function () {
    let x = document.getElementById("myAudio");
    x.play();
    comprobar();

    let imgs = loadDorayakis(canvas, context);

    if (multiplayer) {
      loadDorayakis(canvas2, context2);

      for (let i = 0; i < tiempos.length; i++) {
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

    for (let i = 0; i < tiempos.length; i++) {
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
      animate(time, context, canvas, particles, imgs);
    });

    if (multiplayer) {
      window.requestAnimationFrame(function (time) {
        animate(time, context2, canvas2, particles2, imgs);
      });
    }
  });

  $("#myAudio").bind("ended", function () {
    //Si eligió el buff sumador le sumamos 500 puntos al resultado final
    if(buff.localeCompare("Chesire.png") === 0)
      document.getElementById("usePoints").value = puntos + 500;
    else document.getElementById("usePoints").value = puntos;
    if(multiplayer){
      //Si eligió el buff sumador le sumamos 500 puntos al resultado final
      if(buffMulti.localeCompare("Chesire.png") === 0)
        document.getElementById("usePoints2").value = puntos2 + 500;
      else document.getElementById("usePoints2").value = puntos2;
    }
    document.getElementById("multi").value = multiplayer;
    document.forms["submitScore"].submit();
  });
}

//Funcion que se lanza cada vez que hay un clic
function clic(evt) {
  let plato3 = new Image();
  plato3.src = '../img/Plato3.png';
  //Size 1000 implica que es un dango, si es distinto de 1000 es o sushi o dorayaki
  if(playing.size !== 1000){
    //Se supone que se dibujan las cosas en pequeño si son las teclas 68 y 70 la primera tecla (o sea, la de un jugador. En el caso de multijugador eso cambia).
    if (!multiplayer) {
      playing.clicked = true;
      keys[evt.keyCode] = true;
      //Si se requiere pequeño
      if (playing.tecla[0] === 68 || playing.tecla[0] === 70) {
        //Si se pulsa alguna de las teclas (solo 68 o 70 porque ) y es pequeño, y las otras teclas de juego no estan activas, acertamos
        if ((keys[playing.tecla[0]] || keys[playing.tecla[1]]) && (!compruebaActivas(keys, multiplayer, playing.tecla[0], 1))) {
          compruebaAcierto(playing);
          keys = [];
        }
        //fallo
        else {
          //Si eligió el buff mantener racha
          if((buff.localeCompare("Pelusa.png") === 0) && racha >= 4 && !buffUsado){
            buffUsado = true;
          }
          else {
            contadorMal++;
            contadorBien = 0;
            racha = 0;
            //Si eligió a perla como buff no se le resta por fallar repetidas veces
            if(buff.localeCompare("Perla.png") !== 0){
              if (contadorMal >= 2){
                suma = -25;
                puntos += suma;
              }
            }
          }
          plato3.onload = function(){
            contextBg.drawImage(plato3,30,60);
          }
          keys = [];
        }
      }
      //Si se requiere grande
      else if (playing.tecla[0] === 74 || playing.tecla[0] === 75) {
        //Si se pulsan las dos teclas requeridas para grande y es grande, y no estan pulsadas las del otro alimento, acertamos
        //Añadimos una segunda comprobacion en la que se verifica si ha pasado dos veces por clic en el caso de alimentos grandes
        if ((keys[playing.tecla[0]] && keys[playing.tecla[1]]) && (!compruebaActivas(keys, multiplayer, playing.tecla[0], 1)) && keys.filter(Boolean).length === 2) {
          compruebaAcierto(playing);
          keys = [];
        }
        else {
          if(keys.filter(Boolean).length === 2){
            //Si eligió el buff mantener racha
            if((buff.localeCompare("Pelusa.png") === 0) && racha >= 4 && !buffUsado){
              buffUsado = true;
            }
            else {
              contadorMal++;
              contadorBien = 0;
              racha = 0;
              //Si eligió a perla como buff no se le resta por fallar repetidas veces
              if(buff.localeCompare("Perla.png") !== 0){
                if (contadorMal >= 2){
                  suma = -25;
                  puntos += suma;
                }
              }
            }
            plato3.onload = function(){
              contextBg.drawImage(plato3,30,60);
            }
            keys = [];
          }
        }
      }
      //El jugador ha pulsado pero no las teclas indicadas
      else{
        //Si eligió el buff mantener racha
        if((buff.localeCompare("Pelusa.png") === 0) && racha >= 4 && !buffUsado){
          buffUsado = true;
        }
        else {
          contadorMal++;
          contadorBien = 0;
          racha = 0;
          //Si eligió a perla como buff no se le resta por fallar repetidas veces
          if(buff.localeCompare("Perla.png") !== 0){
            if (contadorMal >= 2){
              suma = -25;
              puntos += suma;
            }
          }
        }
        plato3.onload = function(){
          contextBg.drawImage(plato3,30,60);
        }
        keys = [];
      }
    }
    //Multiplayer 
    else {
      keys[evt.keyCode] = true;
      //Comprobamos si ambos jugadores han hecho click:
      if (keys[65] || keys[83] || keys[68] || keys[70]) {
        //El jugador 1 ha pulsado una tecla por lo que:
        playing.clicked = true;
        cambiaTeclas(keys, 1);
                //Pasamos a comprobar de manera individual cada jugador: 
        if (playing.tecla[0] === 65 || playing.tecla[0] === 83) {
          //Si se pulsa alguna de las teclas y es pequeño y solo ha pulsado las teclas correctas, acertamos
          if ((keysPlayer1[playing.tecla[0]] || keysPlayer1[playing.tecla[1]]) && (!compruebaActivas(keys, multiplayer, playing.tecla[0], 1))) {
            compruebaAcierto(playing, 1);
            keysPlayer1 = [];
            keys[playing.tecla[0]] = false;
            keys[playing.tecla[1]] = false;
          }
          else{
            //Si eligió el buff mantener racha
            if((buff.localeCompare("Pelusa.png") === 0) && racha >= 4 && !buffUsado){
              buffUsado = true;
            }
            else {
              contadorMal++;
              contadorBien = 0;
              racha = 0;
              //Si eligió a perla como buff no se le resta por fallar repetidas veces
              if(buff.localeCompare("Perla.png") !== 0){
                if (contadorMal >= 2){
                  suma = -25;
                  puntos += suma;
                }
              }
            }
            plato3.onload = function(){
              contextBg.drawImage(plato3,30,60);
            }
            keysPlayer1 = [];
              keys[68] = false;
              keys[70] = false;
              keys[65] = false;
              keys[83] = false;
          }
        } else if (playing.tecla[0] === 68 || playing.tecla[0] === 70) {
          if ((keysPlayer1[playing.tecla[0]] && keysPlayer1[playing.tecla[1]]) && (!compruebaActivas(keysPlayer1, multiplayer, playing.tecla[0], 1)) && keysPlayer1.filter(Boolean).length === 2) {
            compruebaAcierto(playing, 1);
            keysPlayer1 = [];
            keys[playing.tecla[0]] = false;
            keys[playing.tecla[1]] = false;
          }
          else {
            if(keysPlayer1.filter(Boolean).length === 2){
              //Si eligió el buff mantener racha
              if((buff.localeCompare("Pelusa.png") === 0) && racha >= 4 && !buffUsado){
                buffUsado = true;
              }
              else {
                contadorMal++;
                contadorBien = 0;
                racha = 0;
                //Si eligió a perla como buff no se le resta por fallar repetidas veces
                if(buff.localeCompare("Perla.png") !== 0){
                  if (contadorMal >= 2){
                    suma = -25;
                    puntos += suma;
                  }
                }
              }
              plato3.onload = function(){
                contextBg.drawImage(plato3,30,60);
              }
              keysPlayer1 = [];
              keys[68] = false;
              keys[70] = false;
              keys[65] = false;
              keys[83] = false;
            }
          }
        }
      }
      else if (keys[74] || keys[75] || keys[76] || keys[192]) {
        //El jugador 2 ha pulsado una tecla por lo que:
        playing2.clicked = true;
        cambiaTeclas(keys, 2);
        if (playing2.tecla[0] === 74 || playing2.tecla[0] === 75) {
          //Si se pulsa alguna de las teclas y es pequeño, acertamos
          if (keysPlayer2[playing2.tecla[0]] || keysPlayer2[playing2.tecla[1]] && (!compruebaActivas(keys, multiplayer, playing2.tecla[0], 2))) {
            compruebaAcierto(playing2, 2);
            keysPlayer2 = [];
            keys[playing2.tecla[0]] = false;
            keys[playing2.tecla[1]] = false;
          }
          else {
            contadorMal2++;
            contadorBien2 = 0;
            racha2 = 0;
            //Si eligió a perla como buff no se le resta por fallar repetidas veces
            if(buffMulti.localeCompare("Perla.png") !== 0){
              if (contadorMal2 >= 2){
                suma2 = -25;
                puntos2 += suma2;
              }
            }
            }
            plato3.onload = function(){
              contextBg2.drawImage(plato3,30,60);
            }
        } else if (playing2.tecla[0] === 76 || playing2.tecla[0] === 192) {
            if ((keysPlayer2[playing2.tecla[0]] && keysPlayer2[playing2.tecla[1]]) && (!compruebaActivas(keysPlayer2, multiplayer, playing2.tecla[0], 2)) && keysPlayer2.filter(Boolean).length === 2) {
              compruebaAcierto(playing2, 2);
              keysPlayer2 = [];
              keys[playing2.tecla[0]] = false;
              keys[playing2.tecla[1]] = false;
            }
            else {
              if(keysPlayer2.filter(Boolean).length === 2){
                //Si eligió el buff mantener racha
                if((buffMulti.localeCompare("Pelusa.png") === 0) && racha >= 4 && !buffUsado2){
                  buffUsado2 = true;
                }
                else {
                  contadorMal2++;
                  contadorBien2 = 0;
                  racha2 = 0;
                  //Si eligió a perla como buff no se le resta por fallar repetidas veces
                  if(buffMulti.localeCompare("Perla.png") !== 0){
                    if (contadorMal2 >= 2){
                      suma2 = -25;
                      puntos2 += suma2;
                    }
                  }
                }
                plato3.onload = function(){
                  contextBg2.drawImage(plato3,30,60);
                }
                keysPlayer2 = [];
                keys[74] = false;
                keys[75] = false;
                keys[76] = false;
                keys[192] = false;
              }
            }
          }
        }
      }
    }
    else{
      //Caso un jugador para dango
      if(!multiplayer){
        if(playing.x <= 115 && (evt.keyCode === 68 || evt.keyCode === 70 || evt.keyCode === 74 || evt.keyCode === 75)){
          pulsacionesDango1 += 1;
        }
      }
      //Multijugador para dango
      else{
        if(playing.x <= 115 && (evt.keyCode === 65 || evt.keyCode === 83 || evt.keyCode === 68 || evt.keyCode === 70)){
          pulsacionesDango1 += 1;
        }
        if(playing2.x <= 115 && (evt.keyCode === 74 || evt.keyCode === 75 || evt.keyCode === 76 || evt.keyCode === 192)){
          pulsacionesDango2 += 1;
        }
      }
      keys = [];
    } 
}
//Funcion que comprueba si aparte de las teclas correctas ha pulsado las incorrectas. Devuelve true si lo ha hecho mal
function compruebaActivas(keys, multi, tecla, jugador){
  let resul = false;
  if(!multi){
    if(tecla === 68 || tecla === 75){
      if(keys[70] || keys[74]) resul = true;
    }
    else if(tecla === 70 || tecla === 74){
      if(keys[68] || keys[75]) resul = true;
    }
  }
  else{
    if(jugador === 1){
      if(tecla === 68 || tecla === 83){
        if(keys[70] || keys[65]) resul = true;
      }
      else if(tecla === 70 || tecla === 65){
        if(keys[68] || keys[83]) resul = true;
      }
    }
    else {
      if(tecla === 74 || tecla === 192){
        if(keys[76] || keys[75]) resul = true;
      }
      else if(tecla === 75 || tecla === 76){
        if(keys[192] || keys[74]) resul = true;
      }
    }
  }
  return resul;
}
function cambiaTeclas(keys, player) {
  if (keys[65] || keys[83] || keys[68] || keys[70]) {
    //Las teclas del jugador 1 estan activas por lo que movemos esas teclas a un array propio
    if (keys[65])
      keysPlayer1[65] = true;
    if (keys[83])
      keysPlayer1[83] = true;
    if (keys[68])
      keysPlayer1[68] = true;
    if (keys[70])
      keysPlayer1[70] = true;
  } 
  if (keys[74] || keys[75] || keys[76] || keys[192]) {
    if (keys[74])
      keysPlayer2[74] = true;
    if (keys[75])
      keysPlayer2[75] = true;
    if (keys[76])
      keysPlayer2[76] = true;
    if (keys[192])
      keysPlayer2[192] = true;
  }
}


//A esta función solo se llega si se han pulsado las teclas adecuadas. Se encarga de comprobar si la posicion del alimento coincide con el plato, y en qué medida
function compruebaAcierto(playing, player) {
  let plato2 = new Image();
  plato2.src = '../img/Plato2.png';
  let plato3 = new Image();
  plato3.src = '../img/Plato3.png';
  let res, res2;
  if (!multiplayer) {
    if ((playing.x >= 20 && playing.x <= 69) || (playing.x >= 91 && playing.x <= 140)) {
      contadorMal = 0;
      contadorBien++;
      res = rachas(50, contadorBien);
      racha = res[0];
      if(racha != 0){
        //Si eligió el buff multiplicador, multiplicamos sus puntos por 1.5
        if(buff.localeCompare("Blue.png") === 0){
          suma = res[1] * 1.5;
          puntos += suma;
        }
        else {
          suma = res[1];
          puntos += suma;
        } 
      }
      plato2.onload = function(){
        contextBg.drawImage(plato2,30,60);
      }
    } else if (playing.x >= 70 && playing.x <= 90) {
      contadorMal = 0;
      contadorBien++;
      res = rachas(100, contadorBien);
      racha = res[0];
      if(racha != 0){
        //Si eligió el buff multiplicador, multiplicamos sus puntos por 1.5
        if(buff.localeCompare("Blue.png") === 0){
          suma = res[1] * 1.5;
          puntos += suma;
        }
        else{
          suma = res[1];
          puntos += suma;
        }
      }

      plato2.onload = function(){
        contextBg.drawImage(plato2,30,60);
      }
    } 
    //Si elige el buff de logan el rango de acierto se amplia
    else if ((buff.localeCompare("Logan.png") === 0) && (playing.x >= 5 && playing.x <= 69) || (playing.x >= 91 && playing.x <= 155)){
      contadorMal = 0;
      contadorBien++;
      res = rachas(50, contadorBien);
      racha = res[0];
      if(racha != 0){
        suma = res[1];
        puntos += suma;
      }
      plato2.onload = function(){
        contextBg.drawImage(plato2,30,60);
      }
    }
    else {
      //Si eligió el buff mantener racha
      if((buff.localeCompare("Pelusa.png") === 0) && racha >= 4 && !buffUsado){
        res = rachas(100, contadorBien);
        racha = res[0];
        buffUsado = true;
        suma = null;
      }
      else{
        contadorMal++;
        contadorBien = 0;
        racha = 0;
        //Si eligió a perla como buff no se le resta por fallar repetidas veces
        if(buff.localeCompare("Perla.png") !== 0){
          if (contadorMal >= 2){
            suma = -25;
            puntos += suma;
          }
          else suma = null;
        }
      }
      plato3.onload = function(){
        contextBg.drawImage(plato3,30,60);
      }
    }
  } else {
    if (player === 1) {
      if ((playing.x >= 20 && playing.x <= 69) || (playing.x >= 91 && playing.x <= 140)) {
        contadorMal = 0;
        contadorBien++;
        res = rachas(50, contadorBien);
        racha = res[0];
        if(racha != 0){
          //Si eligió el buff multiplicador, multiplicamos sus puntos por 1.5
          if(buff.localeCompare("Blue.png") === 0){
            suma = res[1] * 1.5;
            puntos += suma;
          }
          else {
            suma = res[1];
            puntos += suma;
          }
        }
        plato2.onload = function(){
          contextBg.drawImage(plato2,30,60);
        }
      } else if (playing.x >= 70 && playing.x <= 90) {
        contadorMal = 0;
        contadorBien++;
        res = rachas(100, contadorBien);
        racha = res[0];
        if(racha != 0){
          //Si eligió el buff multiplicador, multiplicamos sus puntos por 1.5
          if(buff.localeCompare("Blue.png") === 0){
            suma = res[1] * 1.5;
            puntos += suma;
          }
          else {
            suma = res[1];
            puntos += suma;
          }
        }
        plato2.onload = function(){
          contextBg.drawImage(plato2,30,60);
        }
      }
      //Si elige el buff de logan el rango de acierto se amplia
      else if ((buff.localeCompare("Logan.png") === 0) && (playing.x >= 5 && playing.x <= 69) || (playing.x >= 91 && playing.x <= 155)){
        contadorMal = 0;
        contadorBien++;
        res = rachas(50, contadorBien);
        racha = res[0];
        if(racha != 0){
          suma = res[1];
          puntos += suma;
        }
        plato2.onload = function(){
          contextBg.drawImage(plato2,30,60);
        }
      } 
      //Jugador 1 falla
      else {
        //Si eligió el buff mantener racha
        if((buff.localeCompare("Pelusa.png") === 0) && racha >= 4 && !buffUsado){
          res = rachas(100, contadorBien);
          racha = res[0];
          buffUsado = true;
          suma = null;
        }
        else{
          contadorMal++;
          contadorBien = 0;
          racha = 0;
          if(buff.localeCompare("Perla.png") !== 0){
            if (contadorMal >= 2){
              suma = -25;
              puntos += suma;
            }
            else suma = null;
          }
        }
        plato3.onload = function(){
          contextBg.drawImage(plato3,30,60);
        }
      }
    } else if (player === 2) {
      if ((playing2.x >= 20 && playing2.x <= 69) || (playing2.x >= 91 && playing2.x <= 140)) {
        contadorMal2 = 0;
        contadorBien2++;
        res2 = rachas(50, contadorBien2);
        racha2 = res2[0];
        if(racha2 != 0){
          //Si eligió el buff multiplicador, multiplicamos sus puntos por 1.5
          if(buffMulti.localeCompare("Blue.png") === 0){
            suma2 = res2[1] * 1.5;
            puntos2 += suma2;
          }
          else {
            suma2 = res2[1];
            puntos2 += suma2;
          }
        }
        plato2.onload = function(){
          contextBg2.drawImage(plato2,30,60);
        }
      } else if (playing2.x >= 70 && playing2.x <= 90) {
        contadorMal2 = 0;
        contadorBien2++;
        res2 = rachas(100, contadorBien2);
        racha2 = res2[0];
        if(racha2 != 0){
          //Si eligió el buff multiplicador, multiplicamos sus puntos por 1.5
          if(buffMulti.localeCompare("Blue.png") === 0){
            suma2 = res2[1] * 1.5;
            puntos2 += suma2;
          }
          else {
            suma2 = res2[1];
            puntos2 += suma2;
          }
        }
        plato2.onload = function(){
          contextBg2.drawImage(plato2,30,60);
        }
      } 
      //Si elige el buff de logan el rango de acierto se amplia
      else if ((buffMulti.localeCompare("Logan.png") === 0) && (playing2.x >= 5 && playing2.x <= 69) || (playing2.x >= 91 && playing2.x <= 155)){
        contadorMal2 = 0;
        contadorBien2++;
        res2 = rachas(50, contadorBien2);
        racha2 = res2[0];
        if(racha2 != 0){
          suma2 = res2[1];
          puntos2 += suma2;
        }
        plato2.onload = function(){
          contextBg2.drawImage(plato2,30,60);
        }
      }
      else {
        //Si eligió el buff mantener racha
        if((buffMulti.localeCompare("Pelusa.png") === 0) && racha2 >= 4 && !buffUsado2){
          res2= rachas(100, contadorBien);
          racha2 = res2[0];
          buffUsado2 = true;
          suma2 = null;
        }
        else{
          contadorMal2++;
          contadorBien2 = 0;
          racha2 = 0;
          if(buffMulti.localeCompare("Perla.png") !== 0){
            if (contadorMal2 >= 2){
              suma2 = -25;
              puntos2 += suma2;
            }
            else suma2 = null;
          }
        }
        plato3.onload = function(){
          contextBg2.drawImage(plato3,30,60);
        }
      }
    }
  }
  
  go(puntos, suma, false);
  

  if (multiplayer) {
    go(puntos2, suma2, true);
  }
}

//Devuelve el computo de puntos y la racha
function rachas(puntos, contadorBien) {
  if (contadorBien >= 2 && contadorBien < 6)
    return [2, puntos * 2];
  else if (contadorBien >= 6 && contadorBien < 10)
    return [3, puntos * 3];
  else if (contadorBien >= 10)
    return [4, puntos * 4];
  else return [1, puntos];
}

function comprobar() {
  setInterval(comprueba, 1);
}


function comprueba() {
  if(playing.size !== 1000){
    if (playing !== -1 && playing.x <= 0) {
      actual += 1;      
      if (!playing.clicked) {
        let platoNormal = new Image();
        platoNormal.src = '../img/Plato.png';
        platoNormal.onload = function(){
          contextBg.drawImage(platoNormal,30,60);
        }
        racha = 0;
        contadorBien = 0;
        contadorMal++;
        suma = -25;
        puntos += suma;
        go(puntos, suma, false);
        //document.getElementById("racha-p1").innerHTML = "Racha: " + racha;
      }
      if (actual < particles.length) {
        playing = particles[actual];
      } else playing = -1;
    }
    
    if(racha === 2){
      document.getElementById("one").style.display = "inline";
      document.getElementById("number2").style.display = "inline";
    }
    else if(racha === 3){
      document.getElementById("three").style.display = "inline";
      document.getElementById("number3").style.display ="inline";
      document.getElementById("number2").style.display = "none";
    }
    else if(racha === 4){
      document.getElementById("five").style.display = "inline";
      document.getElementById("number4").style.display ="inline";
      document.getElementById("max").style.display ="inline";
      document.getElementById("number3").style.display = "none";
    }
    else if(racha === 0){
      document.getElementById("one").style.display = "none";
      document.getElementById("three").style.display = "none";
      document.getElementById("five").style.display = "none";
      document.getElementById("number2").style.display = "none";
      document.getElementById("number3").style.display = "none";
      document.getElementById("number4").style.display = "none";
      document.getElementById("max").style.display = "none";
    }

    if (multiplayer) {
      if (playing2 !== -1 && playing2.x <= 0) {
        actual2 += 1;
        if (!playing2.clicked) {
          let platoNormal2 = new Image();
          platoNormal2.src = '../img/Plato.png';
          platoNormal2.onload = function(){
            contextBg2.drawImage(platoNormal2,30,60);
        }
          racha2 = 0;
          contadorBien2 = 0;
          contadorMal2 += 1;
          suma2 = -25;
          puntos2 += suma2;
          go(puntos2, suma2, true);
          //document.getElementById("racha-p1").innerHTML = "Racha: " + racha2;
        }
        if (actual2 < particles2.length) {
          playing2 = particles2[actual2];
        } 
        else playing2 = -1;
      }
      if(racha2 === 2){
        document.getElementById("one2").style.display = "inline";
        document.getElementById("number22").style.display = "inline";
      }
      else if(racha2 === 3){
        document.getElementById("three2").style.display = "inline";
        document.getElementById("number32").style.display ="inline";
        document.getElementById("number22").style.display = "none";
      }
      else if(racha2 === 4){
        document.getElementById("five2").style.display = "inline";
        document.getElementById("number42").style.display ="inline";
        document.getElementById("max2").style.display ="inline";
        document.getElementById("number32").style.display = "none";
      }
      else if(racha2 === 0){
        document.getElementById("one2").style.display = "none";
        document.getElementById("three2").style.display = "none";
        document.getElementById("five2").style.display = "none";
        document.getElementById("number22").style.display = "none";
        document.getElementById("number32").style.display = "none";
        document.getElementById("number42").style.display = "none";
        document.getElementById("max2").style.display = "none";
      }
    }
  }
  //Dango
  else{
    if(playing !== -1 && playing.x < -500){
      if(buff.localeCompare("Blue.png") === 0){
        suma = pulsacionesDango1 * 100 * 1.5;
        puntos += suma;
      }
      else if(buff.localeCompare("Mery.png") === 0){
        suma = pulsacionesDango1 * 300;
        puntos += suma;
      }
      else {
        suma = pulsacionesDango1 * 100;
        puntos += suma;
      }
      actual += 1;
      go(puntos, suma, false);

      if (actual < particles.length) {
        playing = particles[actual];
      } else playing = -1;
      if (multiplayer) {
        if (playing2 !== -1 && playing2.x < -500) {
          if(buffMulti.localeCompare("Blue.png") === 0){
            suma2 = pulsacionesDango2 * 100 * 1.5;
            puntos2 += suma2;
          }
          else if(buffMulti.localeCompare("Mery.png") === 0){
            suma2 = pulsacionesDango2 * 300;
            puntos2 += suma2;
          }
          else {
            suma2 = pulsacionesDango2 * 100;
            puntos2 += suma2;
          }
          actual2 += 1;
          go(puntos2, suma2, true);
          if (actual2 < particles2.length) {
            playing2 = particles2[actual2];
          } else playing2 = -1;
        }
      }
    }
  }
}

function seleccionaGif(buffParam, canvasParam){
  let ruta = "";
  if(buffParam.localeCompare("Pelusa.png") === 0)  
      ruta = '../img/Pelusa.gif';
  else if(buffParam.localeCompare("Logan.png") === 0)
    ruta = '../img/Logan.gif';
  else if(buffParam.localeCompare("Mery.png") === 0)
    ruta = '../img/Mery.gif';
  else if(buffParam.localeCompare("Chesire.png") === 0)
    ruta = '../img/Chesire.gif';
  else if(buffParam.localeCompare("Blue.png") === 0)
    ruta = '../img/Blue.gif';
  else if(buffParam.localeCompare("Perla.png") === 0)
    ruta = '../img/Perla.gif';
  gifler(ruta).animate(canvasParam);
}

//Prueba puntuaciones

function go(points, sum, multi){
  if(sum !== undefined && sum !== null && sum !== "undefined"){
    let newsum;
    if(Math.sign(sum) === 1) newsum = "+" + sum;
    else newsum = sum;
    let stri = "", ta = "";
    if(multi){ stri = "#puntos-p2"; ta = "#tag2";}
    else {stri = "#puntos-p1"; ta = "#tag1";}
    $({puntos: points - sum}).animate({puntos: points},{
      duration: 1000,
      easing:"linear",
      step: function(now, fx){
        $(stri).html(Math.floor(now));
      },
      queue:false
    });
    $(ta).fadeIn({
      duration:700,
      easing:"linear",
      step:function(now, fx){
        $(this).css("top", -55 * now  +"px");
      }
    }).fadeOut({
      duration:300,
      step:function(now, fx){
        $(this).css("top",-55 * ( 2 - now) + "px");
      }
    }).html(newsum);
  }
}