/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  dancer = new AnjiDancer(width / 2, height / 2);
}

function draw() {
  background(0);
  drawFloor();
  dancer.update();
  dancer.display();
}

class AnjiDancer {
  constructor(startX, startY, s = 80) {
    this.x = startX;
    this.y = startY;
    this.s = s;
    this.angle = 0;
    this.paws = 0;
  }
  update() {
    this.angle += 0.05;  //how fast or slow the cat rotates
    this.paws = sin(this.angle * 3) * 8; //how fast or slow the paws oscillate 
  }
  display() {
    push();
    translate(this.x, this.y);
    rotate(sin(this.angle) * 0.4); //rotates the body
    noStroke();
    fill(100, 220, 150); //color of the alien cat
    ellipse(0, 30, 50, 60); //the body
    ellipse(0, 0, 40, 40); //the head 
    triangle( //the ears 
      -this.s * 0.2,
      -this.s * 0.4,
      -this.s * 0.2,
      -this.s * 0.05,
      0,
      -this.s * 0.1
    );
    triangle(
      this.s * 0.2,
      -this.s * 0.4,
      this.s * 0.2,
      -this.s * 0.05,
      0,
      -this.s * 0.1
    );
    //the whites of the eyes
    fill(255);
    ellipse(-10, 0, 15, 20);
    ellipse(10, 0, 15, 20);
    //the pupils moving
    fill(0);
    let eyeMove = sin(this.angle * 10); //moves the eyes up and down
    ellipse(-10, 0 + eyeMove, -8, 8);
    ellipse(10, 0 + eyeMove, -5, 5);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(this.s * 0.3); //scales the text
    rotate(radians(90)); //makes sure the 3 lays down so it looks like a cat's mouth
    text("3", 10, 0);
    //paws moving 
    strokeWeight(3);
    stroke(0);
    noFill();
    ellipse(30, 10 - this.paws, 10, 15);
    ellipse(30, -10 - this.paws, 10, 15);
    pop();
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/