window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const opType = urlParams.get("op") || "plus";
  const levelNum = parseInt(urlParams.get("level")) || 1;

  let answer;
  let score = 0;
  let questionCount = 1;
  const maxQuestions = 10;

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

  const opSymbols = {
    plus: "+",
    plus_2: "+",
    min: "-",
    keer: "×",
    div: "/",
    tafel: "×",
  };

  if (opEl) opEl.innerText = opSymbols[opType];

  function generateQuestion() {
    let n1, n2;
    const range = levelNum * 10;
    const rangeskeer = levelNum * 50;
    const ranges = levelNum * 100;

    switch (opType) {
      case "plus":
        n1 = Math.floor(Math.random() * range) + 4;
        n2 = Math.floor(Math.random() * range) + 4;
        answer = n1 + n2;
        break;
      case "plus_2":
        n1 = Math.floor(Math.random() * ranges) + 4;
        n2 = Math.floor(Math.random() * ranges) + 4;
        answer = n1 + n2;
        break;
      case "min":
        n1 = Math.floor(Math.random() * range) + 4;
        n2 = Math.floor(Math.random() * n1) + 4; // Geen negatieve uitkomsten
        if (levelNum === 2) {
          n1 = Math.floor(Math.random() * ranges) + 4;
          n2 = Math.floor(Math.random() * n1) + 4;
        }
        answer = n1 - n2;
        break;
      case "keer":
        n1 = Math.floor(Math.random() * 10) + 4;
        n2 = Math.floor(Math.random() * 10) + 4;

        if (levelNum === 2) {
          n1 = Math.floor(Math.random() * rangeskeer) + 2;
          n2 = Math.floor(Math.random() * rangeskeer) + 2;
        }
        answer = n1 * n2;
        break;
      case "div":
        n2 = Math.floor(Math.random() * 9) + 1;
        answer = Math.floor(Math.random() * 10);

        if (levelNum === 2) {
          n2 = Math.floor(Math.random() * 49) + 1;
          answer = Math.floor(Math.random() * 50);
        }
        n1 = n2 * answer;
        break;

      case "tafel":

       if (!window.selectedTafel) {
    let userInput = prompt("Welke tafel wil je oefenen? (1 t/m 10)");
    window.selectedTafel = parseInt(userInput) || 1;
}
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
    if (num1El) num1El.innerText = n1;
    if (num2El) num2El.innerText = n2;
    if (inputEl) {
      inputEl.value = "";
      inputEl.focus();
    }
  }

  function checkAnswer() {
    const userVal = parseInt(inputEl.value);
    if (isNaN(userVal)) return;

    if (userVal === answer) {
      score += 10;
      if (scoreEl) scoreEl.innerText = score;
      showFeedback("Goed gedaan!");
    } else {
      showFeedback(`Helaas, het was ${answer}`);
    }
    questionCount++;
    updateProgress();

    if (questionCount > maxQuestions) {
      finishGame();
    } else {
      setTimeout(generateQuestion, 1000);
    }
  }
  function showFeedback(msg, type) {
    if (!feedbackEl) return;
    feedbackEl.innerText = msg;
    feedbackEl.className = `feedback-msg ${type}`;
    setTimeout(() => (feedbackEl.innerText = ""), 1000);
  }
  function updateProgress() {
    if (countEl) countEl.innerText = Math.min(questionCount, maxQuestions);
    if (progBar) {
      const percent = ((questionCount - 1) / maxQuestions) * 100;
      progBar.style.width = `${percent}%`;
    }
  }
  function updateHighscoreDisplay(){
    const score = parseInt(localStorage.getItem("highscore")) || 0;
    if (highscoreEl) {
      highscoreEl.innerText = score;
    }
  }
  updateHighscoreDisplay();
  function finishGame() {
      const prevHighscore = parseInt(localStorage.getItem("highscore")) || 0;
        if (score > prevHighscore) {
          localStorage.setItem("highscore", score);
        }
         updateHighscoreDisplay();
         
    if (victoryModal) {
      victoryModal.style.display = "flex";
      if (score >= 50) {
        if (finalStats)
          finalStats.innerText = `Je score: ${score} punten in ${maxQuestions} vragen!`;
      
      } else {
        victoryModal.innerHTML = `
        <div class="modal-content">
            <h2>Helaas je hebt weinig gescoort ${score}  punten in ${maxQuestions} vragen!</h2>            <p id="final-stats">Je hebt alle vragen beantwoord!</p>
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
      document.querySelector(".question-area").innerHTML =
        `<button onclick="${window.location.reload()}">Play Again</button>`;
        updateHighscoreDisplay();
        


    }
  }
  if (submitBtn) {
    submitBtn.onclick = checkAnswer;
  }

  if (inputEl) {
    inputEl.onkeypress = (e) => {
      if (e.key === "Enter") checkAnswer();
    };
  }
  generateQuestion();
};
