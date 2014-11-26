$(document).ready(function()
{
	$("a").on("click", function() 
	{
	    var id = $(this).data("section");

	    $("section:visible").fadeOut(function() 
	    {
	        $(id).fadeIn();
	    });
	});
});