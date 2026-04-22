// Automatische pad detectie (homepage vs games)
const root = window.location.pathname.includes('/games/') ? "../../" : "./";

const clickEventAudio = new Audio(root + "assets/audio/click.wav");
const HomeClick = new Audio(root + "assets/audio/click_home.wav");
const navClickAudio = new Audio(root + "assets/audio/click_nav.wav");
const timerAudio = new Audio(root + "assets/audio/timer.wav");
const audio = new Audio(root + 'assets/audio/space.wav');
const homeAudio = new Audio(root + 'assets/audio/home_audio.wav');
const memoryAudio = new Audio(root + 'assets/audio/memory_audio.wav');
const homeMemoryAudio = new Audio(root + 'assets/audio/home_memory_audio.wav');

// DOM afhankelijke logica
document.addEventListener("DOMContentLoaded", () => {
  const cardEl = document.getElementById("mathEl");
  const woordEl = document.getElementById("woordEl");
  const memoryEl = document.getElementById("memoryEl");

  if (cardEl) {
    cardEl.addEventListener("click", () => {
      window.location.href = "games/rekenen/index.html";
    });
  }
  if (woordEl) {
    woordEl.addEventListener("click", () => {
      window.location.href = "games/woorden/index.html";
    });
  }
  if (memoryEl) {
    memoryEl.addEventListener("click", () => {
      window.location.href = "games/memory/index.html";
    });
  }
});

// Helper om audio te starten (lost autoplay blokkade op)
function playWithInteraction(audioObj) {
  const playPromise = audioObj.play();

  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Autoplay geblokkeerd, wacht op eerste klik of toets
      const startOnInteraction = () => {
        audioObj.play();
        window.removeEventListener('click', startOnInteraction);
        window.removeEventListener('keydown', startOnInteraction);
      };
      window.addEventListener('click', startOnInteraction);
      window.addEventListener('keydown', startOnInteraction);
    });
  }
}

// audio functies
function clickEventListener() {
  clickEventAudio.currentTime = 0;
  clickEventAudio.volume = 0.3;
  clickEventAudio.play();
}

function HomeClickEventListener() {
  HomeClick.currentTime = 0;
  HomeClick.volume = 0.4;
  HomeClick.play();
}

function navClickEventListener() {
  navClickAudio.currentTime = 0;
  navClickAudio.volume = 0.4;
  navClickAudio.play();
}

function timerAudioEventListener() {
  timerAudio.currentTime = 0;
  timerAudio.volume = 0.4;
  timerAudio.play();
}

function spaceBackgroundAudio() {
  audio.loop = true;
  audio.volume = 0.1;
  playWithInteraction(audio);
}

function homeBackgroundAudio() {
  homeAudio.loop = true;
  homeAudio.volume = 0.06;
  playWithInteraction(homeAudio);
}

function memoryBackgroundAudio() {
  memoryAudio.loop = true;
  memoryAudio.volume = 0.06;
  playWithInteraction(memoryAudio);
}


function homeMemoryBackgroundAudio() {
  homeMemoryAudio.loop = true;
  homeMemoryAudio.volume = 0.06;
  playWithInteraction(homeMemoryAudio);
}