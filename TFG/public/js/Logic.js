//La letra j es la tecla 106 y la k es la 107
let obj = { tiempos: [] };
let objMulti = { tiempos: [] };
let objTercios = { tiempos: [] };
let objMultiTercios = { tiempos: [] };
let objMitad = { tiempos: [] };
let objMultiMitad = { tiempos: [] };
let multiplayer = false;
let mss;
let cuentaAtras = false;
let timeLeft;
let keys = [];


window.onload = function () {
  document.onkeydown = this.mostrarInformacionTecla;
  drawInitialCanvas();

  document.getElementById("empezar").onclick = function () {
    let x = document.getElementById("myAudio");
    mss = new Date().getTime();
    x.play();
  }

  document.getElementById("myAudio").onended = function () {
    calcula();
    document.getElementById("descarga").style.display = "block";
  }

  document.getElementById("descarga").onclick = function () {

    document.getElementById("value").value = JSON.stringify(obj);
    document.getElementById("valueMulti").value = JSON.stringify(objMulti);
    document.getElementById("valueTercios").value = JSON.stringify(objTercios);
    document.getElementById("valueMultiTercios").value = JSON.stringify(objMultiTercios);
    document.getElementById("valueMitad").value = JSON.stringify(objMitad);
    document.getElementById("valueMultiMitad").value = JSON.stringify(objMultiMitad);
    document.forms["submitCreatedLevel"].submit();

  }
};

//  Places a background image in a background canvas and draws the square over it
function drawInitialCanvas() {
  let canvasBg = document.getElementById("bg_canvas_1");
  let contextBg = canvasBg.getContext("2d");
  canvasBg.width = window.innerWidth;
  canvasBg.height = 300;
  let bgImg = new Image();

  bgImg.src = "../img/image.png";
  bgImg.onload = function () {
    drawPattern(contextBg, canvasBg, bgImg);
  }
  let alrededor = new Image();
  alrededor.src = "../img/alrededor.png";
  alrededor.onload = function () {
    contextBg.drawImage(alrededor, 30, 60);
  }

  //  Sets the width and height of the canvas in which the circles are going to be drawn
  canvas = document.getElementById("canvas-1");
  canvas.width = window.innerWidth;
  canvas.height = 300;

  if (multiplayer) {
    let player2 = document.getElementById("bg-player2");
    player2.setAttribute("visibility", "visible");

    let canvasBg2 = document.getElementById("bg_canvas_2");
    let contextBg2 = canvasBg.getContext("2d");
    canvasBg2.width = window.innerWidth;
    canvasBg2.height = 300;
    let bgImg2 = new Image();

    bgImg2.src = "../img/image.png";
    bgImg2.onload = function () {
      drawPattern(contextBg2, canvasBg2, bgImg2);
    }
    let alrededor2 = new Image();
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

  let plato = new Image();
  plato.src = '../img/Plato.png';
  plato.onload = function () {
    context.drawImage(plato, 30, 60);
  }

  let gifCanvas = document.getElementById("gifCanvas");

  gifler('../img/Gatete.gif').animate(gifCanvas);
}

function download_song() {
  let file = new Blob(tiempos, {
    type: 'text/plain'
  });
  let x = document.getElementById("descarga");
  x.download = "archivo.txt";
}

function mostrarInformacionTecla(evObject) {
  if (!cuentaAtras) {
    let tecla = evObject.keyCode;
    muestraPulsado(tecla);
    let teclaMulti1, teclaMulti2;
    keys[tecla] = true;
    let t = {
      tiempo: new Date().getTime() - mss,
      tecla: [tecla, complementario(tecla)]
    }
    if (tecla === 68 || tecla === 75) {
      teclaMulti1 = [83, 68];
      teclaMulti2 = [75, 76];
    }
    else if (tecla === 70 || tecla === 74) {
      teclaMulti1 = [65, 70];
      teclaMulti2 = [74, 192];
    }

    let tMulti = {
      tiempo: new Date().getTime() - mss + 2000,
      tecla: teclaMulti1,
      tecla2: teclaMulti2
    }

    if (tecla === 68 || tecla === 70) {
      t.tipo = 300;
      tMulti.tipo = 300;
    } else if (tecla === 74 || tecla == 75) {
      t.tipo = 600
      tMulti.tipo = 600;
    }
    else if (tecla === 71 || tecla === 72) {
      //Esto implica que quiere dibujar un dango
      //Al dibujar un dango tenemos que dejar un espacio suficiente para que no se añadan mas
      //sushis o dorayakis o dangos mientras este se fuera a mostrar
      cuentaAtras = true;
      timeLeft = new Date().getTime() + 4000;
      t.tipo = 1000;
      tMulti.tipo = 1000;
    }

    obj.tiempos.push(t);
    objMulti.tiempos.push(tMulti);
  }
  else {
    if (timeLeft < new Date().getTime())
      cuentaAtras = false;
  }
}
function calcula() {
  obj.tiempos.forEach(function (value, i) {
    if (i % 2 === 0)
      objMitad.tiempos.push(value);
  });
  objMulti.tiempos.forEach(function (value, i) {
    if (i % 2 === 0)
      objMultiMitad.tiempos.push(value);
  });
  obj.tiempos.forEach(function (value, i) {
    if (i % 3 !== 0)
      objTercios.tiempos.push(value);
  });
  objMulti.tiempos.forEach(function (value, i) {
    if (i % 3 !== 0)
      objMultiTercios.tiempos.push(value);
  });
}

function complementario(tecla) {
  if (tecla === 68)
    return 75;
  else if (tecla === 70)
    return 74;
  else if (tecla === 75)
    return 68;
  else if (tecla === 74)
    return 70;
}
function muestraPulsado(tecla) {
  switch (tecla) {
    case 68:
      document.getElementById("sushgrand").style.display = "block";
      document.getElementById("sushchiq").style.display = "none";
      document.getElementById("dang").style.display = "none";
      document.getElementById("dorchiq").style.display = "none";
      document.getElementById("dorgrand").style.display = "none";
      break;
    case 75:
      document.getElementById("sushgrand").style.display = "none";
      document.getElementById("sushchiq").style.display = "none";
      document.getElementById("dang").style.display = "none";
      document.getElementById("dorchiq").style.display = "block";
      document.getElementById("dorgrand").style.display = "none";
      break;
    case 74:
      document.getElementById("sushgrand").style.display = "none";
      document.getElementById("sushchiq").style.display = "block";
      document.getElementById("dang").style.display = "none";
      document.getElementById("dorchiq").style.display = "none";
      document.getElementById("dorgrand").style.display = "none";
      break;
    case 70:
      document.getElementById("sushgrand").style.display = "none";
      document.getElementById("sushchiq").style.display = "none";
      document.getElementById("dang").style.display = "none";
      document.getElementById("dorchiq").style.display = "none";
      document.getElementById("dorgrand").style.display = "block";
      break;
    case 71:
      document.getElementById("sushgrand").style.display = "none";
      document.getElementById("sushchiq").style.display = "none";
      document.getElementById("dang").style.display = "block";
      document.getElementById("dorchiq").style.display = "none";
      document.getElementById("dorgrand").style.display = "none";
      break;
    case 72:
      document.getElementById("sushgrand").style.display = "none";
      document.getElementById("sushchiq").style.display = "none";
      document.getElementById("dang").style.display = "block";
      document.getElementById("dorchiq").style.display = "none";
      document.getElementById("dorgrand").style.display = "none";
      break;
  }

}