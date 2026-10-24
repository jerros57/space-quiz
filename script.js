    const questions = [
      {
        category: "Nuestro vecindario",
        question: "¿Qué planeta es conocido como el planeta rojo?",
        answers: ["Venus", "Marte", "Júpiter", "Mercurio"],
        correct: 1,
        fact: "El óxido de hierro en su superficie le da a Marte su característico tono rojizo."
      },
      {
        category: "Historia espacial",
        question: "¿Quién fue el primer ser humano en viajar al espacio?",
        answers: ["Neil Armstrong", "Yuri Gagarin", "John Glenn", "Valentina Tereshkova"],
        correct: 1,
        fact: "Yuri Gagarin orbitó la Tierra en 1961 a bordo de la nave Vostok 1."
      },
      {
        category: "La Luna",
        question: "¿En qué año pisó la humanidad la Luna por primera vez?",
        answers: ["1965", "1969", "1972", "1975"],
        correct: 1,
        fact: "Neil Armstrong y Buzz Aldrin caminaron sobre la Luna durante la misión Apolo 11, en 1969."
      },
      {
        category: "Gigantes gaseosos",
        question: "¿Cuál es el planeta más grande de nuestro sistema solar?",
        answers: ["Saturno", "Neptuno", "Júpiter", "Urano"],
        correct: 2,
        fact: "Júpiter es tan enorme que todos los demás planetas cabrían dentro de él."
      },
      {
        category: "Mirando las estrellas",
        question: "¿Qué telescopio espacial lleva el nombre de un astrónomo?",
        answers: ["Voyager", "Hubble", "Pioneer", "Cassini"],
        correct: 1,
        fact: "El telescopio Hubble honra al astrónomo Edwin Hubble y observa el cosmos desde 1990."
      },
      {
        category: "Exploración robótica",
        question: "¿Qué vehículo explorador de la NASA aterrizó en Marte en 2021?",
        answers: ["Curiosity", "Opportunity", "Perseverance", "Spirit"],
        correct: 2,
        fact: "Perseverance explora el cráter Jezero y lleva consigo al pequeño helicóptero Ingenuity."
      },
      {
        category: "Más allá de la Tierra",
        question: "¿Cómo se llama la galaxia en la que se encuentra nuestro sistema solar?",
        answers: ["Andrómeda", "La Vía Láctea", "Galaxia del Sombrero", "Triángulo"],
        correct: 1,
        fact: "Nuestro sistema solar vive en uno de los brazos espirales de la Vía Láctea."
      },
      {
        category: "Estación espacial",
        question: "¿Qué hacen los astronautas para mantenerse en forma en órbita?",
        answers: ["No necesitan ejercicio", "Usan máquinas especiales", "Corren en el exterior", "Solo hacen estiramientos"],
        correct: 1,
        fact: "En microgravedad, los astronautas usan equipos especiales para ejercitarse unas dos horas al día."
      },
      {
        category: "Lunas fascinantes",
        question: "¿Cuál de estos planetas tiene la luna Titán?",
        answers: ["Marte", "Saturno", "Júpiter", "Neptuno"],
        correct: 1,
        fact: "Titán, una luna de Saturno, tiene lagos y ríos de metano líquido."
      },
      {
        category: "Un dato luminoso",
        question: "¿Cuánto tarda aproximadamente la luz del Sol en llegar a la Tierra?",
        answers: ["8 minutos", "8 segundos", "1 hora", "24 horas"],
        correct: 0,
        fact: "La luz solar viaja unos 150 millones de kilómetros y tarda cerca de 8 minutos y 20 segundos."
      }
    ];

    const questionEl = document.getElementById("question");
    const answersEl = document.getElementById("answers");
    const currentNumberEl = document.getElementById("current-number");
    const scoreEl = document.getElementById("score");
    const progressEl = document.getElementById("progress");
    const progressTrack = document.querySelector(".progress-track");
    const categoryEl = document.getElementById("category");
    const feedbackEl = document.getElementById("feedback");
    const nextButton = document.getElementById("next");
    const quizEl = document.getElementById("quiz");
    const startScreenEl = document.getElementById("start-screen");
    const resultsEl = document.getElementById("results");
    const practiceButton = document.getElementById("practice");
    const letters = ["A", "B", "C", "D"];
    let activeQuestions = createShuffledRound(questions);
    let questionIndex = 0;
    let score = 0;
    let answered = false;
    let isPracticeRound = false;
    let incorrectQuestionIndexes = [];
    let missionScore = 0;

    function createShuffledRound(sourceQuestions) {
      return sourceQuestions.map(question => {
        const shuffledAnswers = question.answers.map((answer, index) => ({ answer, index }));

        for (let index = shuffledAnswers.length - 1; index > 0; index--) {
          const randomIndex = Math.floor(Math.random() * (index + 1));
          [shuffledAnswers[index], shuffledAnswers[randomIndex]] = [shuffledAnswers[randomIndex], shuffledAnswers[index]];
        }

        return {
          ...question,
          answers: shuffledAnswers.map(item => item.answer),
          correct: shuffledAnswers.findIndex(item => item.index === question.correct)
        };
      });
    }

    function renderQuestion() {
      const item = activeQuestions[questionIndex];
      answered = false;
      currentNumberEl.textContent = String(questionIndex + 1).padStart(2, "0");
      document.getElementById("total-number").textContent = String(activeQuestions.length);
      categoryEl.textContent = item.category;
      questionEl.textContent = item.question;
      progressEl.style.width = `${((questionIndex + 1) / activeQuestions.length) * 100}%`;
      progressTrack.setAttribute("aria-valuemax", String(activeQuestions.length));
      progressTrack.setAttribute("aria-valuenow", String(questionIndex + 1));
      feedbackEl.className = "feedback";
      feedbackEl.textContent = "";
      nextButton.disabled = true;
      nextButton.innerHTML = questionIndex === activeQuestions.length - 1
        ? 'Ver resultados <span aria-hidden="true">✦</span>'
        : 'Siguiente <span aria-hidden="true">→</span>';
      answersEl.replaceChildren();

      item.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "answer";
        button.setAttribute("aria-label", `${letters[index]}: ${answer}`);
        const key = document.createElement("span");
        key.className = "answer-key";
        key.setAttribute("aria-hidden", "true");
        key.textContent = letters[index];
        const label = document.createElement("span");
        label.textContent = answer;
        button.append(key, label);
        button.addEventListener("click", () => chooseAnswer(index));
        answersEl.append(button);
      });
    }

    function chooseAnswer(selectedIndex) {
      if (answered) return;
      answered = true;
      const item = activeQuestions[questionIndex];
      const buttons = [...answersEl.querySelectorAll(".answer")];
      buttons.forEach(button => { button.disabled = true; });

      const isCorrect = selectedIndex === item.correct;
      if (isCorrect) {
        score += 1;
        scoreEl.textContent = String(score);
      } else if (!isPracticeRound) {
        incorrectQuestionIndexes.push(questionIndex);
      }

      buttons[item.correct].classList.add("correct");
      if (!isCorrect) buttons[selectedIndex].classList.add("incorrect");
      feedbackEl.className = `feedback visible ${isCorrect ? "good" : "bad"}`;
      feedbackEl.replaceChildren();
      const icon = document.createElement("span");
      icon.className = "feedback-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = isCorrect ? "✨" : "🛰️";
      const message = document.createElement("span");
      message.textContent = isCorrect
        ? `¡Respuesta correcta! ${item.fact}`
        : `No era esa. ${item.fact}`;
      feedbackEl.append(icon, message);
      nextButton.disabled = false;
    }

    function showResults() {
      quizEl.classList.add("hidden");
      resultsEl.classList.add("visible");
      const total = activeQuestions.length;
      const resultEyebrow = document.getElementById("result-eyebrow");
      const resultCopy = document.getElementById("result-copy");
      const resultTotal = document.getElementById("result-total");
      document.querySelector(".bottom-note").textContent = isPracticeRound
        ? `Repaso completado. Misión original: ${missionScore} de ${questions.length} respuestas correctas.`
        : "Gracias por explorar con nosotros. ¡Hasta la próxima misión!";
      document.getElementById("final-score").textContent = String(score);
      resultTotal.textContent = String(total);
      resultEyebrow.textContent = isPracticeRound ? "Repaso completado" : "Misión completada";
      practiceButton.hidden = isPracticeRound || incorrectQuestionIndexes.length === 0;

      let emoji, title, copy;
      if (score === total) {
        emoji = "🏆"; title = "¡Estrella de la exploración!";
        copy = "¡Perfecto! Tu conocimiento espacial está fuera de órbita. La galaxia no tiene secretos para ti.";
      } else if (score / total >= 0.7) {
        emoji = "🚀"; title = "¡Misión cumplida!";
        copy = "Tienes madera de explorador. Cada respuesta te acercó un poco más a las estrellas.";
      } else if (score / total >= 0.4) {
        emoji = "🌙"; title = "¡Buen comienzo, cadete!";
        copy = "Ya tienes el traje espacial puesto. Sigue descubriendo y pronto dominarás el cosmos.";
      } else {
        emoji = "🪐"; title = "¡Toda aventura empieza aquí!";
        copy = "El universo es enorme y está lleno de sorpresas. Tu próxima misión te llevará aún más lejos.";
      }

      if (isPracticeRound) {
        copy += ` En la misión principal acertaste ${missionScore} de ${questions.length}; esta puntuación de repaso es independiente.`;
      }

      document.getElementById("result-emoji").textContent = emoji;
      document.getElementById("result-title").textContent = title;
      resultCopy.textContent = copy;
      document.getElementById("restart").focus();
    }

    nextButton.addEventListener("click", () => {
      if (!answered) return;
      if (questionIndex === activeQuestions.length - 1) {
        showResults();
      } else {
        questionIndex += 1;
        renderQuestion();
      }
    });

    document.getElementById("start").addEventListener("click", () => {
      startScreenEl.classList.add("hidden");
      quizEl.classList.remove("hidden");
      answersEl.querySelector(".answer")?.focus();
    });

    practiceButton.addEventListener("click", () => {
      missionScore = score;
      activeQuestions = createShuffledRound(incorrectQuestionIndexes.map(index => questions[index]));
      questionIndex = 0;
      score = 0;
      scoreEl.textContent = "0";
      isPracticeRound = true;
      resultsEl.classList.remove("visible");
      quizEl.classList.remove("hidden");
      document.querySelector(".bottom-note").textContent = `Repaso de ${activeQuestions.length} preguntas falladas.`;
      renderQuestion();
      answersEl.querySelector(".answer")?.focus();
    });

    document.getElementById("restart").addEventListener("click", () => {
      activeQuestions = createShuffledRound(questions);
      questionIndex = 0;
      score = 0;
      missionScore = 0;
      incorrectQuestionIndexes = [];
      isPracticeRound = false;
      scoreEl.textContent = "0";
      resultsEl.classList.remove("visible");
      quizEl.classList.remove("hidden");
      document.querySelector(".bottom-note").textContent = "Diez preguntas. Un pequeño gran viaje por el universo.";
      renderQuestion();
      answersEl.querySelector(".answer")?.focus();
    });

    progressTrack.setAttribute("aria-valuemax", String(questions.length));
    document.getElementById("total-number").textContent = String(questions.length);
    renderQuestion();
