// =============
// PRELOAD STUFF
// =============

var g_images = {};


function requestPreloads() {

    var requiredImages = {
        
        levelwalls_blue : "pacman/images/walls_blue.png",
        levelwalls_white : "pacman/images/walls_white.png",

        b_continue : "pacman/images/continue.png",
        b_newgame : "pacman/images/newgame.png",
        b_quit : "pacman/images/quit.png",

        pacmanlogo : "pacman/images/pacmanlogo.png",

        therealone: "pacman/images/pacmanRight.png",
        therealoneLeft: "pacman/images/pacmanLeft.png",
        deadPacman : "pacman/images/deadPacMan1.png",
        inky: "pacman/images/inky.png",
        blinky: "pacman/images/blinky.png",
        pinky: "pacman/images/pinky.png",
        clyde: "pacman/images/clyde.png",
        scared: "pacman/images/scaredGhosts.png",
        scaredEnd : "pacman/images/scaredGhostsEnd.png",
        candy : "pacman/images/candy.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
    
}
//function to create spriteSheet, takes in array to store them, image and 
//number of colums and rows to split the image up to.
function createSpriteSheet(spriteArray,image,numCol,numRow){
    var imgHeight = image.height;
    var imgWidth = image.width;
    var celWidth = imgWidth/numCol;
    var celHeight = imgHeight/numRow;

    for(var row = 0; row < numRow;++row){
        for(var col = 0; col < numCol; ++col){
            spriteArray.push(new Sprite(image,col*celWidth,row*celHeight,celWidth,celHeight));
        }
    }
}

var g_sprites = {};
var g_animateSprites = [];
var g_animateSpritesLeft = [];
var g_levelimg = [];
var g_buttons = [];
var g_paclogo = [];
var g_deathSprites =[];
var g_candySprite =[];

//spriteArrays for the ghosts!
var g_inkySprite = [],
    g_blinkySprite = [],
    g_pinkySprite = [],
    g_clydeSprite = [],
    g_scaredSprite = [],
    g_scaredEndSprite = [];

function preloadDone() {
    createSpriteSheet(g_animateSprites,g_images.therealone,2,2);
    createSpriteSheet(g_animateSpritesLeft,g_images.therealoneLeft,2,2);
    
    createSpriteSheet(g_deathSprites,g_images.deadPacman,2,4);

    createSpriteSheet(g_candySprite,g_images.candy,4,2);
    //create ghosts sprites
    createSpriteSheet(g_inkySprite,g_images.inky,2,1);
    createSpriteSheet(g_blinkySprite,g_images.blinky,2,1);
    createSpriteSheet(g_pinkySprite,g_images.pinky,2,1);
    createSpriteSheet(g_clydeSprite,g_images.clyde,2,1);
    createSpriteSheet(g_scaredSprite,g_images.scared,2,1);
    createSpriteSheet(g_scaredEndSprite,g_images.scaredEnd,2,1);

    // LEVEL WALLS
    var levelimage1 = g_images.levelwalls_blue;
    var levelsprite1 = new Sprite(levelimage1, 0, 0, levelimage1.width, levelimage1.height);
    g_levelimg.push(levelsprite1);

    var levelimage2 = g_images.levelwalls_white;
    var levelsprite2 = new Sprite(levelimage2, 0, 0, levelimage2.width, levelimage2.height);
    g_levelimg.push(levelsprite2);

    // BUTTONS
    var button1 = g_images.b_continue;
    var continue_buttonsprite = new Sprite(button1, 0, 0, button1.width, button1.height);
    g_buttons.push(continue_buttonsprite);

    var button2 = g_images.b_newgame;
    var newgame_buttonsprite = new Sprite(button2, 0, 0, button2.width, button2.height);
    g_buttons.push(newgame_buttonsprite);

    var button3 = g_images.b_quit;
    var quit_buttonsprite = new Sprite(button3, 0, 0, button3.width, button3.height);
    g_buttons.push(quit_buttonsprite);

    // LOGO
    var logo = g_images.pacmanlogo;
    var logosprite = new Sprite(logo, 0, 0, logo.width, logo.height);
    g_paclogo.push(logosprite);

    //g_pacmanload = true;
}

requestPreloads();