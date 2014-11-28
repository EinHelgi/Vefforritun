var g_levelb = {
	level : 1,
	bricks : 0,
	score : 0,
	win : false,
	GO_UPLEVEL : 'I'.charCodeAt(0),
	GO_DOWNLEVEL : 'K'.charCodeAt(0)
}

g_levelb.Makewall = function (why) {
	//if (g_sound) document.getElementById('start').play();
	this.bricks = 0;
	if(why)this.score = 0;
	var strength = 1;
	for (var i=0; i<g_wall.length; i++) {
	    g_wall.bricks[i]=[];
	    for (var k=0; k<g_wall.height; k++) {
	        strength =3;
	        if (k>1) strength--;
	        if (k>3) strength--;
	        g_wall.bricks[i][k]=[strength];
	        this.bricks++;              
	    }
	}
	if (this.level>1) {
		g_wall.bricks[g_wall.length-2][g_wall.height-2][0] =Infinity;
		g_wall.bricks[1][g_wall.height-2][0] =Infinity;
		this.bricks-=2;
	}
	if (this.level>2) {
		g_wall.bricks[g_wall.length-4][g_wall.height-2][0] =Infinity;
		g_wall.bricks[3][g_wall.height-2][0] =Infinity;
		this.bricks-=2;
	}
	if (this.level>3) {
		g_wall.bricks[g_wall.length-1][2][0] =Infinity;
		g_wall.bricks[0][2][0] =Infinity;
		this.bricks-=2;
	}
}

g_levelb.update = function (du) {
	if (g_keys[this.GO_UPLEVEL]) {
        if(this.level<4) {
        	this.level++;
        	document.getElementById('breakoutCan').className = "level"+ this.level;
        	g_ball.reset(true);
        	eatKey(this.GO_UPLEVEL);
        }
    }
    if (g_keys[this.GO_DOWNLEVEL]) {
        if(this.level>1) {
        	this.level--;
        	document.getElementById('breakoutCan').className = "level"+ this.level;
        	g_ball.reset(true);
        	eatKey(this.GO_DOWNLEVEL);
        }
    }
    if (this.bricks===0) {
    	if(this.level<4) this.level++;
    	else this.level = 1;
    	document.getElementById('breakoutCan').className = "level"+ this.level;
    	g_ball.reset(false);
    	if (this.level===1) this.win = true;
    }
    updateScore(g_levelb.score);
}

g_levelb.render = function (ctx) {
	ctx.fillStyle = "white";
	ctx.font="bold 18px Arial";
    ctx.fillText("Level: "+this.level,20,15);
    ctx.fillText("Score: "+this.score,300,15);
    if(this.win) {
    	ctx.font ="bold 30px Arial";
    	ctx.fillText("YOU WIN!!", 120,180);
    }
}

