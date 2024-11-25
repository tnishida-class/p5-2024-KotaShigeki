//　テキスト「オブジェクト」
// 練習問題：ボールのサイズをランダムに変更してみよう
// 練習問題：何も操作しなくてもボールが湧いてくる機能を追加しよう

let balls;

function setup() {
  createCanvas(windowWidth, windowHeight);
  balls = [];
  setInterval(createRandomBall, 1000); // 毎秒1個ボールを生成
}

function draw() {
  background(160, 192, 255);
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    ellipse(b.x, b.y, b.size);
    b.x += b.vx;
    b.y += b.vy;
    b.size += random(-2, 2); // ボールのサイズをランダムに変更
    b.size = constrain(b.size, 10, 100); // サイズを10～100の範囲に制限
  }
}

function mouseDragged() {
  const dx = mouseX - pmouseX;
  const dy = mouseY - pmouseY;
  if (mag(dx, dy) > 5) {
    const b = { x: mouseX, y: mouseY, size: random(10, 100), vx: dx, vy: dy };
    balls.push(b);
  }
}

function createRandomBall() {
  const b = {
    x: random(width),
    y: random(height),
    size: random(10, 100),
    vx: random(-2, 2),
    vy: random(-2, 2),
  };
  balls.push(b);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
