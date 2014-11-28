// ============
// PADDLE STUFF
// ============

var g_paddle = {
    cx : 200,
    cy : 370,
    halfWidth : 20,
    halfHeight : 3,
    GO_LEFT   : 'A'.charCodeAt(0),
    GO_RIGHT : 'D'.charCodeAt(0)
};


g_paddle.update = function (du) {
    if (g_keys[this.GO_LEFT]) {
        this.cx -= 5 * du;
    } else if (g_keys[this.GO_RIGHT]) {
        this.cx += 5 * du;
    }
    this.collideswall();
};

g_paddle.render = function (ctx) {
    // (cx, cy) is the centre; must offset it for drawing
    ctx.fillStyle = "white";
    ctx.fillRect(this.cx - this.halfWidth,
                 this.cy - this.halfHeight,
                 this.halfWidth * 2,
                 this.halfHeight * 2);
};

g_paddle.collidesWith = function (prevX, prevY, 
                                          nextX, nextY, 
                                          r) {
    var paddleEdge = this.cy;
    // Check Y coords
    if ((nextY - r < paddleEdge && prevY - r >= paddleEdge) ||
        (nextY + r > paddleEdge && prevY + r <= paddleEdge)) {
        // Check X coords
        if (nextX + r >= this.cx - this.halfWidth &&
            nextX - r <= this.cx + this.halfWidth) {
            // It's a hit!
            g_ball.checkangle(this.cx, this.halfHeight, this.halfWidth);
            if (g_sound) document.getElementById('hitpaddle').play();
            return true;
        }
    }
    // It's a miss!
    return false;
};

g_paddle.collideswall = function () {
    if(this.cx<this.halfWidth)
        this.cx = this.halfWidth;
    if(this.cx>g_canvasb.width-this.halfWidth)
        this.cx = g_canvasb.width-this.halfWidth;
}