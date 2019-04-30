//change this to change length of game
var gametime = 20; //this var is used in reset as well
let timer = gametime; //seconds of timer
var interval; //for counting down
var startbutton, resetbutton; 
var start = false;
var resetKey = false; //play again spacebar
/*Eye Variables*/
var e_x, e_y;
const e_radius = 65;
var score = 0;
var eyeball;
/*Medusa Variables*/
let medusa;
m_radius = 210;
medmode = false;

function preload() {
    eyeball = createImg('images/eyeball.png');
    medusa = createImg('images/medusa.png');
}
function setup() {
    randomSeed(1864)
    createCanvas(windowWidth - 100, windowHeight - 100);
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
    resetbutton.position((width / 2)-50, 5*height/7);
    resetbutton.size(200, 100);
    resetbutton.style("font-size", "25px");	
    resetbutton.mousePressed(startScreen);
    resetbutton.hide(); //hide for now
    frameRate(60)
    //eye position not in deadzone
    e_x = random(windowWidth - 280);
    e_y = random(windowHeight - 280);
    var d = dist(e_x, e_y, (width / 2) + 10, 400);
    while (d < (m_radius + 50)) {
        e_x = random(windowWidth - 280);
        e_y = random(windowHeight - 280);
        d = dist(e_x, e_y, (width / 2) + 10, 400);
    }
    interval = setInterval(decrementTimer, 1000);
}
function reset() {
    timer = gametime;
    score = 0;
    startbutton.hide();
    start = true;
    medmode = false;
    newEye();
    eyeball.show();
    medusa.show();
    loop();
}
function draw() {
    background(25, 25, 25);
    //medusa deadzone
    noStroke();
    noFill();
    ellipse((width / 2) + 10, 400, m_radius, m_radius);
    //medusa position
    medusa.position(width / 2 - 450, 110);
    //Timer
    fill(150);
    textAlign(CENTER);
    //Eyes collected 
    fill(255, 255, 255);
    textSize(30);
    text('Eyes Collected: ' + score, width / 2, height / 13.5);
    //eyeball position
    eyeball.position(e_x-57, e_y-25);
    //invisible circle around eye
    noStroke();
    noFill();
    ellipse(e_x, e_y, e_radius * 2, e_radius * 2);
    fill(255, 255, 255);
    textAlign(CENTER, CENTER);
    textStyle(NORMAL);
    textSize(30);
    text('Time: ' + timer, width / 2, height / 8);

    if (timer == 0) {
        resetKey = true; 
        gameOver();
    }
    if (timer == gametime - 1) {
        medmode = true;
    }
    if (!start) {
        eyeball.hide();
        startScreen();
    }

}
//game start and instructions
function startScreen() {
    start = false;
    resetKey = false;
    medmode = false;
    resetbutton.hide();
    fill(61, 61, 61);
    
    rect( windowWidth/4-50, 0, windowWidth/2, windowHeight-100);
    fill(255, 255, 255);
    textSize(40);
    text('Gorgon Gaze', width / 2, height / 9);
    textSize(35);
    text('Instructions:', width / 2, height / 9 + 50);
    text('Gaze at as many eyes you can', width / 2, height / 9 + 85);
    text('before the time runs out!', width / 2, height / 9 + 115);
    text('To collect points:', width / 2, height / 9 + 180);
    text('Click or gaze at the eyes', width / 2, height / 9 + 215);
    text('(and avoid looking at Medusa)', width / 2, height / 9 + 250);
   
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

function newEye() {
    e_x = random(windowWidth - 280);
    e_y = random(windowHeight - 280);
    var d = dist(e_x, e_y, (width / 2) + 10, 400);
    while (d < (m_radius + 50)) {
        e_x = random(windowWidth - 280);
        e_y = random(windowHeight - 280);
        d = dist(e_x, e_y, (width / 2) + 10, 400);
    }
}

//when the user clicks
function mousePressed() {
    var d = dist(mouseX, mouseY, e_x, e_y)
    var d2 = dist(mouseX, mouseY,(width / 2)+10, 400)
    if (d < e_radius) {
        newEye();
        score++;
    }
    if ((d2 < m_radius) && (medmode == true)) {
        medmode = false;
        //resetKey = true;
        //gameOver();
        timer = 0;
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
