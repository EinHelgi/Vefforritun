
var g_pacmanload = false;
var g_breakoutload = false;

var scoreloaders = [];
var mylla = {
	cach : 'myllaHighscore',
	php : "getMyllaHighscore.php"
};


var old_id;

$(document).ready(function()
{
	$("a").on("click", function() 
	{
	    var id = $(this).data("section");

	    startStopPacman(id, old_id);
	    startStopBreakout(id, old_id);

	    if(old_id !== id || old_id === undefined) 
	    {
		    $("section:visible").fadeOut(function() 
		    {
		    	maybeLoadPacman(id);

		        $(id).fadeIn();
		        old_id = id;
		    });
		 }
	});
});


////////////////////////////
///PACMAN management
////////////////////

function maybeLoadPacman(id) {
	if(id === "#pacman") {
		if(!g_pacmanload) loadPacman();
		g_pacmanload = true;
	}
}

function startStopPacman(id, oldid){

	if(oldid !== undefined && oldid === "#pacman" && id !== "#pacman") {
	    stopPacman();
    } 
    else if(id === "#pacman" && oldid !== "#pacman" && g_pacmanload) {
    	restartPacman();
    }
}

function stopPacman() {
	main.gameOver();
}

function restartPacman() {
	main.revive();
	g_pausemenu.ON = true;
}


//////////////////////////////
///BREAKOUT management
//////////////////////

function maybeLoadBreakout() {
	if(id === "#breakout") {
		if(!g_breakoutload) loadBreakout();
		g_breakoutload = true;
	}
}

function startStopBreakout(id, oldid) {

	if(oldid !== undefined && oldid === "#breakout" && id !== "#breakout") {
	    stopBreakout();
    } 
    else if(id === "#breakout" && oldid !== "#breakout" && g_pacmanload) {
    	restartBreakout();
    }
}

function stopBreakout() {
	g_main.gameOver();
}

function restartBreakout() {
	g_main.revive();
	gb_isUpdatePaused = true;
}

function loadBreakout() {

}




function loadPacman() {

	/*
	var globals = document.createElement('script');
	globals.src = 'pacman/globals.js';
	globals.type = 'text/javascript';
	document.body.parentNode.appendChild(globals);

	var consts = document.createElement('script');
	consts.src = 'pacman/consts.js';
	consts.type = 'text/javascript';
	document.body.parentNode.appendChild(consts);

	var util = document.createElement('script');
	util.src = 'pacman/util.js';
	util.type = 'text/javascript';
	document.body.parentNode.appendChild(util);

	var keys = document.createElement('script');
	keys.src = 'pacman/keys.js';
	keys.type = 'text/javascript';
	document.body.parentNode.appendChild(keys);

	var handleMouse = document.createElement('script');
	handleMouse.src = 'pacman/handleMouse.js';
	handleMouse.type = 'text/javascript';
	document.body.parentNode.appendChild(handleMouse);

	var spatialManager = document.createElement('script');
	spatialManager.src = 'pacman/spatialManager.js';
	spatialManager.type = 'text/javascript';
	document.body.parentNode.appendChild(spatialManager);

	var entityManager = document.createElement('script');
	entityManager.src = 'pacman/entityManager.js';
	entityManager.type = 'text/javascript';
	document.body.parentNode.appendChild(entityManager);

	var Sprite = document.createElement('script');
	Sprite.src = 'pacman/Sprite.js';
	Sprite.type = 'text/javascript';
	document.body.parentNode.appendChild(Sprite);

	var buttons = document.createElement('script');
	buttons.src = 'pacman/buttons.js';
	buttons.type = 'text/javascript';
	document.body.parentNode.appendChild(buttons);

	var Entity = document.createElement('script');
	Entity.src = 'pacman/Entity.js';
	Entity.type = 'text/javascript';
	document.body.parentNode.appendChild(Entity);

	var Ghost = document.createElement('script');
	Ghost.src = 'pacman/Ghost.js';
	Ghost.type = 'text/javascript';
	document.body.parentNode.appendChild(Ghost);

	var TheMan = document.createElement('script');
	TheMan.src = 'pacman/TheMan.js';
	TheMan.type = 'text/javascript';
	document.body.parentNode.appendChild(TheMan);

	var g_maze = document.createElement('script');
	g_maze.src = 'pacman/g_maze.js';
	g_maze.type = 'text/javascript';
	document.body.parentNode.appendChild(g_maze);

	var g_level = document.createElement('script');
	g_level.src = 'pacman/g_level.js';
	g_level.type = 'text/javascript';
	document.body.parentNode.appendChild(g_level);

	var g_ghosts = document.createElement('script');
	g_ghosts.src = 'pacman/g_ghosts.js';
	g_ghosts.type = 'text/javascript';
	document.body.parentNode.appendChild(g_ghosts);

	var g_dots = document.createElement('script');
	g_dots.src = 'pacman/g_dots.js';
	g_dots.type = 'text/javascript';
	document.body.parentNode.appendChild(g_dots);

	var g_fruits = document.createElement('script');
	g_fruits.src = 'pacman/g_fruits.js';
	g_fruits.type = 'text/javascript';
	document.body.parentNode.appendChild(g_fruits);

	var g_candy = document.createElement('script');
	g_candy.src = 'pacman/g_candy.js';
	g_candy.type = 'text/javascript';
	document.body.parentNode.appendChild(g_candy);

	var g_pausemenu = document.createElement('script');
	g_pausemenu.src = 'pacman/g_pausemenu.js';
	g_pausemenu.type = 'text/javascript';
	document.body.parentNode.appendChild(g_pausemenu);

	var startUpScreen = document.createElement('script');
	startUpScreen.src = 'pacman/startUpScreen.js';
	startUpScreen.type = 'text/javascript';
	document.body.parentNode.appendChild(startUpScreen);

	var font = document.createElement('script');
	font.src = 'pacman/font.js';
	font.type = 'text/javascript';
	document.body.parentNode.appendChild(font);

	var update = document.createElement('script');
	update.src = 'pacman/update.js';
	update.type = 'text/javascript';
	document.body.parentNode.appendChild(update);

	var render = document.createElement('script');
	render.src = 'pacman/render.js';
	render.type = 'text/javascript';
	document.body.parentNode.appendChild(render);

	var imagesPreload = document.createElement('script');
	imagesPreload.src = 'pacman/imagesPreload.js';
	imagesPreload.type = 'text/javascript';
	document.body.parentNode.appendChild(imagesPreload);

	var main = document.createElement('script');
	main.src = 'pacman/main.js';
	main.type = 'text/javascript';
	document.body.parentNode.appendChild(main);
	*/

	var handleMouse = document.createElement('script');
	handleMouse.src = 'pacman/handleMouse.js';
	handleMouse.type = 'text/javascript';
	document.body.parentNode.appendChild(handleMouse);

	var PACMAN = document.createElement('script');
	PACMAN.src = 'pacman/PACMAN.js';
	PACMAN.type = 'text/javascript';
	document.body.parentNode.appendChild(PACMAN);
}
