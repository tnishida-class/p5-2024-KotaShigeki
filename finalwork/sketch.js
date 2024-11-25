// 最終課題を制作しよう


function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

let angle = 0;
let spinning = false;
let spinSpeed = 0;
let flashing = false;
let lighting = true;  // 点灯状態を管理
let flashTimer = 0;  // 点滅タイミング用タイマー

// ボールの位置と速度
let ballX = 0, ballY = 0;
let ballVX = 2, ballVY = 3;
let ballRadius = 10;
let innerRadius = 150;
let ballStopped = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  stroke(255);
  strokeWeight(3);
}

function draw() {
  background(255);
  translate(width / 2, height / 2);
  rotate(angle);

  const maxR = min(width, height);

  drawCircle(color(0), maxR);
  drawArcs(color(127, 255, 212), color(30, 144, 255), color(0), maxR * 0.8);
  drawArcs(color(242, 212, 147), color(0, 0, 255), color(255), maxR * 0.75);
  drawArcs(color(127, 255, 212), color(30, 144, 255), color(0), maxR * 0.45);
  drawArcs(color(242, 212, 147), color(0, 0, 255), color(255), maxR * 0.4);
  drawCircle(color(127, 255, 212), maxR * 0.1);
  drawCircle(color(30, 144, 255), maxR * 0.05);


  if (spinning) {
    angle += spinSpeed;
    spinSpeed *= 0.99;
    if (spinSpeed < 0.01) {
      spinning = false;
      ballStopped = true;
      flashing = true;
    }
  }

  // 改善された点滅処理
  if (flashing && ballStopped) {
    flashTimer++;
    if (flashTimer >= 30) {  // 30フレームごとに切り替え
      lighting = !lighting;  // 点灯状態を反転
      flashTimer = 0;
    }
  }

  if (!ballStopped) {
    updateBall(maxR);
  }
  drawBall();
}

function drawCircle(c, r) {
  fill(c);
  ellipse(0, 0, r, r);
}

function drawArcs(c1, c2, c3, r) {
  for (let i = 0; i < 20; i++) {
    let start = TWO_PI / 20 * i;
    let stop = TWO_PI / 20 * (i + 1);

    if (i % 3 == 0) {
      fill(c1);
    } else if (i % 3 == 1) {
      fill(c2);
    } else {
      fill(c3);
    }
    arc(0, 0, r, r, start, stop, PIE);
  }
}

function updateBall(maxR) {
  ballX += ballVX;
  ballY += ballVY;

  const distance = dist(0, 0, ballX, ballY);

  if (distance + ballRadius > innerRadius) {
    let angleToCenter = atan2(ballY, ballX);
    let normalX = cos(angleToCenter);
    let normalY = sin(angleToCenter);

    let dot = ballVX * normalX + ballVY * normalY;
    ballVX -= 2 * dot * normalX;
    ballVY -= 2 * dot * normalY;
  }
}

function drawBall() {
  if (ballStopped && flashing) {
    if (lighting) {
      fill(255, 0, 0);  // 点灯時は赤色
    } else {
      fill(100);  // 消灯時は灰色
    }
  } else {
    fill(255, 0, 0);  // 通常時は赤
  }
  noStroke();
  ellipse(ballX, ballY, ballRadius * 2, ballRadius * 2);
}

function mousePressed() {
  if (!spinning) {
    spinning = true;
    spinSpeed = random(0.1, 0.3);
    flashing = false;
    ballStopped = false;
    
    ballX = random(-innerRadius / 2, innerRadius / 2);
    ballY = random(-innerRadius / 2, innerRadius / 2);
    ballVX = 10;
    ballVY = 10;
  }
}