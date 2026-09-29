const buttons = document.querySelectorAll(".buttons");
const playerSelectedImage = document.querySelector("#player-selected");
const description = document.querySelector(".description");
const showPlayerScore = document.querySelector("#player-score");
const showComputerScore = document.querySelector("#computer-score");
// const resetButton = document.querySelector(".button");
const choices = ["rock", "paper", "scissors"];
let playerScore = 0;
let computerScore = 0;
let highestScore = 0;

// const restartHandler = () => {
//   playerScore = 0;
//   computerScore = 0;
//   highestScore = 0;
//   playGame();
// };

const selectHandler = (event) => {
  const playerChoice = event.target.dataset.status;
  playerSelectedImage.src = `${location.origin}/img/${playerChoice}.png`;
  const randomNumber = Math.floor(Math.random() * choices.length);
  const computerChoice = choices[randomNumber];
  const winner = checkWinner(playerChoice, computerChoice);
  calculateResult(winner);
  showPlayerScore.innerText = `${playerScore}`;
  showComputerScore.innerText = `${computerScore}`;

  setTimeout(() => {
    if (playerScore === highestScore || computerScore === highestScore) {
      //   resetButton.style.display = "block";
      playerScore === highestScore
        ? alert("Finish game, You Win!")
        : alert("Finish game, You Lose!");
      return;
    }
  }, 100);
};

const calculateResult = (winner) => {
  if (winner === "player") {
    playerScore++;
  } else if (winner === "computer") {
    computerScore++;
  } else {
    alert("It's a tie.");
  }
};

const checkWinner = (player, computer) => {
  if (player === computer) {
    return "draw";
  } else if (player === "rock") {
    return computer === "paper" ? "computer" : "player";
  } else if (player === "paper") {
    return computer === "scissors" ? "computer" : "player";
  } else {
    return computer === "rock" ? "computer" : "player";
  }
};

const playGame = () => {
  if (!highestScore) {
    highestScore = +prompt("Determine the highest score", 3) || 3;
  }
  description.innerText = `First to ${highestScore} Points Wins`;
};

playGame();

buttons.forEach((button) => {
  button.addEventListener("click", selectHandler);
});

// resetButton.addEventListener("click", restartHandler);
