var myGamePiece;
var myObstacles = [];
var myScore;

function startGame() {
    myGamePiece = new component(30, 30, "Kim.png", 10, 120, "image");
    myScore = new component("30px", "Consolas", "black", 20, 20, "text");

    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1280;
        this.canvas.height = 720;
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
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.sp = 2;
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
        var rockbottom = myGameArea.canvas.height - this.height;
        
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
    var x, y, z, score;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;
        } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    z = 90;
    z += -10;
    if (myGameArea.frameNo == 1 || everyinterval(z)) {
        x = myGameArea.canvas.width;
        y = myGameArea.canvas.height - 20;
        myObstacles.push(new component(20, 10, "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1280px-Flag_of_the_United_States.svg.png", x, y, "image"));
    }

    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += - myGamePiece.sp;
        myObstacles[i].update();
    }
    score = myGameArea.frameNo / 5
    myScore.text="SCORE: " + score;
    myScore.update();
    myGamePiece.newPos();    
    myGamePiece.update();
}

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
    	if (myGamePiece.y >= 230) {
    		accelerate(-5)
        	clearmove()
        }
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}
function accelerate(n) {
	myGamePiece.gravitySpeed = n;
}
function moveup() {
    myGamePiece.speedY = -1; 
}

function movedown() {
    myGamePiece.speedY = 1; 
}

function moveleft() {
    myGamePiece.speedX = -1; 
}

function moveright() {
    myGamePiece.speedX = 1; 
}

function clearmove() {
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}
document.write(myGamePiece.y);

