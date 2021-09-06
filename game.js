var myGamePiece;
var keys = [];
var myObstacles = [];
var myObstaclesText = [];
var ans = 1; // so it's game over unless the item hit is myObstacles[ans]
var myScore;
var speed = -2;
var iteration = 0;
var testPoints = 0;
var image = new Image();
var background = new Image();


function startGame() {
  image.src = 'bunny2.png';
  background.src = "field.png";

  var x = document.getElementById("ihopethisworks");

  var q1 = document.getElementById("question").value;
  var c1 = document.getElementById("correct_ans").value;
  var d1 = document.getElementById("distractor_1").value;
  var d2 = document.getElementById("distractor_2").value;
  var d3 = document.getElementById("distractor_3").value;
  var d4 = document.getElementById("distractor_4").value;

  var q2 = document.getElementById("question1").value;
  var c2 = document.getElementById("correct_ans1").value;
  var d5 = document.getElementById("distractor_1.1").value;
  var d6 = document.getElementById("distractor_2.1").value;
  var d7 = document.getElementById("distractor_3.1").value;
  var d8 = document.getElementById("distractor_4.1").value;

  var q3 = document.getElementById("question2").value;
  var c3 = document.getElementById("correct_ans2").value;
  var d9 = document.getElementById("distractor_1.2").value;
  var d10 = document.getElementById("distractor_2.2").value;
  var d11 = document.getElementById("distractor_3.2").value;
  var d12 = document.getElementById("distractor_4.2").value;

  myObstaclesText = [[q1, c1, d1, d2, d3, d4], [q2, c2, d5, d6, d7, d8], [q3, c3, d9, d10, d11, d12]];

  // myObstaclesText = [["1", "2", "3", "4", "5", "6"], ["7", "8", "9", "10", "11", "12"], ["13", "14", "15", "16", "17", "18"]];

  x.style.display = "none";
  document.getElementById("sometitle").innerHTML = myObstaclesText[iteration][0];
  document.getElementById("general-instructions").innerHTML = "Click on the arrow keys to move your character up, down, left, and right!";
  document.getElementById("assignment-instructions").innerHTML = "Avoid incorrect answers and try to hit correct ones. The game will speed up as time passes, so think quickly!";

  myBG = new component(0,0,"",0,0,"background",""); 
  myGamePiece = new component(29, 46, "red", 10, 120,""); // creates red square; no need to put a 'var' before myGamePiece if it was already declared
  myScore = new component("30px", "Consolas", "black", 280, 40, "text", ""); // puts in text following the specifications
  myStatus = new component("30px", "Consolas", "black", 5, 250, "text", "");
  myGameArea.start();
}


var myGameArea = { // creates a canvas following the specifications
  canvas : document.createElement("canvas"),

  start : function() { // defines start function to draw the canvas and begin at frame 0
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]); // canvas element is inserted as the first childnode of the body element
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
  },

  clear : function() { // defines clear function to clear the canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  stop : function() {
    clearInterval(this.interval);
  }
}


function component(width, height, color, x, y, type, msg) { // initializes object constructor
  this.msg = msg;
  this.type = type;
  this.width = width;
  this.height = height;
  this.bounce = 0.6;
  this.x = x;
  this.y = y;

  this.update = function(){
    ctx = myGameArea.context;

    if (this.type == "text") 
    {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.msg, this.x, this.y)
    } 
    else if (this.type == "background")
    { 
      // ctx.fillStyle = color;
      // ctx.fillRect(this.x, this.y, this.width, this.height);

      ctx.drawImage(background, 0, -100);
    }
    else
    {
      ctx.drawImage(image, this.x, this.y);
    }

  }

  this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width); 
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);

    // for debugging
    // console.log("my bottom" + mybottom);
    // console.log("other top" + othertop);
    // console.log("my top" + mytop);
    // console.log("other bottom" + otherbottom);
    // console.log("my right" + myright);
    // console.log("other left" + otherleft);
    // console.log("my left" + myleft);
    // console.log("other right" + otherright);

    var crash = true;
    if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
}


function nextQuestion()
{
  if (myGamePiece.crashWith(myObstacles[i]))
  {
    iteration += 1;
    console.log("iteration:" + iteration)
    // myGamePiece.x += 10;
    // myGamePiece.y = 120;
    if (iteration > 2)
    {
      myStatus.msg = "Finished game!";
      myGameArea.stop();
    }
    document.getElementById("sometitle").innerHTML = myObstaclesText[iteration][0];
  }
  return;
}


function updateGameArea() 
{
  for (i = 0; i < myObstacles.length; i += 1) 
  {
    if (myGamePiece.crashWith(myObstacles[i])) 
    {
      if (myObstacles[i].msg == myObstaclesText[iteration][ans])
      {
        testPoints += 1;
        myStatus.msg = "Points: " + testPoints;
      }
      else
      {
        myStatus.msg = "Points: " + testPoints;
      }
      myStatus.update();
      myGamePiece.x += 10;
      myGamePiece.update();
      myObstacles[i].x -= 10;
      myObstacles[i].update();
      nextQuestion();
      // myGameArea.stop();
      return;
    }
  }
  
  myGameArea.clear();
  myBG.update();
  myGameArea.frameNo += 1;
  speed -= 0.005;
  if (myGameArea.frameNo == 1 || everyinterval(150)) 
  {
    x = myGameArea.canvas.width;
    // y = myGameArea.canvas.height - 200
    y = Math.floor(Math.random() * (220 + 1) + 50);
    var j = Math.floor(Math.random() * (6 - 1) + 1);
    j = Math.round(j);
    console.log(myObstaclesText[iteration][j])
    myObstacles.push(new component(10, 10, "black", x, y, "text", myObstaclesText[iteration][j]));
  }
  

  for (i = 0; i < myObstacles.length; i += 1)
  {
    myObstacles[i].x += speed;
    myObstacles[i].update();
  }
  

  if (keys[38])
    myGamePiece.y -= 2;
    if (myGamePiece.y <= 10)
      myGamePiece.y += 2;
  if (keys[40])
    myGamePiece.y += 2;
    if (myGamePiece.y >= 220)
      myGamePiece.y -= 2;
  if (keys[37])
    myGamePiece.x -= 2;
    if (myGamePiece.x <= 10)
      myGamePiece.x += 2;
  if (keys[39])
    myGamePiece.x += 2;
    if (myGamePiece.x >= 380)
      myGamePiece.x -= 2;

  // myGamePiece.x += 1;
  myGamePiece.update();

  // myObstacles.x -= 1;
  // myObstacle.update();


  myScore.msg = "TIME: " + myGameArea.frameNo / 100;
  myScore.update();
}


document.onkeydown = function(e) {
  keys[e.keyCode] = true;
}


document.onkeyup = function(e) {
  keys[e.keyCode] = false;
}


function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) 
  {
    return true;
  };
  return false;
}

