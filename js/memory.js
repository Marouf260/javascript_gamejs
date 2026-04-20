// variabelen
const urlParams = new URLSearchParams(window.location.search);
const opType = urlParams.get("op") || "space";
const levelNum = parseInt(urlParams.get("level")) || 1;

// elementen
const opEl = document.querySelector("#opType");
const levelBoxes = document.querySelectorAll(".levels-container > div");
const clickAudio = new Audio("../../assets/audio/click.wav");
const win = new Audio("../../assets/audio/win.wav");

// level selectie
levelBoxes.forEach((box) => {
  box.addEventListener("click", function () {
    clickAudio.currentTime = 0;
    clickAudio.play();
    const link = box.querySelector("a");
    if (link && link.getAttribute("href")) {
      window.location.href = link.getAttribute("href");
    }
  });
});

// categorieën
const opSymbols = {
  space: "space",
  hardware: "hardware",
  auto: "auto",
  dieren: "dieren",
};

let images = [];

if (opEl) opEl.innerText = opSymbols[opType];

// afbeeldingen per categorie
switch (opType) {
  // space categorie
  case "space":
    images = [
      "../../assets/memory fotos/card1.png",
      "../../assets/memory fotos/card2.png",
      "../../assets/memory fotos/card3.png",
      "../../assets/memory fotos/card4.png",
      "../../assets/memory fotos/card5.png",
      "../../assets/memory fotos/card6.png",
      "../../assets/memory fotos/card7.png",
      "../../assets/memory fotos/card8.png",
      "../../assets/memory fotos/card9.png",
      "../../assets/memory fotos/card10.png",
    ];
    document.body.style.backgroundImage = "url('/assets/backgrounds/space_background.jpg')";
    break;
  // auto categorie
  case "auto":
    images = [
      "../../assets/memory fotos/autos/auto1.png",
      "../../assets/memory fotos/autos/auto2.png",
      "../../assets/memory fotos/autos/auto3.png",
      "../../assets/memory fotos/autos/auto4.png",
      "../../assets/memory fotos/autos/auto5.png",
      "../../assets/memory fotos/autos/auto6.png",
      "../../assets/memory fotos/autos/auto7.png",
      "../../assets/memory fotos/autos/auto8.png",
      "../../assets/memory fotos/autos/auto9.png",
      "../../assets/memory fotos/autos/auto10.png",
    ];
    document.body.style.backgroundImage = "url('/assets/backgrounds/auto_background.jpg')";
    break;
  // dieren categorie
  case "dieren":
    images = [
      "../../assets/memory fotos/dieren/dier1.png",
      "../../assets/memory fotos/dieren/dier2.png",
      "../../assets/memory fotos/dieren/dier3.png",
      "../../assets/memory fotos/dieren/dier4.png",
      "../../assets/memory fotos/dieren/dier5.png",
      "../../assets/memory fotos/dieren/dier6.png",
      "../../assets/memory fotos/dieren/dier7.png",
      "../../assets/memory fotos/dieren/dier8.png",
      "../../assets/memory fotos/dieren/dier9.png",
      "../../assets/memory fotos/dieren/dier10.png",
    ];
    document.body.style.backgroundImage = "url('/assets/backgrounds/dieren_background.jpg')";
    break;
  // hardware categorie
  case "hardware":
    images = [
      "../../assets/memory fotos/hardware/hardware1.png",
      "../../assets/memory fotos/hardware/hardware2.png",
      "../../assets/memory fotos/hardware/hardware3.png",
      "../../assets/memory fotos/hardware/hardware4.png",
      "../../assets/memory fotos/hardware/hardware5.png",
      "../../assets/memory fotos/hardware/hardware6.png",
      "../../assets/memory fotos/hardware/hardware7.png",
      "../../assets/memory fotos/hardware/hardware8.png",
      "../../assets/memory fotos/hardware/hardware9.png",
      "../../assets/memory fotos/hardware/hardware10.png",
    ];
    document.body.style.backgroundImage = "url('/assets/backgrounds/hardware_background.jpg')";
    break;
}

// variabelen
let firstCard = null;
let secondCard = null;
let canFlip = true;
let matches = 0;
let moves = 0;
let seconds = 0;
let timerRunning = false;
let timerInterval;
let gameStartTime = null;

// Start the game
function startGame() {
  const gameBoard = document.getElementById("gameBoard");
  if (!gameBoard) return;
  gameBoard.innerHTML = "";

  // Create pairs of cards
  let cardImages = images.concat(images);

  // Shuffle cards using Fisher-Yates algorithm
  for (let i = cardImages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardImages[i], cardImages[j]] = [cardImages[j], cardImages[i]];
  }


  // Create card elements
  for (let i = 0; i < cardImages.length; i++) {
    const card = document.createElement("div");

    card.className = "card";
    card.innerHTML =
      '<div class="card-front"><i class="fas fa-star"></i></div>' +
      '<div class="card-back"><img src="' +
      cardImages[i] +
      '"></div>';
    card.onclick = flipCard;
    card.dataset.image = cardImages[i];
    gameBoard.appendChild(card);
  }
}

// Reset variables
function resetGameState() {
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
}

// kaarten omdraaien
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

  if (firstCard === null) {
    firstCard = this;
  } else {
    secondCard = this;
    canFlip = false;
    moves++;
    updateStats();
    checkMatch();
  }
}

// controleren of kaarten matchen
function checkMatch() {
  const isMatch = firstCard.dataset.image === secondCard.dataset.image;

  if (isMatch) {
    setTimeout(() => {
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      win.currentTime = 0;
      win.play();
      matches++;
      updateStats();
      resetCards();

      if (matches === 10) {
        endGame();
      }
    }, 500);
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetCards();
    }, 1000);
  }
}

// kaarten resetten
function resetCards() {
  firstCard = null;
  secondCard = null;
  canFlip = true;
}

// timer starten
function startTimer() {
  timerRunning = true;
  gameStartTime = Date.now();
  seconds = 0;
  updateStats();
  timerInterval = setInterval(() => {
    // Calculate time delta based on Date.now()
    seconds = Math.floor((Date.now() - gameStartTime) / 1000);
    updateStats();
  }, 1000);
}

// stats updaten
function updateStats() {
  const movesEl = document.getElementById("moves");
  const matchesEl = document.getElementById("matches");
  const timeEl = document.getElementById("time");

  if (movesEl) movesEl.textContent = moves;
  if (matchesEl) matchesEl.textContent = `${matches}/10`;

  if (timeEl) {
    const mins = Math.floor(seconds / 60);
    let secs = seconds % 60;
    if (secs < 10) secs = "0" + secs;
    timeEl.textContent = `${mins}:${secs}`;
  }
}

// game eindigen
function endGame() {
  clearInterval(timerInterval);
  timerRunning = false;
  if (gameStartTime) {
    seconds = Math.floor((Date.now() - gameStartTime) / 1000);
  }
  updateStats();

  const finalMovesEl = document.getElementById("finalMoves");
  const finalTimeEl = document.getElementById("finalTime");
  const winModalEl = document.getElementById("winModal");

  if (finalMovesEl) finalMovesEl.textContent = moves;
  if (finalTimeEl) finalTimeEl.textContent = document.getElementById("time")?.textContent || "0:00";
  if (winModalEl) winModalEl.classList.add("show");
}

// nieuwe game starten
function newGame() {
  const winModalEl = document.getElementById("winModal");
  if (winModalEl) winModalEl.classList.remove("show");

  resetGameState();
  startGame();
}

// Initialize game
startGame();
