class GameField{
  constructor(FieldSize, squareSize){
    this.field = document.getElementById("game-field");
    this.squareSize = squareSize;
    this.cell = (FieldSize / this.squareSize);
    this.score = 0;
    this.direction = "right"; 
  } 
      
  moveSnake() {
    let startMove = { x: newSnake.snake[0].x, y: newSnake.snake[0].y };
    if (this.direction === "right") {
      startMove.x++;
    } else if (this.direction === "left") {
      startMove.x--;
    } else if (this.direction === "up") {
       startMove.y--;
    } else if (this.direction === "down") {
      startMove.y++;
    }
      
      newSnake.snake.unshift(startMove);
      
    if (startMove.x === newApple.apple.x && startMove.y === newApple.apple.y) {
      newApple.generateApple();
      getResult.score += 1;
    } else {
      newSnake.snake.pop();
    }
      
    for(let i = 0; i<newSnake.snake.length; i++){
      if (newApple.apple.x === newSnake.snake[i].x && newApple.apple.y === newSnake.snake[i].y){
        newApple.generateApple();
      }
    } 
    
    if (this.Collision()) {
      alert(`Ваш счет: ${getResult.score}`);
      getResult.saveResult();
      getResult.bestResult();
      this.resetGame();
    }
  }
      
      
  Collision() {
    this.head = newSnake.snake[0];
    if (this.head.x >= this.cell || this.head.y >= this.cell || this.head.y < 0 || this.head.x < 0) {
      return true;
    };
  
    for (let i = 1; i < newSnake.snake.length; i++) {
      if (this.head.x === newSnake.snake[i].x && this.head.y === newSnake.snake[i].y) {
        return true;
      }
    }
    return false;
  };

  clearElement() {
    while (this.field.lastChild) {
      this.field.removeChild(this.field.lastChild);
    }

  }


  gameLoop() {
    this.clearElement();
    newSnake.drawSnake();
    newApple.drawApple();
    getResult.updateScore();
    this.moveSnake();
    getResult.bestResult();
  }


  changeDirection(keyCode) {
    if (keyCode === 37 && this.direction !== "right") {
      this.direction = "left";
    } else if (keyCode === 38 && this.direction !== "down") {
      this.direction = "up";
    } else if (keyCode === 39 && this.direction !== "left") {
      this.direction = "right";
    } else if (keyCode === 40 && this.direction !== "up") {
      this.direction = "down";
    }
  }

  resetGame() {
    newSnake.snake = [
      { x: 5, y: 4 },
      { x: 4, y: 4 },
      { x: 3, y: 4 },
      { x: 2, y: 4 },
    ];
    this.direction = "right";
    newApple.generateApple();
    getResult.score = 0;
  }

}

class Snake{
  constructor(snakeSpeed){
    this.snake = [
      { x: 5, y: 4 },
      { x: 4, y: 4 },
      { x: 3, y: 4 },
      { x: 2, y: 4 },
    ];
    this.snakeSpeed = snakeSpeed;
    this.field = newGame.field;
  }
  drawSnake(){
    for (let i = 0; i < this.snake.length; i++){
    let snakeBody = `<div class="snake" style='left:${this.snake[i].x * newGame.squareSize + "px"}; top: ${this.snake[i].y * newGame.squareSize + "px"}'>`;
    this.field.innerHTML += snakeBody;
    }
  };
  
}

class Apple{
  constructor(field){
    this.apple = { 
      x: 20, 
      y: 10 
    };
    this.field = field;
  }
  drawApple(){
    this.field.innerHTML += `<div class="apple" style='left:${this.apple.x * newGame.squareSize + "px"}; top: ${this.apple.y * newGame.squareSize + "px"}'>`;
  };
  
  generateApple() {
    this.apple.x = Math.floor(Math.random() * (newGame.cell));
    this.apple.y = Math.floor(Math.random() * (newGame.cell));
    
  }
}

class Result{
  constructor(score){
    this.score = score;
    this.bestScoreBox = document.getElementById("best-score");
  }
  saveResult(){
    if (this.score > this.bestScore){
      localStorage.setItem("bestScore", this.score);
      this.bestScore = localStorage;
      this.bestScoreBox.textContent = "Лучший результат: " + this.score;
    }
  }
  bestResult(){
    if (localStorage.getItem("bestScore")){
      this.bestScoreBox.textContent = "Лучший результат: " + localStorage.getItem("bestScore");
      this.bestScore = localStorage.getItem("bestScore");
    }
    else{
      this.bestScore = 0
      this.bestScoreBox.textContent = "Лучший результат: " + 0;
    }
  }

  updateScore() {
    this.countScore = document.getElementById("score");
    this.countScore.textContent = "Счет: " + this.score;
  }
}

let newGame = new GameField(500, 20);
let newSnake = new Snake(150);
let newApple = new Apple(newGame.field)
let getResult = new Result(0);

setInterval(newGame.gameLoop.bind(newGame), newSnake.snakeSpeed);

document.addEventListener("keydown", function (event) {
  newGame.changeDirection(event.keyCode);
});
