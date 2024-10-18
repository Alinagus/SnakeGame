import GameField from './field.js';
import Result from './Score.js';
import Apple from './Apple.js';
import Snake from './Snake.js';

const field = document.getElementById("game-field");
const FieldSize = 500;
const squareSize = 20;

class startGame{
  gameLoop() {
    newField.clearElement();
    newSnake.drawSnake();
    newApple.drawApple();
    getResult.updateScore();
    newField.moveSnake();
    getResult.bestResult();
  }
}

const newSnake = new Snake(120, field, squareSize);
const newApple = new Apple(field, 25, squareSize)
const getResult = new Result(0);
const newField = new GameField(FieldSize, squareSize, newSnake, field, newApple, getResult);
const newGame = new startGame();

setInterval(newGame.gameLoop.bind(newField), newSnake.snakeSpeed);

document.addEventListener("keydown", function (event) {
  newField.changeDirection(event.keyCode);
});
