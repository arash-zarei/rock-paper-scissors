const buttons = document.querySelectorAll(".buttons");
const playerSelectedImage = document.querySelector("#player-selected");
const computerSelectedImage = document.querySelector("#computer-selected");
const description = document.querySelector(".description");
const showPlayerScore = document.querySelector("#player-score");
const showComputerScore = document.querySelector("#computer-score");
const resetButton = document.querySelector(".restart-button");
const choices = ["rock", "paper", "scissors"];
const winningMoves = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};
let playerScore = 0;
let computerScore = 0;
let highestScore = 0;
let gameOver = false;

const restartHandler = () => {
  playerScore = 0;
  computerScore = 0;
  highestScore = 0;
  gameOver = false;
  updateScore(playerScore, computerScore);
  setTimeout(() => {
    playGame();
  }, 100);
};

const selectHandler = (event) => {
  if (gameOver) return;
  const playerChoice = event.target.dataset.status;
  const randomNumber = Math.floor(Math.random() * choices.length);
  const computerChoice = choices[randomNumber];
  playerSelectedImage.src = `./img/${playerChoice}.png`;
  computerSelectedImage.src = `./img/${computerChoice}.png`;
  const winner = checkWinner(playerChoice, computerChoice);
  calculateResult(winner);
  updateScore(playerScore, computerScore);

  setTimeout(() => {
    if (playerScore === highestScore || computerScore === highestScore) {
      resetButton.style.display = "block";
      gameOver = true;
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
  }
};

const checkWinner = (player, computer) => {
  if (player === computer) return "draw";
  return winningMoves[player] === computer ? "player" : "computer";
};

const updateScore = (player, computer) => {
  showPlayerScore.innerText = player;
  showComputerScore.innerText = computer;
};

const playGame = () => {
  if (!highestScore) {
    while (true) {
      const input = prompt("Determine the highest score", 3);
      const score = Number(input);
      if (Number.isInteger(score) && score > 0) {
        highestScore = score;
        break;
      }
      alert("Please enter a positive integer!");
    }
  }
  description.textContent = `First to ${highestScore} Points Wins`;
};

playGame();

buttons.forEach((button) => {
  button.addEventListener("click", selectHandler);
});

resetButton.addEventListener("click", restartHandler);
