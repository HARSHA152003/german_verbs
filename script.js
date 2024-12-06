const verbs = [
    { verb: "anfangen", meaning: "to begin" },
    { verb: "anmachen", meaning: "to turn on (e.g., a light or device), to flirt" },
    { verb: "antworten", meaning: "to answer" },
    { verb: "arbeiten", meaning: "to work" },
    { verb: "beginnen", meaning: "to begin" },
    { verb: "bringen", meaning: "to bring, take" },
    { verb: "denken", meaning: "to think" },
    { verb: "fahren", meaning: "to drive, ride, go" },
    { verb: "fallen", meaning: "to fall" },
    { verb: "finden", meaning: "to find" },
    { verb: "folgen", meaning: "to follow" },
    { verb: "fragen", meaning: "to ask" },
    { verb: "fühlen", meaning: "to feel" },
    { verb: "geben", meaning: "to give" },
    { verb: "gehen", meaning: "to go" },
    { verb: "gewinnen", meaning: "to win" },
    { verb: "haben", meaning: "to have" },
    { verb: "handeln", meaning: "to deal, trade" },
    { verb: "helfen", meaning: "to help" },
    { verb: "heißen", meaning: "to be called" },
    { verb: "kennen", meaning: "to know" },
    { verb: "kommen", meaning: "to come" },
    { verb: "können", meaning: "can, to be able to" },
    { verb: "laufen", meaning: "to run" },
    { verb: "leben", meaning: "to live" },
    { verb: "lernen", meaning: "to learn" },
    { verb: "lesen", meaning: "to read" },
    { verb: "liegen", meaning: "to lie, be lying" },
    { verb: "machen", meaning: "to do, make" },
    { verb: "meinen", meaning: "to think, have an opinion" },
    { verb: "mögen", meaning: "to like" },
    { verb: "müssen", meaning: "must, to have to" },
    { verb: "nehmen", meaning: "to take" },
    { verb: "reden", meaning: "to talk" },
    { verb: "sagen", meaning: "to say" },
    { verb: "sehen", meaning: "to see" },
    { verb: "sein", meaning: "to be" },
    { verb: "setzen", meaning: "to set, put, place" },
    { verb: "sitzen", meaning: "to sit" },
    { verb: "spielen", meaning: "to play" },
    { verb: "sprechen", meaning: "to speak" },
    { verb: "stehen", meaning: "to stand" },
    { verb: "stellen", meaning: "to place, set" },
    { verb: "studieren", meaning: "to study" },
    { verb: "suchen", meaning: "to search, look for" },
    { verb: "tun", meaning: "to do" },
    { verb: "warten", meaning: "to wait" },
    { verb: "werden", meaning: "to become" },
    { verb: "wissen", meaning: "to know" },
    { verb: "wollen", meaning: "to want" },
    { verb: "wohnen", meaning: "to live" },
    { verb: "zeigen", meaning: "to show" },
    { verb: "ziehen", meaning: "to pull" },
    { verb: "schließen", meaning: "to close" },
  ];
  
  // Shuffle function
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  // Generate quiz
  function generateQuiz() {
    const questionsContainer = document.getElementById("questions-container");
    questionsContainer.innerHTML = ""; // Clear any previous questions
  
    const selectedVerbs = shuffle(verbs).slice(0, 52); // Select 5 random verbs
  
    selectedVerbs.forEach((item, index) => {
      // Get the correct answer and 3 random incorrect answers
      const correctAnswer = item.meaning;
      const incorrectAnswers = shuffle(
        verbs.filter(v => v.meaning !== correctAnswer).map(v => v.meaning)
      ).slice(0, 3);
  
      // Combine and shuffle the options
      const options = shuffle([correctAnswer, ...incorrectAnswers]);
  
      // Create the question HTML
      const questionHTML = document.createElement("div");
      questionHTML.className = "question";
      questionHTML.innerHTML = `
        <p>${index + 1}. What does "${item.verb}" mean?</p>
        ${options
          .map(
            option => `
          <label>
            <input type="radio" name="q${index}" value="${option}"> ${option}
          </label>
        `
          )
          .join("")}
      `;
  
      questionsContainer.appendChild(questionHTML);
  
      // Store the correct answer in the dataset for validation
      questionHTML.dataset.correct = correctAnswer;
    });
  }
  
  // Check answers and highlight
  function checkAnswers() {
    const questions = document.querySelectorAll(".question");
    let score = 0;
  
    questions.forEach((question, index) => {
      const selected = document.querySelector(`input[name="q${index}"]:checked`);
      const correctAnswer = question.dataset.correct;
  
      if (selected) {
        const label = selected.parentElement;
        if (selected.value === correctAnswer) {
          label.classList.add("correct");
          score++;
        } else {
          label.classList.add("incorrect");
        }
      }
  
      // Highlight the correct answer
      const labels = question.querySelectorAll("label");
      labels.forEach(label => {
        const input = label.querySelector("input");
        if (input.value === correctAnswer) {
          label.classList.add("correct");
        }
      });
    });
  
    document.getElementById("score").textContent = `You scored ${score} out of ${questions.length}!`;
  }
  
  // Initialize quiz
  generateQuiz();
  
  // Add event listener to the submit button
  document.getElementById("submit-btn").addEventListener("click", checkAnswers);
  