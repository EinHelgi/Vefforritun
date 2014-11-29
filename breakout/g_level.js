var g_levelb = {
	level : 1,
	bricks : 0,
	score : 0,
	win : false,
}

var g_hitaudio =new Audio('breakout/hit1.wav');
var g_hitpaddleaudio =new Audio('breakout/shot.wav');
var g_startaudio =new Audio('breakout/start.wav');
var g_shootaudio =new Audio('breakout/cartoonshot.wav');

g_levelb.Makewall = function (why) {
	if (g_sound) g_startaudio.play();
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
    util.drawPixelText(ctx, 80, 22,"Level: "+this.level, 13, 'white');
    util.drawPixelText(ctx, 320, 22,"Score: "+this.score, 13, 'white');
    if(this.win) {
    	util.drawPixelText(ctx, g_canvasb.width/2, g_canvasb.height/2,"YOU WIN!!", 30, 'white');
    }
}

