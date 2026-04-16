// audio bestanden
const clickEventAudio = new Audio("/assets/audio/click.wav");
const HomeClick = new Audio("/assets/audio/click_home.wav");
const navClickAudio = new Audio("/assets/audio/click_nav.wav");
const timerAudio = new Audio("/assets/audio/time_back.wav");

const cardEl = document.getElementById("mathEl");
const woordEl = document.getElementById("woordEl");
const memoryEl = document.getElementById("memoryEl");


cardEl.addEventListener("click", () => {
  window.location.href = "games/rekenen/index.html";
});
woordEl.addEventListener("click", () => {
  window.location.href = "games/woorden/index.html";
});
memoryEl.addEventListener("click", () => {
  window.location.href = "games/memory/index.html";
});
// audio functies
function clickEventListener() {
  clickEventAudio.currentTime = 0;
  clickEventAudio.play();
}

function HomeClickEventListener() {
  HomeClick.currentTime = 0;
  HomeClick.play();
}

function navClickEventListener() {
  navClickAudio.currentTime = 0;
  navClickAudio.play();
}

function timerAudioEventListener() {
  timerAudio.currentTime = 0;
  timerAudio.play();
}
