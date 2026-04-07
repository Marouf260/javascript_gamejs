const clickEventAudio = new Audio("/assets/audio/click.wav");
const HomeClick = new Audio("/assets/audio/click_home.wav");
const navClickAudio = new Audio("/assets/audio/click_nav.wav");
const timerAudio = new Audio("/assets/audio/time_back.wav");



// Stappenplan om alle genoemde functionaliteiten toe te voegen:
//
// 1. Bedenk welke extra geluidseffecten je wilt toevoegen voor acties zoals fouten, juist antwoord, game-over of level-up. Verzamel of maak deze geluidsbestanden.
// 2. Voeg de audio-bestanden toe aan je projectstructuur.
// 3. Maak voor ieder extra geluid een nieuwe Audio-instantie in JavaScript en zorg dat je deze afspeelt op het juiste moment in de gameplay.

// 4. Ontwerp een knop in de UI waarmee de gebruiker het geluid kan dempen of weer aanzetten (mute/unmute).


// 5. Voeg een event listener toe aan deze knop, zodat je met een boolean (bijv. isMuted) kunt bijhouden of geluid afgespeeld mag worden.
// 6. Implementeer een schuifregelaar (slider) in de UI waarmee de gebruiker het volume kan instellen.
// 7. Zorg dat het volume van alle Audio-objecten wordt aangepast op basis van deze slider.
// 8. Voor vibratie-feedback op mobiele apparaten: roep indien relevant navigator.vibrate aan bij bijvoorbeeld een fout antwoord of juist antwoord.
// 9. Sla de voorkeuren voor geluid (aan/uit, volume) op in localStorage wanneer de gebruiker deze aanpast.
// 10. Zorg dat je bij het laden van de pagina deze voorkeuren uit localStorage leest en toepast.
// 11. Voeg achtergrondmuziek toe door een extra Audio-object te laden, zorg dat het volume van deze muziek lager staat dan van de sound effects, en speel het continu of bij start van het spel af.
// 12. In een multiplayer-game: bepaal op basis van de actieve speler welk geluid wordt afgespeeld zodat de feedback per speler verschilt.
// 13. Voeg visuele feedback/animaties toe, zoals een korte animatie op de knop of het spelelement als een geluid wordt afgespeeld (bijvoorbeeld via een klasse met CSS-animatie).
// 14. Voorkom dat een geluidseffect te vaak tegelijk wordt afgespeeld door bijvoorbeeld bij elke klik te controleren of het geluid al speelt, of door een maximum aantal overlappende playbacks per effect toe te staan.
//
// Herhaal deze stappen voor elk gewenst geluid en effect, test alles op verschillende apparaten en browsers, en pas je ontwerp aan voor de beste gebruikerservaring.


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


