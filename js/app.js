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
board.addEventListener("click", testEvent); //Note: if evt.target.id === board, nothing should happen.
startBtn.addEventListener("click", playGame);
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
}

// Sequences should start when the player presses a start button.
// Four elements light up (change to a lighter hue of their color: start with 0.5 seconds) in random order, but the sequences should be stored.
function playGame() {
  turn = -1;
  // Com plays sequence
  comSequence.push(Math.floor(Math.random() * 4))
  // Player enters sequence
  matchSequence();
  // Repeat process until turn === 0
  render();
  console.log(turn);
  console.log(comSequence);
}

// This function will allow player input and set turn to 0 if playerSequence doesn't match comSequence
function matchSequence() {

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

//Map values in sequenceArray to light up buttons
function renderLights(evt) {}

init();

// Temporary test function to be deleted.
function testEvent(evt){
  console.log(evt.target.id);
}