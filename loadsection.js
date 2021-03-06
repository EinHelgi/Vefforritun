
var g_pacmanload = false;
var g_breakoutload = false;

var old_id;
var old_cho = $('.mylla');

$(document).ready(function()
{
	$("a").on("click", function(e) 
	{
	    var id = $(this).data("section");

	    startStopPacman(id, old_id);
	    startStopBreakout(id, old_id);

	    updateHighscoreBoard(id);
	    $(".totScore").text('0');

	    if(old_id !== id || old_id === undefined) 
	    {
		    $("section:visible").fadeOut(function() 
		    {
		    	maybeInitPacman(id);
		    	maybeInitBreakout(id);

		        $(id).fadeIn();
		        old_id = id;
		    });
		 }
		 updateScore();
		 e.preventDefault();
	});
	$('form').submit(function(e)
	{
		var form = $(this);
		var nameElement = form.find('input.pName');
		var name = nameElement.val();
		var message;
		if (name === '')
		{
			message = 'Fylla verður út í nafn';
			nameElement.addClass('invalid');
			$('div.result').show();
		}
		else
		{
			nameElement.removeClass('invalid');
			var score = $('.totScore').text();
			insertToHighscore([name, score]);
			$('div.result').hide();
		}
		updateHighscore();

		e.preventDefault();
	});
});


function updateHighscoreBoard(id) {
	if(id==='#tic-tac-toe') {
    	highScore = 0;
    	updateHighscore();

    	old_cho.removeClass('chosen');
    	$('.mylla').addClass('chosen');
    	old_cho = $('.mylla');
    }
    if(id==='#pacman') {
    	highScore = 1;
    	updateHighscore();

    	old_cho.removeClass('chosen');
    	$('.pacman').addClass('chosen');
    	old_cho = $('.pacman');
    }
    if(id==='#breakout') {
    	highScore = 2;
    	updateHighscore();

    	old_cho.removeClass('chosen');
    	$('.breakout').addClass('chosen');
    	old_cho = $('.breakout');
    }
}

////////////////////////////
///PACMAN management
////////////////////

function maybeInitPacman(id) {
	if(id === "#pacman") {
		if(!g_pacmanload) loadPacman();
		g_pacmanload = true;
	}
}

function startStopPacman(id, oldid){

	if(oldid !== undefined && oldid === "#pacman" && id !== "#pacman") {
	    stopPacman();
	    updateScore(0);
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

function loadPacman() {

	var handleMouse = document.createElement('script');
	handleMouse.src = 'pacman/handleMouse.js';
	handleMouse.type = 'text/javascript';
	document.body.parentNode.appendChild(handleMouse);

	var PACMAN = document.createElement('script');
	PACMAN.src = 'pacman/PACMAN.js';
	PACMAN.type = 'text/javascript';
	document.body.parentNode.appendChild(PACMAN);
}

//////////////////////////////
///BREAKOUT management
//////////////////////

function maybeInitBreakout(id) {
	if(id === "#breakout") {
		if(!g_breakoutload) loadBreakout();
		g_breakoutload = true;
	}
}

function startStopBreakout(id, oldid) {

	if(oldid !== undefined && oldid === "#breakout" && id !== "#breakout") {
	    stopBreakout();
	    console.log("stopBreakout");
    } 
    else if(id === "#breakout" && oldid !== "#breakout" && g_breakoutload) {
    	restartBreakout();
    	console.log("restartBreakout");
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

	var BREAK = document.createElement('script');
	BREAK.src = 'breakout/BREAK.js';
	BREAK.type = 'text/javascript';
	document.body.parentNode.appendChild(BREAK);
}


