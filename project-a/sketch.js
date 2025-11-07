let x;
let y;
let dy;
let r;
let n;
let t;
let hoverCount;
let awake;
let wasHovering;
let endStart;
let endType;
let shockCount;
let fade;

function setup() {
  let canvas = createCanvas(800, 500);
canvas.parent("p5-canvas-container");
  x = width;
  y = height;
  dx = random(width);
  dy = random(height);
  r = random(1, 3);
  n = 0;
  t = 0;
  hoverCount = 0;
  awake = false;
  wasHovering = false;
  hoverThreshold = int(random(3, 7));
  shockCount = 0;
  endStart = false;
  endType = 0;
  fade = 0;

  drawScene();
  bgImage = get();
  flickerLoop();
}

function drawScene() {
  background(random(0, 50));

  // lockers
  stroke(0);
  strokeWeight(2);
  fill(random(0, 90));
  let px = 200; //left wall base to start
  while (px < 600) {
    //right wall base to end
    let lw = random(30, 60);
    let lh = random(150, 250);
    if (px + lw > 600) break; //if lockers at their current pos AND with randomized width goes past 600(right wall base), the break the code
    rect(px, 400 - lh, lw, lh); //draws lockers and randomizes their height and width
    px += lw; //after drawing one, move onto the next
  }

  // wall
  strokeWeight(1);
  stroke(2);
  line(200, 400, 200, 0);
  line(600, 400, 600, 0);

  // floor
  stroke(0);
  strokeWeight(1);
  fill(200);
  beginShape();
  vertex(0, 500);
  vertex(800, 500);
  vertex(600, 400);
  vertex(200, 400);
  endShape(CLOSE);

  makeArms();
}

function makeArms() {
  //left arm
  fill(70); // front
  beginShape();
  vertex(0, 220);
  vertex(250, 270);
  vertex(250, 320);
  vertex(0, 270);
  endShape(CLOSE);

  fill(65); // top
  beginShape();
  vertex(0, 220);
  vertex(250, 270);
  vertex(265, 250);
  vertex(-20, 200);
  endShape(CLOSE);

  //bottom is part under the light

  fill(150); // front
  beginShape();
  vertex(150, 250);
  vertex(250, 270);
  vertex(250, 320);
  vertex(123, 294);
  endShape(CLOSE);

  fill(200); // top
  beginShape();
  vertex(150, 250);
  vertex(250, 270);
  vertex(265, 250);
  vertex(162, 232);
  endShape(CLOSE);

  fill(150);
  beginShape();
  vertex(250, 270);
  vertex(330, 340);
  vertex(320, 380);
  vertex(250, 320);
  endShape(CLOSE);

  fill(200);
  beginShape();
  vertex(250, 270);
  vertex(330, 340);
  vertex(360, 335);
  vertex(265, 250);
  endShape(CLOSE);

  //right arm

  fill(70); // front
  beginShape();
  vertex(650, 300);
  vertex(800, 370);
  vertex(800, 420);
  vertex(650, 370);
  endShape(CLOSE);

  fill(65); // top
  beginShape();
  vertex(650, 300);
  vertex(800, 370);
  vertex(800, 355);
  vertex(630, 280);
  endShape(CLOSE);

  //under the light

  fill(150); // front
  beginShape();
  vertex(650, 300);
  vertex(693, 320);
  vertex(740, 400);
  vertex(650, 370);
  endShape(CLOSE);

  fill(200); // top
  beginShape();
  vertex(650, 300);
  vertex(693, 320);
  vertex(680, 300);
  vertex(630, 280);
  endShape(CLOSE);
  //im tired of making these 3D fucking arms

  // dust
  noStroke();
  fill(random(200, 255), 180);
  for (let i = 0; i < 150; i++) {
    let dx = random(width);
    let dy = random(height);
    let r = random(0.1, 5);
    ellipse(dx, dy, r);
  }

  // floor pattern
  let floorMode = int(random(3));
  for (let i = 0; i < 500; i++) {
    //basically repeats 500 times (density)
    let px = random(0, width); //randomizes the floor pattern x pos and.y pos
    let py = random(400, 500);
    if (insideFloor(px, py)) {
      fill(170 + random(-20, 20)); //randomizes the gray color
      if (floorMode === 0) {
        //makes little rectangles
        rect(px, py, 5, 5);
      } else if (floorMode === 1) {
        //makes little circles
        ellipse(px, py, 4, 4);
      } else {
        //makes little lines for floor boards
        stroke(160);
        line(px, py, px + random(5, 15), py); //draws a line and randomizes that line
        noStroke();
      }
    }
  }

  // table
  stroke(0);
  fill(255);
  beginShape();
  vertex(170, 470);
  vertex(620, 470);
  vertex(520, 390);
  vertex(280, 390);
  endShape(CLOSE);

  //rest of the arm above the table
  fill(150);
  beginShape();
  vertex(650, 300);
  vertex(650, 370);
  vertex(520, 410);
  vertex(500, 360);
  endShape(CLOSE);
  fill(200);
  beginShape();
  vertex(650, 300);
  vertex(500, 360);
  vertex(480, 340);
  vertex(630, 280);
  endShape(CLOSE);

  //rest of the table

  fill(180);
  rect(170, 470, 450, 40);
}

function insideFloor(px, py) {
  if (py < 400 || py > 500) return false; //enforces that the floor is in between y = 400 and y = 500, outside of it doesn't work
  let f = map(py, 400, 500, 0, 1); //changing 400, 500 to 0, 1 and remaps it
  let leftX = lerp(200, 0, f); //starts at 200, ends at 0,
  let rightX = lerp(600, 800, f);
  return px >= leftX && px <= rightX; //makes sure that the floor patterns stay inside the floor not leaking outside of it
}

function flickerLoop() {
  noStroke();
  image(bgImage, 0, 0); //sets the scene for the background because the cone is light over everything

  let flicker = noise(n);
  let alpha = map(flicker, 0, 1, 20, 200); //makes the light flicker

  fill(255, 223, 142, alpha);
  beginShape();
  vertex(0, 500);
  vertex(800, 500);
  vertex(500, 0);
  vertex(300, 0);
  endShape(CLOSE); //cONE

  n += 0.05;
}

function mousePressed() {
  //mouse pressed function for the pressing on the creature part to play around with it
  if (awake && endStart == false) {
    shockCount++;
    if (shockCount >= 6) {
      endType = random([1, 2]); // 1 = attack, 2 = dies, 3 = love and care
      endStart = true;
    }
  }
}
function draw() {
  image(bgImage, 0, 0);
  flickerLoop();

  let d = dist(mouseX, mouseY, width / 2 + 10, height / 2 + 170);

  // Awakening logic
  if (d < 200 && wasHovering == false) {
    hoverCount++;
    if (hoverCount >= hoverThreshold) awake = true;
  }
  wasHovering = d < 200;

  if (endStart) {
    if (endType === 1) {
      // if the creature attacks, you're dead so the screen is red
      background(255, 0, 0);
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(60);
      text("YOU DIED!!", width / 2, height / 2);
      return;
    }

    if (endType === 2) {
      // if the creature dies due to too much electricity, the screen fades to black
      fade += 1;
      let gray = map(fade, 0, 255, 255, 0);
      background(gray);
      if (fade > 255) {
        drawHead(x, y);
        drawAntlers(x, y);
      }
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(60);
      text("HE DIED??", width / 2, height / 2);
      return;
    }
  }

  if (awake == false) {
    //the creature is resting so no head
    drawRestingBody(width / 2, height / 2 + 170);
    drawRestingWings(width / 2, height / 2 + 130);
    drawClaws(x, y);
    drawCircle1(x, y);
    drawCircle2(x, y);
  } else {
    //the creature is awake so everything is visible
    drawBody(width / 2, height / 2 + 170);
    drawWings(width / 2, height / 2 + 130);
    drawClaws(x, y);
    drawHead(x, y);
    drawAntlers(x, y);
    drawCircle1(x, y);
    drawCircle2(x, y);
  }

  if (d < 200 && endStart == false) {
    //i added another conditional to make sure the electricity works as it should because it should be hovering AND if the creature is resting the code should work then
    drawWaveLine(0, 210, 258, 260);
    drawWaveLine(258, 260, 335, 330);
    drawWaveLine(800, 360, 640, 290);
    drawWaveLine(640, 290, 500, 350);
  } else if (endStart == false) {
    stroke(150);
    strokeWeight(3);
    line(0, 210, 258, 260);
    line(258, 260, 335, 330);
    line(800, 360, 640, 290);
    line(640, 290, 500, 350);
  }
}

function drawRestingBody(x, y) {
  push();
  translate(x, y);
  scale(0.6);
  noStroke();
  for (let i = 0; i < 12; i++) {
    let angle = (TWO_PI / 12) * i;
    let bx = cos(angle) * 35;
    let by = sin(angle) * 35;
    fill(54, 35, 10);
    ellipse(bx, by, 90, 90);
  }
  fill(150, 110, 80);
  arc(0, 0, 140, 140, PI - radians(45), QUARTER_PI, CHORD);
  pop();
}

function drawRestingWings(x, y) {
  push();
  translate(x, y);
  fill(180, 140, 100);
  stroke(54, 35, 10);
  strokeWeight(3);

  triangle(-60, 0, -30, 50, -60, 110);
  triangle(60, 0, 30, 50, 60, 110);

  let lw = 4;
  let py = 25;

  // left wing
  for (let i = 0; i < lw; i++) {
    let dy = i * py;
    beginShape();
    vertex(-50, 10 + dy);
    bezierVertex(-20, -40 + dy, 0, 20 + dy, -40, 30 + dy);
    endShape(CLOSE);
  }

  // right wing
  for (let i = 0; i < lw; i++) {
    let dy = i * py;
    beginShape();
    vertex(50, 10 + dy);
    bezierVertex(20, -40 + dy, 0, 20 + dy, 40, 30 + dy);
    endShape(CLOSE);
  }
  pop();
}

function drawBody(x, y) {
  push();
  translate(x, y);
  scale(0.6);
  noStroke();
  for (let i = 0; i < 12; i++) {
    let angle = (TWO_PI / 12) * i;
    let bx = cos(angle) * 35;
    let by = sin(angle) * 35;
    fill(54, 35, 10);
    ellipse(bx, by, 90, 90);
  }
  fill(150, 110, 80);
  arc(0, 0, 140, 140, PI - radians(45), QUARTER_PI, CHORD);
  pop();
}

function drawWings(x, y) {
  push();
  translate(x, y);
  scale(0.6);
  fill(180, 140, 100);
  stroke(54, 35, 10);
  strokeWeight(3);

  triangle(-90, 0, -50, 50, -90, 110);
  triangle(90, 0, 50, 50, 90, 110);

  let lw = 4;
  let py = 25;

  for (let i = 0; i < lw; i++) {
    let dy = i * py;
    beginShape();
    vertex(-80, 10 + dy);
    bezierVertex(-140, -40 + dy, -160, 20 + dy, -90, 30 + dy);
    endShape(CLOSE);
  }

  for (let i = 0; i < lw; i++) {
    let dy = i * py;
    beginShape();
    vertex(80, 10 + dy);
    bezierVertex(140, -40 + dy, 160, 20 + dy, 90, 30 + dy);
    endShape(CLOSE);
  }
  pop();
}

function drawClaws(x, y) {
  push();
  translate(x / 2 + 10, y / 2 + 195);
  scale(0.8);
  fill(220, 180, 130);
  ellipse(-35, 5, 40, 25);
  ellipse(35, 5, 40, 25);
  pop();
}

function drawHead(x, y) {
  push();
  translate(x / 2 + 10, y / 2 + 50);
  scale(0.7);
  fill(255);
  noStroke();

  ellipse(0, 80, 100, 100);
  arc(-20, 120, 80, 40, radians(0), radians(-130));
  rotate(60);
  rect(5, -138, 20, 70, 100);

  fill(0);
  ellipse(-40, -80, 30, 35);
  ellipse(5, -90, 30, 35);
  stroke(0);
  strokeWeight(5);
  line(20, -135, 15, -125);
  line(10, -140, 5, -130);
  pop();
}

function drawAntlers(x, y) {
  push();
  translate(x / 2 + 10, y / 2 + 90);
  scale(0.7);
  stroke(190, 150, 90);
  strokeWeight(10);
  noFill();

  line(-25, -20, -60, -50);
  line(-60, -50, -80, -80);
  line(-60, -50, -40, -80);

  line(25, -20, 60, -50);
  line(60, -50, 80, -80);
  line(60, -50, 40, -80);
  pop();
}

function drawCircle1(x, y) {
  push();
  translate(x / 2 - 60, y / 2 + 103);
  rotate(radians(25));
  stroke(0);
  strokeWeight(1);
  fill(255);
  let ex = 10;
  let s = 15;
  for (let i = 0; i < 2; i++) {
    let sx = i * ex;
    let sb = 30 - i * s;
    ellipse(0 + sx, 0, sb, sb + 35);
  }
  pop();
}

function drawCircle2(x, y) {
  push();
  translate(x / 2 + 100, y / 2 + 130);
  scale(1.2);
  rotate(radians(-25));
  stroke(0);
  strokeWeight(1);
  fill(255);
  let ex = -10;
  let s = 15;
  for (let i = 0; i < 2; i++) {
    let sx = i * ex;
    let sb = 30 - i * s;
    ellipse(0 + sx, 0, sb, sb + 35);
  }
  pop();
}

function drawWaveLine(x1, y1, x2, y2) {
  stroke(0, 150, 255);
  strokeWeight(2);
  noFill();

  beginShape();
  let steps = 40;
  let amp = 8;
  let frequency = 10;
  for (let i = 0; i <= steps; i++) {
    let p = i / steps;
    let x = lerp(x1, x2, p);
    let y = lerp(y1, y2, p);
    y += sin(p * TWO_PI * frequency + t) * amp;
    vertex(x, y);
  }
  endShape();
}

function keyPressed() {
  if (key === ' ') {
    location.reload(); //restart button
  }
}

