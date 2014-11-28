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
	}
	else
	{
		nameElement.removeClass('invalid');
		var score = $('.totScore').text();
		insertToHighscore([name, score]);
	}
	console.log('form');
	updateHighscore();

	e.preventDefault();
});