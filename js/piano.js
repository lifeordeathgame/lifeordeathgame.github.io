alert("Press space, w, or up arrow to jump, and s, shift, or down arrow to crouch.")
var myGamePiece;
var myObstacles = [];
var myScore;
var mySound;
var pklc,pkld,pkle,pklf,pklg,pkla,pklb,pkhc,pkhd,pkhe,pkhf,pkhg,pkha,pkhb,pklc,pkldf,pklef,pklgf,pklaf,pklbf,pkhdf,pkhef,pkhgf,pkhaf,pkhbf,npklc,npkld,npkle,npklf,npklg,npkla,npklb,npkhc,npkhd,npkhe,npkhf,npkhg,npkha,npkhb,npklc,npkldf,npklef,npklgf,npklaf,npklbf,npkhdf,npkhef,npkhgf,npkhaf,npkhbf
function startGame() {
    myGamePiece = new component(180, 90, "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1280px-Flag_of_the_United_States.svg.png", 90, window.innerHeight - 90
, "image");
    myScore = new component("30px", "Consolas", "Red", 50, 50, "text");
    //myHighScore = new component("100px", "Consolas", "Black", window.innerWidth / 2 - 100, window.innerHeight / 2 - 100, "text");
    //mySound = new sound("http://northkoreaworld.com/Vivian and Nathan Duet.mp3");
    myObstacles = [];
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }    
}
function component(width, height, color, x, y, type) {
    this.width = width;
    if (type == "image") {
    	this.image = new Image();
    	this.image.src = color;
    }
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.type = type;
    this.y = y; 
    this.gravity = 0.1;
    this.gravitySpeed = 0;
    this.sp = 16;
    this.jumpokay = false;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
      		ctx.font = this.width + " " + this.height;
      		ctx.fillStyle = color;
      		ctx.fillText(this.text, this.x, this.y);
   		} 
	else if (type == "image") {
      		ctx.drawImage(this.image, 
        	this.x, 
        	this.y,
        	this.width, this.height);
   	}
    	else {
        	ctx.fillStyle = color;
        	ctx.fillRect(this.x, this.y, this.width, this.height);
        }
      }

    
    
}

function updateGameArea() {
    var x, y, z, score, ranfact
    myGameArea.clear();
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += - 25;
        myObstacles[i].update();
    }
    
    /*var highscore = localStorage.getItem("highscore");

    if(highscore !== null){
        if (score > highscore) {
            localStorage.setItem("highscore", score);      
        }
    }
    else {
        localStorage.setItem("highscore", score);
    }*/
    myScore.text="SCORE: " + score;
    //myHighScore.text = "HIGH SCORE: " + highscore;	
    myScore.update();
    //myHighScore.update();
    myGamePiece.newPos();    
    myGamePiece.update();
}
/*function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}*/
document.onkeydown = checkKey;
document.onkeyup = doneKey;
//mySound.play();


function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '9') {
      alert("lowc")
    }
    if (e.keyCode == '81') {
      alert("lowd")
    }
    if (e.keyCode == '87') {
      alert("lowe")
    }
    if (e.keyCode == '69') {
      alert("lowf")
    }
    if (e.keyCode == '82') {
      alert("lowg")
    }
    if (e.keyCode == '84') {
      alert("lowa")
    }
    if (e.keyCode == '89') {
      alert("lowb")
    }
    if (e.keyCode == '85') {
      alert("highc")
    }
    if (e.keyCode == '73') {
      alert("highd")
    }
    if (e.keyCode == '79') {
      alert("highe")
    }
    if (e.keyCode == '80') {
      alert("highf")
    }
    if (e.keyCode == '219') {
      alert("highg")
    }
    if (e.keyCode == '221') {
      alert("higha")
    }
    if (e.keyCode == '220') {
      alert("highb")
    }
    if (e.keyCode == '49') {
      alert("lowdflat")
    }
    if (e.keyCode == '50') {
      alert("loweflat")
    }
    if (e.keyCode == '52') {
      alert("lowgflat")
    }
    if (e.keyCode == '53') {
      alert("lowaflat")
    }
    if (e.keyCode == '54') {
      alert("lowbflat")
    }
    if (e.keyCode == '56') {
      alert("highdflat")
    }
    if (e.keyCode == '57') {
      alert("higheflat")
    }
    if (e.keyCode == '189') {
      alert("highgflat")
    }
    if (e.keyCode == '187') {
      alert("highaflat")
    }
    if (e.keyCode == '8') {
      alert("highbflat")
    }
}
function hype() {
    mySound.stop();
    mySound.play();
}
function doneKey(e) {

    e = e || window.event;

    if (e.keyCode == '83' || e.keyCode == '16' || e.keyCode == '40') {
        myGamePiece.height = 90;

    }
}




