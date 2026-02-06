let scoreGame = JSON.parse(localStorage.getItem("scoreGame")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
let intervalId;
const scoreElement = document.getElementById("js-score");
const resultElement = document.getElementById("js-result");
const movesElement = document.getElementById("js-moves");
const playerMove = document.getElementById("js-player");
const computerMove = document.getElementById("js-computer");
const autoPlayButton = document.getElementById("js-auto-play");
const resetNotification = document.getElementById("reset");
const yesResetButton = document.getElementById("reset-yes");
const noResetButton = document.getElementById("reset-no");

showScore();
function randomChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
}
function findWinner(yourChoice, computerChoice) {
  if (yourChoice === computerChoice) return "Tie.";
  const winCondition = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };
  return winCondition[yourChoice] === computerChoice ? "You win." : "You lose.";
}
function showNotificaton() {
  resetNotification.classList.add("show-notification");
}
function showScore() {
  scoreElement.textContent = `Wins: ${scoreGame.wins},Losses: ${scoreGame.losses},Ties: ${scoreGame.ties}`;
}
function reset() {
  scoreGame = { wins: 0, losses: 0, ties: 0 };
  localStorage.setItem("scoreGame", JSON.stringify(scoreGame));
  showScore();
}
function showMoves(choice, computerChoice) {
  switch (choice) {
    case "rock":
      playerMove.src = "images/rock.png";
      break;
    case "paper":
      playerMove.src = "images/paper.png";
      break;
    case "scissors":
      playerMove.src = "images/scissors.png";
      break;
  }
  switch (computerChoice) {
    case "rock":
      computerMove.src = "images/rock.png";
      break;
    case "paper":
      computerMove.src = "images/paper.png";
      break;
    case "scissors":
      computerMove.src = "images/scissors.png";
      break;
  }
}
function handleChoice(choice) {
  const computerChoice = randomChoice();
  const result = findWinner(choice, computerChoice);
  if (result === "You win.") scoreGame.wins += 1;
  else if (result === "You lose.") scoreGame.losses += 1;
  else if (result === "Tie.") scoreGame.ties += 1;
  localStorage.setItem("scoreGame", JSON.stringify(scoreGame));
  resultElement.textContent = result;
  movesElement.classList.add("moves-visible");
  showMoves(choice, computerChoice);
  showScore();
}

function autoPlay() {
  if (!autoPlayButton.classList.contains("stop-play")) {
    autoPlayButton.classList.add("stop-play");
    autoPlayButton.textContent = "Stop play";
    intervalId = setInterval(() => handleChoice(randomChoice()), 1000);
  } else {
    autoPlayButton.classList.remove("stop-play");
    autoPlayButton.textContent = "Auto play";
    clearInterval(intervalId);
  }
}

function setupEventListeners() {
  document
    .getElementById("js-rock")
    .addEventListener("click", () => handleChoice("rock"));
  document
    .getElementById("js-paper")
    .addEventListener("click", () => handleChoice("paper"));
  document
    .getElementById("js-scissors")
    .addEventListener("click", () => handleChoice("scissors"));
  document
    .getElementById("js-reset")
    .addEventListener("click", showNotificaton);
  autoPlayButton.addEventListener("click", autoPlay);
  document.addEventListener("keydown", (event) => {
    if (event.key === "r" || event.key === "R") {
      handleChoice("rock");
    } else if (event.key === "p" || event.key === "P") {
      handleChoice("paper");
    } else if (event.key === "s" || event.key === "S") {
      handleChoice("scissors");
    } else if (event.key === "a" || event.key === "A") {
      autoPlay();
    } else if (event.key === "Backspace") {
      reset();
    }
  });
  yesResetButton.addEventListener("click", () => {
    reset();
    movesElement.classList.remove("moves-visible");
    resultElement.textContent = "";
    resetNotification.classList.remove("show-notification");
  });
  noResetButton.addEventListener("click", () => {
    resetNotification.classList.remove("show-notification");
  });
}
setupEventListeners();
