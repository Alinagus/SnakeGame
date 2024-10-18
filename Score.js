
export default class Result{
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
