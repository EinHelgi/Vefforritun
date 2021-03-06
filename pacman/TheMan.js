// ============
// PacMan STUFF
// ============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function PacMan(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.rememberResets();
    
    // Default sprite, if not otherwise specified
    this.counter = 0;
    this.animationOn = false;
    this.i = 0;
    this.sprite = this.sprite || g_animateSprites[this.i];
   
    // Set normal drawing scale, and warp state off
    this._scale = 0.45;
    this.speed = g_pacSpeed*g_speed;
    this.turns = "right";
    this.ghostKilled = 100;
    this.killScore = [];
};

PacMan.prototype = new Entity();

PacMan.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_rotation = this.rotation;
};

PacMan.prototype.KEY_UP = keyCode('W');
PacMan.prototype.KEY_DOWN  = keyCode('S');
PacMan.prototype.KEY_LEFT   = keyCode('A');
PacMan.prototype.KEY_RIGHT  = keyCode('D');

// Initial, inheritable, default values
PacMan.prototype.rotation = 0;
PacMan.prototype.cx = 200;
PacMan.prototype.cy = 200;
PacMan.prototype.velX = 0;
PacMan.prototype.velY = 0;
PacMan.prototype.directionX = 1;
PacMan.prototype.directionY = 1;

PacMan.prototype.isDead = false;

PacMan.prototype.move = function(du, tileP) {

    var rotation;
    if(keys[this.KEY_UP] && this.canGoUp(tileP) && !this.isDead) {
        if(!g_maze.theManMoving) g_maze.theManMoving = true;
        if(this.animationOn === false) this.animationOn = true;
        this.velX = 0;
        this.velY = this.speed;
        if(this.directionY > 0) {
            this.directionY *= -1;
        }
        //prevent pacman's "moonwalk"
        if(this.sprite === g_animateSprites[this.i]) this.rotation = -Math.PI/2;
        if(this.sprite === g_animateSpritesLeft[this.i]) this.rotation = Math.PI/2;
        this.centerx(tileP);   
        this.turns = "up";   
    }
    if(keys[this.KEY_DOWN] && this.canGoDown(tileP) && !this.isDead) {
        if(!g_maze.theManMoving) g_maze.theManMoving = true;
        if(this.animationOn === false) this.animationOn = true;
        this.velX = 0;
        this.velY = this.speed;
        if(this.directionY < 0) {
            this.directionY *= -1;
        }
        //prevent pacman's "moonwalk"
        if(this.sprite === g_animateSprites[this.i])this.rotation = Math.PI/2;
        if(this.sprite === g_animateSpritesLeft[this.i]) this.rotation = -Math.PI/2;
        this.centerx(tileP);
        this.turns = "down"
    }
    if(keys[this.KEY_RIGHT] && this.canGoRight(tileP) && !this.isDead) {
        if(!g_maze.theManMoving) g_maze.theManMoving = true;
        if(this.animationOn === false) this.animationOn = true;
        this.velX = this.speed;
        this.velY = 0;
        if(this.directionX < 0) {
            this.directionX *= -1;
        }       
        this.rotation = 0;
        this.centery(tileP);
        this.turns = "right";
    }
    if(keys[this.KEY_LEFT] && this.canGoLeft(tileP) && !this.isDead) {
        if(!g_maze.theManMoving) g_maze.theManMoving = true;
        if(this.animationOn === false) this.animationOn = true;
        this.velX = this.speed;
        this.velY = 0;
        if(this.directionX > 0) {
            this.directionX *= -1;
        }       
        this.rotation = 0;
        this.centery(tileP);
        this.turns = "left";
    }
    this.wrapPosition();
    this.cx += this.velX*this.directionX*du;
    this.cy += this.velY*this.directionY*du;
    //change image
    this.animateDeath();
    this.animate();
    if(this.killScore[0]) this.updateKillScore(du);
};

// update time for score you get for killing ghosts
PacMan.prototype.updateKillScore = function(du) {
    for (var i=0; i<this.killScore.length; ++i) {
        this.killScore[i][2]-=du/SECS_TO_NOMINALS;
    }
};

PacMan.prototype.resetPacman = function(){
    //set initial position, rotation, and velocity
    this.setPos(this.reset_cx, this.reset_cy);
    this.rotation = this.reset_rotation;
    this.halt();
    //
    this.i = 0;
    this.counter = 0;
    //no animation ongoing if pacman is reset
    this.isDead = false;
    this.animationOn = false;
    //initialize the sprite
    this.sprite = g_animateSprites[this.i];
    //reset ghost
    g_blinky.resetGhost();
    g_pinky.resetGhost();
    g_inky.resetGhost();
    g_clyde.resetGhost();
    g_maze.nextOut = 0;
    //but ghost back in cage
    g_inky.inCage = true;
    g_clyde.inCage = true;
};

PacMan.prototype.animateDeath = function(){
    if(this.isDead === true){
        this.halt();
        this.sprite = g_deathSprites[this.i];
        if(this.counter%10 === 0) this.i++;
        this.counter++;

        if(this.i === g_deathSprites.length){
            if(g_lives === 0) return  g_LostGame()
            this.resetPacman();
        }
    }
};

PacMan.prototype.eatDot = function(){
    var fruitEntity = entityManager._fruits;

    g_dotsEaten();

    for(var i=0; i<fruitEntity.length;i++){
        if((fruitEntity[i].cx > this.cx-this.getRadius() && fruitEntity[i].cx < this.cx +this.getRadius()) && 
            (fruitEntity[i].cy > this.cy-this.getRadius() && fruitEntity[i].cy < this.cy +this.getRadius())) {
                fruitEntity.splice(i,1);
                g_dotCounter++;
                g_BigPoints();
                g_maze.cageLogic();
                this.makeGhostsScared();
        }
    }   
}

PacMan.prototype.animate = function(){
    if(this.animationOn && !(this.velX===0 && this.velY===0)){
        if(this.counter%5 === 0 && this.counter <= 10)this.i++;
        if(this.counter%5 === 0 && this.counter > 10) this.i--;
        if(this.directionX === -1){
            this.sprite = g_animateSpritesLeft[this.i];
        } else{
            this.sprite = g_animateSprites[this.i];
        }
        //if(this.i === g_animateSprites.length-1) this.i=0;
        this.counter++;
        if(this.counter === 30) this.counter = 0;
        }    
};

// tell ghost to be scared because now the TheMan is in the house took the big pill
PacMan.prototype.makeGhostsScared= function() {
    g_maze.scaredTimer = 0;
    g_blinky.fright();
    g_pinky.fright();
    g_inky.fright();
    g_clyde.fright();
    g_maze.ghostScared = true;
    this.ghostKilled = 100;
};

PacMan.prototype.update = function (du) {
    spatialManager.unregister(this);

    if (g_maze.ghostScared) this.speed = g_scaredPacSpeed*g_speed;
    else g_pacSpeed*g_speed;

    while (du > 2) { // take smaller steps if du is too large
        this.takeStep(2);
        du -= 2;
    }
    this.takeStep(du);

    spatialManager.register(this);
    g_pinky.PacTurns = this.turns;
    g_blinky.PacTile = this.tilePos();
};

PacMan.prototype.takeStep = function (du) {
    var tileP =this.tilePos();

    this.eatDot();

    this.move(du, tileP);

    // stop if you are hitting a wall
    if(this.isNextTileWall(tileP) && this.endOfTile(tileP))
    {
        this.velX=0;
        this.velY=0;
        this.centerx(tileP);
        this.centery(tileP);
    }
    if(this.isColliding() && !this.isDead){
        var thing = this.isColliding();
        if (thing.scared && !thing.isDeadNow) {
            if(g_audioOn) g_eatGhostsAudio.play();
            thing.isDeadNow = true; // ghost is killed if you eat him
            thing.shouldTurn = false;
            this.ghostKilled *=2; 
            g_point(this.ghostKilled);
            spatialManager.unregister(thing);
            this.killScore.push([thing.cx, thing.cy, 0.8, this.ghostKilled]);
        }
        else {
             if(!thing.isDeadNow) this.die(); 
             // you cannot eat ghost when they are alive
             // there is something wrong with the former sentence, what I am not sure
        }
    }
};

PacMan.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9*this._scale;
};

PacMan.prototype.halt = function () {
    this.velX = 0;
    this.velY = 0;
};

// R.I.P.
PacMan.prototype.die = function() {
    this.rotation = 0;  
    this.isDead = true;
    this.animationOn = false;
    this.i = 0;
    this.counter = 0;
    g_maze.theManMoving = false;
    if(g_audioOn)g_pacmandeathAudio.play();
    g_lossOfLife();
};

var NOMINAL_ROTATE_RATE = 0.1;

// draw scores you get for killing ghosts
PacMan.prototype.renderKillScore = function(ctx) {
    for (var i=0; i<this.killScore.length; ++i) {
        util.drawPixelText(ctx, this.killScore[i][0], this.killScore[i][1] , this.killScore[i][3], 10, "#DEDEDE");
        if(this.killScore[i][2]<0) this.killScore.splice(i,1);
    }
};

PacMan.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this._scale;
    this.sprite.drawWrappedCentredAt(
    ctx, this.cx, this.cy, this.rotation
    );
    this.sprite.scale = origScale;
    if(this.killScore[0]) this.renderKillScore(ctx);
};