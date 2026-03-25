window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const opType = urlParams.get("op") || "dir";
  const levelNum = parseInt(urlParams.get("level")) || 1;

  let answer;
  let score = 0;
  let questionCount = 1;
  const maxQuestions = 10;

  const _inputEl = this.document.querySelector("#word-input");
  const _woordEl = this.document.querySelector("#scrambled-word");
  const _opEl = this.document.querySelector("#opEl");
  const _hintEl = this.document.querySelector("#hint");
  const _scoreEl = this.document.querySelector("#score");
  const _feedbackEl = this.document.querySelector("#feedback");
  const submitBtn = this.document.querySelector("#check-btn");
  const progBar = this.document.querySelector("#progress-bar");
  const _newWordBtn = this.document.querySelector("#new-word-btn");

  const countEl = this.document.querySelector("#question-count");

  const victoryModal = document.querySelector("#victory-modal");
  const finalStats = document.querySelector("#final-stats");

  const opSymbols = {
    dir: "Dieren",
    ver: "Vervoer",
    won: "Wonen",
    fam: "Familie",
    mix: "Mix",
  };

  if (_opEl) _opEl.innerText = opSymbols[opType];
  function scrambleWord(word) {
    return word
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  }

  function generatewoord() {
    const words = [
      // DIERN
      { category: "dir", word: "GIRAFFE", hint: "Dier met een hele lange nek" },
      { category: "dir", word: "HOND", hint: "De beste vriend van de mens" },
      { category: "dir", word: "PAARD", hint: "Een dier waar je op kunt rijden"},
      { category: "dir", word: "LEEUW", hint: "De koning van de jungle" },
      {category: "dir",word: "TIJGER",hint: "Een groot wild dier met strepen"},
      {category: "dir",word: "OLIFANT",hint: "Groot dier met een lange slurf"},
      { category: "dir", word: "KAT", hint: "Een klein huisdier dat spint" },
      {category: "dir",word: "WOLF",hint: "Lijkt op een hond, leeft in een roedel"},
      { category: "dir", word: "KONIJN", hint: "Houdt van wortels en heeft lange oren"},
      { category: "dir", word: "VOGEL", hint: "Een dier dat kan vliegen" },

      // FRUIT
      {category: "fruit",word: "APPEL",hint: "Rond fruit, kan rood of groen zijn"},
      { category: "fruit", word: "BANAAN", hint: "Lang geel fruit" },
      {category: "fruit",word: "PEER",hint: "Lijkt op een appel maar met een smalle bovenkant"},
      {category: "fruit",word: "DRUIVEN",hint: "Kleine ronde vruchten in een tros"},
      {category: "fruit",word: "SINAASAPPEL",hint: "Oranje fruit vol met vitamine C"},
      {category: "fruit",word: "AARDBEI",hint: "Klein rood zomerfruit met pitjes buitenop"},
      { category: "fruit", word: "CITROEN", hint: "Geel en erg zuur fruit" },
      { category: "fruit", word: "KIWI", hint: "Bruin en harig van buiten, groen van binnen"},
      { category: "fruit", word: "MANGO", hint: "Zoet tropisch fruit" },
      {category: "fruit",word: "KERSEN",hint: "Kleine rode vruchtjes met een pit"},

      // Familie
      { category: "fam", word: "VADER", hint: "Je mannelijke ouder" },
      { category: "fam", word: "MOEDER", hint: "Je vrouwelijke ouder" },
      {category: "fam",word: "BROER",hint: "Een jongen uit hetzelfde gezin",},
      { category: "fam", word: "ZUS", hint: "Een meisje uit hetzelfde gezin" },
      { category: "fam", word: "OPA", hint: "De vader van je vader of moeder" },
      {category: "fam",word: "OMA",hint: "De moeder van je vader of moeder"},
      { category: "fam", word: "OOM", hint: "De broer van je vader of moeder" },
      { category: "fam", word: "TANTE", hint: "De zus van je vader of moeder" },
      { category: "fam", word: "NEEF", hint: "De zoon van je oom of tante" },
      {category: "fam",word: "NICHT",hint: "De dochter van je oom of tante"},

      // Vervoer
      { category: "ver", word: "AUTO", hint: "Voertuig met vier wielen" },
      { category: "ver", word: "FIETS", hint: "Heeft twee wielen en trappers" },
      { category: "ver", word: "TREIN", hint: "Rijdt op het spoor" },
      { category: "ver", word: "BOOT", hint: "Vervoermiddel op het water" },
      { category: "ver", word: "VLIEGTUIG", hint: "Vliegt door de lucht" },
      { category: "ver", word: "BUS", hint: "Groot voertuig voor veel mensen" },
      { category: "ver", word: "MOTOR", hint: "Snel voertuig op twee wielen" },
      {category: "ver",word: "VRACHTWAGEN",hint: "Groot voertuig voor transport van goederen"},
      {category: "ver",word: "SCOOTER",hint: "Zit tussen een fiets en een motor in"},
      {category: "ver",word: "HELIKOPTER",hint: "Vliegtuig met draaiende wieken bovenop"},

      // Wonen
      { category: "won", word: "HUIS", hint: "De plek waar je woont" },
      { category: "won", word: "TAFEL", hint: "Meubelstuk om aan te eten" },
      { category: "won", word: "STOEL", hint: "Meubelstuk om op te zitten" },
      { category: "won", word: "BED", hint: "Hier slaap je 's nachts in" },
      {category: "won",word: "KAST",hint: "Hier bewaar je kleding of spullen in"},
      { category: "won", word: "KEUKEN", hint: "De plek waar je kookt" },
      {category: "won",word: "DEUR",hint: "Hiermee ga je een kamer in of uit"},
      {category: "won",word: "RAAM",hint: "Hierdoor kun je naar buiten kijken"},
      {category: "won",word: "TUIN",hint: "Stuk grond bij je huis met gras of planten"},
      { category: "won", word: "DOUCHE", hint: "Plek in de badkamer om je te wassen"},
    ];

    let filteredWords;

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

    updateProgress();
  }

    function showFeedback(msg, type) {
    if (!_feedbackEl) return;
    _feedbackEl.innerText = msg;
    _feedbackEl.className = ` ${type}`;
    setTimeout(() => (_feedbackEl.innerHTML = ""), 1000);
  }

function updateProgress() {
    if (countEl) countEl.innerText = Math.min(questionCount, maxQuestions);
    if (progBar) {
      const percent = ((questionCount - 1) / maxQuestions) * 100;
      progBar.style.width = `${percent}%`;
    }
  }

    function showVictory() {
    if (victoryModal) {
      victoryModal.style.display = "flex";
      if (finalStats)
        finalStats.innerText = `Je score: ${score} punten in ${maxQuestions} vragen!`;
    }
  }
  _inputEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const userGuess = _inputEl.value.toUpperCase();

      if (userGuess === answer) {
        score += 10;
        if (_scoreEl) scoreEl.innerText = score;
        showFeedback("Goed gedaan");
      } else {
        showFeedback("probeer het nog een keer!");
      }

    }
  });


  if (submitBtn) {
    submitBtn.onclick = () => {
      const userGuess = _inputEl.value.toUpperCase().trim();

      if (userGuess === answer) {
        score += 10;
        if (_scoreEl) _scoreEl.innerText = score;
        showFeedback("Goed gedaan!", "success");
      } else {
        showFeedback(`Helaas, het was ${answer}`, "error");
      }
      questionCount++;

      if (questionCount <= maxQuestions) {
        setTimeout(generatewoord, 1000);
      } else {
        showVictory();
        if (score < 50 || _newWordBtn === maxQuestions) {
          alert(`Game over! Je eindscore is ${score} punten. Goed gedaan!`);
          _woordEl.innerHTML =
            "<buttom onclick='location.reload()'>Play Again</button>";
          _woordEl.classList.add("word-final");
          [_hintEl, _inputEl, submitBtn, _newWordBtn].forEach((el) =>
            el.classList.add("hidden"),
          );
        }
      }
    };
  }

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
