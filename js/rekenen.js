window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const opType = urlParams.get("op") || "plus";
  const levelNum = parseInt(urlParams.get("level")) || 1;

  let answer;
  let score = 0;
  let questionCount = 1;
  const maxQuestions = 10;

  // Elementen
  const num1El = this.document.querySelector("#num1");
  const num2El = this.document.querySelector("#num2");
  const opEl = this.document.querySelector("#operator");
  const inputEl = this.document.querySelector("#answer-input");
  const submitBtn = this.document.querySelector("#submit-btn");
  const scoreEl = this.document.querySelector("#score");
  const countEl = this.document.querySelector("#question-count");
  const progBar = this.document.querySelector("#progress-bar");
  const feedbackEl = this.document.querySelector("#feedback");
  const victoryModal = this.document.querySelector("#victory-modal");
  const finalStats = this.document.querySelector("#final-stats");

  const opSymbols = {
    plus: "+",
    plus_2: "+",
    min: "-",
    keer: "×",
    div: "/"
  };

  if (opEl) opEl.innerText = opSymbols[opType];

  function generateQuestion() {
    let n1, n2;
    const range = levelNum * 10;
    const ranges = levelNum * 100;

    // if (opType === "mix") {
    //   const types = ["plus", "min", "keer", "div"];
    //   currentOp = types[Math.floor(Math.random() * types.length)];

    //   if (opEl) opEl.innerText = opSymbols[currentOp];
    // }
    // switch (currentOp) {
    //   case "plus":
    //     n1 = Math.floor(Math.random() * range) + 2;
    //     n2 = Math.floor(Math.random() * range) + 2;
    //     answer = n1 + n2;
    //     break;
    //   case "min":
    //     n1 = Math.floor(Math.random() * range) + 5;
    //     n2 = Math.floor(Math.random() * (n1 - 1)) + 1;
    //     answer = n1 - n2;
    //     break;
    //   case "keer":
    //     n1 = Math.floor(Math.random() * 10) + 2;
    //     n2 = Math.floor(Math.random() * 10) + 2;
    //     answer = n1 * n2;
    //     break;
    //   case "div":
    //     n2 = Math.floor(Math.random() * 9) + 1;
    //     answer = Math.floor(Math.random() * 10);
    //     n1 = n2 * answer;
    //     break;
    // };

    switch (opType) {
      case "plus":
        n1 = Math.floor(Math.random() * range) + 2;
        n2 = Math.floor(Math.random() * range) + 2;
        answer = n1 + n2;
        break;
      case "plus_2":
        n1 = Math.floor(Math.random() * ranges) + 2;
        n2 = Math.floor(Math.random() * ranges) + 2;
        answer = n1 + n2;
        break;
      case "min":
        n1 = Math.floor(Math.random() * range) + 2;
        n2 = Math.floor(Math.random() * n1) + 2; // Geen negatieve uitkomsten
        answer = n1 - n2;
        break;
      case "keer":
        n1 = Math.floor(Math.random() * 10) + 2;
        n2 = Math.floor(Math.random() * 10) + 2;
        answer = n1 * n2;
        break;
      case "div":
        n2 = Math.floor(Math.random() * 9) + 1; // Geen deling door nul
        answer = Math.floor(Math.random() * 10);
        n1 = n2 * answer; // Zorg voor hele getallen
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

  function finishGame() {
    if (victoryModal) {
      victoryModal.style.display = "flex";
      if (finalStats)
        finalStats.innerText = `Je score: ${score} punten in ${maxQuestions} vragen!`;
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
