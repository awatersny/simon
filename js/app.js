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
let hiScore = 0;
// Turn: -1 for computer and 1 for player. 0 if game is not in session
let turn = 0;

/*--------------------------------Cached Element References----------------------------------*/
// Status message
const statusMsg = document.getElementById("status");
// Rendered high score
const hiScoreDisplay = document.getElementById("hi-score");
// 4 clickable elements of different colors
const board = document.getElementById("board");
const colorBtns = document.querySelectorAll("board-button");
// A start button
const startBtn = document.getElementById("start");
// A reset button
const resetBtn = document.getElementById("reset");
// Rendered score
const scoreDisplay = document.getElementById("score");

/*------------------------------------Event Listeners----------------------------------------*/
board.addEventListener("click", inputSequence); //Note: if evt.target.id === board, nothing should happen.
startBtn.addEventListener("click", comTurn);
resetBtn.addEventListener("click", init);

/*---------------------------------------Functions-------------------------------------------*/
// Initial state
// The player should be able to reset the game at any time.
function init(){
  score = 0;
  turn = 0;
  comSequence = [];
  playerSequence = [];
  render();
  turn = -1;
  testVals();
}

// First sequence should start when the player presses a start button.
// Four elements light up (change to a lighter hue of their color: start with 0.5 seconds) in random order, but the sequences should be stored.
function comTurn() {
  if(turn !== -1) {
    return;
  }
  // Com plays sequence
  comSequence.push(Math.floor(Math.random() * 4))
  render();
  // Allow player to enter sequence.
  turn = 1;
  console.log("com: ", comSequence)
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
      playerSequence.push(0);
    } else if(evt.target.id === "red"){
      playerSequence.push(1);
    } else if(evt.target.id === "yellow"){
      playerSequence.push(2);
    } else if(evt.target.id === "blue"){
      playerSequence.push(3);
    }
  }
  console.log(`------------------------------------------------------------------------------------\nPressed: ${evt.target.id}`)
  console.log("plr: ", playerSequence);
  console.log(`------------------------------------------------------------------------------------\n`)
  matchSequence();
  console.log("turn", turn);
}

// This function will allow player input and set turn to 0 if playerSequence doesn't match comSequence
function matchSequence() {
  // compare sequence arrays
  playerSequence.forEach((color, idx) => {
    if(comSequence[idx] !== color){
      // This value will end the game.
      turn = 0;
    }
  });
  if (turn === 0){
    return;
  }
  if(playerSequence.length === comSequence.length){
    turn = -1;
    score++;
    hiScore = score > hiScore ? score : hiScore;
    // Reset player sequence
    playerSequence = [];
    testVals();
    comTurn();
  }
}

function render() {
  if(turn) {
    startBtn.setAttribute("hidden", true);
    resetBtn.removeAttribute("hidden");
  } else {
    resetBtn.setAttribute("hidden", true);
    startBtn.removeAttribute("hidden");
  }
}

//Map values in playerArray to light up buttons
function renderLights(evt) {}

init();

// Temporary test functions to be deleted.
function testEvent(evt){
  console.log(evt.target.id);
}

function testVals(){
  console.log("score : ", score);
  console.log("hiscr : ", hiScore);
  console.log("cmptr : ", comSequence);
  console.log("plyr  : ", playerSequence);
  console.log("turn  : ", turn);
}