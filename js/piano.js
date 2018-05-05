
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
    if (e.keyCode == '81') {
      
    }
    if (e.keyCode == '83') {
      
    }
    if (e.keyCode == '81') {
      
    }
    if (e.keyCode == '83') {
      
    }
    if (e.keyCode == '81') {
      
    }
    if (e.keyCode == '83') {
      
    }
    if (e.keyCode == '81') {
      
    }
    if (e.keyCode == '83') {
      
    }
    if (e.keyCode == '81') {
      
    }
    if (e.keyCode == '83') {
      
    }

function doneKey(e) {

    e = e || window.event;

    if (e.keyCode == '83' || e.keyCode == '16' || e.keyCode == '40') {
        myGamePiece.height = 90;

    }
}
function hype() {
    mySound.stop();
    mySound.play();
}



