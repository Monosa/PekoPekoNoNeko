var songid;
var difid;
var tiempos;
var particles = [];
var puntos = 0, puntos2 = 0;
var startTime = null;
var actual = 0;
var playing;
var settings;
var multiplayer = false;
var contadorBien = 0;
var contadorMal = 0;
var racha = 0;
var contadorCirculos = 0;
var canvas;
var keys = [];

window.onload = function () {
  document.onkeydown = this.clic;
  document.onkeyup = this.keysReleased;

  iniciarPuntosyRacha();
  drawInitialCanvas();

  settings = {
    density: 1,
    startingX: canvas.width + 25
    //startingY: 0
  };
  var alrededor = new this.Image();
  alrededor.src = "../img/alrededor.png";
  alrededor.onload = function(){

  }

  var tiempo = document.getElementById("tiempos").innerHTML;
  tiempos = JSON.parse(tiempo);
  
  cargarJuego();

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
  plato.onload = function(){
    context.drawImage(plato,30,60);
  }
  var gifCanvas = document.getElementById("gifCanvas");
  
  gifler('../img/Gatete.gif').animate(gifCanvas);
}


function cargarJuego() {
  $("#player").bind("ended", function () {
    var x = document.getElementById("myAudio");
    //Aqui vamos a poner el audio que necesitamos
    //x.src = '../media/' + 
    x.play();
    comprobar();

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
    

    loadDorayakis(canvas, context);
    

    if (multiplayer) {
      canvas2 = document.getElementById("canvas-2");
      context2 = canvas2.getContext("2d");
    }
    
    for (var i = 0; i < tiempos.length; i++) {
      particles.push({
        x: settings.startingX,
        //y: settings.startingY,
        timing: tiempos[i].tiempo,
        size: tiempos[i].tipo,
        vx: 25,
        moving: true,
        clicked: false,
        tecla: tiempos[i].tecla,
        tecla2: tiempos[i].tecla2,
      });
      
    }
    
    playing = particles[0];
    


    window.requestAnimationFrame(animate);

    function animate(time) {
      // set startTime if it isn't already set
      
      if (startTime === null) {
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
      {
        window.requestAnimationFrame(animate);
      }
        
        
    }

    function update(part, elapsedTime) {
      
      if (elapsedTime >= part.timing) {
        // is this arc still visible on the canvas
        if (part.x > -part.size/2) {
          // if yes+yes, move this arc by the specified moveX
          part.x -= part.vx;
          if (part.x <= -part.size/2) {
            part.moving = false;
          }
          // report that we moved this arc
          return (true);
        }
        else return (true);
      }
      
      return (false);
    }

    function loadDorayakis(canvas, context){
          // a ghost canvas that will keep our original image
      //Canvas rojo

     
      //img c es por chiquito r es por rojo, g es por grande, a es por azul
      var imgcr = new Image();
      var imgca = new Image();

      imgcr.onload = function() {
        context.drawImage(imgcr, 0, 0, canvas.width, canvas.height);
        rCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
        //requestAnimationFrame(animate);
      }
      imgcr.src = "../img/RojoChiquito2.png";
      
      imgca.onload = function() {
        context.drawImage(imgca, 0, 0, canvas.width, canvas.height);
        aCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
        //requestAnimationFrame(animate);
      }
      imgca.src = "../img/AzulEscalado.png";
    }
    function drawParticle(part) {
      //74 y 70 son sushis, 75 68 son dorayakis
      context.beginPath();
      var tam = [0,0];
      var y = 0;
      //Si el primer elemento de tecla es 100 o 102 se dibijan las cosas en pequeño
      if(part.tecla[0] === 68 || part.tecla[0] === 70){
        tam = [100,100];
        y = 100;
      }
      //Si el primer elemento de tecla es 74 o 75 se dibujan en grande
      else{
        if(part.tecla[0] === 74)
          tam = [170,170];  
          y = 60;
      }
      //En este caso se dibujan sushis
      if (part.tecla[0] === 75 || part.tecla[0] === 68){
        context.drawImage(rCanvas, part.x, y, tam[0], tam[1]);
              
      }
      //En este caso se dibujan dorayakis
      else if (part.tecla[0] === 70 || part.tecla[0] === 74){
        context.drawImage(aCanvas, part.x, y, tam[0], tam[1]);
      }
      //context.arc(part.x, part.y, part.size, 0, Math.PI * 2);
      //context.fill();

      if (multiplayer) {
        context2.beginPath();
        if (part.tecla2 === 107)
          context2.fillStyle = "cyan";
        else if (part.tecla2 === 106)
          context2.fillStyle = "red";
        context2.arc(part.x, part.y, part.size, 0, Math.PI * 2);
        context2.fill();
      }
     
    }

  });

  $("#myAudio").bind("ended", function(){
      document.getElementById("usePoints").value = puntos;
      
      document.forms["submitScore"].submit();
  });

}


function clic (evt) { 
  //Se supone que se dibujan las cosas en pequeño si son las teclas 100 y 102 la primera tecla
  playing.clicked=true;
  keys[evt.keyCode] = true;
  //Si se requiere pequeño
  if(playing.tecla[0] === 68 || playing.tecla[0] === 70){
    //Si se pulsa alguna de las teclas y es pequeño, acertamos
    if (keys[playing.tecla[0]] || keys[playing.tecla[1]]){
      compruebaAcierto(evt); 
      ponAFalse(keys);
    }
  }
  //Si se requiere grande
  else if(playing.tecla[0] === 74 || playing.tecla[0] === 75){
    //Si se pulsan las dos teclas requeridas para grande y es grande acertamos
    if (keys[playing.tecla[0]] && keys[playing.tecla[1]]){
      compruebaAcierto(evt);
      ponAFalse(keys);
    }
  }
  
}

/*function keysReleased(e) {
	// mark keys that were released
	keys[e.keyCode] = false;
}*/
function ponAFalse(keys){
  keys[68] = false;
  keys[70] = false;
  keys[74] = false;
  keys[75] = false;
}
function compruebaAcierto(e){
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

  document.getElementById("puntos-p1").innerHTML = "Puntos: " + puntos;
  document.getElementById("racha-p1").innerHTML = "Racha: " + racha;

  //if (multiplayer)
    //document.getElementById("puntos-p1").innerHTML = "Puntos jugador 1: " + puntos;
}
//Devuelve el computo de puntos y la racha
function rachas(puntos, contadorBien){
  if(contadorBien>= 2 && contadorBien < 6)
    return [2,puntos * 2];
  else if(contadorBien >= 6 && contadorBien < 10)
    return [3,puntos * 3];
  else if(contadorBien>=10 && contadorBien < 15)
    return [4,puntos * 4];
  else if(contadorBien>= 15 && contadorBien< 20)
    return [5,puntos * 5];
  else if(contadorBien>= 20)
    return [10,puntos * 10];
  else return [1,puntos];
}

function iniciarPuntosyRacha() {
  document.getElementById("puntos-p1").innerHTML = "Puntos: " + puntos;
  document.getElementById("racha-p1").innerHTML = "Racha: " + racha;
  if (multiplayer) {
    document.getElementById("puntos-p1").innerHTML = "Puntos jugador 1: " + puntos;
    var p2 = document.getElementById("puntos-p2");
    p2.style.visibility = "visible";
    p2.innerHTML = "Puntos jugador 2: " + puntos2;
  }
}


function comprobar() {
  setInterval(comprueba, 1);
  
}

function comprueba() {
  if (playing !== -1 && playing.x <= 0) {
    actual += 1;
    contadorCirculos += 1;
    document.getElementById("Contador").innerHTML = "Circulos: " + contadorCirculos;
    if(!playing.clicked){
      racha = 0;
      contadorBien = 0;
      document.getElementById("racha-p1").innerHTML = "Racha: " + racha;
    }
    if (actual < particles.length) {
      playing = particles[actual];
      console.log(playing);
    } else playing = -1;
  }
}


