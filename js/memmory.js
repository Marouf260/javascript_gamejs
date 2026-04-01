const urlParams = new URLSearchParams(window.location.search);
const opType = urlParams.get("op") || "space";
const levelNum = parseInt(urlParams.get("level")) || 1;

const opEl = document.querySelector("#opType");

const levelBoxes = document.querySelectorAll(".levels-container > div");
const clickAudio = new Audio("/assets/audio/click.wav");
const win = new Audio("/assets/audio/win.wav");

levelBoxes.forEach((box) => {
  box.addEventListener("click", function () {
    clickAudio.currentTime = 0;
    clickAudio.play();
    // Zoek <a> binnen de geklikte box
    const link = box.querySelector("a");
    if (link && link.getAttribute("href")) {
      window.location.href = link.getAttribute("href");
    }
  });
});

const opSymbols = {
  space: "space",
  hardware: "hardware",
  auto: "auto",
  dieren: "dieren",
};
let images = [];

if (opEl) opEl.innerText = opSymbols[opType];

switch (opType) {
  case "space":
    images = [
      "/assets/memory fotos/card1.png",
      "/assets/memory fotos/card2.png",
      "/assets/memory fotos/card3.png",
      "/assets/memory fotos/card4.png",
      "/assets/memory fotos/card5.png",
      "/assets/memory fotos/card6.png",
      "/assets/memory fotos/card7.png",
      "/assets/memory fotos/card8.png",
      "/assets/memory fotos/card9.png",
      "/assets/memory fotos/card10.png",
    ];
    break;
  case "auto":
    images = [
      "/assets/memory fotos/autos/auto1.png",
      "/assets/memory fotos/autos/auto2.png",
      "/assets/memory fotos/autos/auto3.png",
      "/assets/memory fotos/autos/auto4.png",
      "/assets/memory fotos/autos/auto5.png",
      "/assets/memory fotos/autos/auto6.png",
      "/assets/memory fotos/autos/auto7.png",
      "/assets/memory fotos/autos/auto8.png",
      "/assets/memory fotos/autos/auto9.png",
      "/assets/memory fotos/autos/auto10.png",
    ];
    break;
  case "dieren":
    images = [
      "/assets/memory fotos/dieren/dier1.png",
      "/assets/memory fotos/dieren/dier2.png",
      "/assets/memory fotos/dieren/dier3.png",
      "/assets/memory fotos/dieren/dier4.png",
      "/assets/memory fotos/dieren/dier5.png",
      "/assets/memory fotos/dieren/dier6.png",
      "/assets/memory fotos/dieren/dier7.png",
      "/assets/memory fotos/dieren/dier8.png",
      "/assets/memory fotos/dieren/dier9.png",
      "/assets/memory fotos/dieren/dier10.png",
    ];
    break;
  case "hardware":
    images = [
      "/assets/memory fotos/hardware/hardware1.png",
      "/assets/memory fotos/hardware/hardware2.png",
      "/assets/memory fotos/hardware/hardware3.png",
      "/assets/memory fotos/hardware/hardware4.png",
      "/assets/memory fotos/hardware/hardware5.png",
      "/assets/memory fotos/hardware/hardware6.png",
      "/assets/memory fotos/hardware/hardware7.png",
      "/assets/memory fotos/hardware/hardware8.png",
      "/assets/memory fotos/hardware/hardware9.png",
      "/assets/memory fotos/hardware/hardware10.png",
    ];
    break;
}

var firstCard = null;
var secondCard = null;
var canFlip = true;
var matches = 0;
var moves = 0;
var seconds = 0;
var timerRunning = false;
var timerInterval;
var gameStartTime = null; // For more accurate timing

// Start the game
function startGame() {
  let gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";

  // Create pairs of cards
  let cardImages = images.concat(images);

  // Shuffle cards
  cardImages.sort(function () {
    return Math.random() - 0.5;
  });

  // Create card elements
  for (var i = 0; i < cardImages.length; i++) {
    let card = document.createElement("div");

    card.className = "card";
    card.innerHTML =
      '<div class="card-front"><i class="fas fa-heart"></i></div>' +
      '<div class="card-back"><img src="' +
      cardImages[i] +
      '"></div>';
    card.onclick = flipCard;
    card.dataset.image = cardImages[i];
    gameBoard.appendChild(card);
  }
}

// Reset variables
firstCard = null;
secondCard = null;
canFlip = true;
matches = 0;
moves = 0;
seconds = 0;
timerRunning = false;
gameStartTime = null;

updateStats();
clearInterval(timerInterval);

function flipCard() {
  if (!canFlip) return;
  if (this.classList.contains("flipped")) return;
  if (this.classList.contains("matched")) return;
  clickAudio.currentTime = 0;
  clickAudio.play();
  if (!timerRunning) {
    startTimer();
  }

  this.classList.add("flipped");

  if (firstCard == null) {
    firstCard = this;
  } else {
    secondCard = this;
    canFlip = false;
    moves++;
    updateStats();
    checkMatch();
  }
}

function checkMatch() {
  var match = firstCard.dataset.image == secondCard.dataset.image;

  if (match) {
    setTimeout(function () {
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      win.currentTime = 0;
      win.play();
      matches++;
      updateStats();
      resetCards();

      if (matches == 10) {
        endGame();
      }
    }, 500);
  } else {
    setTimeout(function () {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetCards();
    }, 1000);
  }
}

function resetCards() {
  firstCard = null;
  secondCard = null;
  canFlip = true;
}

function startTimer() {
  timerRunning = true;
  gameStartTime = Date.now();
  seconds = 0;
  updateStats();
  timerInterval = setInterval(function () {
    // Calculate time delta based on Date.now()
    seconds = Math.floor((Date.now() - gameStartTime) / 1000);
    updateStats();
  }, 1000);
}

function updateStats() {
  document.getElementById("moves").textContent = moves;
  document.getElementById("matches").textContent = matches + "/10";

  let mins = Math.floor(seconds / 60);
  let secs = seconds % 60;
  if (secs < 10) secs = "0" + secs;
  document.getElementById("time").textContent = mins + ":" + secs;
}

function endGame() {
  clearInterval(timerInterval);
  timerRunning = false;
  // Make sure to show the correct elapsed time on win modal
  if (gameStartTime) {
    seconds = Math.floor((Date.now() - gameStartTime) / 1000);
  }
  updateStats();
  document.getElementById("finalMoves").textContent = moves;
  document.getElementById("finalTime").textContent =
    document.getElementById("time").textContent;
  document.getElementById("winModal").classList.add("show");
}

function newGame() {
  document.getElementById("winModal").classList.remove("show");
  clearInterval(timerInterval);
  firstCard = null;
  secondCard = null;
  canFlip = true;
  matches = 0;
  moves = 0;
  seconds = 0;
  timerRunning = false;
  gameStartTime = null;

  // Reset time and moves display using querySelector
  const timeEl = document.querySelector("#time");
  if (timeEl) timeEl.textContent = "0:00";
  const movesEl = document.querySelector("#moves");
  if (movesEl) movesEl.textContent = "0";
  const matchesEl = document.querySelector("#matches");
  if (matchesEl) matchesEl.textContent = "0/10";

  startGame();
}

startGame();
