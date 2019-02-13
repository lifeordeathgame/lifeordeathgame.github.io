alert("Press space, w, or up arrow to jump, and s, shift, or down arrow to crouch.")
var murica;
var kimHeads = [];
var score;
var sound;
var a = 40;
var b = 41;
var c = 70;
var d = 71;
var e = 100;
function startGame() {
    murica = new component(180, 90, "https://upload.wikimedia.org/wikipedia/commons/4/42/Animated-Flag-USA.gif", 90, window.innerHeight - 90
, "image");
    score = new component("30px", "Consolas", "Red", 50, 50, "text");
    //myHighScore = new component("100px", "Consolas", "Black", window.innerWidth / 2 - 100, window.innerHeight / 2 - 100, "text");
    //mySound = new sound("http://northkoreaworld.com/Vivian and Nathan Duet.mp3");
    kimHeads = [];
    gameField.start();
}

var gameField = {
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
        ctx = gameField.context;
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
    this.newPos = function() {
    	this.sp += 0.005
    	if (this.gravitySpeed < 0){
    		this.gravitySpeed += this.gravity * 5;
    	}
        
    	else {
        	this.gravitySpeed += this.gravity * 2;
        }
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    
    this.hitBottom = function() {
        var rockbottom = gameField.canvas.height - this.height;
        
        if (this.y > rockbottom) {
            this.y = rockbottom;
            
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
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, y, z, score, ranfact
    var ranfactnum = Math.floor((Math.random())* 5)+1;
    if (ranfactnum == 1){
        ranfact = "Did you know that over 5000 westerners a year travel to North Korea?"
    }
    else if (ranfactnum == 2) {
	ranfact = "Did you know that Kim Il-Sung was handpicked by Russian oficials to rule North Korea?"   
    }
    else if (ranfactnum == 3) {
	ranfact = "Did you know that Kim Jong-Un is a basketball fanatic?"
    }
    else if (ranfactnum == 4) {
	ranfact = "Did you know that the DPRK is celebrating its 70th anniversary"   
    }
    else {
	ranfact = "Did you know that Kim Jong-Un went to school in Switzerland?"
    }
    gameField.frameNo += 1;
    score = (gameField.frameNo / 45);
    score = Math.ceil(score);
    for (i = 0; i < kimHeads.length; i += 1) {
        if (murica.crashWith(kimHeads[i])) {
            gameField.stop();
	    gameField.clear();
	    alert("You died! Your score was " + score +". " + ranfact);
	    startGame();
            return;
        } 
    }
    
    gameField.clear();
    
    z = 65;
    if (gameField.frameNo == 1 || everyinterval(z)) {
		var rannum = Math.floor((Math.random())* 100)+1;
        	x = gameField.canvas.width;
		if (rannum <= a) {
        	//normal jump
		    kimHeads.push(new component(75, 75, "http://northkoreaworld.com/imgs/Kim.png", x, gameField.canvas.height - 75, "image"));
		    kimHeads.push(new component(75, 75, "http://northkoreaworld.com/imgs/Kim.png", x, gameField.canvas.height - 310, "image"));
		    a -= 25;
		    b -= 25; 
		    c -= 15; 
			d -= 15; 
		}
		else if (rannum >= b && rannum <= c ){
		    //crouch jump
		    kimHeads.push(new component(75, 75, "http://northkoreaworld.com/imgs/Kim.png", x, gameField.canvas.height - 145, "image"));
		    kimHeads.push(new component(75, 75, "http://northkoreaworld.com/imgs/Kim.png", x, gameField.canvas.height - 75, "image"));
		    a += 15;
			b += 15; 
			c -= 15; 
			d -= 15;
		}
	        else if (rannum >= d && rannum <= e) {
		    //duck
		    kimHeads.push(new component(75, 75, "http://northkoreaworld.com/imgs/Kim.png", x, gameField.canvas.height - 145, "image"));
		    kimHeads.push(new component(75, 75, "http://northkoreaworld.com/imgs/Kim.png", x, gameField.canvas.height - 220, "image"));
		    a += 15; 
			b += 15; 
			c += 25;
			d += 25;
		}
	        else {
		}
    }
    
    for (i = 0; i < kimHeads.length; i += 1) {
        kimHeads[i].x += - 25;
        kimHeads[i].update();
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
    score.text="SCORE: " + score;
    //myHighScore.text = "HIGH SCORE: " + highscore;	
    score.update();
    //myHighScore.update();
    murica.newPos();    
    murica.update();
}
function restart() {
    window.location.reload();
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

    if (e.keyCode == '32' || e.keyCode == '87' || e.keyCode == '38') {
    	if (murica.y >= gameField.canvas.height - 90) {
    	    accelerate(-12)
            clearmove()
        }
    }
    if (e.keyCode == '83' || e.keyCode == '16' || e.keyCode == '40') {
        murica.height = 60;
	
    }
}

function doneKey(e) {

    e = e || window.event;

    if (e.keyCode == '83' || e.keyCode == '16' || e.keyCode == '40') {
        murica.height = 90;

    }
}
function hype() {
    mySound.stop();
    mySound.play();
}
function everyinterval(n) {
    if ((gameField.frameNo / n) % 1 == 0) {return true;}
    return false;
}
function accelerate(n) {
	murica.gravitySpeed = n;
}
function moveup() {
    murica.speedY = -1; 
}

function movedown() {
    murica.speedY = 1; 
}

function moveleft() {
    murica.speedX = -1; 
}

function moveright() {
    murica.speedX = 1; 
}

function clearmove() {
    murica.speedX = 0; 
    murica.speedY = 0; 
}
