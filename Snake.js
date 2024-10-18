export default class Snake{
    constructor(snakeSpeed, field, squareSize){
      this.snake = [
        { x: 5, y: 4 },
        { x: 4, y: 4 },
        { x: 3, y: 4 },
        { x: 2, y: 4 },
      ];
      this.snakeSpeed = snakeSpeed;
      this.field = field;
      this.squareSize = squareSize;
    }
    drawSnake(){
      for (let i = 0; i < this.snake.length; i++){
      let snakeBody = `<div class="snake" style='left:${this.snake[i].x * this.squareSize + "px"}; top: ${this.snake[i].y * this.squareSize + "px"}'>`;
      this.field.innerHTML += snakeBody;
      }
    };
    
  }

