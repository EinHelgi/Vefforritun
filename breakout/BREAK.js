"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvasb = document.getElementById("breakoutCan");
var g_ctxr = g_canvasb.getContext("2d");

// ============
// WALL STUFF
// ============
g_levelb.Makewall(true);

// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}

// =================
// UPDATE SIMULATION
// =================

// GAME-SPECIFIC UPDATE LOGIC

function updateSimulationb(du) {
    g_levelb.update(du);

    g_ball.update(du);
    
    g_paddle.update(du);

    g_wall.update(du);
}


// =================
// RENDER SIMULATION
// =================

// GAME-SPECIFIC RENDERING

function renderSimulationb(ctx) {

    g_ball.render(ctx);
    
    g_paddle.render(ctx);

    g_wall.render(ctx);

    g_levelb.render(ctx);
}

// Kick it off
g_main.init();

/*
okey, everything that is special about the game..... I am not sure what is considered special
so I am going to count most of the stuff in the game up and if it is not something that is considered
"cool" bare with me:
    - colored bricks, they are colorcoded for the player, red takes one hit, green two hits and blue three hits
    - some bricks can take more then one hit
    - yellow bricks can take infinite hits
    - the bricks that are not indestructible change colors if you hit them 
    - there are sounds in the game and yes you can turn them off!
    - there are 4 levels in the game
    - if you hit the edge of the paddle the ball will go back the same direction it came from
            - to be clear if the ball is coming from the left and it hits the left edge it bounces back to the left
    - if you start any level and finish you will find yourself on the next level with the ball on the paddle ready to launch,
        if you finish the fourth level you will find yourself on the first level with the letters YOU WIN! on the screen
    - you keep the scores until you win the game, I mean if you finish a level you will start the next level with the score
        you earned on the level before
    - you loose  one scorepoint if the ball touches the ground below the paddle
    - there is a background
    - the background changes after level
*/