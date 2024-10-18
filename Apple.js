
export default class Apple{
    constructor(field, cell, squareSize){
      this.apple = { 
        x: 20, 
        y: 10 
      };
      this.field = field;
      this.cell = cell;
      this.squareSize = squareSize;
    }
    drawApple(){
      this.field.innerHTML += `<div class="apple" style='left:${this.apple.x * this.squareSize + "px"}; top: ${this.apple.y * this.squareSize + "px"}'>`;
    };
    
    generateApple() {
      this.apple.x = Math.floor(Math.random() * (this.cell));
      this.apple.y = Math.floor(Math.random() * (this.cell));
      
    }
  }
