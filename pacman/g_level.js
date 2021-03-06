// Level stuff
var g_level;

// level globals
var g_score = 0;
var g_lives = 3;
var g_speed = 2;
var g_ghostSpeed = 0.75;
var g_pacSpeed = 0.8;
var g_scaredGhostSpeed = 0.50;
var g_scaredPacSpeed = 0.9;
var g_ghostFrightTime = 6;
var g_currentLevel = 1;
var g_dotCounter = 0;
var highscore = localStorage.getItem("highscore");

var g_levelchange = false; 

g_newGame = function() {
	g_score = 0;
	g_lives = 3;
	g_currentLevel = 0;
	nextLevel();
}

function Level() {
    this.cx = 0;
    this.cy = 0;
    this.levelsprite_blue = this.levelsprite || g_levelimg[0];
    this.levelsprite_white = this.levelsprite_white || g_levelimg[1];
}

Level.prototype.pacwhite = "#DEDEDE";
Level.prototype.standardsize = 16;
Level.prototype.smallersize = 14;
Level.prototype.delay = 2*SECS_TO_NOMINALS;
Level.prototype.flicker = false;
Level.prototype.flickercounter = 0.1*SECS_TO_NOMINALS;


Level.prototype.update = function(du) {
	if(g_score>highscore) highscore = g_score;
	if (array_cx.length === 0 && entityManager._fruits.length === 0) {

		g_levelchange = true;

		nextLevel();
	}

	if(g_levelchange) {
		if(this.flickercounter > 0) this.flickercounter -= du;
		else {
			this.flicker = !this.flicker;
			this.flickercounter = 0.1*SECS_TO_NOMINALS;
		}
	}
	updateScore(g_score);
};

g_point = function(num) {
	g_score+=num;
};

g_SmallPoints = function() {
	g_score+=10;
};

g_BigPoints = function() {
	g_score+=50;
};

g_candyPoints = function() {
	if(g_currentLevel === 1) {
   			g_score+=100;
    }
    if(g_currentLevel === 2) {
   			g_score+=300;
    }
    if(g_currentLevel === 3 || g_candy.level === 4) {
   			g_score+=500;
    }
    if(g_currentLevel > 4) {
   			g_score+=700;
    }  
}


g_lossOfLife = function () {
	g_lives--;
}

g_LostGame = function(du) {
	if(g_lives === 0 && highscore > localStorage.getItem("highscore")) {
		(localStorage.setItem("highscore", g_score));
	} 
	g_newGame();
}

Level.prototype.render = function(ctx) {

	// Draw wall image
	if(g_levelchange) {
		if(this.flicker) {
			this.levelsprite_blue.drawAt(ctx, this.cx, this.cy);
		}
		else {
			this.levelsprite_white.drawAt(ctx, this.cx, this.cy);
		}
	}
	else this.levelsprite_blue.drawAt(ctx, this.cx, this.cy);


	// Render current level
	util.drawPixelText(ctx, g_canvas.width-70, 20, "LEVEL", this.standardsize, this.pacwhite);
	if(g_currentLevel<10) util.drawPixelText(ctx, g_canvas.width-70, 40, "0"+g_currentLevel, this.standardsize, this.pacwhite);
	else util.drawPixelText(ctx, g_canvas.width-70, 40, g_currentLevel, this.standardsize, this.pacwhite);

	// Render 1UP text
	util.drawPixelText(ctx, 70, 20, "1UP", 16, this.pacwhite);

	// Render current score
	if(g_score === 0) util.drawPixelText(ctx, 70, 40, "00", this.standardsize, this.pacwhite);
	else util.drawPixelText(ctx, 70, 40, g_score, this.standardsize, this.pacwhite);

	// Render the highest score
	util.drawPixelText(ctx, g_canvas.width/2, 20, "HIGH SCORE", this.standardsize, this.pacwhite);
	if(highscore === null) util.drawPixelText(ctx, g_canvas.width/2, 40, "00", this.standardsize, this.pacwhite);
	else util.drawPixelText(ctx, g_canvas.width/2, 40, highscore, this.standardsize, this.pacwhite);

	// Render ready text above pacman before he starts
	if(!g_maze.theManMoving && !entityManager._pacMan[0].isDead && !g_levelchange) 
		util.drawPixelText(ctx, g_canvas.width/2, 336, "READY!", this.smallersize, "#FFFF00");

	// Render the game is over
	if(g_lives === 0) util.drawPixelText(ctx, g_canvas.width/2, 336, "GAME  OVER", this.smallersize, "#FE0000");

	//Render Lives
	var width = 30;
	for(var i=0; i<g_lives;i++) {
		g_animateSprites[0].scale = 0.45;
		g_animateSprites[0].drawWrappedCentredAt(ctx,width,g_canvas.height-20,0);
		width+=30;
	}
};

// starting next level
function nextLevel () {
	g_currentLevel++;
	newLevel(g_currentLevel);
	g_maze.resetMaze();
	g_dotCounter = 0;
	array_cx = [];
	array_cy = [];
	entityManager._pacMan[0].resetPacman();
	entityManager.generateFourFruits();
	g_scatterToggle = true;
	makeDots();
};


// setting thing up for next level
function newLevel (level) {
	if (level===1) {
		g_ghostSpeed = 0.75;
		g_pacSpeed = 0.8;
		g_scaredGhostSpeed = 0.50;
		g_scaredPacSpeed = 0.9;
		g_ghostFrigthTime = 6;
		g_maze.chaseScatter = [7,20,7,20,5,20,5,false];
		return; 
	}
	if (level>1 && level<5) {
		g_ghostSpeed = 0.85;
		g_pacSpeed = 0.9;
		g_scaredGhostSpeed = 0.55;
		g_scaredPacSpeed = 0.95;
		g_ghostFrigthTime = 4;
		g_maze.chaseScatter = [7,20,7,20,5,1033,1/60,false];
		return;
	}
	if (level>4 && level<21) {
		g_ghostSpeed = 0.95;
		g_pacSpeed = 1;
		g_scaredGhostSpeed = 0.6;
		g_scaredPacSpeed = 1;
		g_ghostFrigthTime = 2;
		g_maze.chaseScatter = [5,20,5,20,5,1037,1/60,false];
		return;
	}
	g_ghostSpeed = 0.95;
	g_pacSpeed = 0.9;
	g_scaredGhostSpeed = 0.55;
	g_scaredPacSpeed = 0.95;
	g_ghostFrigthTime = 0;
	g_maze.chaseScatter = [5,20,5,20,5,1037,1/60,false];
};