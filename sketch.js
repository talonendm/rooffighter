let images = [];
let currentIndex = 4;

// Counters
let countA = 0;
let countZ = 0;
let count3 = 0;
let count6 = 0;

// Points
let points1 = 0;
let points2 = 0;

// Expected next key for each player
let expectAZ = 'a';  // Player 1 (a,z)
let expect36 = '3';  // Player 2 (3,6)

let gameOver = false;
let winner = "";

function preload() {
  // Upload these files into the p5 Web Editor "Files" panel
  images.push(loadImage("ge1.jpg"));
  images.push(loadImage("ge2.jpg"));
  images.push(loadImage("ge3.jpg"));
  images.push(loadImage("ge4.jpg"));
  images.push(loadImage("ge15.jpg"));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(255);
}

function draw() {
  background(30);

  if (!gameOver) {
    // Show current image
    if (images[currentIndex]) {
      let img = images[currentIndex];
      let scaleFactor = min(width / img.width, height / img.height);
      let w = img.width * scaleFactor;
      let h = img.height * scaleFactor;
      image(img, width / 2, height / 2, w, h);
    }

    // Draw touch areas
    noStroke();
    fill(0, 0, 255, 80);   // left = Player 1
    rect(0, 0, width / 2, height);
    fill(255, 0, 0, 80);   // right = Player 2
    rect(width / 2, 0, width / 2, height);

    // Labels
    fill(255);
    text("Player 1\n(a/z)", width / 4, height - 40);
    text("Player 2\n(3/6)", 3 * width / 4, height - 40);

    // Scores display
    textSize(16);
    textAlign(LEFT, TOP);
    text("P1 a:" + countA + " z:" + countZ + " pts:" + points1, 10, 10);
    text("P2 3:" + count3 + " 6:" + count6 + " pts:" + points2, 10, 30);
  } else {
    // Game over screen
    background(0);
    textSize(32);
    fill(255, 215, 0);
    text(winner + " Wins !", width / 2, height / 2);
  }
}

function touchStarted () {
  let fs = fullscreen();
  if (!fs) {
    fullscreen(true);
  }
  if (gameOver) return; // stop game if finished

  let pictureShouldChange = false;

  // --- Player 1: left side ---
  if (mouseX < width / 2) {
    if (expectAZ === 'a') {
      countA++;
      points1++;
      expectAZ = 'z';
      pictureShouldChange = true;
    } else if (expectAZ === 'z') {
      countZ++;
      points1++;
      expectAZ = 'a';
      pictureShouldChange = true;
    }
  }

  // --- Player 2: right side ---
  if (mouseX >= width / 2) {
    if (expect36 === '3') {
      count3++;
      points2++;
      expect36 = '6';
      pictureShouldChange = true;
    } else if (expect36 === '6') {
      count6++;
      points2++;
      expect36 = '3';
      pictureShouldChange = true;
    }
  }

  // --- Picture change logic ---
  if (pictureShouldChange) {
    let diff = (points1 - points2) % 3;
    if (diff === 0) {
      currentIndex = (currentIndex + 1) % (images.length-1);
    }
  }

  // --- Check for game end ---
  if (points1 >= 100) {
    gameOver = true;
    winner = "Player 1";
  } else if (points2 >= 100) {
    gameOver = true;
    winner = "Player 2";
  }
}




function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function timeIt() {
  
    timerValue++;
  
}
/* prevents the mobile browser from processing some default
 * touch events, like swiping left for "back" or scrolling
 * the page.
 */
document.ontouchmove = function(event) {
    event.preventDefault();
};