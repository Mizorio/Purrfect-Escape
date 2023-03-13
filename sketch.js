let catImage;
let catJumpImage;
let cat;
let obstacles;
let score;
let scoreValue = 0;
let isGameOver = false;

function preload() {
  catImage = loadImage('cat-default.png');
  catJumpImage = loadImage('cat-jump.png');
}

function setup() {
  const canvas = createCanvas(800, 400);
  canvas.parent('canvas');
  cat = createSprite(50, height - 50, 50, 50);
  cat.addAnimation('default', catImage);
  cat.addAnimation('jump', catJumpImage);
  obstacles = new Group();
  score = createElement('div', '0');
  score.class('score');
}

function draw() {
  background(247);

  if (isGameOver) {
    gameOver();
    return;
  }

  if (keyWentDown('space') && cat.collide(obstacles)) {
    isGameOver = true;
    return;
  }

  if (keyWentDown('space')) {
    cat.velocity.y = -12;
    cat.changeAnimation('jump');
  }

  if (cat.velocity.y < 0) {
    cat.changeAnimation('jump');
  } else {
    cat.changeAnimation('default');
  }

  cat.velocity.y += 0.6;

  if (frameCount % 60 === 0) {
    let obstacle = createSprite(width, height - 50, 40, 60);
    obstacle.shapeColor = color(51);
    obstacle.velocity.x = -5;
    obstacles.add(obstacle);
  }

  if (obstacles && obstacles.length > 0) {
    obstacles.overlap(cat, endGame);

    obstacles.forEach((obstacle) => {
      if (obstacle.position.x < -obstacle.width / 2) {
        obstacle.remove();
        scoreValue++;
        score.html(scoreValue);
      }
    });
  }
}

function endGame() {
  isGameOver = true;
  cat.velocity.y = -12;
  cat.rotation = 180;
  cat.changeAnimation('jump');
  obstacles.forEach((obstacle) => (obstacle.velocity.x = 0));
}

function gameOver() {
  textSize(64);
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  text('Game Over!', width / 2, height / 2);

  if (score) {
    text(`Final Score: ${scoreValue}`, width / 2, height / 2 + 64);
  }
}

// move the displayGameOverScreen function outside the gameOver function
function displayGameOverScreen() {
  const gameOverDiv = document.getElementById('game-over');
  gameOverDiv.style.display = 'block';

  const scoreDiv = document.getElementById('score');
  scoreDiv.style.display = 'none';
}

displayGameOverScreen();
