//change this to change length of game
var gametime = 10; //this var is used in reset as well
let timer = gametime; //seconds of timer
var interval; //for counting down
var startbutton, resetbutton; 
var start = false;
var resetKey = false; //play again spacebar
var mobile = false; //display differently for phone
/*Eye Variables*/
var e_x, e_y;
const radius = 65;
var score = 0; //fish collected
var eyeball;
let medusa;

new p5()
// location restriction of target
var x = 200;
var y = 200;
// changes in x, y
var dx = 0;
var dy = 0;

function preload() {
    eyeball = createImg('images/eyeball.png');
    medusa = createImg('images/medusa.png');
}
function setup() {
    randomSeed(1864)
    createCanvas(windowWidth - 100, windowHeight - 100);

    medusa.position(windowWidth/2-400,100);
    medusa.hide();
    //start button
	startbutton = createButton("Start");
    startbutton.position((width / 2)-50, 5*height/7);
    startbutton.size(200, 100); 
    startbutton.style("font-size", "25px");	
    startbutton.mousePressed(reset);
    startbutton.hide(); //hide for now
    //reset button
    resetbutton = createButton("Play Again");
    resetbutton.position(width / 2 -25, 5*height/6);
    resetbutton.size(150, 50);
    resetbutton.style("font-size", "25px");	
    resetbutton.mousePressed(startScreen);
    resetbutton.hide(); //hide for now
    frameRate(60)

    e_x = random(windowWidth-280);
    e_y = random(windowHeight - 280);
    interval = setInterval(decrementTimer, 1000);
}
function reset() {
    timer = gametime;
    score = 0;
    startbutton.hide();
    start = true;
    newFish();
    eyeball.show();
    medusa.show();
    loop();
}
function draw() {
    background(25, 25, 25);
    //Timer
    fill(150);
    textAlign(CENTER);
    //Fish collected 
    fill(255, 255, 255);
    if(mobile){
        textSize(75)
        text('Eyes Collected: ' + score, width / 2, height / 20);
    }else{
        textSize(30);
        text('Eyes Collected: ' + score, width / 2, height / 13.5);
    }
    //fish
    eyeball.position(e_x-30, e_y-25);
    //invisible circle around eye
    noStroke();
    noFill();
    ellipse(e_x, e_y, radius * 2, radius * 2);
    fill(255, 255, 255);
    textAlign(CENTER, CENTER);
    textStyle(NORMAL);
    textSize(30);
    text('Time: ' + timer, width / 2, height / 8);

    if (timer == 0) {
        resetKey = true; 
        gameOver();
    }
    if (!start) {
        eyeball.hide();
        //letter = '';
        startScreen();
    }

}
//game start and instructions
function startScreen() {
    start = false;
    resetKey = false;
    resetbutton.hide();
    fill(61, 61, 61);
    
    rect( windowWidth/4-50, 0, windowWidth/2, windowHeight-100);
    fill(255, 255, 255);
    textSize(40);
    text('Eye Gaze', width / 2, height / 9);
    textSize(35);
    text('Instructions:', width / 2, height / 9 + 50);
    text('Gaze at as many eyes before', width / 2, height / 9 + 85);
    text('the time runs out!', width / 2, height / 9 + 115);
    text('To collect points:', width / 2, height / 9 + 180);
    text('Click or gaze at the eyes', width / 2, height / 9 + 215);
   
    startbutton.show();
}
//game over and restart
function gameOver() {
    fill(61, 61, 61);
    rect( windowWidth/4-50, 0, windowWidth/2, windowHeight-100);
    fill(255, 255, 255);
    textSize(30)
    text("GAME OVER", width / 2, height/3);
    textSize(30);
    textAlign(CENTER);
    text('Eyes Collected: ' + score, width / 2, height/2);
    medusa.hide();
    eyeball.hide();
    resetbutton.show()
    noLoop();
}

//decrement timer every second
function decrementTimer() {
    if (timer > 0) {
        timer--;
    }
}

function update() {
    x = x + dx
    y = y + dy
}

function newEye() {
    e_x = random(windowWidth - 280);
    e_y = random(windowHeight - 280);
}

//when the user clicks
function mousePressed() {
    var d = dist(mouseX, mouseY, e_x, e_y)
    if (d < radius) {
        newEye();
        score++;
    }
}

function keyTyped() {
    //spacebar option to start/play again instead of clicking button
    if (key === ' ') {
        if(!start) {
            reset();
        }
        if(resetKey) {
            startScreen();
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth - 100, windowHeight - 100);
}
