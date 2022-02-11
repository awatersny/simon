/*----------------------------------------Constants------------------------------------------*/
// Array containing a sequence for the player to memorize:
// This array will have a random number from 0-3 pushed into it at the beginning of each turn.
const compSequence = [];

// Array containing a sequence corresponding to player input:
// This array will contain a value from 0-3 corresponding with the element clicked by the player.
const playerSequence = [];

/*----------------------------------------Variables------------------------------------------*/
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
board.addEventListener("click", testEvent); //Note: if evt.target.id === board, nothing should happen.
startBtn.addEventListener("click", testEvent);
resetBtn.addEventListener("click", testEvent);

/*---------------------------------------Functions-------------------------------------------*/
// Sequences should start when the player presses a start button.
// Four elements light up (change to a lighter hue of their color: start with 0.5 seconds) in random order, but the sequences should be stored.
// The player should be able to reset the game at any time.

// Initial state
function init(){
  score = 0;
  turn = 0;
  render();
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
init();

// Temporary test function to be deleted.
function testEvent(evt){
  console.log(evt.target.id);
}