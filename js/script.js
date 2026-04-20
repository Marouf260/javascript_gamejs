// audio bestanden met helper voor diepte
const getAssetPath = (path) => {
  // Als we in een submap zitten (zoals /games/...), gebruik ../../pad
  // Als we in de root zitten (index.html), gebruik ./pad
  const depth = window.location.pathname.includes('/games/') ? '../../' : './';
  return depth + path;
};

const clickEventAudio = new Audio(getAssetPath("assets/audio/click.wav"));
const HomeClick = new Audio(getAssetPath("assets/audio/click_home.wav"));
const navClickAudio = new Audio(getAssetPath("assets/audio/click_nav.wav"));
const timerAudio = new Audio(getAssetPath("assets/audio/time_back.wav"));

const cardEl = document.getElementById("mathEl");
const woordEl = document.getElementById("woordEl");
const memoryEl = document.getElementById("memoryEl");

if(cardEl) {
  cardEl.addEventListener("click", () => {
  window.location.href = "games/rekenen/index.html";
});
}
if(woordEl) {
woordEl.addEventListener("click", () => {
  window.location.href = "games/woorden/index.html";
});
}
if(memoryEl) {
memoryEl.addEventListener("click", () => {
  window.location.href = "games/memory/index.html";
});
}
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
