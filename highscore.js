

var highScore = 0;
var cach = ['myllaHighscore', 'pacmanHighscore', 'breakHighscore']

function updateHighscore() {
    data = JSON.parse(localStorage.getItem(cach[highScore]));
    if(data===null) {
        $.get("getHighscore.php", {'witch[]':highScore}, function(data) {addToHtml(data);}, 'json');
    }
    else {
        addToHtml(data);
    }
}

function addToHtml(data) {
    localStorage.setItem(cach[highScore], JSON.stringify(data));
    $('.highplayer').empty();
    $('.highScore').empty();
    var k = 1;
    for (var i=0;i<data.length;i++) {
        $('.highplayer').append("<li>"+k+". "+data[i]+"</li>");
        i++;
        k++;
        $('.highScore').append("<li>"+data[i]+"</li>");
    }
}

function insertToHighscore(data){

    var oldScore = JSON.parse(localStorage.getItem(cach[highScore]));
    var done = false;
    var newScore = [];
    for (var i=0; i<oldScore.length; i++) {
        if((data[1]>oldScore[i+1] && !done)) {
            newScore.push(data[0]);
            newScore.push(data[1]);
            done = true;
        }
        newScore.push(oldScore[i]);
        i++;
        newScore.push(oldScore[i]);
    }
    newScore.splice(20);

    localStorage.setItem(cach[highScore], JSON.stringify(newScore));
}

function updateScore() {
    switch (highScore) {
        case 0:
            $(".totScore").text(scoreBoard);
            break;
        case 1:
            if(highscore===null) $(".totScore").text(0);
            else $(".totScore").text(highscore);
            break;
        case 2:
            $(".totScore").text(g_levelb.highscore);
            break;
    }
}
