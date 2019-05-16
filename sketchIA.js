var fps;
var a;
var son;
Player1=function (){
  this.w = width/120
  this.l = height/7
  this.y = height/2 - this.l/2
  this.x = width/250
  this.v = height/80

  this.test = function (){
    if (keyIsDown(90) && this.y>5){
      this.y = this.y - this.v;
    }
    if (keyIsDown(83) && this.y < height - (10 + this.l)){
      this.y = this.y + this.v;
    }
  }

  this.show = function (){
    stroke(57,57,57);
    strokeWeight(width/400);
    fill(255);
    rect(this.x,this.y,this.w,this.l);
  }
}
Player2=function (){
  this.w = width/120
  this.l = height/7
  this.y = height/2 - this.l/2
  this.x = width-((width/250)+this.w)
  this.v = height/80

  this.test = function (){
    if (ball.x > width/2){
      diff = map(playerL.y, 0, height, this.l, 0)
      if (ball.y > (this.y + diff)){
        this.y = this.y + this.v
      }
      if (ball.y < (this.y + diff)){
        this.y = this.y - this.v
      }
    }
  }

  this.show = function (){
    stroke(57,57,57);
    strokeWeight(width/400);
    fill(255);
    rect(this.x,this.y,this.w,this.l);
  }
}
Ball=function(){
  this.rayon = (height+width)/150
  this.x = width/2 - this.rayon
  this.y = height/2 - this.rayon
  this.vx = (height+width)/450
  this.vy = (height+width)/450
  this.reb = 0
  this.acc = 0.4
  //this.r = random(0, 255)
  //this.g = random(0, 255)
  //this.b = random(0, 255)


  this.update = function(){
    if ((this.x < playerL.x + this.rayon + playerL.w ) &&
    (this.x > playerL.x + playerL.w + this.rayon + this.vx ) &&
    ((playerL.y - this.rayon) < this.y) &&
    (this.y < (playerL.y + playerL.l + this.rayon))) { // rebond rect gauche

      this.reb++
      diff = this.y - playerL.y;
      rad = radians(45);
      angle = map(diff, 0, playerL.l, -rad, rad);
      this.vy = 5 * sin(angle);
      this.vx = -(this.vx - this.acc);
      son.play();
      //this.r = random(0, 255)
      //this.g = random(0, 255)
      //this.b = random(0, 255)
    }

    if ((this.x > playerR.x - this.rayon) &&
    (this.x < playerR.x + this.vx)&&
    ((playerR.y - this.rayon )< this.y) &&
    (this.y < (playerR.y + playerR.l + this.rayon))) { // rebond rect droite

      this.reb++
      diff = this.y - playerR.y;
      angle = map(diff, 0, playerR.l, radians(225), radians(135));
      this.vy = 5 * sin(angle);
      this.vx = -(this.vx + this.acc);
      son.play();
    }

    if (this.x < -300){ //respawn a gauche
      this.x= width/2;
      this.vx = (height+width)/450;
      this.reb = 0
      scorer.scoreR++
    }

    if (this.x > width + 300){ // respawn a droite
      this.x= width/2;
      this.vx = -(height+width)/450;
      this.reb = 0
      scorer.scoreL++
    }

    if (this.y < this.rayon || this.y > height - this.rayon){ // bord haut/bas
      this.vy = -this.vy;
    }

    this.x = this.x + this.vx; // avancer
    this.y = this.y + this.vy; // avancer
  }

  this.show = function () {
    stroke(57,57,57);
    strokeWeight(width/400);
    ellipse(this.x,this.y,2*this.rayon,2*this.rayon);
  }

}
Scorer=function(){
  this.x = height/5;
  this.y = width/2;
  this.scoreL = 0;
  this.scoreR = 0;
  this.fsize = (height/120)*(width/150);
  this.font = loadFont('asset/FFFFORWA.TTF');
  this.update=function(){

  }
  this.show=function(){
    textSize(this.fsize);
    textAlign(CENTER, CENTER);
    textFont(this.font);
    textAlign(RIGHT);
    fill(255,0,0);
    text(this.scoreL,this.y - this.fsize,this.x);
    textAlign(CENTER);
    textAlign(LEFT);
    fill(0,0,255);
    text(this.scoreR,this.y + this.fsize,this.x);
  }
}
Ligne=function(){
  this.trait=function(){
    for (var i = 0; i < height; i=i+height/40) {
      rect (width/2-height/80,i,height/(40),height/(40));
      i=i+height/20;
    }
  }
}
function preload(){
  son = loadSound('asset/18782.mp3');
}
function setup(){
  createCanvas(windowWidth-25,windowHeight-30);
  fps=60;
  a=true;
  playerL = new Player1
  playerR = new Player2
  ball = new Ball
  scorer = new Scorer
  ligne = new Ligne
}
function draw(){
  if (a==true){
  background(100);
  text(ball.reb,width/50,height/12)
  playerR.y = constrain(playerR.y, 10,height - 10 - playerR.l)
  ligne.trait();
  scorer.show();
  playerL.test();
  playerL.show();
  playerR.test();
  playerR.show();
  ball.update();
  ball.show();
}
}
function windowResized(){
  createCanvas(windowWidth-25,windowHeight-30);
  playerL = new Player1
  playerR = new Player2
  ball = new Ball
  scorer = new Scorer
  ligne = new Ligne;
}
function keyPressed(){
  if (keyCode===80){
    if (a==false){
      a = true;
    }
    else {
    if (a==true){
      a = false;
    }
  }
  }
}
