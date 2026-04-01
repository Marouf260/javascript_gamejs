  const clickEventAudio = new Audio("/assets/audio/click.wav");
  const HomeClick = new Audio("/assets/audio/click_home.wav");
  const navClickAudio = new Audio("/assets/audio/click_nav.wav");
const  timerAudio = new Audio("/assets/audio/time_back.wav");
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
