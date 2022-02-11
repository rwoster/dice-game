/*         ELEMENTS        */
// MESSAGE
let message = document.getElementById("message");

// PLAYER
let p1 = document.getElementById("player1");
let p2 = document.getElementById("player2");

// SCORE
let player1ScoreEl = document.getElementById("player1Scoreboard");
let player2ScoreEl = document.getElementById("player2Scoreboard");

// DICE
let dice1 = document.getElementById("player1Dice");
let dice2 = document.getElementById("player2Dice");

// BUTTONS
const rollBtn = document.getElementById("roll-btn");
const resetBtn = document.getElementById("reset-btn");
const goesFirstBtn = document.getElementById("goes-first-btn");

// HISTORY
let p1Hist = document.getElementById("p1-hist-li");
let p2Hist = document.getElementById("p2-hist-li");

//       START GAME STATE
let player1Score = 0;
let player2Score = 0;
let player1Turn;
let dice1Value = 0;
let dice2Value = 0;

function diceRoll() {
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    updateMessage();

    player1Turn;
    if (player1Turn) {
        dice1.classList.add("leftRolled");
        dice2.classList.remove("rightRolled");

        player2ScoreEl.classList.remove("updated");

        dice1Value = randomNumber;
        dice1.textContent = dice1Value;
        updateHistory(p1Hist, dice1Value);

        dice1.classList.remove("active");
        dice2.classList.add("active");

        player1ScoreEl.classList.add("updated");
        player1Score += dice1Value;
        player1ScoreEl.textContent = player1Score;
    } else {
        dice2.classList.add("rightRolled");
        dice1.classList.remove("leftRolled");

        player1ScoreEl.classList.remove("updated");

        dice2Value = randomNumber;
        dice2.textContent = dice2Value;
        updateHistory(p2Hist, dice2Value);

        dice2.classList.remove("active");
        dice1.classList.add("active");

        player2ScoreEl.classList.add("updated");
        player2Score += dice2Value;
        player2ScoreEl.textContent = player2Score;
    }

    // WIN STATE
    if (player1Score >= 21) {
        declareWinner(p1);
    } else if (player2Score >= 21) {
        declareWinner(p2);
    }
}

function resetGame() {
    // PLAYER 1
    player1Turn = true;
    player1ScoreEl.textContent = 0;
    player1Score = 0;
    // PLAYER 2
    player2ScoreEl.textContent = 0;
    player2Score = 0;
    // DICE STATE
    dice1.classList.add("active");
    dice2.classList.remove("active");
    dice1.textContent = "-";
    dice2.textContent = "-";
    resetDice();
    // MESSAGE STATE
    message.textContent = "";
    // BUTTON STATE
    goesFirstBtn.style.display = "inline-block";
    resetBtn.style.display = "none";
    // WINNER STATE
    p1.classList.remove("active", "winner");
    p2.classList.remove("active", "winner");
    message.classList.remove("winner");
    dice1.classList.remove("winner");
    dice2.classList.remove("winner");
    // RESET HISTORY
    p1Hist.innerHTML = "";
    p2Hist.innerHTML = "";
}

//
/*         EVENT LISTENERS     */
rollBtn.addEventListener("click", () => {
    diceRoll();
    player1Turn = !player1Turn;
});
resetBtn.addEventListener("click", () => {
    resetGame();
});
goesFirstBtn.addEventListener("click", () => {
    whoGoesFrist();
});

//
/*          HELPER FUNCTIONs       */

function updateHistory(player, dice) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(dice));
    player.appendChild(li);
}

function resetDice() {
    dice1.classList.remove("leftRolled");
    dice1.classList.remove("active");
    dice2.classList.remove("rightRolled");
    dice2.classList.remove("active");
}

function declareWinner(player) {
    player.classList.add("winner");
    message.classList.add("winner");
    message.textContent =
        player === p1 ? "PLAYER 1 WINS!!!" : "PLAYER 2 WINS!!!";
    rollBtn.style.display = "none";
    resetBtn.style.display = "inline-block";
}

function updateMessage() {
    // message.classList.add("fade-in");
    message.textContent = !player1Turn
        ? "Player 1 Turn"
        : "Player 2 Turn";
}

function whoGoesFrist() {
    let randomNumber = Math.floor(Math.random() * 2) + 1;
    if (randomNumber === 1) {
        player1Turn = true;
        message.textContent = "Player 1 Turn";
    } else {
        player1Turn = false;
        message.textContent = "Player 2 Turn";
    }
    goesFirstBtn.style.display = "none";
    rollBtn.style.display = "inline-block";
}
