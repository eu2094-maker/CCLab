let desktopImg;
let drawImg;
let showDrawingWindow = false;
let drawingMode = false;
let brush;

class Brush {
  constructor(color, weight) {
    this.color = color;
    this.weight = weight;
  }
  draw(x1, y1, x2, y2) {
    stroke(this.color);
    strokeWeight(this.weight);
    line(x1, y1, x2, y2);
  }
}

function preload() {
  desktopImg = loadImage("assets/Project-B-Background.jpg");
  drawImg = loadImage("assets/drawing.jpg");
}

function setup() {
  desktopImg.resize(1920, 1000);
  drawImg.resize(700, 700);
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("p5-canvas");
  canvas.parent("p5-canvas-container");
  brush = new Brush("black", 5);
}

function draw() {
  image(desktopImg, 0, 0); //the size will change depending on whether it's shown on p5.js or VS

  if (!showDrawingWindow) {
    stroke(255);
    noFill();
    rect(100, 420, 100, 100);
  }

  if (showDrawingWindow == true) {
    image(drawImg, 700, 200)
    fill(0);
    noStroke();
    rect(760, 780, 22, 22);
  }
  if (drawingMode && showDrawingWindow && mouseIsPressed) {
    brush.draw(mouseX, mouseY, pmouseX, pmouseY);
  }

}


function mousePressed() {
  if (mouseX > 100 && mouseX < 200 && mouseY > 420 && mouseY < 520) {
    showDrawingWindow = true;
  }
  if (showDrawingWindow && mouseX > 760 && mouseX < 782 && mouseY > 780 && mouseY < 802) {
    drawingMode = true;
  }
}
