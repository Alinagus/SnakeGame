
export default class GameField{
    constructor(FieldSize, squareSize, snake, field, apple, score){
      this.field = field;
      this.squareSize = squareSize;
      this.cell = (FieldSize / this.squareSize);
      this.score = 0;
      this.direction = "right"; 
      this.snake = snake;
      this.apple = apple;
      this.result = score;
    } 
        
    moveSnake() {
      let startMove = { x: this.snake.snake[0].x, y: this.snake.snake[0].y };
      if (this.direction === "right") {
        startMove.x++;
      } else if (this.direction === "left") {
        startMove.x--;
      } else if (this.direction === "up") {
         startMove.y--;
      } else if (this.direction === "down") {
        startMove.y++;
      }
        
      this.snake.snake.unshift(startMove);
        
      if (startMove.x === this.apple.apple.x && startMove.y === this.apple.apple.y) {
        this.apple.generateApple();
        this.result.score += 1;
      } else {
        this.snake.snake.pop();
      }
        
      for(let i = 0; i<this.snake.snake.length; i++){
        if (this.apple.apple.x === this.snake.snake[i].x && this.apple.apple.y === this.snake.snake[i].y){
          this.apple.generateApple();
        }
      } 
      
      if (this.Collision()) {
        alert(`Ваш счет: ${this.result.score}`);
        this.result.saveResult();
        this.result.bestResult()
        this.resetGame();
      }
    }
        
        
    Collision() {
      this.head = this.snake.snake[0];
      if (this.head.x >= this.cell || this.head.y >= this.cell || this.head.y < 0 || this.head.x < 0) {
        return true;
      };
    
      for (let i = 1; i < this.snake.snake.length; i++) {
        if (this.head.x === this.snake.snake[i].x && this.head.y === this.snake.snake[i].y) {
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
      this.snake.snake = [
        { x: 5, y: 4 },
        { x: 4, y: 4 },
        { x: 3, y: 4 },
        { x: 2, y: 4 },
      ];
      this.direction = "right";
      this.apple.generateApple();
      this.result.score = 0;
    }
  
  }



  