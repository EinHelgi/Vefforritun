
"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var playButton = document.getElementById("playButton");
var g_ctx = g_canvas.getContext("2d");
var g_mouseX = 0,
    g_mouseY = 0;
var pos = [ [0,0],[150,0],[300,0],
            [0,150],[150,150],[300,150],
            [0,300],[150,300],[300,300]];
var board = [0,0,0,0,0,0,0,0,0, false];
var tileSize = 150;
var yourMove = true;
var alienMove = false
var scoreBoard = ['current', 0];

/*
0        1         2         3         4         5         6         7         8         9
123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// ==============
// MOUSE HANDLING
// ==============
g_canvas.addEventListener("mousedown", handleMouse);
playButton.addEventListener("click", play);

function handleMouse(evt) {
    var rect = g_canvas.getBoundingClientRect();

    g_mouseX = evt.clientX - rect.left;
    g_mouseY = evt.clientY - rect.top;

    if(yourMove) {
        checkBoard();
        if(!yourMove) {
            $(".currentPlayer").text('Alien is thinking.....');
            drawAll(g_ctx);
            getFromPhp();
        }
    }
}
// ==========
// GAME STUFF
// ==========

function play() {
    board = [0,0,0,0,0,0,0,0,0, alienMove];
    util.clearCanvas(g_ctx);
    drawAll(g_ctx);
    if(board[9]===true)getFromPhp();
}

function getFromPhp() {
    $.get("mylla.php", {'board[]':board}, function(data) {if(data) test(data);}, 'json');
}

function test(data) {
    if(data[1]==="false" || data[1]==="tie" || data[1]==="alien") {
        board[data[0]-1] = 2;
        $(".currentPlayer").text('Your turn');
        drawAll(g_ctx);
        if(data[1]==="false") yourMove = true;
    }
    if(data[1]==="tie" || data[1]==="alien") {
        yourMove = board[9];
        alienMove = !alienMove;
        if(data[1]==="tie") {
            scoreBoard[1]++;
            $(".currentPlayer").text('You tied!');
        }
        if(data[1]==="alien") {
            scoreBoard[1]--;
            $(".currentPlayer").text('The Alien won!');
        }
        updateScore();
    }

}

function updateScore() {
    $(".player").text(scoreBoard[0]);
    $(".totScore").text(scoreBoard[1]);
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
    util.clearCanvas(ctx);
    drawBoard(ctx);
    for (var i=0; i<board.length; ++i) {
        if(board[i]===2) drawO(ctx, pos[i][0],pos[i][1]);
        if(board[i]===1) drawX(ctx, pos[i][0],pos[i][1]);
    }
}

function drawBoard(ctx) {
    var oldstyle = ctx.strokeStyle;
    ctx.strokeStyle = 'black';
    ctx.lineWidth=5;
    ctx.beginPath();
    ctx.rect(0,0,tileSize,tileSize);
    ctx.rect(tileSize,0,tileSize,tileSize);
    ctx.rect(tileSize*2,0,tileSize,tileSize);
    ctx.rect(0,tileSize,tileSize,tileSize);
    ctx.rect(tileSize,tileSize,tileSize,tileSize);
    ctx.rect(tileSize*2,tileSize,tileSize,tileSize);
    ctx.rect(0,tileSize*2,tileSize,tileSize);
    ctx.rect(tileSize,tileSize*2,tileSize,tileSize);
    ctx.rect(tileSize*2,tileSize*2,tileSize,tileSize);
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

function updateHighscore() {
    var data = JSON.parse(localStorage.getItem('myllaHighscore'));
    if(data===null) {
        $.get("getMyllaHighscore.php", function(data) {addToHtml(data);}, 'json');
    }
    else {
        addToHtml(data);
    }
}

function addToHtml(data) {
    localStorage.setItem('myllaHighscore', JSON.stringify(data));
    $('.highplayer').empty();
    $('.highScore').empty();
    for (var i=0;i<data.length;++i) {
        $('.highplayer').append("<li>"+data[i]+"</li>");
        i++
        $('.highScore').append("<li>"+data[i]+"</li>");
    }
}

function insertToHighscore(data){

    var oldScore = JSON.parse(localStorage.getItem('myllaHighscore'));

    var newScore = [];
    for (var i=0; i<20; ++i) {
        if(data[1]>=oldScore[i+1]) {
            newScore.push(data[0]);
            newScore.push(data[1]);
        }
        newScore.push(oldScore[i]);
        ++i;
        newScore.push(oldScore[i]);
    }
    newScore.splice(20);

    localStorage.setItem('myllaHighscore', JSON.stringify(newScore));
}
drawBoard(g_ctx);
updateScore();
updateHighscore();

