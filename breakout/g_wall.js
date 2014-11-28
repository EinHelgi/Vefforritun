// ============
// WALL STUFF
// ============

var g_wall = {
    bricks : [],
    brickw : 40,
    brickh : 20,
    length : 9,
    height : 6,
    cx : 20,
    cy : 30,
    colorb : ["yellow", "red", "green","blue"]
};

g_wall.drawwall = function (ctx) {
    ctx.translate(this.cx, this.cy);
    for (var i=0; i<this.length; i++) {
        for (var k=0; k<this.height; k++) {
            if (this.bricks[i][k][0]>0) {
                this.drawbrick(i*(this.brickw), k*(this.brickh), ctx ,
                	this.bricks[i][k][0]);
            }
        }
    }
    ctx.translate(-this.cx, -this.cy);
};

g_wall.drawbrick = function (cx, cy, ctx, col) {
	if (col>100) col = 0;
    ctx.fillStyle= this.colorb[col];
    ctx.fillRect(cx+1, cy+1, this.brickw-2, this.brickh-2);
};

g_wall.update = function (du) {

};

g_wall.render = function (ctx) {
	this.drawwall(ctx);
};

g_wall.collidesWith = function (prevX, prevY, nextX, nextY) {
	var ballposX = Math.floor((prevX-this.cx)/this.brickw);
	var nextballposX = Math.floor((nextX-this.cx)/this.brickw);
	var ballposY = Math.floor((prevY-this.cy)/this.brickh);	
	var nextballposY = Math.floor((nextY-this.cy)/this.brickh);
	var inside = false;
	if(this.bricks[nextballposX])
		if(this.bricks[nextballposX][nextballposY])
			if(this.bricks[nextballposX][nextballposY][0])
				if (this.bricks[nextballposX][nextballposY][0]>0)
				{
					this.bricks[nextballposX][nextballposY][0]-=1;
					if (this.bricks[nextballposX][nextballposY][0]===0)
					{
						g_levelb.bricks--;
						g_levelb.score++;
					}
					inside = true;
					if (g_sound) document.getElementById('hit').play();
				}
	if (inside) {
		if(ballposX<nextballposX || ballposX>nextballposX)
			g_ball.xVel *=-1;
		if(ballposY<nextballposY || ballposY>nextballposY)
			g_ball.yVel *=-1;
	}
};