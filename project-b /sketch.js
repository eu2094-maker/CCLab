let desktopImg, drawImg, gameImg, musicImg, errorImg, wordImg;
let showDrawingWindow = false;
showMusicWindow = false;
showErrorWindow = false;
showWordWindow = false;
showCardsWindow = false;
showGameWindow = false;
let showDialogue;
let drawingMode = false;
typingMode = false;
let brush;
let pickedBrush;
let inputBox;
let showInput = false;
let drawingLayer;

function preload() {
  desktopImg = loadImage("assets/Project-B-Background2.jpg");
  drawImg = loadImage("assets/drawing.jpg");
  gameImg = loadImage("assets/minesweeper.jpg");
  musicImg = loadImage("assets/music.jpg");
  errorImg = loadImage("assets/systemerror.png");
  wordImg = loadImage("assets/word.jpg");
  cardsImg = loadImage("assets/cards.png");
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
}

function draw() {
  image(desktopImg, 0, 0); //the size will change depending on whether it's shown on p5.js or VS

  if (!showDrawingWindow) {
    noStroke();
    noFill();
    rect(100, 390, 80, 60);
  }

  if (showDrawingWindow && drawingMode) {
    if (
      mouseIsPressed &&
      mouseX > 800 &&
      mouseX < 800 + 700 &&
      mouseY > 200 &&
      mouseY < 200 + 700
    ) {
      // convert to drawingLayer coordinates
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

  if (showMusicWindow == true) {
    image(musicImg, 1200, 0);
  }

  if (!showGameWindow) {
    noStroke();
    noFill();
    rect(100, 450, 80, 60);
  }

  if (showGameWindow == true) {
    image(gameImg, 300, 400);
  }

  if (!showWordWindow) {
    noStroke();
    noFill();
    rect(10, 85, 80, 60);
  }

  if (showWordWindow == true) {
    image(wordImg, 200, 0);
    fill(255);
    rect(208, 157, 590, 210);
  }

  if (!showCardsWindow) {
    noStroke();
    noFill();
    rect(10, 650, 80, 60);
  }

  if (showCardsWindow == true) {
    image(cardsImg, 750, -70);
  }

  if (showWordWindow && showInput && inputBox) {
    inputBox.position(208, 157);
  }
  if (!showWordWindow && inputBox) {
    inputBox.hide();
  }

  brush.color = pickedBrush;

  if (showDrawingWindow == true) {
    image(drawImg, 800, 200);
    image(drawingLayer, 800, 200); // ← NEW (draw strokes on top)

    fill(0);
    noStroke();
    fill(pickedBrush);
    rect(817, 792, 20, 20);
  }

  textAlign(CENTER);
  textSize(16);
  fill(0);
  text(`x: ${mouseX} y: ${mouseY}`, width / 2, height / 2);
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

function mousePressed() {
  if (mouseX > 100 && mouseX < 180 && mouseY > 390 && mouseY < 450) {
    showDrawingWindow = true;
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
  if (mouseX > 1901 && mouseX < 1918 && mouseY > 5 && mouseY < 20) {
    showMusicWindow = false;
  }
  if (mouseX > 100 && mouseX < 180 && mouseY > 455 && mouseY < 510) {
    showGameWindow = true;
  }
  if (mouseX > 559 && mouseX < 587 && mouseY > 411 && mouseY < 435) {
    showGameWindow = false;
  }
  if (mouseX > 10 && mouseX < 90 && mouseY > 85 && mouseY < 145) {
    showWordWindow = true;
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
}
