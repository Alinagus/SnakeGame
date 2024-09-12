let gameField = document.getElementById("game-field");
let bestScoreBox = document.getElementById("best-score")

const snakeSpeed = 150;
let score = 0;
let apple = { 
  x: 20, 
  y: 10 
};

class fieldSize{
  constructor(FieldSize, squareSize){
    this._FieldSize = FieldSize
    this._squareSize = squareSize
    this.numOfSquare = this._FieldSize / this._squareSize
  }
}

const field1 = new fieldSize(500, 20)
bestResult();

let snake = [
  { x: 5, y: 4 },
  { x: 4, y: 4 },
  { x: 3, y: 4 },
  { x: 2, y: 4 },
];

function drawSnake(){
  for (let i = 0; i < snake.length; i++){
  let snakeBody = `<div class="snake" style='left:${snake[i].x * field1._squareSize + "px"}; top: ${snake[i].y * field1._squareSize + "px"}'>`;
  gameField.innerHTML += snakeBody;
  }
};

function drawApple(){
  let applePlace = `<div class="apple" style='left:${apple.x * field1._squareSize + "px"}; top: ${apple.y * field1._squareSize + "px"}'>`;
  gameField.innerHTML += applePlace;
};


function clearElement() {
  while (gameField.lastChild) {
    gameField.removeChild(gameField.lastChild);
  }

}

function updateScore() {
  let countScore = document.getElementById("score");
  countScore.textContent = "Счет: " + score;
}


function gameLoop() {
  clearElement();
  moveSnake();
  drawSnake();
  drawApple();
  updateScore();
}

document.addEventListener("keydown", function (event) {
  changeDirection(event.keyCode);
});

function changeDirection(keyCode) {
  if (keyCode === 37 && direction !== "right") {
    direction = "left";
  } else if (keyCode === 38 && direction !== "down") {
    direction = "up";
  } else if (keyCode === 39 && direction !== "left") {
    direction = "right";
  } else if (keyCode === 40 && direction !== "up") {
    direction = "down";
  }
}



function moveSnake() {
  let startMove = { x: snake[0].x, y: snake[0].y };
  if (direction === "right") {
    startMove.x++;
  } else if (direction === "left") {
    startMove.x--;
  } else if (direction === "up") {
    startMove.y--;
  } else if (direction === "down") {
    startMove.y++;
  }

  snake.unshift(startMove);

  if (startMove.x === apple.x && startMove.y === apple.y) {
    generateApple();
    score += 1;
  } else {
    snake.pop();
  }

  for(let i = 0; i<snake.length; i++){
    if (apple.x === snake[i].x && apple.y === snake[i].y){
      generateApple();
    }
  } 

  if (Collision()) {
    alert(`Ваш счет: ${score}`);
    saveResult();
    resetGame();
  }
}

function generateApple() {
      apple.x = Math.floor(Math.random() * (field1.numOfSquare));
      apple.y = Math.floor(Math.random() * (field1.numOfSquare));
  
}

function Collision() {
  head = snake[0];
  if (head.x >= field1.numOfSquare || head.y >= field1.numOfSquare || head.y < 0 || head.x < 0) {
    return true;
  };

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

function saveResult(){
  if (score > bestScore){
    localStorage.setItem("bestScore", score);
    bestScore = localStorage;
    bestScoreBox.textContent = "Лучший результат: " + score;
  }
}
  function bestResult(){
    if (localStorage.getItem("bestScore")){
      bestScoreBox.textContent = "Лучший результат: " + localStorage.getItem("bestScore");
      bestScore = localStorage.getItem("bestScore");
    }
    else{
      bestScore = 0
      bestScoreBox.textContent = "Лучший результат: " + 0;
    }
  }


function resetGame() {
  snake = [
    { x: 5, y: 4 },
    { x: 4, y: 4 },
    { x: 3, y: 4 },
    { x: 2, y: 4 },
  ];
  direction = "right";
  generateApple();
  score = 0;

}

let direction = "right";
setInterval(gameLoop, snakeSpeed);
