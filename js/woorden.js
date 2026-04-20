window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const opType = urlParams.get("op") || "dir";

  // variabelen
  let answer;
  let lives = 3;
  let score = 0;
  let questionCount = 1;
  const maxQuestions = 10;

  // elementen
  const _inputEl = document.querySelector("#word-input");
  const _woordEl = document.querySelector("#scrambled-word");
  const _opEl = document.querySelector("#opEl");
  const _hintEl = document.querySelector("#hint");
  const _scoreEl = document.querySelector("#score");
  const _feedbackEl = document.querySelector("#feedback");
  const submitBtn = document.querySelector("#check-btn");
  const progBar = document.querySelector("#progress-bar");
  const _newWordBtn = document.querySelector("#new-word-btn");
  const countEl = document.querySelector("#question-count");
  const victoryModal = document.querySelector("#victory-modal");
  const woordEl = document.querySelector(".woord");
  const finalStats = document.querySelector("#final-stats");
  const highscoreEl = document.querySelector("#high-score");
  const RemoveBtn = document.querySelector("#remove-highscore");

  // audio bestanden
  const winAudio = new Audio("../../assets/audio/win.wav");
  const wrongAudio = new Audio("../../assets/audio/lose.wav");

  // categorieën
  const opSymbols = {
    dir: "Dieren",
    ver: "Vervoer",
    won: "Wonen",
    fam: "Familie",
    mix: "Mix",
  };

  // categorie tekst
  if (_opEl) _opEl.innerText = opSymbols[opType];

  // woord door elkaar halen
  function scrambleWord(word) {
    return word
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  }

  // woorden genereren
  function generatewoord() {
    const words = [
      // DIEREN
      { category: "dir", word: "GIRAFFE", hint: "Dier met een hele lange nek" },
      { category: "dir", word: "HOND", hint: "De beste vriend van de mens" },
      { category: "dir", word: "PAARD", hint: "Een dier waar je op kunt rijden" },
      { category: "dir", word: "LEEUW", hint: "De koning van de jungle" },
      { category: "dir", word: "TIJGER", hint: "Een groot wild dier met strepen" },
      { category: "dir", word: "OLIFANT", hint: "Groot dier met een lange slurf" },
      { category: "dir", word: "KAT", hint: "Een klein huisdier dat spint" },
      { category: "dir", word: "WOLF", hint: "Lijkt op een hond, leeft in een roedel" },
      { category: "dir", word: "KONIJN", hint: "Houdt van wortels en heeft lange oren" },
      { category: "dir", word: "VOGEL", hint: "Een dier dat kan vliegen" },
      { category: "dir", word: "ZEEHOND", hint: "Zwemmer met snorharen in de zee" },
      { category: "dir", word: "PANDA", hint: "Zwart-wit dier dat bamboe eet" },
      { category: "dir", word: "KAMEEL", hint: "Dier met bult(en) op zijn rug" },
      { category: "dir", word: "EZEL", hint: "Familielid van het paard, balkt" },
      { category: "dir", word: "UIL", hint: "Vogel die ’s nachts jaagt, maakt 'oehoe'-geluid" },
      { category: "dir", word: "SLANG", hint: "Lang dier zonder poten, vaak kronkelend" },
      { category: "dir", word: "EEND", hint: "Watervogel met een snavel" },
      { category: "dir", word: "ZWALUW", hint: "Kleine vogel die goed kan vliegen" },
      { category: "dir", word: "RENDIER", hint: "Dier dat leeft waar het koud is en trekt met een slee" },
      { category: "dir", word: "VLINDER", hint: "Insect met mooie gekleurde vleugels" },
      { category: "dir", word: "GANS", hint: "Vogel die veel in weilanden loopt" },
      { category: "dir", word: "SCHILDPAD", hint: "Dier met een hard schild om zich heen" },
      { category: "dir", word: "HAAS", hint: "Snel dier, familie van het konijn" },
      { category: "dir", word: "VIS", hint: "Leeft in het water, zwemt met vinnen" },
      { category: "dir", word: "BEER", hint: "Groot dier dat van honing houdt" },
      { category: "dir", word: "VLEERMUIS", hint: "Vliegt in het donker, ziet met geluid" },
      { category: "dir", word: "HAAI", hint: "Grote roofvis in de zee, scherpe tanden" },
      { category: "dir", word: "MUIS", hint: "Klein knaagdier, houdt van kaas" },
      { category: "dir", word: "KRAAI", hint: "Zwarte vogel, vaak te zien bij afval" },
      { category: "dir", word: "ZEBRA", hint: "Paardachtig dier met zwart-witte strepen" },

      // FRUIT
      { category: "fruit", word: "APPEL", hint: "Rond fruit, kan rood of groen zijn" },
      { category: "fruit", word: "BANAAN", hint: "Lang geel fruit" },
      { category: "fruit", word: "PEER", hint: "Lijkt op een appel maar met een smalle bovenkant" },
      { category: "fruit", word: "DRUIVEN", hint: "Kleine ronde vruchten in een tros" },
      { category: "fruit", word: "SINAASAPPEL", hint: "Oranje fruit vol met vitamine C" },
      { category: "fruit", word: "AARDBEI", hint: "Klein rood zomerfruit met pitjes buitenop" },
      { category: "fruit", word: "CITROEN", hint: "Geel en erg zuur fruit" },
      { category: "fruit", word: "KIWI", hint: "Bruin en harig van buiten, groen van binnen" },
      { category: "fruit", word: "MANGO", hint: "Zoet tropisch fruit" },
      { category: "fruit", word: "KERSEN", hint: "Kleine rode vruchtjes met een pit" },
      { category: "fruit", word: "MANDARIJN", hint: "Oranje en kleiner dan een sinaasappel" },
      { category: "fruit", word: "ANANAS", hint: "Tropisch fruit met stekelige schil" },
      { category: "fruit", word: "PRUIM", hint: "Klein, glad en paars fruit" },
      { category: "fruit", word: "PERZIK", hint: "Zacht, zoet fruit met harige schil" },
      { category: "fruit", word: "ABRIKOOS", hint: "Oranje vrucht met een grote pit" },
      { category: "fruit", word: "GRANAATAPPEL", hint: "Rood fruit met veel kleine pitjes" },
      { category: "fruit", word: "FRAMBOOS", hint: "Klein, rood zomerfruit, lijkt op een bolletje" },
      { category: "fruit", word: "BOSBES", hint: "Klein, blauw fruit uit het bos" },
      { category: "fruit", word: "BRAMEN", hint: "Zwarte, zoete vrucht, groeit aan stekelige struik" },
      { category: "fruit", word: "PAPAYA", hint: "Tropisch fruit met oranje vruchtvlees" },
      { category: "fruit", word: "PASSIEVRUCHT", hint: "Bruin-paars buitenkant, geel binnenkant met pitjes" },
      { category: "fruit", word: "LYCHEE", hint: "Kleine, exotische witte vrucht met een pit" },
      { category: "fruit", word: "VIJG", hint: "Zacht, paars of groene vrucht, veel pitjes" },
      { category: "fruit", word: "CLEMENTINE", hint: "Kleine sinaasappel, makkelijk te pellen" },
      { category: "fruit", word: "GRAPEFRUIT", hint: "Groot, bitter citrusfruit" },
      { category: "fruit", word: "MELOEN", hint: "Groot, zoet fruit, geel of groen van binnen" },
      { category: "fruit", word: "WATERMELOEN", hint: "Groot, rood vruchtvlees, zwarte pitjes" },
      { category: "fruit", word: "KOKOSNOOT", hint: "Bruin en harig, wit vruchtvlees binnenin" },
      { category: "fruit", word: "KIWI BES", hint: "Kleine groene bes, familie van de kiwi" },
      { category: "fruit", word: "QUINCE", hint: "Gele, harde vrucht, lijkt op een peer" },

      // Familie
      { category: "fam", word: "VADER", hint: "Je mannelijke ouder" },
      { category: "fam", word: "MOEDER", hint: "Je vrouwelijke ouder" },
      { category: "fam", word: "BROER", hint: "Een jongen uit hetzelfde gezin" },
      { category: "fam", word: "ZUS", hint: "Een meisje uit hetzelfde gezin" },
      { category: "fam", word: "OPA", hint: "De vader van je vader of moeder" },
      { category: "fam", word: "OMA", hint: "De moeder van je vader of moeder" },
      { category: "fam", word: "OOM", hint: "De broer van je vader of moeder" },
      { category: "fam", word: "TANTE", hint: "De zus van je vader of moeder" },
      { category: "fam", word: "NEEF", hint: "De zoon van je oom of tante" },
      { category: "fam", word: "NICHT", hint: "De dochter van je oom of tante" },
      { category: "fam", word: "STIEFVADER", hint: "Nieuwe partner van moeder, niet je echte vader" },
      { category: "fam", word: "STIEFMOEDER", hint: "Nieuwe partner van vader, niet je echte moeder" },
      { category: "fam", word: "ZWAGER", hint: "Man van je zus of broer van je partner" },
      { category: "fam", word: "SCHOONMOEDER", hint: "Moeder van je partner" },
      { category: "fam", word: "SCHOONVADER", hint: "Vader van je partner" },
      { category: "fam", word: "KLEINZOON", hint: "Zoon van je zoon of dochter" },
      { category: "fam", word: "KLEINDOCHTER", hint: "Dochter van je zoon of dochter" },
      { category: "fam", word: "ECHTGENOOT", hint: "Je man na het huwelijk" },
      { category: "fam", word: "ECHTGENOTE", hint: "Je vrouw na het huwelijk" },
      { category: "fam", word: "PEETVADER", hint: "Man die getuige is bij je doop" },
      { category: "fam", word: "PEETMOEDER", hint: "Vrouw die getuige is bij je doop" },
      { category: "fam", word: "ACHTERNEEF", hint: "De zoon van je neef of nicht" },
      { category: "fam", word: "ACHTERNICHT", hint: "De dochter van je neef of nicht" },
      { category: "fam", word: "SCHOONZOON", hint: "Man van je dochter" },
      { category: "fam", word: "SCHOONDOCHTER", hint: "Vrouw van je zoon" },
      { category: "fam", word: "TWEELING", hint: "Twee kinderen geboren uit dezelfde zwangerschap" },
      { category: "fam", word: "PLEEGZUS", hint: "Meisje dat tijdelijk bij je gezin woont" },
      { category: "fam", word: "PLEEGBROER", hint: "Jongen die tijdelijk bij je gezin woont" },
      { category: "fam", word: "HALFZUS", hint: "Zus met een andere vader of moeder" },
      { category: "fam", word: "HALFBROER", hint: "Broer met een andere vader of moeder" },

      // Vervoer
      { category: "ver", word: "AUTO", hint: "Voertuig met vier wielen" },
      { category: "ver", word: "FIETS", hint: "Heeft twee wielen en trappers" },
      { category: "ver", word: "TREIN", hint: "Rijdt op het spoor" },
      { category: "ver", word: "BOOT", hint: "Vervoermiddel op het water" },
      { category: "ver", word: "VLIEGTUIG", hint: "Vliegt door de lucht" },
      { category: "ver", word: "BUS", hint: "Groot voertuig voor veel mensen" },
      { category: "ver", word: "MOTOR", hint: "Snel voertuig op twee wielen" },
      { category: "ver", word: "VRACHTWAGEN", hint: "Groot voertuig voor transport van goederen" },
      { category: "ver", word: "SCOOTER", hint: "Zit tussen een fiets en een motor in" },
      { category: "ver", word: "HELIKOPTER", hint: "Vliegtuig met draaiende wieken bovenop" },
      { category: "ver", word: "SKATEBOARD", hint: "Plank met wieltjes waarop je kunt staan" },
      { category: "ver", word: "STEP", hint: "Voertuig met een plank en twee (of meer) wielen" },
      { category: "ver", word: "TRAM", hint: "Rijdt op rails, meestal in de stad" },
      { category: "ver", word: "TAXI", hint: "Auto waarmee je tegen betaling wordt vervoerd" },
      { category: "ver", word: "BROMMER", hint: "Sneller dan een fiets, langzamer dan een motor" },
      { category: "ver", word: "KANO", hint: "Boot die je met peddels voortbeweegt" },
      { category: "ver", word: "ROEIBOOT", hint: "Kleine boot die je met riemen beweegt" },
      { category: "ver", word: "SPRINTER", hint: "Snelle passagierstrein" },
      { category: "ver", word: "TROLLEYBUS", hint: "Bus op elektriciteit, via bovenleiding" },
      { category: "ver", word: "CABRIOLET", hint: "Auto waarvan het dak open kan" },
      { category: "ver", word: "BAGGERBOOT", hint: "Boot die de bodem uitgraaft in havens" },
      { category: "ver", word: "LIFT", hint: "Kabine die je verticaal naar boven of beneden brengt" },
      { category: "ver", word: "ZEILBOOT", hint: "Boot die wind vangt met een doek" },
      { category: "ver", word: "LOOPFIETS", hint: "Kinderfiets zonder pedalen" },
      { category: "ver", word: "SEGWAY", hint: "Elektrisch voertuig waarop je rechtop staat" },
      { category: "ver", word: "SCHIP", hint: "Zeer groot vaartuig, voor zee of rivier" },
      { category: "ver", word: "KOETS", hint: "Wagen getrokken door paarden" },
      { category: "ver", word: "KRUIWAGEN", hint: "Wagen met één wiel voor het vervoeren van spullen" },
      { category: "ver", word: "HOTELBUS", hint: "Speciaal uitgeruste bus voor reizen en slapen" },

      // Wonen
      { category: "won", word: "HUIS", hint: "De plek waar je woont" },
      { category: "won", word: "TAFEL", hint: "Meubelstuk om aan te eten" },
      { category: "won", word: "STOEL", hint: "Meubelstuk om op te zitten" },
      { category: "won", word: "BED", hint: "Hier slaap je 's nachts in" },
      { category: "won", word: "KAST", hint: "Hier bewaar je kleding of spullen in" },
      { category: "won", word: "KEUKEN", hint: "De plek waar je kookt" },
      { category: "won", word: "DEUR", hint: "Hiermee ga je een kamer in of uit" },
      { category: "won", word: "RAAM", hint: "Hierdoor kun je naar buiten kijken" },
      { category: "won", word: "TUIN", hint: "Stuk grond bij je huis met gras of planten" },
      { category: "won", word: "DOUCHE", hint: "Plek in de badkamer om je te wassen" },
      { category: "won", word: "BANK", hint: "Meubel waar je met veel mensen op kunt zitten" },
      { category: "won", word: "LAMINAAT", hint: "Soort vloerbedekking, lijkt op hout" },
      { category: "won", word: "WC", hint: "Toilet, plek om naar het toilet te gaan" },
      { category: "won", word: "KUSSEN", hint: "Zacht ding waar je je hoofd op legt in bed" },
      { category: "won", word: "VLOERKLEED", hint: "Stof op de vloer voor warmte of decoratie" },
      { category: "won", word: "BADKAMER", hint: "Kamer om je te wassen, douchen of baden" },
      { category: "won", word: "GARAGE", hint: "Ruimte naast het huis voor de auto" },
      { category: "won", word: "OPBERGZOLDER", hint: "Bovenste ruimte waar je spullen opslaat" },
      { category: "won", word: "BIJKEUKEN", hint: "Extra kamer voor wasmachine en voorraad" },
      { category: "won", word: "OPENHAARD", hint: "Plaats in huis waar je vuur kunt maken" },
      { category: "won", word: "LAMP", hint: "Voorwerp dat licht geeft in huis" },
      { category: "won", word: "SCHAAKTAFEL", hint: "Speciaal tafeltje voor het schaakspel" },
      { category: "won", word: "DREMPEL", hint: "Verhoging bij de overgang tussen kamers" },
      { category: "won", word: "RADIATOR", hint: "Verwarmingselement in huis" },
      { category: "won", word: "PLAFOND", hint: "Bovenkant van een kamer" },
      { category: "won", word: "MUUR", hint: "Stenen of houten afscheiding in huis" },
      { category: "won", word: "SALONTAFEL", hint: "Lage tafel in de woonkamer" },
      { category: "won", word: "ETAGE", hint: "Laag of verdieping in een huis" },
      { category: "won", word: "VENTILATIE", hint: "Systeem voor luchtverversing" },
      { category: "won", word: "SERRE", hint: "Uitbouw met veel glas om in te zitten" },
    ];

    let filteredWords;
    // woorden filteren op categorie
    if (opType === "mix") {
      filteredWords = words;
    } else {
      filteredWords = words.filter((w) => w.category === opType);
    }

    const wordList = filteredWords.length > 0 ? filteredWords : words;

    const randomIndex = Math.floor(Math.random() * wordList.length);
    const selectedObj = wordList[randomIndex];
    _inputEl.value = "";
    answer = selectedObj.word;

    const displayWord = scrambleWord(answer);

    if (_woordEl) _woordEl.innerText = displayWord;
    if (_hintEl) _hintEl.innerText = selectedObj.hint;

    // Direct focussen op input voor betere UX
    if (_inputEl) _inputEl.focus();

    words.pop();

    updateProgress();
  }

  // feedback
  function showFeedback(msg, type) {
    if (!_feedbackEl) return;
    _feedbackEl.innerText = msg;
    _feedbackEl.className = ` ${type}`;
    setTimeout(() => (_feedbackEl.innerHTML = ""), 1000);
  }

  // voortgang bijwerken
  function updateProgress() {
    if (countEl) countEl.innerText = Math.min(questionCount, maxQuestions);
    if (progBar) {
      const percent = ((questionCount - 1) / maxQuestions) * 100;
      progBar.style.width = `${percent}%`;
    }
  }

  // highscore bijwerken
  function updateHighscoreDisplay() {
    const storedHighscore = localStorage.getItem("highscore_woorden") || 0;
    const highscore = parseInt(storedHighscore) || 0;
    if (highscoreEl) highscoreEl.innerText = highscore;
  }
  updateHighscoreDisplay();

  // victory modal
  function showVictory() {
    const prevHighscore = parseInt(localStorage.getItem("highscore_woorden")) || 0;
    if (score > prevHighscore) {
      localStorage.setItem("highscore_woorden", score);
    }
    if (victoryModal) {
      victoryModal.style.display = "flex";
      if (finalStats)
        finalStats.innerText = `Je score: ${score} punten in ${maxQuestions} vragen!`;
    }
  }
  if (_inputEl) {
    _inputEl.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        if (submitBtn) submitBtn.click();
      }
    });
  }

  // submit knop
  if (submitBtn) {
    submitBtn.onclick = () => {
      const userGuess = _inputEl.value.toUpperCase().trim();

      if (userGuess === answer) {
        score += 10;
        winAudio.currentTime = 0;
        winAudio.play();
        if (_scoreEl) _scoreEl.innerText = score;
        showFeedback("Goed gedaan!", "success");
      } else {
        lives--;
        if (document.querySelector("#lives")) {
          document.querySelector("#lives").innerText = lives;
        }

        showFeedback(`Helaas, het was ${answer}`, "error");
        wrongAudio.currentTime = 0;
        wrongAudio.play();
      }
      questionCount++;

      if (questionCount <= maxQuestions && lives > 0) {
        setTimeout(generatewoord, 1000);
      } else {
        if (lives <= 0) {
          showVictory();
          _woordEl.innerHTML =
            "<button onclick='location.reload()'>Game Over! Opnieuw Spelen</button>";
          [_hintEl, _inputEl, submitBtn, _newWordBtn, woordEl].forEach((el) =>
            el.classList.add("hidden"),
          );
        }
        else if (score < 50) {
          showVictory();

          // alert(`Game over! Je eindscore is ${score} punten. Goed gedaan!`);
          _woordEl.innerHTML =
            "<button onclick='location.reload()'>Opnieuw Spelen</button>";
          [_hintEl, _inputEl, submitBtn, _newWordBtn, woordEl].forEach((el) =>
            el.classList.add("hidden"),
          );
        } else {
          showVictory();
          _woordEl.innerHTML =
            "<button onclick='location.href=\"index.html\"'>Je hebt gewonnen!</button>";
          [_hintEl, _inputEl, submitBtn, _newWordBtn, woordEl].forEach((el) =>
            el.classList.add("hidden"),
          );
        }


      }
    };
  }

  // remove highscore knop
  if (RemoveBtn) {
    RemoveBtn.addEventListener("click", () => {
      localStorage.removeItem("highscore_woorden");
      updateHighscoreDisplay();
    });
  }

  // new word knop
  if (_newWordBtn) {
    _newWordBtn.onclick = () => {
      questionCount++;
      if (questionCount <= maxQuestions) {
        generatewoord();
      } else {
        showVictory();
      }
    };
  }
  generatewoord();

};
