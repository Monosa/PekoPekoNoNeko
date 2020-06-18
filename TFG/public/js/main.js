let circles;
let particles = [], particles2 = [];
let score = 0, score2 = 0;
let startTime = null;
let actual = 0, actual2 = 0;
let playing, playing2;
let multiplayer;
let hits = 0, hits2 = 0;
let misses = 0, misses2 = 0;
let streak = 0, streak2 = 0;
let canvas;
let dangoStrokes1 = 0, dangoStrokes2 = 0;
let usedAvatar = false, usedAvatar2 = false;
let backgroundContext, backgroundContext2;
let sum, sum2;
let avatar, avatar2;

/*
Chesire es sumador
Blue es Multiplicador
Pelusa es Salva streak
Logan es Rango acierto mas grande
Perla es sin penalizacion por fallo
Mery es multiplicador dango X3
*/


window.onload = function () {
  document.onkeydown = this.click;
  document.onkeyup = this.keysReleased;

  // Checks if the game if going to be played on multiplayer mode
  if (JSON.parse(sessionStorage.getItem("multijugador")) === null) {
    multiplayer = false;
  } else {
    multiplayer = JSON.parse(sessionStorage.getItem("multijugador"));
  }

  // Stores the buffs of the two different players
  avatar2 = document.getElementById("imgMulti").value;
  avatar = document.getElementById("img").value;

  // Draws the backgroud canvas
  drawInitialCanvas();

  // Reads the song secuence 
  let sequence = document.getElementById("sequence").innerHTML;
  circles = JSON.parse(sequence);

  loadGame();

  sessionStorage.clear();
};

//  Places a background image in a background canvas and sets the width and height of the canvas in which the circles are going to be drawn
function drawInitialCanvas() {
  // Background canvas for player 1
  let backgroundCanvas = document.getElementById("bg_canvas_1");
  backgroundContext = backgroundCanvas.getContext("2d");
  backgroundCanvas.width = window.innerWidth;
  backgroundCanvas.height = 300;
  let backgroundImg = new Image();

  backgroundImg.src = "../img/esterilla.png";
  backgroundImg.onload = function () {
    drawPattern(backgroundContext, backgroundCanvas, backgroundImg);
  }

  // Main canvas for player 1
  canvas = document.getElementById("canvas-1");
  canvas.width = window.innerWidth;
  canvas.height = 300;

  if (multiplayer) {
    // Background canvas for player 2
    let backgroundCanvas2 = document.getElementById("bg_canvas_2");
    backgroundContext2 = backgroundCanvas2.getContext("2d");
    backgroundCanvas2.width = window.innerWidth;
    backgroundCanvas2.height = 300;
    let backgroundImg2 = new Image();

    backgroundImg2.src = "../img/esterilla.png";
    backgroundImg2.onload = function () {
      drawPattern(backgroundContext2, backgroundCanvas2, backgroundImg2);
    }

    // Main canvas for player 2
    canvas2 = document.getElementById("canvas-2");
    canvas2.width = window.innerWidth;
    canvas2.height = 300;
  }
}

// Draws the target position and the avatar of the players
function drawPattern(context, canvas, backgroundImg) {
  // Fills the background canvas with the passed image
  context.fillStyle = context.createPattern(backgroundImg, "repeat-x");
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draws the target position
  let plato = new Image();
  plato.src = '../img/Plato.png';
  plato.onload = function () {
    context.drawImage(plato, 30, 60);
  }

  // Draws the avatar of the players on the canvas
  let gifCanvas1 = document.getElementById("gifCanvas1");
  let gifCanvas2 = document.getElementById("gifCanvas2");

  if (multiplayer)
    drawGif(avatar2, gifCanvas2);

  drawGif(avatar, gifCanvas1);
}

// Selects and draws the gif asociated with the player's avatar
function drawGif(avatar, canvas) {
  let file = "";
  if (avatar.localeCompare("Pelusa.png") === 0)
    file = '../img/Pelusa.gif';
  else if (avatar.localeCompare("Logan.png") === 0)
    file = '../img/Logan.gif';
  else if (avatar.localeCompare("Mery.png") === 0)
    file = '../img/Mery.gif';
  else if (avatar.localeCompare("Chesire.png") === 0)
    file = '../img/Chesire.gif';
  else if (avatar.localeCompare("Blue.png") === 0)
    file = '../img/Blue.gif';
  else if (avatar.localeCompare("Perla.png") === 0)
    file = '../img/Perla.gif';

  gifler(file).animate(canvas);
}


function loadGame() {
  let canvas2, context2;
  //let canvas = document.getElementById("canvas-1");
  let context = canvas.getContext("2d");

  // Modifies the screen to fit the track for player 2
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

  // Once the countdown has ended
  $("#countdown").bind("ended", function () {
    let song = document.getElementById("song");
    song.play();
    setInterval(checkMissedCircleAndUpdate, 1);

    let imgs = loadDorayakis();

    if (multiplayer) {
      for (let i = 0; i < circles.length; i++) {
        particles2.push({
          x: canvas.width + 25,
          timing: circles[i].tiempo,
          size: circles[i].tipo,
          speed: 15,
          moving: true,
          clicked: false,
          keys: circles[i].tecla2,
        });
      }

      playing2 = particles2[0];
    }

    for (let i = 0; i < circles.length; i++) {
      particles.push({
        x: canvas.width + 25,
        timing: circles[i].tiempo,
        size: circles[i].tipo,
        speed: 15,
        moving: true,
        clicked: false,
        keys: circles[i].tecla,
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

  // Once the song has finished
  $("#song").bind("ended", function () {
    // If the adder avatar what chosen we add 500 point to the final result
    if (avatar.localeCompare("Chesire.png") === 0)
      document.getElementById("usePoints").value = score + 500;
    else document.getElementById("usePoints").value = score;

    if (multiplayer) {
      if (avatar2.localeCompare("Chesire.png") === 0)
        document.getElementById("usePoints2").value = score2 + 500;
      else document.getElementById("usePoints2").value = score2;
    }

    document.getElementById("multi").value = multiplayer;
    document.forms["submitScore"].submit(); // Submits the scores
  });
}

// Loads the images that represent the different types of circles
function loadDorayakis() {
  let imgDorayaki = new Image();
  let imgSushi = new Image();
  let imgDango = new Image();
  imgDorayaki.src = "../img/dorayaki.png";
  imgSushi.src = "../img/sushi.png";
  imgDango.src = "../img/dango.png";
  return [imgDorayaki, imgSushi, imgDango];
}

function animate(time, context, canvas, particles, imgs) {
  // set startTime if it isn't already set
  if (startTime === null) {
    startTime = time;
  }
  // Calculate elapsedTime
  let elapsedTime = time - startTime;

  // Clear what is drawn in the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Assume no further animating is necessary
  // The for-loop may change the assumption 
  let continueAnimating = false;

  for (let i = 0; i < particles.length; i++) {
    let part = particles[i];

    // Update this circle and report if it was moved
    let wasMoved = update(part, elapsedTime);
    // if it was moved, then change assumption to continueAnimating
    if (wasMoved || part.moving) {
      continueAnimating = true;
    }

    // draw this circle at its current position
    drawParticle(part, context, imgs);
  }

  // If update() reported that it moved something then request another animation loop
  if (continueAnimating) {
    window.requestAnimationFrame(function (time) {
      animate(time, context, canvas, particles, imgs)
    });
  }
}

function update(part, elapsedTime) {
  if (elapsedTime >= part.timing) {
    if (part.size !== 1000) {
      if (part.x > -part.size / 2) {
        part.x -= part.speed;
        if (part.x <= -part.size / 2) {
          part.moving = false;
        }
        return (true);
      } else return (true);
    } else {
      if (part.x > -728) {
        part.x -= part.speed;
        if (part.x <= -728 / 2) {
          part.moving = false;
        }
        return (true);
      } else return (true);
    }
  }
  return (false);
}

// Draws the specific type of circle checking its type and size
function drawParticle(part, context, imgs) {
  context.beginPath();
  let tam = [0, 0];
  let y = 0;

  if (part.size === 300) { // Small circles
    tam = [100, 100];
    y = 100;
  } else if (part.size === 600) { // Big circles
    tam = [170, 170];
    y = 60;
  } else if (part.size === 1000) { // Dango
    context.drawImage(imgs[2], part.x, 60, 728, 170);
  }

  if (multiplayer) {
    if (part.keys[0] === 83 || part.keys[0] === 68 || part.keys[0] === 75 || part.keys[0] === 76) { // Sushis
      context.drawImage(imgs[1], part.x, y, tam[0], tam[1]);
    } else if (part.keys[0] === 65 || part.keys[0] === 70 || part.keys[0] === 74 || part.keys[0] === 192) { // Dorayaki
      context.drawImage(imgs[0], part.x, y, tam[0], tam[1]);
    }
  } else { // single player
    if (part.keys[0] === 68 || part.keys[0] === 75) { // Dorayakis
      context.drawImage(imgs[0], part.x, y, tam[0], tam[1]);
    } else if (part.keys[0] === 70 || part.keys[0] === 74) { // Sushis
      context.drawImage(imgs[1], part.x, y, tam[0], tam[1]);
    }
  }
}



// Checks if the key pressed is correct and none of the incorrect keys are pressed
function click(evt) {
  let keystrokes = [];

  if (multiplayer) {
    keystrokes[evt.keyCode] = true;

    if (keystrokes[65] || keystrokes[83] || keystrokes[68] || keystrokes[70]) { // player 1
      playing.clicked = true;
      let player1Strokes = getIndividualPlayerStrokes(keystrokes, 1);

      if (playing.size === 300) { // small circle
        if (player1Strokes[playing.keys[0]] || player1Strokes[playing.keys[1]] && (!incorrectKeysPressed(player1Strokes, multiplayer, playing.keys[0], 1))) {
          checkHitRange(playing, 1);
        } else miss(1);

      } else if (playing.size === 600) { // big circle
        if ((player1Strokes[playing.keys[0]] && player1Strokes[playing.keys[1]]) && (!incorrectKeysPressed(player1Strokes, multiplayer, playing.keys[0], 2)) && player1Strokes.filter(Boolean).length === 2) {
          checkHitRange(playing, 1);
        } else miss(1);

      } else if (playing.size === 1000) { // dango
        if (playing.x <= 115 && (evt.keyCode === 65 || evt.keyCode === 83 || evt.keyCode === 68 || evt.keyCode === 70)) {
          dangoStrokes1 += 1;
        }
      }

      keystrokes = [];
      player1Strokes = [];

    } else if (keystrokes[74] || keystrokes[75] || keystrokes[76] || keystrokes[192]) { // player 2
      playing2.clicked = true;
      let player2Strokes = getIndividualPlayerStrokes(keystrokes, 1);

      if (playing2.size === 300) { // small circle
        if (player2Strokes[playing2.keys[0]] || player2Strokes[playing2.keys[1]] && (!incorrectKeysPressed(player2Strokes, multiplayer, playing2.keys[0], 1))) {
          checkHitRange(playing2, 2);
        } else miss(2);

      } else if (playing2.size === 600) { // big circle
        if ((player2Strokes[playing2.keys[0]] && player2Strokes[playing2.keys[1]]) && (!incorrectKeysPressed(player2Strokes, multiplayer, playing2.keys[0], 2)) && player2Strokes.filter(Boolean).length === 2) {
          checkHitRange(playing2, 2);
        } else miss(2);

      } else if (playing2.size === 1000) { // dango
        if (playing2.x <= 115 && (evt.keyCode === 74 || evt.keyCode === 75 || evt.keyCode === 76 || evt.keyCode === 192)) {
          dangoStrokes2 += 1;
        }
      }

      keystrokes = [];
      player2Strokes = [];
    }
  } else { // single player
    playing.clicked = true;
    keystrokes[evt.keyCode] = true;

    if (playing.size === 300) { // small circle (only one keystroke needed)
      if ((keystrokes[playing.keys[0]] || keystrokes[playing.keys[1]]) && (!incorrectKeysPressed(keystrokes, multiplayer, playing.keys[0], 1))) {
        checkHitRange(playing, 1);
      } else miss(1);

    } else if (playing.size === 600) { // big circle (simultaneous strokes needed)
      if ((keystrokes[playing.keys[0]] && keystrokes[playing.keys[1]]) && (!incorrectKeysPressed(keystrokes, multiplayer, playing.keys[0], 1)) && keystrokes.filter(Boolean).length === 2) {
        checkHitRange(playing, 1);
      } else miss(1);

    } else if (playing.size === 1000) { // dango
      if (playing.x <= 115 && (evt.keyCode === 68 || evt.keyCode === 70 || evt.keyCode === 74 || evt.keyCode === 75)) {
        dangoStrokes1 += 1;
      }
    }

    keystrokes = [];
  }
}

// Returns an individual array of keystrokes for the specified player
function getIndividualPlayerStrokes(keys, player) {
  let playerKeyStrokes = [];

  if (player === 1) { // player 1
    if (keys[65])
      playerKeyStrokes[65] = true;
    if (keys[83])
      playerKeyStrokes[83] = true;
    if (keys[68])
      playerKeyStrokes[68] = true;
    if (keys[70])
      playerKeyStrokes[70] = true;

  } else if (player === 2) { // player 2
    if (keys[74])
      playerKeyStrokes[74] = true;
    if (keys[75])
      playerKeyStrokes[75] = true;
    if (keys[76])
      playerKeyStrokes[76] = true;
    if (keys[192])
      playerKeyStrokes[192] = true;
  }

  return playerKeyStrokes;
}

// Checks if the incorrect keys have been pressed or not, returns true if any of the incorrect keys have been pressed
function incorrectKeysPressed(keystrokes, multi, circleKey, player) {
  let incorrect = false;

  if (multi) {
    if (player === 1) {
      if (circleKey === 65 || circleKey === 70) { // Dorayaki player 1
        incorrect = (keystrokes[83] || keystrokes[68]);
      } else if (circleKey === 83 || circleKey === 68) { // Sushi player 1
        incorrect = (keystrokes[65] || keystrokes[70]);
      }
    } else { // player 2
      if (circleKey === 74 || circleKey === 192) { // Dorayaki player 2
        incorrect = (keystrokes[75] || keystrokes[76]);
      } else if (circleKey === 75 || circleKey === 76) { // Sushi player 2
        incorrect = (keystrokes[74] || keystrokes[192]);
      }
    }

  } else { // single player
    if (circleKey === 68 || circleKey === 75) { // Dorayaki
      incorrect = (keystrokes[70] || keystrokes[74]);
    } else if (circleKey === 70 || circleKey === 74) { // Sushi
      incorrect = (keystrokes[68] || keystrokes[75]);
    }
  }

  return incorrect;
}

// Checks how near or far the circle is from the target position
function checkHitRange(circle, player) {

  if (multiplayer) {

    if (player === 1) { // player 1
      if ((circle.x >= 20 && circle.x <= 69) || (circle.x >= 91 && circle.x <= 140)) { // far hit
        strokeInsideHitRange(50, 1);

      } else if (circle.x >= 70 && circle.x <= 90) { // close hit
        strokeInsideHitRange(100, 1);

      } else if ((avatar.localeCompare("Logan.png") === 0) && (circle.x >= 5 && circle.x <= 69) || (circle.x >= 91 && circle.x <= 155)) { // far hit
        strokeInsideHitRange(50, 1);

      } else { // miss
        streak = streakAndPoints(100, hits)[0];
        sum = 0;

        miss(1);
      }

      scoreAnimations(score, sum, false);

    } else if (player === 2) { // player 2
      if ((circle.x >= 20 && circle.x <= 69) || (circle.x >= 91 && circle.x <= 140)) { // far hit
        strokeInsideHitRange(50, 2);

      } else if (circle.x >= 70 && circle.x <= 90) { // close hit
        strokeInsideHitRange(100, 2);

      } else if ((avatar2.localeCompare("Logan.png") === 0) && (circle.x >= 5 && circle.x <= 69) || (circle.x >= 91 && circle.x <= 155)) { // far hit
        strokeInsideHitRange(50, 2);

      } else { // miss
        streak2 = streakAndPoints(100, hits2)[0];
        sum2 = 0;

        miss(2);
      }

      scoreAnimations(score2, sum2, true);
    }

  } else { // single player

    if ((circle.x >= 20 && circle.x <= 69) || (circle.x >= 91 && circle.x <= 140)) { // far hit
      strokeInsideHitRange(50, 1);

    } else if (circle.x >= 70 && circle.x <= 90) { // close hit
      strokeInsideHitRange(100, 1);

    } else if ((avatar.localeCompare("Logan.png") === 0) && (circle.x >= 5 && circle.x <= 69) || (circle.x >= 91 && circle.x <= 155)) { // far hit
      strokeInsideHitRange(50, 1);

    } else { // miss
      steak = streakAndPoints(100, hits)[0];
      sum = 0;

      miss(1);
    }

    scoreAnimations(score, sum, false);
  }
}

// When a player presses the incorrect key 
function miss(player) {
  let redPlate = new Image();
  redPlate.src = '../img/PlatoRojo.png';

  if (player === 1) { // player 1
    if ((avatar.localeCompare("Pelusa.png") === 0) && streak >= 4 && !usedAvatar) { // saves the player from loosing their streak
      usedAvatar = true;
    } else {
      misses++;
      hits = 0;
      streak = 0;

      if (avatar.localeCompare("Perla.png") !== 0) { // Saves the player from the penalty for missing
        if (misses >= 2) {
          sum = -25;
          score += sum;
        }
      }
    }

    scoreAnimations(score, sum, false);

    redPlate.onload = function () {
      backgroundContext.drawImage(redPlate, 30, 60);
    }

  } else if (player === 2) { // player 2
    if ((avatar2.localeCompare("Pelusa.png") === 0) && streak2 >= 4 && !usedAvatar2) { // saves the player from loosing their streak
      usedAvatar2 = true;
    } else {
      misses2++;
      hits2 = 0;
      streak2 = 0;

      if (avatar2.localeCompare("Perla.png") !== 0) { // Saves the player from the penalty for missing
        if (misses2 >= 2) {
          sum2 = -25;
          score2 += sum2;
        }
      }
    }

    scoreAnimations(score2, sum2, true);
    
    redPlate.onload = function () {
      backgroundContext2.drawImage(redPlate, 30, 60);
    }
  }
}


// Increases the hits of the players by 1 and updates the streak and score
function strokeInsideHitRange(points, player) {
  let greenPlate = new Image();
  greenPlate.src = '../img/PlatoVerde.png';

  if (player === 1) { // player 1
    misses = 0;
    hits++;
    let result = streakAndPoints(points, hits);
    streak = result[0];
    if (streak != 0) {
      if (avatar.localeCompare("Blue.png") === 0) {
        sum = result[1] * 1.5;
        score += sum;
      } else {
        sum = result[1];
        score += sum;
      }
    }

    greenPlate.onload = function () {
      backgroundContext.drawImage(greenPlate, 30, 60);
    }

  } else if (player === 2) { // player 2
    misses2 = 0;
    hits2++;
    let result2 = streakAndPoints(points, hits2);
    streak2 = result2[0];
    if (streak2 != 0) {
      if (avatar2.localeCompare("Blue.png") === 0) {
        sum2 = result2[1] * 1.5;
        score2 += sum2;
      } else {
        sum2 = result2[1];
        score2 += sum2;
      }
    }

    greenPlate.onload = function () {
      backgroundContext2.drawImage(greenPlate, 30, 60);
    }
  }
}


// Returns the streak of the player based on their hits and the points achieved on the stroke based on that streak
function streakAndPoints(points, hits) {
  if (hits >= 2 && hits < 6)
    return [2, points * 2];

  else if (hits >= 6 && hits < 10)
    return [3, points * 3];

  else if (hits >= 10)
    return [4, points * 4];

  else return [1, points];
}

// Checks if the playing circle has not been clicked and updates it to the next circle
function checkMissedCircleAndUpdate() {

  if (playing.size === 1000) { // dango

    if (multiplayer) {
      if (playing2 !== -1 && playing2.x < -500) {
        if (avatar2.localeCompare("Blue.png") === 0) {
          sum2 = dangoStrokes2 * 100 * 1.5;
          score2 += sum2;
        } else if (avatar2.localeCompare("Mery.png") === 0) {
          sum2 = dangoStrokes2 * 300;
          score2 += sum2;
        } else {
          sum2 = dangoStrokes2 * 100;
          score2 += sum2;
        }

        actual2 += 1;
        scoreAnimations(score2, sum2, true);

        if (actual2 < particles2.length) {
          playing2 = particles2[actual2];
        } else playing2 = -1;
      }

    }else{ // single player

      if (playing !== -1 && playing.x < -500) {
        if (avatar.localeCompare("Blue.png") === 0) {
          sum = dangoStrokes1 * 100 * 1.5;
          score += sum;
        } else if (avatar.localeCompare("Mery.png") === 0) {
          sum = dangoStrokes1 * 300;
          score += sum;
        } else {
          sum = dangoStrokes1 * 100;
          score += sum;
        }
  
        actual += 1;
        scoreAnimations(score, sum, false);
  
        if (actual < particles.length) {
          playing = particles[actual];
        } else playing = -1;
      }
    }

  }else{ // other types of circles

    if (playing !== -1 && playing.x <= 0) {
      actual += 1;
      if (!playing.clicked) {
        let platoNormal = new Image();
        platoNormal.src = '../img/Plato.png';
        platoNormal.onload = function () {
          backgroundContext.drawImage(platoNormal, 30, 60);
        }

        streak = 0;
        hits = 0;
        misses++;
        sum = -25;
        score += sum;
        scoreAnimations(score, sum, false);
      }

      if (actual < particles.length) {
        playing = particles[actual];
      } else playing = -1;
    }

    updateVisualStreak(streak);

    if (multiplayer) {

      if (playing2 !== -1 && playing2.x <= 0) {
        actual2 += 1;
        if (!playing2.clicked) {
          let platoNormal2 = new Image();
          platoNormal2.src = '../img/Plato.png';
          platoNormal2.onload = function () {
            backgroundContext2.drawImage(platoNormal2, 30, 60);
          }
          streak2 = 0;
          hits2 = 0;
          misses2 += 1;
          sum2 = -25;
          score2 += sum2;
          scoreAnimations(score2, sum2, true);
        }

        if (actual2 < particles2.length) {
          playing2 = particles2[actual2];
        } else playing2 = -1;
      }

      updateVisualStreak(streak2);
    }
  }
}


// Animates the addition or substraction of points to the player's score
function scoreAnimations(points, sum, multi) {

  if (sum !== undefined && sum !== null && sum !== "undefined") {
    let newsum;
    let scoreElem = "",
      tag = "";

    if (Math.sign(sum) === 1) // positive points
      newsum = "+" + sum;

    else newsum = sum;


    if (multi) {
      scoreElem = "#puntos-p2";
      tag = "#tag2";
    } else {
      scoreElem = "#puntos-p1";
      tag = "#tag1";
    }

    $({
      score: points - sum
    }).animate({
      score: points
    }, {
      duration: 1000,
      easing: "linear",
      step: function (now, fx) {
        $(scoreElem).html(Math.floor(now));
      },
      queue: false
    });

    $(tag).fadeIn({
      duration: 700,
      easing: "linear",
      step: function (now, fx) {
        $(this).css("top", -55 * now + "px");
      }
    }).fadeOut({
      duration: 300,
      step: function (now, fx) {
        $(this).css("top", -55 * (2 - now) + "px");
      }
    }).html(newsum);
  }
}

// Updates the screen with the corresponding number of streaks
function updateVisualStreak(streak){
  if (streak === 2) {
    document.getElementById("one").style.display = "inline";
    document.getElementById("number2").style.display = "inline";
  } else if (streak === 3) {
    document.getElementById("three").style.display = "inline";
    document.getElementById("number3").style.display = "inline";
    document.getElementById("number2").style.display = "none";
  } else if (streak === 4) {
    document.getElementById("five").style.display = "inline";
    document.getElementById("number4").style.display = "inline";
    document.getElementById("max").style.display = "inline";
    document.getElementById("number3").style.display = "none";
  } else if (streak === 0) {
    document.getElementById("one").style.display = "none";
    document.getElementById("three").style.display = "none";
    document.getElementById("five").style.display = "none";
    document.getElementById("number2").style.display = "none";
    document.getElementById("number3").style.display = "none";
    document.getElementById("number4").style.display = "none";
    document.getElementById("max").style.display = "none";
  }
}