/*----------------------------------------Constants------------------------------------------*/

/*----------------------------------------Variables------------------------------------------*/
// Array containing a sequence for the player to memorize:
// This array will have a random number from 0-3 pushed into it at the beginning of each turn.
let comSequence = [];
// Array containing a sequence corresponding to player input:
// This array will contain a value from 0-3 corresponding with the element clicked by the player.
let playerSequence = [];
// Score: Increments each time the two arrays are congruent.
let score = 0;
// High Score: Increments when score is greater than or equal to it.
let hiScore = 5;
let prevHiScore = hiScore; 
// Turn: -1 for computer and 1 for player. 0 if game is not in session
let turn = 0;
// Time it takes for computer to play sequence
let playerWait = 0;
// Keep track of which board to light up during com sequence
let renderIdx = 0;

/*--------------------------------Cached Element References----------------------------------*/
// Status message
const statusMsg = document.getElementById("status");
// Rendered high score
const hiScoreDisplay = document.getElementById("hi-score");
// 4 clickable elements of different colors
const board = document.getElementById("board");
const colorBtns = document.querySelectorAll(".board-button");
// A start button
const startBtn = document.getElementById("start");
// A reset button
const resetBtn = document.getElementById("reset");
// Rendered score
const scoreDisplay = document.getElementById("score");

/*------------------------------------Event Listeners----------------------------------------*/
board.addEventListener("click", inputSequence); //Note: if evt.target.id === board, nothing should happen.
startBtn.addEventListener("click", comTurn);
resetBtn.addEventListener("click", reset);

/*---------------------------------------Functions-------------------------------------------*/
// Initial state
// The player should be able to reset the game at any time.
function init(){
  score = 0;
  prevHiScore = hiScore;
  turn = 0;
  playerWait = 0;
  renderIdx = 0;
  comSequence = [];
  playerSequence = [];
  render();
  turn = -1;
}

function reset() {
  if (score > prevHiScore){
    renderGameOver();
  } else {
    init();
  }
}

// First sequence should start when the player presses a start button.
// Four elements light up (change to a lighter hue of their color: start with 0.5 seconds) in random order, but the sequences should be stored.
function comTurn() {
  if(turn !== -1) {
    return;
  }
  let interval = 500;
  playerWait += interval;
  renderIdx = 0;
  render();
  resetBtn.setAttribute("hidden", true);
  comSequence.push(Math.floor(Math.random() * 4))
  // Com plays sequence
  const playSequence = setInterval(() => {
    //Flash the light at the current index
    if(comSequence[renderIdx] === 0){
      blinkLight("green");
    } else if(comSequence[renderIdx] === 1){
      blinkLight("red");
    } else if(comSequence[renderIdx] === 2){
      blinkLight("yellow");
    } else if(comSequence[renderIdx] === 3){
      blinkLight("blue");
    }

    renderIdx++;
    if(renderIdx === comSequence.length || turn === 0){
      clearInterval(playSequence);
    }
  }, interval);

  setTimeout(() => {
    // Allow player to enter sequence.
    turn = 1;
    render();
  }, playerWait+interval);
}

function inputSequence(evt){
  // buttons should be pressed only on player turn
  if(turn !== 1) {
    return;
  }
  // Take player input
  /**
   * green: 0
   * red: 1
   * yellow: 2
   * blue: 3
   */
  if(playerSequence.length < comSequence.length) {
    if(evt.target.id === "green"){
      let cVal = 0;
      playerSequence.push(cVal);
    } else if(evt.target.id === "red"){
      let cVal = 1;
      playerSequence.push(cVal);
    } else if(evt.target.id === "yellow"){
      let cVal = 2;
      playerSequence.push(cVal);
    } else if(evt.target.id === "blue"){
      let cVal = 3;
      playerSequence.push(cVal);
    }
  }
  matchSequence(evt);
}

// This function will allow player input and set turn to 0 if playerSequence doesn't match comSequence
function matchSequence(evt) {
  // compare sequence arrays
  playerSequence.forEach((color, idx) => {
    if(comSequence[idx] !== color){
      // This value will end the game.
      turn = 0;
    }
  });
  blinkLight(evt.target.id);
  if (turn === 0){
    renderGameOver();
    return;
  }
  if(playerSequence.length === comSequence.length){
    turn = -1;
    score++;
    hiScore = score > hiScore ? score : hiScore;
    // Reset player sequence
    playerSequence = [];
    setTimeout(()=>{
      comTurn();
    }, 500);
  }
}

function render() {
  if(turn) {
    startBtn.setAttribute("hidden", true);
    resetBtn.removeAttribute("hidden");
    statusMsg.textContent = turn === 1 ? `Your turn` : `Repeat this sequence`
  } else {
    resetBtn.setAttribute("hidden", true);
    startBtn.removeAttribute("hidden");
    statusMsg.textContent = `Press Start to begin.`
  }
  scoreDisplay.textContent = score;
  hiScoreDisplay.textContent = hiScore;
}

function renderGameOver() {
  let wait = 2000;
  if(score > prevHiScore){
    wait = 4000;
    statusMsg.textContent = `Congratulations!!!`
    confetti.start(1000);
    setTimeout(() => {
      statusMsg.textContent = `New High Score!!!`
    }, 2000);
  } else {
    statusMsg.textContent = `Game Over.`
  }
  resetBtn.setAttribute("hidden", true);
  setTimeout(() => {
    init();
  }, wait);
}

function renderAudio(color, duration) {
  const note = new Audio(`./audio/${color}.mp3`);
  note.play();
  setTimeout(() => {
    note.pause();
  }, duration);
}

function renderLightState(colorIdx, color1, color2) {
  colorBtns[colorIdx].style.backgroundColor = color1;
  colorBtns[colorIdx].style.borderColor = color2;
}

function blinkLight(color){
  let interval = 300
  if(!turn){
    interval = 700
    renderAudio("buzz", interval);
  } else {
    renderAudio(color, interval);
  }
  if(color === "green"){
    let cVal = 0;
    renderLightState(cVal, "#0f0", "070");
    setTimeout(() => {
      renderLightState(cVal, "#070", "050");
    }, interval);

  } else if(color === "red"){
    let cVal = 1;
    renderLightState(cVal, "#f00", "700");
    setTimeout(() => {
      renderLightState(cVal, "#700", "500");
    }, interval);

  } else if(color === "yellow"){
    let cVal = 2;
    renderLightState(cVal, "#ff0", "770");
    setTimeout(() => {
      renderLightState(cVal, "#770", "550");
    }, interval);

  } else if(color === "blue"){
    let cVal = 3;
    renderLightState(cVal, "#00f", "007");
    setTimeout(() => {
      renderLightState(cVal, "#007", "005");
    }, interval);
  }
}

init();