// ==========
// BALL STUFF
// ==========

var g_ball = {
    cx: g_paddle.cx,
    cy: g_paddle.cy-g_paddle.halfHeight,
    radius: 5,

    xVel: 0,
    yVel: 0,
    startxVel : 4,
    startyVel : -3,
    GO_SHOOTBALL : 'W'.charCodeAt(0),
    GO_Newgame : 'N'.charCodeAt(0)
};

g_ball.update = function (du) {
    if ((this.xVel===0 && this.yVel===0))
    {
        if (g_keys[this.GO_SHOOTBALL]) {
            if (g_sound) document.getElementById('shoot').play();
            this.xVel = this.startxVel;
            this.yVel = this.startyVel;
            g_levelb.win = false;
        }
        else
        {
            this.cx = g_paddle.cx;
            this.cy = g_paddle.cy-g_paddle.halfHeight-this.radius;
        }
    }
    else 
    {
        // Remember my previous position
        var prevX = this.cx;
        var prevY = this.cy;
        
        // Compute my provisional new position (barring collisions)
        var nextX = prevX + this.xVel * du;
        var nextY = prevY + this.yVel * du;

        // Bounce off the paddles
        if (g_paddle.collidesWith(prevX, prevY, nextX, nextY, this.radius)) 
        {
            this.yVel *= -1;
        }
        if (!this.paddleangle===0) {

            this.paddleangle = 0;
        }

        // Bounce off top and bottom edges
        if (nextY < 0) {                    // bottom edge
            this.yVel *= -1;
        }

        if (nextY > g_canvasb.height) {      // top edge
            if(g_levelb.score>0) g_levelb.score --;       // lowering score if ball hits bottom edge
            this.yVel *= -1;
        }

        if (nextX < 0 ||                    // left edge
            nextX > g_canvasb.width) {       // right edge
            this.xVel *=-1;
        }

        (g_wall.collidesWith(prevX, prevY, nextX, nextY));

        // *Actually* update my position 
        // ...using whatever velocity I've ended up with
        //
        this.cx += this.xVel * du;
        this.cy += this.yVel * du;
    }
    if (g_keys[this.GO_Newgame]) {
        this.reset(true);
    }
};

g_ball.reset = function (why) {
    this.cx = g_paddle.cx;
    this.cy = g_paddle.cy-g_paddle.halfHeight-this.radius;
    this.xVel = 0;
    this.yVel = 0;
    g_levelb.Makewall(why);
};

g_ball.render = function (ctx) {
    ctx.fillStyle = "yellow";
    fillCircle(ctx, this.cx, this.cy, this.radius);
};

g_ball.checkangle = function (cx, halfHeight, halfWidth) {
    var pointpaddle = Math.round(this.cx-cx);
    if (pointpaddle>2*halfWidth/5 && this.xVel<0) {
        this.xVel *= -1;
    }
    if (pointpaddle<-2*halfWidth/5 && this.xVel>0) {
        this.xVel *= -1;
    }
};