var myGamePiece;
var myObstacles = [];
var myScore;
function startGame() {
    myGamePiece = new component(180, 90, "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1280px-Flag_of_the_United_States.svg.png", 90, 655, "image");
    myScore = new component("30px", "Consolas", "red", 50, 50, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1280;
        this.canvas.height = 570;
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
	    swal({
  		title: "Are you sure?",
  		text: "You will not be able to recover this imaginary file!",
  		type: "warning",
  		showCancelButton: true,
  		confirmButtonColor: "#DD6B55",
  		confirmButtonText: "Yes, delete it!",
  		closeOnConfirm: false
	    },
	    function(){
  		swal("Deleted!", "Your imaginary file has been deleted.", "success");
	    });
	    window.location.reload();
            return;
        } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    z = 120;
    z += -50;
    if (myGameArea.frameNo == 1 || everyinterval(z)) {
		var rannum = Math.floor((Math.random())* 10)+1;
        	x = myGameArea.canvas.width;
		if (rannum <= 5) {
        	    //y = myGameArea.canvas.height - 105;
		    
		    myObstacles.push(new component(75, 75, "Kim.png", x, myGameArea.canvas.height - 75, "image"));
		    myObstacles.push(new component(75, 75, "Kim.png", x, myGameArea.canvas.height - 310, "image"));

		}
		else if (rannum >= 6 && rannum <= 8 ){
		    //y = myGameArea.canvas.height - 145;
		    myObstacles.push(new component(75, 75, "Kim.png", x, myGameArea.canvas.height - 145, "image"));
		    myObstacles.push(new component(75, 75, "Kim.png", x, myGameArea.canvas.height - 75, "image"));

		}
	        else {
		    //y = myGameArea.canvas.height - 145;
		    myObstacles.push(new component(75, 75, "Kim.png", x, myGameArea.canvas.height - 145, "image"));
		    myObstacles.push(new component(75, 75, "Kim.png", x, myGameArea.canvas.height - 220, "image"));

		}
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += - 25;
        myObstacles[i].update();
    }
    score = ((myGameArea.frameNo / 129380948923));
    score = Math.ceil(score);
    myScore.text="SCORE: " + score;
    myScore.update();
    myGamePiece.newPos();    
    myGamePiece.update();
}
function restart() {
    window.location.reload();
}
document.onkeydown = checkKey;
document.onkeyup = doneKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '32') {
    	if (myGamePiece.y >= 450) {
    	    accelerate(-12)
	    score += 1;
            clearmove()
        }
    }
    if (e.keyCode == '16') {
        myGamePiece.height = 60;
	
    }
}

function doneKey(e) {

    e = e || window.event;

    if (e.keyCode == '16') {
        myGamePiece.height = 90;

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


