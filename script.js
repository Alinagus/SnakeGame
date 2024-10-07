class Game{
  constructor(FieldSize, squareSize){
    this.gameField = document.getElementById("game-field");
    this.bestScoreBox = document.getElementById("best-score");
    this.snake = [
      { x: 5, y: 4 },
      { x: 4, y: 4 },
      { x: 3, y: 4 },
      { x: 2, y: 4 },
    ];
    this.squareSize = squareSize
    this.numOfSquare = FieldSize / this.squareSize
    this.snakeSpeed = 150;
    this.score = 0;
    this.apple = { 
      x: 20, 
      y: 10 
    };
    this.direction = "right";
    this.event = new MouseEvent("keydown",  (event) => {
      newGame.changeDirection(event.keyCode);
     }); 
  } 

    drawSnake(){
      for (let i = 0; i < this.snake.length; i++){
      let snakeBody = `<div class="snake" style='left:${this.snake[i].x * this.squareSize + "px"}; top: ${this.snake[i].y * this.squareSize + "px"}'>`;
      this.gameField.innerHTML += snakeBody;
      }
    };
      Collision() {
        this.head = this.snake[0];
        if (this.head.x >= this.numOfSquare || this.head.y >= this.numOfSquare || this.head.y < 0 || this.head.x < 0) {
          return true;
        };
      
        for (let i = 1; i < this.snake.length; i++) {
          if (this.head.x === this.snake[i].x && this.head.y === this.snake[i].y) {
            return true;
          }
        }
        return false;
      }
      
      moveSnake() {
        let startMove = { x: this.snake[0].x, y: this.snake[0].y };
        if (this.direction === "right") {
          startMove.x++;
        } else if (this.direction === "left") {
          startMove.x--;
        } else if (this.direction === "up") {
          startMove.y--;
        } else if (this.direction === "down") {
          startMove.y++;
        }
      
        this.snake.unshift(startMove);
      
        if (startMove.x === this.apple.x && startMove.y === this.apple.y) {
          generateApple();
          this.score += 1;
        } else {
          this.snake.pop();
        }
      
        for(let i = 0; i<this.snake.length; i++){
          if (this.apple.x === this.snake[i].x && this.apple.y === this.snake[i].y){
            generateApple();
          }
        } 
      
        if (this.Collision()) {
          alert(`Ваш счет: ${score}`);
          saveResult();
          resetGame();
        }
      }

  drawApple(){
    this.gameField.innerHTML += `<div class="apple" style='left:${this.apple.x * this.squareSize + "px"}; top: ${this.apple.y * this.squareSize + "px"}'>`;
  };


  clearElement() {
    while (this.gameField.lastChild) {
      this.gameField.removeChild(this.gameField.lastChild);
    }

  }

  updateScore() {
    this.countScore  = document.getElementById("score");
    this.countScore.textContent = "Счет: " + this.score;
  }
  clearElement() {
    while (this.gameField.lastChild) {
      this.gameField.removeChild(this.gameField.lastChild);
    }

  }

  gameLoop() {
    this.clearElement();
    this.drawSnake();
    this.drawApple();
    this.updateScore();
    this.moveSnake();
  }


  changeDirection(keyCode) {
    if (keyCode === 37 && this.direction !== "right") {
      direction = "left";
    } else if (keyCode === 38 && this.direction !== "down") {
      direction = "up";
    } else if (keyCode === 39 && this.direction !== "left") {
      direction = "right";
    } else if (keyCode === 40 && this.direction !== "up") {
      direction = "down";
    }
  }



  generateApple() {
    this.apple.x = Math.floor(Math.random() * (field1.numOfSquare));
    this.apple.y = Math.floor(Math.random() * (field1.numOfSquare));
    
  }

  bestResult(){
    if (localStorage.getItem("bestScore")){
      bestScoreBox.textContent = "Лучший результат: " + localStorage.getItem("bestScore");
      bestScore = localStorage.getItem("bestScore");
    }
    else{
      bestScore = 0
      bestScoreBox.textContent = "Лучший результат: " + 0;
    }
  }

  saveResult(){
    if (this.score > bestScore){
      localStorage.setItem("bestScore", this.score);
      bestScore = localStorage;
      bestScoreBox.textContent = "Лучший результат: " + this.score;
    }
  }


  resetGame() {
    this.snake;
    direction = "right";
    generateApple();
    this.score = 0;

  }

}
let newGame = new Game(500, 20);
setInterval(newGame.gameLoop, newGame.snakeSpeed);
