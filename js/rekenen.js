window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const opType = urlParams.get("op") || "plus";
  const levelNum = parseInt(urlParams.get("level")) || 1;

  // Variabelen
  let answer;
  let lives = 3;
  let score = 0;
  let questionCount = 1;
  let timer = 30;
  let isProcessing = false;
  let timerInterval = null;
  const maxQuestions = 10;

  // Audio bestanden
  const win = new Audio("../../assets/audio/win.wav");
  const lose = new Audio("../../assets/audio/wrong.wav");
  const lastResultAudio = new Audio("../../assets/audio/winnen.wav");
  const timerAudio = new Audio("../../assets/audio/timer.wav");
  const finishAudio = new Audio("../../assets/audio/finish_lose.wav");

  // Elementen
  const num1El = document.querySelector("#num1");
  const num2El = document.querySelector("#num2");
  const opEl = document.querySelector("#operator");
  const inputEl = document.querySelector("#answer-input");
  const submitBtn = document.querySelector("#submit-btn");
  const scoreEl = document.querySelector("#score");
  const countEl = document.querySelector("#question-count");
  const progBar = document.querySelector("#progress-bar");
  const feedbackEl = document.querySelector("#feedback");
  const victoryModal = document.querySelector("#victory-modal");
  const finalStats = document.querySelector("#final-stats");
  const highscoreEl = document.querySelector("#highscore");
  const remove_Highscore = document.querySelector("#remove_Highscore");
  const timerEl = document.querySelector("#timer");

  // opType symbolen
  const opSymbols = {
    plus: "+",
    plus_2: "+",
    min: "-",
    keer: "×",
    div: "/",
    tafel: "×",

  };
  if (opEl) opEl.innerText = opSymbols[opType];

  // vraag genereren op basis van opType en levelNum
  function generateQuestion() {
    let n1, n2;
    const range = levelNum * 10;
    const rangeskeer = levelNum * 50;
    const ranges = levelNum * 20;

    switch (opType) {
      // plus
      case "plus":
        n1 = Math.floor(Math.random() * range) + 4;
        n2 = Math.floor(Math.random() * range) + 4;
        answer = n1 + n2;
        break;
      // plus_2
      case "plus_2":
        n1 = Math.floor(Math.random() * ranges) + 4;
        n2 = Math.floor(Math.random() * ranges) + 4;
        answer = n1 + n2;
        break;
      // min
      case "min":
        n1 = Math.floor(Math.random() * range) + 4;
        n2 = Math.floor(Math.random() * n1) + 4; // Geen negatieve uitkomsten
        if (levelNum === 2) {
          n1 = Math.floor(Math.random() * ranges) + 4;
          n2 = Math.floor(Math.random() * n1) + 4;
        }
        answer = n1 - n2;
        break;
      // keer
      case "keer":
        n1 = Math.floor(Math.random() * 10) + 4;
        n2 = Math.floor(Math.random() * 10) + 4;

        if (levelNum === 2) {
          n1 = Math.floor(Math.random() * rangeskeer) + 2;
          n2 = Math.floor(Math.random() * rangeskeer) + 2;
        }
        answer = n1 * n2;
        break;
      // div
      case "div":
        n2 = Math.floor(Math.random() * 9) + 1;
        answer = Math.floor(Math.random() * 10);

        if (levelNum === 2) {
          n2 = Math.floor(Math.random() * 49) + 1;
          answer = Math.floor(Math.random() * 50);
        }
        n1 = n2 * answer;
        break;
      // tafel
      case "tafel":
        if (!window.selectedTafel) {
          const tafelKiezer = document.querySelector(".tafel-kiezen");
          if (tafelKiezer) tafelKiezer.classList.add("show");
          return; // Stop met genereren tot gekozen is
        }
          
        
          
      

        // if (!window.selectedTafel) {

        //   let userInput = inputNum.value;
       

        //   window.selectedTafel = parseInt(userInput) || 1;
        // }
        if (!window.getallenLijst || window.getallenLijst.length === 0) {
          window.getallenLijst = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

          for (let i = window.getallenLijst.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [window.getallenLijst[i], window.getallenLijst[j]] = [
              window.getallenLijst[j],
              window.getallenLijst[i],
            ];
          }
        }

        n2 = window.getallenLijst.pop();
        n1 = window.selectedTafel;
        answer = n1 * n2;
        break;

    }

    // Timer resetten bij elke nieuwe vraag
    timer = 30;
    if (timerEl) {
      timerEl.innerText = timer;
      timerEl.classList.remove("timer");
    }

    // getallen en input veld
    if (num1El) num1El.innerText = n1;
    if (num2El) num2El.innerText = n2;
    if (inputEl) {
      inputEl.value = "";
      inputEl.focus();
    }
    isProcessing = false;
  }

  // antwoord controleren
  function checkAnswer() {
    if (isProcessing) return;
    const userVal = parseInt(inputEl.value);
    if (isNaN(userVal)) return;

    isProcessing = true;

    if (userVal === answer) {
      score += 10;
      win.currentTime = 0;
      win.play();
      if (scoreEl) scoreEl.innerText = score;
      showFeedback("Goed gedaan!");
    } else {
      lives--;
      if (document.querySelector("#lives")) {
        document.querySelector("#lives").innerText = lives;
      }

      lose.currentTime = 0;
      lose.play();
      showFeedback(`Helaas, het was ${answer}`);
    }
    questionCount++;
    updateProgress();

    if (questionCount > maxQuestions || lives <= 0) {
      finishGame();
    } else {
      setTimeout(generateQuestion, 1000);
    }
  }

  // feedback
  function showFeedback(msg, type) {
    if (!feedbackEl) return;
    feedbackEl.innerText = msg;
    feedbackEl.className = `feedback-msg ${type}`;
    setTimeout(() => (feedbackEl.innerText = ""), 1000);
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
    const score = parseInt(localStorage.getItem("highscore_rekenen")) || 0;
    if (highscoreEl) {
      highscoreEl.innerText = score;
    }
  }

  updateHighscoreDisplay();

  // spel afmaken
  function finishGame() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    const prevHighscore = parseInt(localStorage.getItem("highscore_rekenen")) || 0;
    if (score > prevHighscore) {
      localStorage.setItem("highscore_rekenen", score);
    }

    if (victoryModal) {
      victoryModal.style.display = "flex";
      const modalTitle = victoryModal.querySelector("h2");

      if (lives <= 0) {
        if (modalTitle) modalTitle.innerText = "Game Over! 😢";
        if (finalStats) finalStats.innerText = `Helaas, je levens zijn op. Score: ${score}`;
        finishAudio.currentTime = 0;
        finishAudio.play();
      } else if (score >= 50) {
        if (modalTitle) modalTitle.innerText = "Gefeliciteerd! 🎉";
        if (finalStats)
          finalStats.innerText = `Je score: ${score} punten in ${maxQuestions} vragen!`;
        lastResultAudio.currentTime = 0;
        lastResultAudio.play();
      } else {
        victoryModal.innerHTML = `
        <div class="modal-content">
            <h2>Helaas, je hebt weinig gescoord: ${score} punten in ${maxQuestions} vragen!</h2>  
                      <p id="final-stats">Je hebt alle vragen beantwoord!</p>
            <div class="modal-actions">
                <button onclick="location.reload()">Opnieuw Spelen</button>
                <a href="index.html">Naar Levels</a>
            </div>
        </div>
    </div>`;
      }
    } else {
      if (finalStats)
        finalStats.innerText = `Je score: ${score} punten in ${maxQuestions} vragen!`;
      finishAudio.currentTime = 0;
      finishAudio.play();
      document.querySelector(".question-area").innerHTML =
        `<button onclick="location.reload()">Opnieuw Spelen</button>`;
      updateHighscoreDisplay();
    }
  }

  // event listeners
  if (submitBtn) {
    submitBtn.addEventListener("click", checkAnswer);
  }

  // Tafel kiezer listener (buiten generateQuestion om leaks te voorkomen)
  const tafelBtn = document.querySelector("#tafel-btn");
  const inputNum = document.querySelector(".tafel-kiezen input");
  if (tafelBtn && inputNum) {
    tafelBtn.addEventListener("click", () => {
      let userInput = inputNum.value;
      if (isNaN(userInput) || userInput < 1 || userInput > 100) {
        userInput = 1;
      }
      window.selectedTafel = parseInt(userInput);
      document.querySelector(".tafel-kiezen").classList.remove("show");
      generateQuestion();
    });

    // Enter toets voor tafel selectie
    inputNum.addEventListener("keypress", (e) => {
      if (e.key === "Enter") tafelBtn.click();
    });
  }

  // enter toets
  if (inputEl) {
    inputEl.addEventListener("keypress", (e) => {
      if (e.key === "Enter") checkAnswer();
    });
  }

  // highscore verwijderen
  if (remove_Highscore) {
    remove_Highscore.addEventListener("click", () => {
      if (score != null) {
        localStorage.removeItem("highscore_rekenen");
        location.reload();
      }
    });
  }

  // timer
  timerInterval = setInterval(() => {
    if (isProcessing) return;

    timer--;
    if (timer < 0) timer = 0;

    if (timerEl) timerEl.innerText = timer;

    if (timer === 10) {
      showFeedback("Nog 10 seconden!", "warning");
      if (timerEl) timerEl.classList.add("timer");
      timerAudio.currentTime = 0;
      timerAudio.play();
    }
    if (timer === 0) {
      timerAudio.pause();
      timerAudio.currentTime = 0;
    }

    if (timer <= 0) {
      lives--;
      if (document.querySelector("#lives")) {
        document.querySelector("#lives").innerText = lives;
      }
      lose.currentTime = 0;
      lose.play();
      showFeedback(`Tijd is om! Het juiste antwoord was ${answer}`, "error");
      questionCount++;
      updateProgress();
      if (questionCount > maxQuestions || lives <= 0) {
        finishGame();
      } else {
        generateQuestion();
      }
    }
  }, 1000);

  generateQuestion();
};
