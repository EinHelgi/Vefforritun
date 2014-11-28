var highScore = 0;
var cach = ['myllaHighscore', 'pacmanHighscore', 'breakHighscore']

function updateHighscore() {
    $.get("getHighscore.php", {'witch[]':1}, function(data) {addToHtml(data);}, 'json');
    /*if(highScore==0) data = JSON.parse(localStorage.getItem('myllaHighscore'));
    if(data===null) {
        $.get("getHighscore.php", {'witch[]':highScore}, function(data) {addToHtml(data);}, 'json');
        console.log(highScore);
    }
    else {
        addToHtml(data);
    }*/
}

function addToHtml(data) {
    //localStorage.setItem('myllaHighscore', JSON.stringify(data));
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
    var done = false;
    var newScore = [];
    for (var i=0; i<20; ++i) {
        if(data[1]>=oldScore[i+1] && !done) {
            newScore.push(data[0]);
            newScore.push(data[1]);
            done = true;
            console.log('i am here');
        }
        newScore.push(oldScore[i]);
        ++i;
        newScore.push(oldScore[i]);
    }
    newScore.splice(20);

    localStorage.setItem('myllaHighscore', JSON.stringify(newScore));
}