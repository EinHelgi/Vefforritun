// =========
// PAC-MAN
// =========
/*
A sort-of-playable version of the classic arcade game.
*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// ====================
// CREATE PAC-MAN
// ====================
function createInitialObjects() {

    g_level = new Level();

    g_startupscreen = new startUpScreen({

        cx : g_canvas.width/2,
        cy : g_canvas.height/2,
        pacmanlogo : g_paclogo[0]

    });

    g_pausemenu = new Menu(300, 180, 15, "pause");

}

// ======================
// Fixing maze for tunnel
// ======================
g_maze.fixMaze();


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

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC
var timedelay = 2*SECS_TO_NOMINALS;
var restoredelay = timedelay;
function delayUpdate(du) {
    if(timedelay > 0) {
        timedelay -= du
        return true;
    }
    else{
        timedelay = restoredelay;
        return false;
    }
}

function updateSimulation(du) {
    
    processDiagnostics();

    // Nothing updates for the first seconds the game is run
    if (g_startupscreen.timer >= g_startupscreen.startGame) g_startupscreen.update(du);
    else {

        // Check if startupscreen is on, else allow game to run
        if(g_startupscreen.status() && g_startupscreen.ON) g_startupscreen.update(du);
        else {

            // Pause game if between levels
            if(g_levelchange) {
                if(delayUpdate(du)){
                    g_level.update(du);
                    return;
                }
                else g_levelchange = false;
                
            }

            // Pause game if esc key was pressed
            if(!g_startupscreen.ON) g_pausemenu.checkPause();
            if(g_pausemenu.ON && !g_startupscreen.ON) {
                g_pausemenu.update();
                return;
            }

            g_level.update(du);
            entityManager.update(du);
        }
    }

}
//Audio stuff for toogleing
var KEY_AUDIO = keyCode('Z');
var g_audioOn = true;

//load audio
var g_chompAudio = new Audio('pacman/sounds/pacman_chomp.wav'),
    g_sirenAudio = new Audio('pacman/sounds/pacman_siren.wav'),
    g_pacmandeathAudio = new Audio('pacman/sounds/pacman_death.wav'),
    g_eatGhostsAudio = new Audio('pacman/sounds/pacman_eatghost.wav');

// GAME-SPECIFIC DIAGNOSTICS

var g_renderSpatialDebug = false;
var g_useUglyRedWall = false;
var g_scatterToggle = true;

var KEY_SPATIAL = keyCode('X');
var KEY_REDWALL = keyCode('M');

var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');

var KEY_K = keyCode('K');

function processDiagnostics() {
    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

    if (eatKey(KEY_REDWALL)) g_useUglyRedWall = !g_useUglyRedWall;   

    if (eatKey(KEY_AUDIO)) g_audioOn = !g_audioOn; 
}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`

// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    if (g_startupscreen.timer >= g_startupscreen.startGame) g_startupscreen.render(ctx);
    else {
        
        g_level.render(ctx);
        entityManager.render(ctx);

        if (g_renderSpatialDebug) spatialManager.render(ctx);
        
        if (g_pausemenu.ON && !g_startupscreen.ON) g_pausemenu.render(ctx);

        if (g_startupscreen.status() && g_startupscreen.ON) g_startupscreen.render(ctx);
    }
}

function run() {
    entityManager.init();
    createInitialObjects();

    main.init();
}

run();