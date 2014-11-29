
"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var gb_canvas = document.getElementById("mylla");
var playButton = document.getElementById("playButton");
var gb_ctx = gb_canvas.getContext("2d");
var g_mouseX = 0,
    g_mouseY = 0;
var pos = [ [0,0],[150,0],[300,0],
            [0,150],[150,150],[300,150],
            [0,300],[150,300],[300,300]];
var board = [0,0,0,0,0,0,0,0,0, false];
var tileSize = 150;
var yourMove = true;
var alienMove = false
var scoreBoard = 0;
var playing = true;

/*
0        1         2         3         4         5         6         7         8         9
123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// ==============
// MOUSE HANDLING
// ==============
gb_canvas.addEventListener("mousedown", handleMouse);
playButton.addEventListener("click", play);

function handleMouse(evt) {
    var rect = gb_canvas.getBoundingClientRect();

    g_mouseX = evt.clientX - rect.left;
    g_mouseY = evt.clientY - rect.top;

    if(yourMove && playing) {
        checkBoard();
        if(!yourMove) {
            $(".currentPlayer").text('Alien is thinking.....');
            drawAll(gb_ctx);
            getFromPhp();
        }
    }
}
// ==========
// GAME STUFF
// ==========

function play() {
    board = [0,0,0,0,0,0,0,0,0, alienMove];
    utilb.clearCanvas(gb_ctx);
    drawAll(gb_ctx);
    if(board[9]===true)getFromPhp();
    playing =true;
}

function getFromPhp() {
    $.get("tictactoe/mylla.php", {'board[]':board}, function(data) {if(data) test(data);}, 'json');
}

function test(data) {
    if(data[1]==="false" || data[1]==="tie" || data[1]==="alien") {
        board[data[0]-1] = 2;
        $(".currentPlayer").text('Your turn');
        drawAll(gb_ctx);
        if(data[1]==="false") yourMove = true;
    }
    if(data[1]==="tie" || data[1]==="alien") {
        yourMove = board[9];
        alienMove = !alienMove;
        if(data[1]==="tie") {
            scoreBoard++;
            $(".currentPlayer").text('You tied! - you gain a point');
            playing = false;
        }
        if(data[1]==="alien") {
            scoreBoard--;
            $(".currentPlayer").text('The Alien won! - you lose a point');
            playing = false;
        }
        updateScore(scoreBoard);
    }

}

function checkBoard() {
    var tilePos = [Math.floor(g_mouseX/tileSize), Math.floor(g_mouseY/tileSize)];
    if(tilePos[0]===0 && tilePos[1]===0 && board[0]===0) {
        board[0]=1;
        yourMove = false;
        return;
    }
    if(tilePos[0]===1 && tilePos[1]===0 && board[1]===0) {
        board[1]=1;
        yourMove = false;
        return;
    }
    if(tilePos[0]===2 && tilePos[1]===0 && board[2]===0) {
        board[2]=1;
        yourMove = false;
        return;
    }
    if(tilePos[0]===0 && tilePos[1]===1 && board[3]===0) {
        board[3]=1;
        yourMove = false;
        return;
    }
    if(tilePos[0]===1 && tilePos[1]===1 && board[4]===0) {
        board[4]=1;
        yourMove = false;
        return;
    }
    if(tilePos[0]===2 && tilePos[1]===1 && board[5]===0) {
        board[5]=1;
        yourMove = false;
        return;
    }
    if(tilePos[0]===0 && tilePos[1]===2 && board[6]===0) {
        board[6]=1;
        yourMove = false;
        return;
    }
    if(tilePos[0]===1 && tilePos[1]===2 && board[7]===0) {
        board[7]=1;
        yourMove = false;
        return;
    }
    if(tilePos[0]===2 && tilePos[1]===2 && board[8]===0) {
        board[8]=1;
        yourMove = false;
        return;
    }
    $(".currentPlayer").text('Your turn');
}


// ==========
// DRAW STUFF
// ==========
function drawAll(ctx) {
    utilb.clearCanvas(ctx);
    drawBoard(ctx);
    for (var i=0; i<board.length; ++i) {
        if(board[i]===2) drawO(ctx, pos[i][0],pos[i][1]);
        if(board[i]===1) drawX(ctx, pos[i][0],pos[i][1]);
    }
}

function drawBoard(ctx) {
    var oldstyle = ctx.strokeStyle;
    ctx.strokeStyle = 'black';
    ctx.lineWidth=2;
    ctx.beginPath();
    ctx.rect(1,1,gb_canvas.width-2, gb_canvas.height-2);
    ctx.moveTo(tileSize,0);
    ctx.lineTo(tileSize, tileSize*3);
    ctx.moveTo(tileSize*2, tileSize*3);
    ctx.lineTo(tileSize*2, 0);
    ctx.moveTo(0, tileSize);
    ctx.lineTo(tileSize*3,tileSize);
    ctx.moveTo(0, tileSize*2);
    ctx.lineTo(tileSize*3, tileSize*2);
    ctx.stroke();
    ctx.strokeStyle = oldstyle;
} 

function drawX(ctx, x, y) {
    var oldstyle = ctx.strokeStyle;
    ctx.strokeStyle = 'red';
    ctx.lineWidth=20;
    ctx.beginPath();
    ctx.moveTo(x+10,y+10);
    ctx.lineTo(x+tileSize-10,y+tileSize-10);
    ctx.moveTo(x+10,y+tileSize-10);
    ctx.lineTo(x+tileSize-10,y+10);
    ctx.stroke();
    ctx.strokeStyle = oldstyle;
}

function drawO(ctx, x, y) {
    var oldstyle = ctx.strokeStyle;
    ctx.strokeStyle = 'blue';
    ctx.lineWidth=20;
    ctx.beginPath();
    ctx.arc(x+tileSize/2,y+tileSize/2,60,0,2*Math.PI);
    ctx.stroke();
    ctx.strokeStyle = oldstyle;
}

drawAll(gb_ctx);
updateScore(scoreBoard);
updateHighscore();