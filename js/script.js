// audio bestanden met helper voor diepte
// const getAssetPath = (path) => {
//   // Als we in een submap zitten (zoals /games/...), gebruik ../../pad
//   // Als we in de root zitten (index.html), gebruik ./pad
//   const depth = window.location.pathname.includes('/games/') ? '../../' : './';
//   return depth + path;
// };

const clickEventAudio = new Audio("../../assets/audio/click.wav");
const HomeClick = new Audio("../../assets/audio/click_home.wav");
const navClickAudio = new Audio("../../assets/audio/click_nav.wav");
const timerAudio = new Audio("../../assets/audio/time_back.wav");
const audio = new Audio('../../assets/audio/space.wav');
const homeAudio = new Audio('../../assets/audio/home_audio.wav');
const memoryAudio = new Audio('../../assets/audio/memory_audio.wav');
const homeMemoryAudio = new Audio('../../assets/audio/home_memory_audio.wav');

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
// audio functies
function clickEventListener() {

  clickEventAudio.currentTime = 0;
  clickEventAudio.play();
  clickEventAudio.volume = 0.3;
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
  audio.play();
  audio.volume = 0.1;



}
function homeBackgroundAudio() {
  homeAudio.loop = true;
  homeAudio.play();
  homeAudio.volume = 0.06;



}

function memoryBackgroundAudio() {
  memoryAudio.loop = true;
  memoryAudio.play();
  memoryAudio.volume = 0.06;



}


function homeMemoryBackgroundAudio() {
  homeMemoryAudio.loop = true;
  homeMemoryAudio.play();
  homeMemoryAudio.volume = 0.06;



}