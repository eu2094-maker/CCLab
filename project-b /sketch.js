let desktopImg, drawImg, gameImg, musicImg, errorImg, wordImg, cardsImg;
let showDrawingWindow = false;
let showMusicWindow = false;
let showErrorWindow = false;
let showWordWindow = false;
let showCardsWindow = false;
let showGameWindow = false;
let drawingMode = false;
let brush;
let pickedBrush;
let inputBox;
let showInput = false;
let drawingLayer;
let songActive;
let errorMessages = [
  "Not allowed!",
  "Big Brother is watching...",
  "Can't download, sorry.",
  "You're being tracked.",
  "Be aware.",
];
let currentMessage;
let dialogueText = "";
let dialogueStep = 0;
let wordOpened = false;
let typedWord = false;
let drawOpened = false;
let hasDrawn = false;
let musicOpened = false;
let gameOpened = false;
let cardsOpened = false;
let errorOpened = false;
let othersOpened = 0;
let totalApps = 4;
let endTriggered = false;
let flashing = false;
let flashTimer = 0;
let shutdown = false;
let shutdownAlpha = 0;
let showEndText = false;
let allAppsOpened = false;

function preload() {
  desktopImg = loadImage("assets/Project-B-Background2.jpg");
  drawImg = loadImage("assets/drawing.jpg");
  gameImg = loadImage("assets/minesweeper.jpg");
  musicImg = loadImage("assets/music.jpg");
  errorImg = loadImage("assets/systemerror.png");
  wordImg = loadImage("assets/word.jpg");
  cardsImg = loadImage("assets/cards.png");
  songActive = loadSound("assets/song.mp3");
}

function setup() {
  desktopImg.resize(1920, 1000);
  drawImg.resize(700, 700);
  musicImg.resize(476, 202);
  gameImg.resize(300, 500);
  wordImg.resize(600, 400);
  cardsImg.resize(600, 400);
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("p5-canvas");
  canvas.parent("p5-canvas-container");
  drawingLayer = createGraphics(700, 700);
  pickedBrush = color(0);
  brush = new Brush(pickedBrush, 5);
  initDialogue();
}

function draw() {
  image(desktopImg, 0, 0);
  if (endTriggered) {
    showDrawingWindow = false;
    showMusicWindow = false;
    showWordWindow = false;
    showGameWindow = false;
    showCardsWindow = false;
    showErrorWindow = false;
    dialogueText = "";
  }
  if (showEndText) {
    background(0);
    textAlign(CENTER, CENTER);
    textSize(80);
    fill(255, 0, 0);
    text("HE FOUND YOU", width / 2, height / 2);
    return;
  }
  if (!showDrawingWindow) {
    noStroke();
    noFill();
    rect(100, 390, 80, 60);
  }

  if (showDrawingWindow && drawingMode) {
    if (mouseIsPressed &&
      mouseX > 900 &&
      mouseX < 900 + 564
      && mouseY > 278
      && mouseY < 278 + 461) {
      hasDrawn = true;
      let lx = mouseX - 800;
      let ly = mouseY - 200;
      brush.drawStroke(lx, ly, drawingLayer);
    } else {
      brush.endStroke();
    }
  } else {
    brush.endStroke();
  }
  if (!showMusicWindow) {
    noStroke();
    noFill();
    rect(100, 170, 80, 60);
  }
  if (showMusicWindow) {
    image(musicImg, 1250, 0);
    if (!songActive.isPlaying()) {
      songActive.play();
    }
    if (!musicOpened) {
      musicOpened = true;
      othersOpened++;
    }
  }
  if (!showGameWindow) {
    noStroke();
    noFill();
    rect(100, 450, 80, 60);
  }
  if (showGameWindow) {
    image(gameImg, 300, 400);
    if (!gameOpened) {
      gameOpened = true;
      othersOpened++;
    }
  }

  if (!showWordWindow) {
    noStroke();
    noFill();
    rect(10, 85, 80, 60);
  }
  if (showWordWindow) {
    image(wordImg, 200, 0);
    fill(255);
    rect(208, 157, 590, 210);
  }

  if (showWordWindow && inputBox && inputBox.value().length > 0) {
    typedWord = true;
  }
  if (!showCardsWindow) {
    noStroke();
    noFill();
    rect(10, 650, 80, 60);
  }
  if (showCardsWindow) {
    image(cardsImg, 750, -70);
    if (!cardsOpened) {
      cardsOpened = true;
      othersOpened++;
    }
  }
  if (showWordWindow && showInput && inputBox) {
    inputBox.position(208, 157);
  }
  if (!showWordWindow && inputBox) {
    inputBox.hide();
  }
  if (showDrawingWindow) {
    image(drawImg, 800, 200);
    image(drawingLayer, 800, 200);
    noStroke();
    fill(pickedBrush);
    rect(817, 792, 20, 20);
  }
  if (showErrorWindow) {
    image(errorImg, 600, 200);
    fill(0);
    textSize(25);
    textAlign(CENTER);
    textFont("Times New Roman");
    text(currentMessage, 600 + errorImg.width / 2, 450);
    if (!errorOpened) {
      errorOpened = true;
      othersOpened++;
    }
  }
  brush.color = pickedBrush;
  updateDialogue();
  drawDialogueBox();
  if (!allAppsOpened && othersOpened >= totalApps) {
    allAppsOpened = true;
    triggerEnd();
  }
  if (flashing) {
    flashTimer++;
    if (floor(flashTimer / 10) % 2 === 0) {
      background(0); // black
    } else {
      background(255, 0, 0); // red
    }
    if (flashTimer > 60) {
      flashing = false;
      shutdown = true;
    }
  }

  if (shutdown) {
    shutdownAlpha += 5;
    if (shutdownAlpha > 255) shutdownAlpha = 255;
    fill(0, shutdownAlpha);
    rect(0, 0, width, height);
    if (shutdownAlpha === 255) {
      shutdown = false;
      showEndText = true;
    }
  }
}
class Brush {
  constructor(color, weight) {
    this.color = color;
    this.weight = weight;
    this.prevX = null;
    this.prevY = null;
  }

  startStroke(x, y) {
    this.prevX = x;
    this.prevY = y;
  }

  drawStroke(x, y, layer) {
    if (this.prevX === null) {
      this.startStroke(x, y);
      return;
    }
    layer.stroke(this.color);
    layer.strokeWeight(this.weight);
    layer.line(this.prevX, this.prevY, x, y);
    this.prevX = x;
    this.prevY = y;
  }

  endStroke() {
    this.prevX = null;
    this.prevY = null;
  }
}

function triggerError() {
  currentMessage = random(errorMessages);
  showErrorWindow = true;
}

function mousePressed() {
  if (mouseX > 100 && mouseX < 180 && mouseY > 390 && mouseY < 450) {
    showDrawingWindow = true;
    drawOpened = true;
  }

  if (
    showDrawingWindow &&
    mouseX > 700 &&
    mouseX < 1395 &&
    mouseY > 764 &&
    mouseY < 843
  ) {
    drawingMode = true;
  }

  if (mouseX > 1465 && mouseX < 1489 && mouseY > 214 && mouseY < 232) {
    showDrawingWindow = false;
  }

  if (mouseX > 700 && mouseX < 1395 && mouseY > 765 && mouseY < 847) {
    let c = get(mouseX, mouseY);
    pickedBrush = color(c);
  }

  if (mouseX > 100 && mouseX < 180 && mouseY > 170 && mouseY < 230) {
    showMusicWindow = true;
  }

  if (mouseX > 1701 && mouseX < 1718 && mouseY > 5 && mouseY < 20) {
    showMusicWindow = false;
    songActive.stop();
  }

  if (mouseX > 100 && mouseX < 180 && mouseY > 455 && mouseY < 510) {
    showGameWindow = true;
  }

  if (mouseX > 559 && mouseX < 587 && mouseY > 411 && mouseY < 435) {
    showGameWindow = false;
  }

  if (mouseX > 10 && mouseX < 90 && mouseY > 85 && mouseY < 145) {
    showWordWindow = true;
    wordOpened = true;
  }

  if (mouseX > 775 && mouseX < 790 && mouseY > 0 && mouseY < 24) {
    showWordWindow = false;
  }

  if (mouseX > 208 && mouseX < 798 && mouseY > 157 && mouseY < 367) {
    showInput = true;
    if (!inputBox) {
      inputBox = createElement("textarea");
      inputBox.size(585, 210);
      inputBox.position(208, 157);
    }
  }

  if (mouseX > 10 && mouseX < 90 && mouseY > 650 && mouseY < 710) {
    showCardsWindow = true;
  }

  if (mouseX > 1281 && mouseX < 1294 && mouseY > 3 && mouseY < 10) {
    showCardsWindow = false;
  }

  if (mouseX > 27 && mouseX < 78 && mouseY > 22 && mouseY < 74) {
    triggerError();
  }
  if (mouseX > 22 && mouseX < 84 && mouseY > 171 && mouseY < 304) {
    triggerError();
  }
  if (mouseX > 17 && mouseX < 83 && mouseY > 387 && mouseY < 622) {
    triggerError();
  }
  if (mouseX > 111 && mouseX < 170 && mouseY > 18 && mouseY < 149) {
    triggerError();
  }
  if (mouseX > 115 && mouseX < 177 && mouseY > 251 && mouseY < 370) {
    triggerError();
  }
  if (mouseX > 121 && mouseX < 181 && mouseY > 515 && mouseY < 719) {
    triggerError();
  }

  if (mouseX > 1170 && mouseX < 1202 && mouseY > 335 && mouseY < 364) {
    showErrorWindow = false;
  }
}

function initDialogue() {
  dialogueText = "I kinda want to type something for my class notes.";
  dialogueStep = 0;
}

function updateDialogue() {
  if (dialogueStep === 0 && wordOpened && typedWord) {
    dialogueText = "Now, I want to try the drawing application. It's new.";
    dialogueStep = 1;
  }

  if (dialogueStep === 1 && drawOpened && hasDrawn) {
    dialogueText =
      "I wonder what other applications work. I know it won't work though because this emulator is still in the early stages of development. It's interesting.";
    dialogueStep = 2;
  }

  if (dialogueStep === 2 && othersOpened >= totalApps) {
    dialogueText = "";
    dialogueStep = 3;
  }
}

function drawDialogueBox() {
  if (dialogueText === "") return;
  fill(0, 180);
  rect(0, height - 60, width, 100);
  fill(255);
  textFont("Times New Roman");
  textSize(18);
  textAlign(CENTER, BOTTOM);
  text(dialogueText, width / 2, 950);
}

function triggerEnd() {
  if (!endTriggered) {
    endTriggered = true;
    flashing = true;
    flashTimer = 0;
    showInput = false;
  }
  if (songActive && songActive.isPlaying()) {
    songActive.stop();
  }
}