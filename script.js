var Animation = function(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext("2d");
    this.t = 0;
    this.timeInterval = 0;
    this.startTime = 0;
    this.lastTime = 0;
    this.frame = 0;
    this.animating = false;
    
    // by Paul Irish
    window.requestAnimFrame = (function(callback){
      return window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame ||
        function(callback){
        window.setTimeout(callback, 1000 / 60);
      };
    })();
  };
  
  Animation.prototype.getContext = function getContext(){
    return this.context;
  };
  
  Animation.prototype.getCanvas = function(){
    return this.canvas;
  };
  
  Animation.prototype.clear = function(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };
  
  Animation.prototype.setStage = function(func){
    this.stage = func;
  };
  
  Animation.prototype.isAnimating = function(){
    return this.animating;
  };
  
  Animation.prototype.getFrame = function(){
    return this.frame;
  };
  
  Animation.prototype.start = function(){
    this.animating = true;
    var date = new Date();
    this.startTime = date.getTime();
    this.lastTime = this.startTime;
    
    if (this.stage !== undefined){
      this.stage();
    }
    
    this.animationLoop();
  };
  
  Animation.prototype.stop = function(){
    this.animating = false;
  };
  
  Animation.prototype.getTimeInterval = function(){
    return this.timeInterval;
  };
  
  Animation.prototype.getTime = function(){
    return this.t;
  };
  
  Animation.prototype.getFps = function(){
    return this.timeInterval > 0 ? 1000 / this.timeInterval : 0;
  };
  
  Animation.prototype.animationLoop = function(){
    var that = this;
    
    this.frame++;
    var date = new Date();
    var thisTime = date.getTime();
    this.timeInterval = thisTime - this.lastTime;
    this.t += this.timeInterval;
    this.lastTime = thisTime;
    
    if (this.stage !== undefined){
      this.stage();
    }
    
    if (this.animating){
      window.requestAnimFrame(function(){
        that.animationLoop();
      });
    }
    
  };
  
  //window.onload = function (){
  document.addEventListener('DOMContentLoaded', function() {
    // instantiate new Animation object
    var anim = new Animation("myCanvas");
    var anim1 = new Animation("myCanvas1");
    var context = anim.getContext();
    var canvas = anim.getCanvas();
    var context1 = anim1.getContext();
    var canvas1 = anim1.getCanvas();
    
    var button = document.getElementById('button')
  
    function numero_froude1(velocidad,largo){
      return velocidad/(9.8*largo)
      }
  
    function numero_froude2(velocidad1,largo1){
    return velocidad1/(9.8*largo1)
    }
  
    button.onclick = function(){
  
      var amplitude = Math.PI * document.getElementById('angulo').value / 360; // 45 degrees amplitud
      var period = (2 * Math.PI / document.getElementById('velocidad').value) * 1000; //ms     // periodo
      //var pendulumLength = 250;   // largo
      var pendulumLength = document.getElementById('largo').value * 10;
      var pendulumWidth = 10;
      var rotationPointX = canvas.width / 2;
      var rotationPointY = 20;
      var amplitude1 = Math.PI * document.getElementById('angulo1').value / 360; // 45 degrees amplitud
      var period1 = (2 * Math.PI / document.getElementById('velocidad1').value) * 1000; //ms 
      var pendulumLength1 = document.getElementById('largo1').value * 10;
      
      anim.setStage(function(){
        //update
        var theta = (amplitude * Math.sin((2 * Math.PI * this.getTime()) / period)) + Math.PI / 2;
        
        //clear
        this.clear();
        
        //draw top circle
        context.beginPath();
        context.arc(rotationPointX, rotationPointY, 15, 0, 2 * Math.PI, false);
        context.fillStyle = "black";
        context.fill();
        
        //draw shaft
        context.beginPath();
        var endPointX = rotationPointX + (pendulumLength * Math.cos(theta));
        var endPointY = rotationPointY + (pendulumLength * Math.sin(theta));
        context.beginPath();
        context.moveTo(rotationPointX, rotationPointY);
        context.lineTo(endPointX, endPointY);
        context.lineWidth = pendulumWidth;
        context.lineCap = "round";
        context.strokeStyle = "#555";
        context.stroke();
        
        //draw bottom circle
        context.beginPath();
        context.arc(endPointX, endPointY, 40, 0, 2 * Math.PI, false);
        var grd = context.createLinearGradient(endPointX - 50, endPointY - 50, endPointX + 50, endPointY + 50);
        grd.addColorStop(0, "#444");
        grd.addColorStop(0.5, "white");
        grd.addColorStop(1, "#444");
        context.fillStyle = grd;
        context.fill();
      });
      anim.start();
  
      anim1.setStage(function(){
        //update
      var theta1 = (amplitude1 * Math.sin((2 * Math.PI * this.getTime()) / period1)) + Math.PI / 2;
        
        //clear
        this.clear();
        
        //draw top circle
        context1.beginPath();
        context1.arc(rotationPointX, rotationPointY, 15, 0, 2 * Math.PI, false);
        context1.fillStyle = "black";
        context1.fill();
        
        //draw shaft
        context1.beginPath();
        var endPointX = rotationPointX + (pendulumLength1 * Math.cos(theta1));
        var endPointY = rotationPointY + (pendulumLength1 * Math.sin(theta1));
        context1.beginPath();
        context1.moveTo(rotationPointX, rotationPointY);
        context1.lineTo(endPointX, endPointY);
        context1.lineWidth = pendulumWidth;
        context1.lineCap = "round";
        context1.strokeStyle = "#555";
        context1.stroke();
        
        //draw bottom circle
        context1.beginPath();
        context1.arc(endPointX, endPointY, 40, 0, 2 * Math.PI, false);
        var grd = context.createLinearGradient(endPointX - 50, endPointY - 50, endPointX + 50, endPointY + 50);
        grd.addColorStop(0, "#444");
        grd.addColorStop(0.5, "white");
        grd.addColorStop(1, "#444");
        context1.fillStyle = grd;
        context1.fill();
      });
      anim1.start();
  
      var velocidad = document.getElementById('velocidad').value;
      var velocidad1 = document.getElementById('velocidad').value;
      var froude_1=numero_froude1(velocidad,pendulumLength / 1000)
      var froude_2=numero_froude2(velocidad1,pendulumLength1 / 1000)
      var selector = ""
  
      if (froude_1<froude_2){selector = "Por lo tanto el pez 2 tiene mayor movilidad que el pez 1"
      }else if (froude_2<froude_1){selector = "Por lo tanto el pez 1 tiene mayor movilidad que el pez 2"
      }
      else{selector = "Por lo tanto ambos peces tienen la misma movilidad"
      } 
  
      var selectedValue = document.getElementById('comparacion');
      selectedValue.innerHTML = selector;
      var froude1 = document.getElementById('froude1');
      var froude2 = document.getElementById('froude2');
      froude1.innerHTML = "Número de Froude 1: " + froude_1;
      froude2.innerHTML = "Número de Froude 2: " + froude_2;
  
    }
  });
