    var eventoControlado = false;
    var array = [3416, 4897, 6378, 7119, 7860, 8601, 9341, 11564, 12304, 15267, 16749];
    var array2 = [];
    var puntos = 0;
    var elem = array[0];
    var aux = 0;
    var posCirc = 0;
    

    window.onload = function () {

      var context = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = 300;
      document.body.appendChild(canvas);
      
      document.onkeypress = mostrarInformacionCaracter;
      document.onkeyup = mostrarInformacionTecla;
      
      init();


      // No longer setting velocites as they will be random
      // Set up object to contain particles and set some default values
      var particles = {},
          particleIndex = 0,
          settings = {
            density: 1,
            particleSize: 25,
            startingX: canvas.width,
            startingY: 300
          };

      // Set up a function to create multiple particles
      function Particle() {
        // Establish starting positions and velocities
        this.x = settings.startingX;
        this.y = settings.startingY;

        // Determine original X-axis speed based on setting limitation
        this.vx = 20;
        this.vy = 150;

        // Add new particle to the index
        // Object used as it's simpler to manage that an array
        particleIndex ++;
        particles[particleIndex] = this;
        this.id = particleIndex;
      }
      Object.defineProperty(Particle.prototype,"pos", {
          get: function getPos(){ return this.x; }
      });
      Object.defineProperty(Particle.prototype,"lista", {
          get: function getLista(){ return this; }
      });
      // Some prototype methods for the particle's "draw" function
      Particle.prototype.draw = function() {
        this.x -= this.vx;
        this.y = this.vy;
        // Adjust for gravity
        //this.vy = settings.gravity;

        // Age the particle

        // If Particle is old, it goes in the chamber for renewal


        // Create the shapes
        context.clearRect(settings.leftWall, settings.groundLevel, canvas.width, canvas.height);
        context.beginPath();
        context.fillStyle="cyan";
        // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
        context.arc(this.x, this.y, settings.particleSize, 0, Math.PI*2); 
        context.closePath();
        context.fill();

      };
      $("#player").bind("ended", function(){
        var x = document.getElementById("myAudio"); 
        x.play();
        cronometrar();
        setInterval(function() {
            //context.fillStyle = "white";
            var img = document.createElement("img");
            img.src = "img/gatos.jpg";
            var pat = context.createPattern(img, "repeat");
            context.fillStyle = pat;
            context.fillRect(0, 0, canvas.width, canvas.height);
            var gradient = context.createLinearGradient(10, 50, 50, 10);
            gradient.addColorStop("0", "magenta");
            gradient.addColorStop("0.5" ,"blue");
            gradient.addColorStop("1.0", "red");

            // Fill with gradient
            context.strokeStyle = gradient;
            context.lineWidth = 5;
            context.strokeRect(150, 117, 60 ,60);
            // Draw the particles
            //for (var i = 0; i < settings.density; i++) {
                window.setTimeout(function(){if(elem != aux){ new Particle(); aux = elem;}},array[0]);
                //new Particle();
            //}

            for (var i in particles) {
              particles[i].draw();
            }
        }, 30);
       });
      
      
    };

    function mostrarInformacionCaracter(evObject) {
      var msg = '';
      control.innerHTML = msg;
      var elCaracter = String.fromCharCode(evObject.which);

      if (evObject.which != 0 && evObject.which != 13) {

        msg = 'Tecla pulsada: ' + elCaracter;

        control.innerHTML += msg;
      } else {

        msg = 'Pulsada tecla especial';
        control.innerHTML += msg;
      }

      eventoControlado = true;

    }

    function mostrarTick(evObject){

    }


    function mostrarInformacionTecla(evObject) {
      var msg = '';
      var teclaPulsada = evObject.keyCode;
      //La tecla 32 es la barra espaciadora

      if (teclaPulsada == 32) {
        window.alert(particles[0].getPos());
        if(particles[0].getPos() > 100 && particles[0].getPos() < 160 && particles[0].getPos() != 130)
          puntos+= 5000;
        else if (particles[0].getPos() == 130)
          puntos+= 10000;
        if(mss > array2[0] + 2500){
            array2.pop();
        }
        document.getElementById("puntos").innerHTML = "Puntos:" + puntos;
      }
      window.alert(teclaPulsada)
      control.innerHTML += teclaPulsada;

      if (msg) {
        control.innerHTML += " " + msg + "</br>";
      }

      eventoControlado = false;

    }

    function init() {
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
    }

    function descartar() {
      if (array.length > 0 && elem < mss * 10 + 300) {
        elem = array.shift();
        array2.push(elem);
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
